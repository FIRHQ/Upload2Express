// import {buildUploadPageUrl, buildImageUrl, buildQrUrl} from './index';
// const bindImg = (imgElement, imageUrl, loadFunction = (url) => {}) => {
//   imgElement.src = imageUrl
//   imgElement.onerror = () => {
//     ElementDisplay(imgElement, false)
//     setTimeout(() => {
//       imgElement.src = `${imageUrl}&t=${new Date().getTime()}`
//     }, 3000)
//   }
//   imgElement.onload = () => {
//     ElementDisplay(imgElement, true)
//     loadFunction(imageUrl)
//   }
// }

// const ElementDisplay = (element, is_show) => {
//   if (element){
//     element.style.display = is_show ? '' : 'none'
//   }
// }

// const bindUpload = ({uploadPanel, projectId, userId = -1, buildUidFunction = ()  => (new Date().getTime()), secret = null, mainAttribute = null, secondAttribute = null, updateFunction}) => {
//   let panel = document.querySelector(`#${uploadPanel}`)
//   let qrcodeButton = document.querySelector('.qrcodeButton')
//   let linkElement = panel.querySelector(".uploadLink")
//   let imgElement = panel.querySelector('.img')
//   let qrImgElement = panel.querySelector('.qrcodeImg')

//   ElementDisplay(qrImgElement, false)
//   ElementDisplay(imgElement, false)

//   let uid= null
//   if(qrcodeButton){
//     qrcodeButton.onclick = (e) => {
//       e.preventDefault();
//       uid = buildUidFunction()
//       ElementDisplay(qrImgElement, true)
//       qrImgElement.src = buildQrUrl(projectId, userId, uid, mainAttribute,  secondAttribute, secret, 'http://localhost:3000')
//       bindImg(imgElement, buildImageUrl(projectId, userId, uid, 'http://localhost:3000'), (e) => {
//         ElementDisplay(qrImgElement, false)
//         updateFunction(e)
//       })
//     }
//   }

//   linkElement.onclick = (e) =>{
//     e.preventDefault()
//     uid = buildUidFunction()
//     window.open(buildUploadPageUrl(projectId, userId, uid, mainAttribute, secondAttribute, secret,'http://localhost:3000'))
//     ElementDisplay(qrImgElement, false)
//     bindImg(imgElement, buildImageUrl(projectId, userId, uid, 'http://localhost:3000'), (e) => {
//       ElementDisplay(qrImgElement, false)
//       updateFunction(e)
//     })

//   }
// }

// export default bindUpload