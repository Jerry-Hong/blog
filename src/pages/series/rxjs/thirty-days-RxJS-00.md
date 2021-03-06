---
templateKey: series
series: 30 天精通 RxJS
title: 30 天精通 RxJS (00)：關於本系列文章
date: 2016-12-16T21:15:44.000Z
description: 就如同羅輯思維羅胖老師所說的，在這資訊爆炸的時代，所有的內容生產者要思考一個新維度，那就是我們能幫讀者節省多少的時間？這系列文章的核心目標就是幫助讀者節省學習 RxJS 的時間，盡可能地以最低的成本精通 RxJS！
image: null
tags:
  - JavaScript
  - RxJS
  - Observable
  - RxJS 30 Days
previous: null
next: ./thirty-days-RxJS-01.md
---

![RxJS Logo](/img/Rx_Logo.png)

前言
------

筆者從去年就一直想參加鐵人賽 30 天，一方面是希望利用機會把自己的所學做一次整理，另一方面想訓練自己組織文章的能力。去年的時候我想寫 ECMAScript 2015，也準備了一段時間，結果沒想到去年停辦了一年。

今年總算讓我成功地參加鐵人賽 30 天，雖然沒有很充裕的準備時間，但我會盡可能地把每個觀念、每個細節寫清楚，也希望我能堅持到最後！

> 你問我，我是誰？ 我是一名前端工程師，為了保留一點神秘感就不多做自我介紹了。

為什麼寫 [RxJS](https://github.com/ReactiveX/rxjs) ？
------

其實今年筆者一直在下面這三個主題中猶豫，不知道該選哪一個...

- ECMAScript 2015 (ES6)
- RxJS
- Universal JavaScript

最一開始是想寫 ECMAScript 2015 的，但一年過去了，在網路上相關的中文資源已經非常多，大部分的前端工程師也或多或少有在接觸，對我來說我不太喜歡寫已經有很多人寫過的主題。

後來是在 Universal JS 跟 RxJS 中猶豫，這兩個主題都是目前中文資源較為缺乏的，而且受眾也較 ES6 小很多，算是比較大的挑戰。後來權衡之下，認為 Universal JS 的牽涉範圍太廣，不易寫深，且對前端工程師來說有著一定的門檻，所以還是選了受眾相對較多的 RxJS。

但 RxJS 仍然是一個不容易撰寫的主題，主要原因是整體觀念較為抽象不好解釋，另外網路上的資源幾乎都是英文，且有些資源已經過時，難以判斷是否仍然適用。對筆者來說絕對是一個巨大的挑戰！

當然 RxJS 是筆者認為未來兩三年內會變得非常紅的一套 Library，主要原因有三：

- Reactive Programming 的興起
- Observable 標準化
- 多語言的支持

### Reactive Programming 的興起

Reactive Programming 是 RxJS 最重要的核心觀念之一，我們會在明天做比較深入的介紹。

如果有在關注 Vue 的工程師，應該會知道 [Vue.js](https://vuejs.org/) 的底層就是採用了 Reactive Programming 的觀念來實作的，另外 Vue 官方也在 11 月推出了 [vue-rx](https://github.com/vuejs/vue-rx)。

另一方面 [Angular 2](https://github.com/angular/angular) 也全面引用了 RxJS，不管是在 http 還是 animation 都用了 RxJS 的 Observable！

[Redux](https://github.com/reactjs/redux) 也在 [3.5 版](https://github.com/reactjs/redux/releases/tag/v3.5.0)中加入了對 Observable 操作的支援。

從這幾個前端的主流 Framework (或 Library) 就能明顯地看出這個趨勢，大家都在往這個方向走。

> 筆者也在今年 [JSDC.tw 演講](https://youtu.be/YoKuUNz5J2M?t=5m2s)中提到，目前前端框架同質化的程度越來越高，很多觀念會在各個不同的 Library 或 Framework 中通用！

### Observable 標準化

還有一個最重要的重點是 Observable 將會被加入 ECMAScript 的標準(應該會在 ES7 推出，我相信 [Jafar](https://twitter.com/jhusain) 不會騙我)。
另外 RxJS 現在推出了[第 5 版](https://github.com/ReactiveX/rxjs/releases/tag/5.0.0)，這個版本最重要的目標，就是要符合目前 [Observable 提案的規格](https://github.com/tc39/proposal-observable)(當然還有效能的優化)。

> RxJS 在三天前發佈了第五版！

> ECMAScript 不是一個新的語言，它是 JavaScript 的一份規格書，所有的瀏覽器廠家會依照這份規格書去實作出 JavaScript。

> Jafar Husain： TC-39 成員，RxJS 的大力推廣者，目前是 Netflix Cross-Team Technical Leader，同時也是 [falcor](https://github.com/Netflix/falcor) 的作者之一。

### 多語言的支持

其實類似 RxJS 的 Library 還不少，像是 [xstream](https://github.com/staltz/xstream), [Bacon.js](https://baconjs.github.io/), [most.js](https://github.com/cujojs/most) 等，那為什麼會選 RxJS 呢？

除了我們前面提到 RxJS 5 的推出，將符合標準規格之外，Rx 還有多個語言支持，幾乎所有主流的程式語言都有 Rx 的 Library，像是 [RxRuby](https://github.com/ReactiveX/RxRuby), [RxPy](https://github.com/ReactiveX/RxPY), [RxJava](https://github.com/ReactiveX/RxJava)...等，不管以後怎麼切換語言，幾乎只要學一次就隨處可用。

從各主流的 Framework 及 Library 納入 Observable，到將被加入 ES 的標準規格中，還能有跨語言的支持，這就是為什麼我認為 RxJS 會紅的原因，相信這波浪潮很快就會席捲台灣的前端社群！

目標
------

希望這 30 天的文章，盡可能的涵蓋 RxJS 所有項目，並且以淺顯易懂的方式解釋及表達給所有讀者，讓讀者能在最短的時間內，以最低的成本學會 RxJS，這就是本系列文章最重要的目標！

另外本系列文章會以 RxJS 第 5 版為主，所有的範例及 API 都會依照最新的版本撰寫。

為了盡可能的降低讀者的學習成本，本系列的每篇文章會盡量壓縮在 1500 字以內，讓讀者每天最多花 20 分鐘就能讀完，並且會在較難理解的文章附上影片講解，讓讀者能更輕鬆的吸收！

大綱規劃
------

- 核心觀念篇 (5天)：介紹 Rx 相關的核心觀念，及前置知識等。
- Observable (12～14天)：講解 Observable 及其方法，並會搭配簡單的範例和使用場景。
- Subject (5～6天)：講解 Subject，包含觀念以及各種不同的子類別。
- 實務應用 (4～6天)：會選實務上較為複雜的需求，作為一段學習的完整應用練習。

目前的規劃大致如上，也有可能在做改動，如果時間夠充裕也可能會再補上 Rx 的 Schedulers。

問題與討論
------

如果讀者對於文章內容有任何疑問或是建議，可以直接在留言區留言給我，我會看每一則留言！

