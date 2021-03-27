import {buildUploadPageUrl, buildImageUrl, buildQrUrl} from './index';

const bindImg = ({imgElement, imageUrl, showImage = true, loadFunction = (url) => {}}) => {
  imgElement.src = imageUrl
  imgElement.onerror = () => {
    elementDisplay(imgElement, false)
    setTimeout(() => {
      imgElement.src = `${imageUrl}&t=${new Date().getTime()}`
    }, 3000)
  }
  imgElement.onload = () => {
    if (showImage) { elementDisplay(imgElement, true) }
    loadFunction(imageUrl)
  }
}

const elementDisplay = (element, is_show) => {
  if (element){
    element.style.display = is_show ? '' : 'none'
  }
}

class UploadHelper {
  constructor({uploadPanel, projectId, domain = 'https://uploadhelper.ce04.com', imgElement = null, showImgElement = true,  qrImgElement = null, qrcodeWidth=200, imgMaxWidth= 200, imgMaxHeight= 200}){
    this.uploadPanel = uploadPanel;
    this.projectId = projectId;
    this.domain = domain;

    this.imgElement = imgElement || uploadPanel.querySelector('.img')
    if (this.imgElement == null){
      this.imgElement = document.createElement("img")
      this.imgElement.className = 'img'
      this.imgElement.style.cssText = `max-width: ${imgMaxWidth}px;max-height: ${imgMaxHeight};display:none`

      this.uploadPanel.appendChild(this.imgElement)
    }

    this.qrImgElement = qrImgElement || uploadPanel.querySelector('.qrcodeImg')
    if (this.qrImgElement == null){
      this.qrImgElement = document.createElement("img")
      this.qrImgElement.className = 'qrcodeImg'
      this.qrImgElement.style.cssText = `width: ${qrcodeWidth}px;height: ${qrcodeWidth}px;display:none`
      this.uploadPanel.appendChild(this.qrImgElement)
    }

  }
  bindAllElement({qrcodeBtn, linkBtn, userId, uid, fetchSecretPromise = null, mainAttribute = null, secondAttribute = null, updateFunction = (url)=> {console.log(`img updated: ${url}`)}}){
    let promise = fetchSecretPromise
    if(promise == null){
      promise = Promise.resolve(null)
    }
    promise.then(secret => {
      if(qrcodeBtn){
        qrcodeBtn.onclick = (e) => {
          e.preventDefault();
          elementDisplay(this.qrImgElement, true)
          this.qrImgElement.src = buildQrUrl(this.projectId, userId, uid, mainAttribute, secondAttribute,secret, this.domain)
          this.bindImgLoad({ userId, uid, updateFunction})
        }
      }

      if(linkBtn){
        linkBtn.onclick = (e) => {
          elementDisplay(this.qrImgElement, false)
          this.bindImgLoad({userId, uid, updateFunction})
          let pageUrl = buildUploadPageUrl(this.projectId, userId, uid, mainAttribute,secondAttribute, secret, this.domain)
          window.open(pageUrl)
        }
      }
    });


  }


  bindImgLoad({ userId, uid, updateFunction}){
    let imageUrl = buildImageUrl(this.projectId, userId, uid, this.domain)
    bindImg({
      imgElement: this.imgElement,
      imageUrl,
      loadFunction: (url) => {
        elementDisplay(this.qrImgElement, false)
        updateFunction(url)
      }
    })
  }

  uploadByBrowser({userId = -1, uid, secret = null, mainAttribute = null, secondAttribute = null, updateFunction}){
    elementDisplay(this.qrImgElement, false)
    this.bindImgLoad({userId, uid, updateFunction})
    let pageUrl = buildUploadPageUrl(this.projectId, userId, uid, mainAttribute,secondAttribute, secret, this.domain)
    window.open(pageUrl)
  }

  uploadByQrScan({userId = -1, uid, secret = null, mainAttribute = null, secondAttribute = null, updateFunction}){
    elementDisplay(this.qrImgElement, true)
    this.qrImgElement.src = buildQrUrl(this.projectId, userId, uid, mainAttribute, secondAttribute,secret, this.domain)
    this.bindImgLoad({ userId, uid, updateFunction})
  }
}

export default UploadHelper