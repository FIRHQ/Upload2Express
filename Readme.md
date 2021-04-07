# Upload2Express

## 简介

Upload2Express 可以配合 FileUpload， 直接生成上传的地址以及获得图片的地址， 不再需要自行设立 oss 等配置。

demo: [https://uploadhelper.ce04.com/test.html](https://uploadhelper.ce04.com/test.html)

codepen demo： [https://codepen.io/atpking/pen/rNWzzMo](https://codepen.io/atpking/pen/rNWzzMo)

## js使用方法

### 引入 upload2Express 库文件

```html
 <script type="text/javascript" src="./lib.js"></script>
```

 或者 npm install upload2express 后

 ```jsdelivr
import {UploadHelper} from 'Upload2Express';
```


仅需两步即可：
1. 实例化对象
2. 事件中调用 或使对象初始化事件


## 合适的地方初始化UploadHelper对象

```js
      const uploadHelper = new UploadHelper({
        uploadPanel: document.querySelector('#panel'),
        projectId: '项目名称' // 在 “我的项目” 里查看
      });
```

下面是初始化的相关参数

|参数名| 类型  | 是否必须| 解释| 描述 |
|---|---|---|---|---|
| uploadPanel | element | 是 | 上传区域的element | 上传后的图像预览将在此展示； 若使用二维码手机上传， 则二维码也在此dom 下展示|
| projectId | string | 是 | 新建的项目名称 | |
| imgElement | element | 否 | 展示上传完毕的图片节点 | 若不填写， 用户上传完毕后则自动在uploadPanel 节点后添加一个 class为 img  的 img 图像
|qrImgElement | element | 否 | 二维码图片展示节点 | 当启用手机二维码上传后， 二维码将出现在此节点上， 若不填写， 则在生成二维码后， 将自动在 uploadPanel 节点后生成 class 为 qrcodeImg 的 img 图像
|qrcodeWidth | number | 否 | 二维码宽度 | 若启用了二维码上传， 则此处为二维码的宽高， 默认为 200
| imgMaxWidth | number | 否 | 预览图最大宽度 | 用户上传图片后， 预览图的最大宽度， 默认为200
| imgMaxHeight | number | 否 | 预览图最大高度 | 用户上传图片后， 预览图的最大高度， 默认为200
| domain | string | 否 | 上传的服务器的地址 |  用来调试用,私有部署时需填写上传地址。

## 在按钮事件中调用方法

- 将按钮事件中调用 `跳转窗口上传` 方法

`uploadByBrowser({userId = 'default', uid, secret = null, mainAttribute = null, secondAttribute = null, updateFunction})`

- 将按钮事件中调用 `二维码扫码手机上传` 方法

`  uploadByQrScan({userId = 'default', uid, secret = null, mainAttribute = null, secondAttribute = null, updateFunction})`


参数如下表所示

|参数名| 类型  | 是否必须| 解释| 描述 |
|---|---|---|---|---|
|userId | string | 否 |  图片对应的用户ID | 用来后台快速索引用户上传的图片， 若不传， 则默认为default。 建议记录该值， 方便以后直接读取图片url
| uid | string | 是 | 针对用户级别的上传唯一编码 | 用来确定独立的一次上传， 同一个UserId下的 uid 不能上传两次。 建议记录该值， 方便以后直接读取图片url
| secret | string | 否 | 校验信息 | 如果 创建的项目要求加密， 则需要 拼接 加密字符串 和 uid ， 再进行 md5 运算， 将运算的结果给 secret
| mainAttribute | string | 否 | 图片的主属性 | 用来后台搜索图片， 可不传
| secondAttribute | string | 否 | 图片的附属性 | 用来后台搜索图片， 可不传
| uploadFunction | Func | 否 | 用户图片上传完毕后的回调函数 | 当用户上传完毕图像后， js 将收到回调， 参数为 用户上传的图片的 url


## 也可以不自己处理事件， 直接让UploadHelper对象绑定所有事件

```
  bindAllElement({qrcodeBtn, linkBtn, userId, uid, fetchSecretPromise = null, mainAttribute = null, secondAttribute = null, updateFunction})
```

|参数名| 类型  | 是否必须| 解释| 描述 |
|---|---|---|---|---|
| qrcodeBtn | element | 否 | 指定二维码扫码按钮 | 指定显示二维码上传的按钮， 若不指定， 则不会显示二维码上传
| linkBtn | element | 否 | 指定跳转链接按钮 | 指定跳转链接按钮， 若不指定， 则不会弹出窗口上传
|userId | string | 否 |  图片对应的用户ID | 用来后台快速索引用户上传的图片， 若不传， 则默认为default。 建议记录该值， 方便以后直接读取图片url
| fetchSecretPromise | promise | 否 | 如何生成 Secret 的Promise  | 若设置了需要加密上传， 则需要一个生成 secret 的 promise， 最后将 secret 作为参数 ， 运行 resolv(secret)
| uid | string | 是 | 针对用户级别的上传唯一编码 | 用来确定独立的一次上传， 同一个UserId下的 uid 不能上传两次。 建议记录该值， 方便以后直接读取图片url
| secret | string | 否 | 校验信息 | 如果 创建的项目要求加密， 则需要 拼接 serect userId 和 uid ， 再进行 md5 运算， 将运算的结果给 secret
| mainAttribute | string | 否 | 图片的主属性 | 用来后台搜索图片， 可不传
| secondAttribute | string | 否 | 图片的附属性 | 用来后台搜索图片， 可不传
| uploadFunction | Func | 否 | 用户图片上传完毕后的回调函数 | 当用户上传完毕图像后， js 将收到回调， 参数为 用户上传的图片的 url

## Demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>

    <title>upload demo</title>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/gh/FIRHQ/Upload2Express/dist/upload2express.js"
    ></script>

    <script>
      const updateFuncion = (url) => {
        document.querySelector("#avatarUrlInput").value = url;
        document.querySelector("#avatarUrlImg").src = url;
      };

      function init() {
        const uploadHelper = new UploadHelper({
          uploadPanel: document.querySelector("#avatarPanel"), //操作面板的ID，用来承载二维码
          projectId: "user_avatar", // 项目名称
          showImage: false, // 上传完毕后是否显示图片， 默认为是
        });

        document.querySelector("#redirectLink").onclick = (ev) => {
          ev.preventDefault();
          uploadHelper.uploadByBrowser({

            updateFunction: updateFuncion,
          });
        };

        document.querySelector("#qrcodeLink").onclick = (ev) => {
          ev.preventDefault();
          uploadHelper.uploadByQrScan({

            updateFunction: updateFuncion,
          });
        };
      }

      window.onload = () => {
        init();
      };
    </script>
  </head>

  <body>
    <div>
      <div class="buttons">
        <img id="avatarUrlImg" />

        <a href="#" id="redirectLink">浏览器上传</a>
        <a href="#" id="qrcodeLink">手机扫码上传</a>
      </div>
      <div id="avatarPanel"></div>
      <input type="text" id="avatarUrlInput" />
    </div>
  </body>
</html>
```
