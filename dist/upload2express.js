!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Upload2Express=t():e.Upload2Express=t()}(this,(function(){return e={10:e=>{let t;const o=(e,t,o,r=null,n=null,s="https://uploadhelper.ce04.com")=>`${s}/projects/${e}/standard_images/new?client_user_uid=${t}&upload_uid=${o}&main_attribute=${r}&second_attribute=${n}`,r=(e,o,n,s="https://uploadhelper.ce04.com")=>new Promise((function(l,p){fetch(`${s}/projects/${e}/standard_images/fetch_status`,{method:"POST",type:"cors",headers:{"user-agent":"check v1","content-type":"application/json"},body:JSON.stringify({client_user_id:o,upload_uid:n})}).then((p=>{200!=p.status?(clearTimeout(t),t=setTimeout((()=>{console.log(t),r(e,o,n,s).then((e=>{l(e)}))}),5e3)):p.json().then((e=>l(e)))}))}));e.exports={fetchImageUrlInfo:r,buildImageUrl:(e,t,o,r="https://uploadhelper.ce04.com")=>`${r}/fetch_image?project_id=${e}&client_user_id=${t}&upload_uid=${o}`,buildQrUrl:(e,t,r,n=null,s=null,l="https://uploadhelper.ce04.com")=>`${l}/welcome/qrcode?url=${encodeURIComponent(o(e,t,r,n,s,l))}`,buildUploadPageUrl:o}}},t={},function o(r){if(t[r])return t[r].exports;var n=t[r]={exports:{}};return e[r](n,n.exports,o),n.exports}(10);var e,t}));