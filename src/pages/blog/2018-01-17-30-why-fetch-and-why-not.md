---
templateKey: blog-post
title: Why fetch & why not ?
date: 2018-01-17T15:04:10.000Z
description: 今天(1/16) 在 Facebook 社團上看到網友提問為什麼要用 fetch，在我們已經有 jQuery ajax 的情況下，fetch 能取代 jQuery 的 ajax 嗎？
image: null
tags:
  - front-end
  - javascript
  - fetch
  - rxjs
  - service-worker
---

> 今天(1/16) 在 Facebook 社團上看到網友提問為什麼要用 fetch，在我們已經有 jQuery ajax 的情況下，fetch 能取代 jQuery 的 ajax 嗎？

## 為什麼我們應該學 fetch ?

Fetch API 是 whatwg 訂製的[標準(spec)](https://github.com/whatwg/fetch)，各家瀏覽器都會依照這個標準去實作 **JS 的宿主環境**。也就是說 fetch 是瀏覽器內建的方法，我們可以直接使用，不需要載入額外的 Library。

成為瀏覽器內建的方法立即可見的幫助就是前端工程師不需要再去看一堆 Library 的文件，只要會 fetch 就能互相溝通，但真正重要的不是這個...

Fetch API Spec 其實同時訂定了 Request 跟 Response 兩個標準介面，因為有了這個標準我們才奠定 Service Worker 的技術！

在 Service Worker 的 `fetch` 事件中，我們所接收到的 event 裡面的 request 物件其實就是 Request 的實例(instance)。

```javascript
// service-worker.js
self.addEventListener('fetch', (event) => {
  event.request // Request 的實體物件
})
```

簡單來說，如果你想學會如何實作 service worker，你就一定要會 Fetch API！

> whatwg 當初之所以要訂定 Fetch API Spec 其實目的不僅僅是 Service Worker，還有很多的重要的統整，比如說 跨網域(CORS) 的處理以及 CSP 的規範等等。這裡舉 Service Worker 為例只是因為它比較受到前端的關注。
  
> 我知道現在很多 Service Worker 的工具，可以自動幫我們生成 service worker 的 js 檔，我們不需要自己寫程式，但如果你真的想了解它是如何運作的，還是必須要會。

## 為什麼我們不用 fetch ？

講完了為什麼我們應該學 fetch 再來談談為什麼我們不用 fetch...

fetch 的缺點其實還蠻多的，如果單純跟 jQuery 比的話，fetch 瀏覽器支援程度很低！就算上了 fetch polyfill 也只能支援到 IE10。

但現在對於瀏覽器支援程度的要求已經寬鬆很多了，我認為 fetch 最大的兩個缺點是

1. 不能**優雅**取消 (cancel)
2. Response body 的方法都還是回傳 Promise


### 不能優雅取消 (cancel)

Fetch 原本是不能取消 request 的，一直到了去年 AbortController 的規範出現，Fetch 才有辦法做到取消 request；但目前的支援程度非常非常低，只有最新版的 FireFox 跟 Edge 支援，可以當作沒有這個功能。

另外用 AbortController 做取消，寫出來的程式碼非常的醜，像是下面這個簡單的例子

```javascript
var controller = new AbortController();
var signal = controller.signal;

var downloadBtn = document.querySelector('.download');
var abortBtn = document.querySelector('.abort');

downloadBtn.addEventListener('click', fetchVideo);

abortBtn.addEventListener('click', () => {
  controller.abort();
  console.log('Download aborted');
});

function fetchVideo() {
  fetch(url, {signal}).then((response) => {
    // ...
  }).catch(function(e) {
    reports.textContent = 'Download error: ' + e.message;
  })
}
```

這段程式碼，如果我們單看 abortBtn 的 click 行為，我們是完全沒辦法知道 controller 到底被誰註冊過了，在複雜的邏輯中很容易寫出難以維護的程式。

> 筆者去年在 [FB 牆上](https://www.facebook.com/photo.php?fbid=1957580130925329&set=pb.100000200839145.-2207520000.1516131294.&type=3&theater) 就有發表了這段程式碼與 RxJS 的比較

### Response body 的方法都還是回傳 Promise

Response 取得 body 的方法有

- arrayBuffer()
- blob()
- formData()
- json()
- text()

這些方法都是回傳一個新的 promise 物件，再 resolve 一次後才能拿到我們要的資料。

其實這樣的設計是 fetch 的優點，它能讓我們取得 Response 物件後再決定要如何使用，使 fetch 可以用在各種情境，比如說抓圖

```javascript
const logoImg = document.getElementById('logo')

fetch('//avatars1.githubusercontent.com/u/6407041?s=400&v=4')
.then(res => res.blob())
.then(blob => {
	logoImg.src = URL.createObjectURL(blob);
});
```
[jsbin](https://jsbin.com/hayipasiwi/3/edit?html,js,output)

但也因為這樣的設計變成我們每次都需要 resolve 兩次 promise，在多數的情境下會顯得程式碼很多餘

```javascript
fetch('http://jsonplaceholder.typicode.com/posts')
.then(res => res.json()) // res.json() 會回傳一個新的 promise 物件所以一定要再 then 一次做 resolve
.then(json => {  
  // ...  
})
```

雖然這段程式我們還是可以再自己做封裝，或是用其他的 Library 輔助，但仍會導致我們每次開新專案時要多做 fetch 的設定(或是裝套件)，沒有帶來太大的好處！

## 總結

如果你問我到底要學 fetch 還是 jQuery 的 ajax，那我肯定會回答學 fetch！fetch 是瀏覽器標準，也會是很多未來瀏覽器新功能的基底，"**學會**" fetch 後能幫助我們學習新的瀏覽器技術像是 Service Worker。就算到時候要再去使用 jQuery 的 ajax 也不會是什麼難事，文件大概看一下就會用了

所以 **fetch 是基本一定要會的！**

但如果問我 fetch 能取代 jQuery 的 ajax 嗎？ 

如果你的需求是不限瀏覽器支援程度，而且只是做簡單地抓取資料，那 fetch 就足夠用了！

> 額外討論的動畫，其實現在有很多專門做動畫的 Library 做的比 jQuery 更好也更值得學，比如 popmotion、animejs。

如果你的需求就是要支援舊版 IE(8 以下)，那 jQuery 會是一個選項，它幫我們做完了很多跨瀏覽器的問題，讓事情變得簡單很多。

> 如果時間充裕，建議可以自己用原生的 JavaScript 寫寫看

最後給新人一點建議，不要只是學工具如何使用，重要的是學習程式的觀念，以及了解各個工具/技術出現的目的。像是筆者其實出社會工作後，幾乎沒用過 jQuery；但講課時有人問我 jQuery 的問題，我也只需要稍微看一下文件就能知道問題在哪。