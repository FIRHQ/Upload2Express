# Upload2Express

## 简介

Upload2Express 可以配合FileUpload， 直接生成上传的地址以及获得图片的地址， 不再需要自行设立oss等配置。

## 安装

- 使用包管理

```
npm install upload2express
```

- 使用 script 引用

```
<script src='https://raw.githubusercontent.com/FIRHQ/Upload2Express/master/dist/upload2express.js'></script>
```

## 如何使用

- 使用包管理


## Demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Upload</title>
  <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script>
  <script src='https://raw.githubusercontent.com/FIRHQ/Upload2Express/master/dist/upload2express.js'></script>

  <script>
//显示二维码
const showQrCode = (projectId, userId, uploadUid) => {
  $("#qrcode").attr("src", buildQrUrl(projectId, userId, uploadUid) + `&random=${new Date().getTime()}`).show();
}

//试图让 img 加载图片
const tryLoading = (projectId, userId, uploadUid, refresh = false) => {
  let imageUrl = buildImageUrl(projectId, userId, uploadUid);
  if (refresh){
    imageUrl = `${imageUrl}&random=${new Date().getTime()}`;
  }
  $("#img").attr("src", imageUrl).hide();
  $("#loading").show();
}


const imageLoad = () => {
  $("#loading").hide();
  $("#img").show();
}

// 准备上传的独立id
var uid = null;


const {
  fetchImageUrlInfo, // 获得 图片的信息， 包含地址 和 上传是否完毕的状态
  buildImageUrl,  //获得 上传完成后图片的地址
  buildQrUrl,   //获得 手机上传使用的拼接二维码地址
  buildUploadPageUrl // 获得 上传页面的链接
  } = Upload2Express


$(function(){
  const userId = 'atpking';  //上传的图片的用户的编号
  const projectId = 2 // 项目编号

  $("#clickButton").click(function(e){
    e.preventDefault();

    uid = new Date().getTime(); //生成上传的独立编号

    window.open(buildUploadPageUrl(projectId,userId, uid));
    tryLoading(projectId,userId, uid);
  });

  $("#qrButton").click(function(e) {
    uid = new Date().getTime();

    showQrCode(projectId, userId, uid);
    tryLoading(projectId,userId, uid);
  })


  $("#img").bind("error", function(e){
    let that = this;
    setTimeout(function(e){
      tryLoading(projectId, userId, uid, true)
    }, 3000);

  }).bind("load", function(e){
    imageLoad()
    $("#qrcode").hide();
    console.log("load");
  });
})

</script>
</head>
<body>
  <div>
    <div>
      <a id='clickButton' href='#'>点击上传</a> 或 <a id='qrButton' href='#'>扫码</a>
    </div>

    <div>
      <img id='qrcode' />
    </div>

    <div>
      <p id='loading'>正在等待用户上传...</p>
      <img id='img' style='max-width: 500px; max-height:500px;object-fit: contain' />
    </div>
  </div>
</body>
</html>
```