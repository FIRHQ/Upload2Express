import UploadHelper from './UploadHelper'

let upload_check_t
const buildUploadPageUrl = (projectId, userId, uploadUid, mainAttribute = null, secondAttribute = null, secret = null, uploadDomain = 'https://uploadhelper.ce04.com') => {

  var url =  `${uploadDomain}/projects/${projectId}/standard_images/new?client_user_uid=${userId}&upload_uid=${uploadUid}&main_attribute=${mainAttribute}&second_attribute=${secondAttribute}`
  if (secret){
    url = `${url}&secret=${secret}`
  }
  return url
}

const buildImageUrl = (projectId, userId, uploadUid, uploadDomain = 'https://uploadhelper.ce04.com') => {
  return `${uploadDomain}/fetch_image?project_id=${projectId}&client_user_id=${userId}&upload_uid=${uploadUid}`
}

const buildQrUrl = (projectId, userId, uploadUid, mainAttribute = null, secondAttribute = null, secret = null, uploadDomain = 'https://uploadhelper.ce04.com') => {
  return `${uploadDomain}/welcome/qrcode?url=${encodeURIComponent(buildUploadPageUrl(projectId, userId, uploadUid, mainAttribute, secondAttribute, secret, uploadDomain))}`
}

const fetchImageUrlInfo = (projectId, userId, uploadUid, uploadDomain = 'https://uploadhelper.ce04.com') => {
  return new Promise(function (resolve, reject) {
    fetch(`${uploadDomain}/projects/${projectId}/standard_images/fetch_status`,
      {
        method: "POST",
        type: "cors",
        headers: { 'user-agent': 'check v1', 'content-type': 'application/json' },
        body: JSON.stringify({
          client_user_id: userId,
          upload_uid: uploadUid,
        })
      }
    ).then((res) => {
      if (res.status != 200) {
        clearTimeout(upload_check_t)
        upload_check_t = setTimeout(() => {
          console.log(upload_check_t)
          fetchImageUrlInfo(projectId, userId, uploadUid, uploadDomain).then((x) => { resolve(x) })
        }, 5000)
      } else {
        res.json().then((a) => {
          return resolve(a)
        })
      }
    })
  })
}

export { UploadHelper, fetchImageUrlInfo, buildImageUrl, buildQrUrl, buildUploadPageUrl }