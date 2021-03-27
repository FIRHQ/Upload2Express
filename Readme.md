# Upload2Express

## 简介

Upload2Express 可以配合 FileUpload， 直接生成上传的地址以及获得图片的地址， 不再需要自行设立 oss 等配置。

demo: [https://uploadhelper.ce04.com/test.html](https://uploadhelper.ce04.com/test.html)

codepen demo： [https://codepen.io/atpking/pen/rNWzzMo](https://codepen.io/atpking/pen/rNWzzMo)

## 安装

- 使用包管理

```
npm install upload2express

// 在项目中
// import { fetchImageUrlInfo, buildImageUrl, buildQrUrl, buildUploadPageUrl } from 'uploadexpress'
```

- 使用 script 引用

```html
<script src="https://cdn.jsdelivr.net/gh/FIRHQ/Upload2Express/dist/upload2express.js"></script>
```

## 如何使用

主要提供个方法， 分别是

- buildUploadPageUrl(projectId, userId, uploadUid, mainAttribute = null, secondAttribute= null)
- buildImageUrl(projectId, userId, uploadUid)
- buildQrUrl(projectId, userId, uploadUid, mainAttribute = null, secondAttribute= null)
- fetchImageUrlInfo(projectId, userId, uploadUid)

这些方法的主要参数：

|Params name | Type | Description |
|---|---|---|
|projectId| String | 项目编号|
| userId | String | 图片上传的用户的注记 ID
| uploadUid | String | 独立上传编号，用来区分每个上传， 一般传时间戳即可
| mainAttribute | String | （可选）图片的主属性， 方便管理后台进行搜索
| secondAttribute | String |（可选）图片的附属性， 方便管理后台进行搜索
### buildUploadPageUrl
返回用来生成跳转链接地址。 可以使用 window.open 或 targe='\_blank' 在新窗口中打开这个地址。
### buildImageUrl
返回用来拼接图片的地址。 注意， 此处只要参数确定，无论图片是否上传完毕， 图片的最终地址均不会发生改变。

### buildQrUrl
返回 二维码， 手机扫描二维码后， 相当于手机打开了上传的地址。

### fetchImageInfo
返回一个Promise。 当调用此函数时， 系统会轮询请求图片的状态。当图片上传完毕, 且轮询运行时，会执行resolve(json)
json 为 此时图片信息的结果

## 源码编译

运行 `webpack` 后， 在 dist 目录下即会生成压缩后的js文件
## Demo

### Pure JS 方式
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>upload demo</title>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/FIRHQ/Upload2Express/dist/upload2express.js"
    ></script>

    <script>
      var uid = null; // 准备上传的独立id
      const {
        // 获得 图片的信息， 包含地址 和 上传是否完毕的状态
        fetchImageUrlInfo,
        //获得 上传完成后图片的地址。 不必等到用户上传， 我们在任务开始时就知道了图片的最终地址
        buildImageUrl,
        //获得 手机上传使用的拼接二维码地址
        buildQrUrl,
        // 获得 上传页面的链接
        buildUploadPageUrl,
      } = Upload2Express;

      // 用到的各个元素
      const getQrCodeElement = () => document.querySelector("#qrcode");
      const getLoadingElement = () => document.querySelector("#loading");
      const getImageElement = () => document.querySelector("#img");
      const getClickButtonElement = () => document.querySelector("#clickButton");
      const getQrButtonElement = () => document.querySelector("#qrButton");

      // 用来显示二维码
      const showQrCode = (projectId, userId, uploadUid) => {
        let qrcode = getQrCodeElement();
        qrcode.src = buildQrUrl(projectId, userId, uploadUid) + `&random=${new Date().getTime()}`;
        qrcode.style.display = "";
      };

      //用来将生成上传图片的地址 给到 img 的 src
      const trySetImageUrlToImg = ( projectId, userId, uploadUid, refresh = false ) => {
        let imageUrl = buildImageUrl(projectId, userId, uploadUid);
        if (refresh) {
          imageUrl = `${imageUrl}&random=${new Date().getTime()}`;
        }
        getImageElement().src = imageUrl;

        // 隐藏
        getImageElement().style.display = "none";
        getLoadingElement().style.display = "";
      };

      const imageLoad = () => {
        getLoadingElement().style.display = "none";
        getImageElement().style.display = "";
      };

      const init = () => {
        console.log("init");
        const userId = "atpking";
        const projectId = 2;

        getClickButtonElement().onclick = function (e) {
          e.preventDefault();
          uid = new Date().getTime();
          window.open(buildUploadPageUrl(projectId, userId, uid));
          trySetImageUrlToImg(projectId, userId, uid);
        };

        getQrButtonElement().onclick = function (e) {
          uid = new Date().getTime();
          showQrCode(projectId, userId, uid);
          trySetImageUrlToImg(projectId, userId, uid);
        };

        // 绑定图片加载失败的事件
        // 重点
        // 当图片加载失败时，会发起 error 事件， 我们只需要等待几秒后，重新载入图片地址即可
        // 当用户上传完毕时， 此图片地址也不会再抛出异常
        getImageElement().onerror = function (e) {
          let that = this;
          setTimeout(function (e) {
            // 注意 最后个参数的作用是 带入变化值，让图片重新加载src
            trySetImageUrlToImg(projectId, userId, uid, true);
          }, 3000);
        };

        //绑定图片加载成功的事件
        getImageElement().onload = function (e) {
          imageLoad();
          getQrCodeElement().style.display = "none";
        };
      };

      window.onload = () => {
        init();
      };
    </script>
  </head>

  <body>
    <div>
      <div>
        <a id="clickButton" href="#">点击上传</a> 或
        <a id="qrButton" href="#">扫码</a>
      </div>

      <div>
        <img id="qrcode" />
      </div>

      <div>
        <p id="loading">正在等待用户上传...</p>
        <img
          id="img"
          style="max-width: 500px; max-height:500px;object-fit: contain"
        />
      </div>
    </div>
  </body>
</html>
```

### React 方式

```jsx
import React, { useState } from 'react';
import { buildUploadPageUrl, fetchImageUrlInfo } from 'upload2express'

const UploadElement = ({ projectId, userId, mainAttribute, secondAttribute, renderFunction, baseDomain = ''}) => {
  const [url, setUrl] = useState("")
  const [uploadImageUrl, setUploadImageUrl] = useState('')

  const click = (e) => {
    // 生成上传用的编号
    const uploadUid = new Date().getTime()
    // 生成上传的URL
    const uploadUrl = buildUploadPageUrl(projectId, userId, uploadUid, mainAttribute, secondAttribute)

    setUrl(uploadUrl)

    // 设置一个定时器， 去取用户上传完毕的地址
    fetchImageUrlInfo(projectId, userId, uploadUid, uploadDomain).then((data) => {
      console.log(data);
      setUploadImageUrl(data.url)
    })
  }

  return (
    <>
      <div>
        <button onClick={click}>生成上传址</button>
        {url.toString() === '' ? null : (
          <div>
            <p>点击<a href={url} target='_blank'>这里上传</a>, 或使用手机扫码上传</p>
            <img src={`${uploadDomain}/welcome/qrcode?url=${url}&size=200`}></img>
          </div>
        )}

        {uploadImageUrl !== "" ? (
          renderFunction(uploadImageUrl)
        ) : (<p>正在等待上传图片</p>)}
      </div>
    </>
  )
}

// 类似这样使用

// <UploadElement
//   projectId={projectId}
//   uploadDomain={uploadDomain}
//   userId={userId}
//   mainAttribute= {mainAttribute}
//   secondAttribute= {secondAttribute }
//   renderFunction={(url) => (
//     <img src={url} className='w-20 h-20'></img>
//   )}>
// </UploadElement>




```