---
templateKey: blog-post
slug: xstate-introduction
title: XState 簡介
image: ''
date: 2019-11-07T04:30:00.000Z
description: >-
  前端技術這幾年來變化速度非常的快，框架從 Angular.js 到 React，工具從 Grunt/Gulp 到 Webpack/Babel，還有各種
  Library 相繼出現。但最近幾年不知道是變化速度開始慢了，還是已經漸漸習慣，對於新的 Library
  或工具出現開始麻木，不再有那麼多的期待，似乎各種技術看來看去都差不多；直到 XState 的出現，又再讓我眼前為之一亮。
tags:
  - XState
  - State Management
  - Redux
  - Flux
  - JavaScript
  - React
---
## [XState](https://github.com/davidkpiano/xstate) 是什麼？

XState 是一個**狀態管理(State Management)**的 Library，負責儲存及描述各種狀態與各種狀態間的轉換，有點類似於 Redux、Flux，不同的地方在於 XState 整個核心都源自於 _**Statecharts**_，也就是我們需要定義好整個應用程式會有哪些狀態，和每個狀態下能轉換到哪些狀態(順序性)以及他們之間如何轉換。

## [Statecharts](https://en.wikipedia.org/wiki/State_diagram#Harel_statechart) 是什麼？

其實 Statecharts 並不是什麼新技術或新概念，早在 1984 年 David HAREL 的[論文](https://www.inf.ed.ac.uk/teaching/courses/seoc/2005_2006/resources/statecharts.pdf)就提出了 Statechart，是由早期的[狀態圖(state diagrams)](https://en.wikipedia.org/wiki/State_diagram)所拓展而來的，在該篇論文中對狀態圖加入了三個元素分別處理了層級(hierarchy)、併發(concurrency)和通訊(communication)。讓原先的狀態圖變的高度結構化且能更有效地描述各種狀態。

用 Statecharts 來描述 Fetch 就會長相下面這張圖

![Fetch Statechart](/img/cleanshot_2019-11-06_at_19.08.49.png "Fetch Statechart")

## 為什麼需要 XState?

其實用過 Angular.js 的開發者都會知道狀態管理的重要性，當應用程式狀態分散在不同地方時，就會使得狀態難以管理，並且容易出現 Bug，直到 Flux 出現提出了**單一資料源(Single Source of Truth)**及**單向資料流(unidirectional data flow)**等概念後，狀態管理的問題才得到了緩解。而 Redux 的出現利用 Funtional Programming 的手法大幅度的降低原先 Flux 的複雜度以及學習成本，如果我們依照 Redux 的架構已經可以把**因為狀態複雜度而陡然上升的維護成本**控制得很好，那如今為什麼我們還需要一個新的狀態管理工具呢？

### 缺乏清晰的狀態描述

不管是使用 Redux 或其他相關的 Library 都會有**狀態難以清晰描述**的問題，最主要原因有兩個，第一個是我們**完全**混合了狀態(state)跟資料(context)，所有東西都直接往 Reducer 裡面塞導致我們無法分清楚哪些是資料、哪些是狀態。

> 這裡的資料(context)指的是顯示在頁面上的內容，通常這些資料會存儲在後端並透過 API 取得，在 XState 稱之為 context，在 UML State Mechine 裡面稱為 Extended states；而狀態(state)則是指應用程式當前的狀態，比如說是否已登入或者 Menu 是否展開等等狀態。

另一個因素是我們通常都使用 flag 來表達某個小狀態，再由多個 flags 來表達某個狀態，當這種 flag 越來越多時，我們的程式就會很容易出現 Bug，程式碼會長的像下面這樣

```javascript
if (isLogin && isYYY && isXXX)
```

> 這樣的程式碼其實就是所謂的 **bottom-up code**，通常是我們先有一個小狀態比如說 isLogin 然後後面又加了其他各種狀態，當我們這種小狀態一多，就會讓程式容出現難以察覺的 Bug。
>
> **bottom-up code** 有哪些壞處可以參考 [David Khourshid 2018 年在 FEDC 的演講](https://youtu.be/ZENUkQUl1_w?t=819)（約 13:39 - 14:48）
>
> [David Khourshid](https://twitter.com/DavidKPiano) 是 XState 的作者，2018 年很榮幸的邀請到他來台灣演講，今年(2019)他也有來台灣當任 JSDC 的講者。

### 過於自由的狀態轉換

如上面我們提到的，過去我們的狀態是由多個 flags 所組成，這導致了我們無法**明確的**定義各種狀態之間的關係，最後就會變成我們無法確定狀態之間的切換是否正確，比如說 `isAdmin` 為 `true` 時 `isLogin` 應該必定為 `true`。像這樣用 flag 儲存小狀態就會有可能出現狀態轉換出錯的情況，比如說 `isAdmin` 設定成`true`了，卻忘記把`isLogin`也設定為`true`；而實際上狀態的複雜度會比這裡舉的例子複雜許多，這樣的程式碼大到一定程度就會變成我們再也無法真正理解程式有哪些狀態，以及哪些可能的狀態應該被處理(除非你再從頭跟 PM 及 Designer 完整的過一次流程與畫面，但如果專案夠大很有可能他們也不會很清楚)。

### 難以與工程師之外的人討論

同樣的當我們今天用各種 flags 的方式去描述整個應用程式的狀態時，其實是很難跟工程師之外的人溝通或討論的，就算是工程師也要追 Code 花時間理解當前的程式到底是如何運作並且在哪個狀態下出現的 Bug，這會讓我們很難快速地發現問題也很難跟 PM 討論需求設計是否存在邏輯上的矛盾，或是有未處理的狀態。

## XState 有什麼優勢？

講了這麼多過去的問題，讓我們來看看使用 XState 有什麼優勢吧！

### 程式碼即 UI Spec

當我們今天用 XState 定義好各種狀態之後，就可以直接利用 XState 提供的[圖像化工具(Visualizer)](https://xstate.js.org/viz/)把程式碼轉換成圖片，如下

![Vault Statecharts](/img/cleanshot_2019-11-06_at_22.09.25.png "Vault Statecharts")

[Vault](https://www.vaultproject.io/) UI tutorial 的 Statecharts

當我們有這張圖之後，就可以把這個當作 UI Spec 跟 PM 及設計師討論哪方面流程有問題，或是還有哪些沒有明確訂定的狀態。

### 寫更少的測試

由於我們已經明確定義出各個狀態以及每個狀態之間的關係，這讓我們可以更輕鬆的撰寫測試，也不需要測試那些根本不可能出現的狀態，並透過 [Model-based Testing](https://en.wikipedia.org/wiki/Model-based_testing) 我們只需要寫各個狀態下的斷言(assertion)就可以自動把各種狀態切換的路徑都測試完！

XState 在這方面也提供了 [xstate-test](https://github.com/davidkpiano/xstate/tree/master/packages/xstate-test) 有完整的範例跟教學，讀者們也可以去看看 [David Khourshid](https://twitter.com/DavidKPiano) 今年在 React Rally 2019 的[演講](https://www.youtube.com/watch?v=tpNmPKjPSFQ)。

### 更快速的路徑優化

當我們完成一個應用程式時，最需要做的通常就是[使用者體驗(User Experience)](https://en.wikipedia.org/wiki/User_experience)的優化，我們常常需要利用各種服務來收集各個頁面間的轉化率或是哪些狀態讓使用者最快跳過等等的數據。透過這些數據來優化我們應用程式的流程，讓使用者體驗進一步的提升。而如果使用了 XState 我們就可以在各個狀態轉換之間送 log 到數據收集的服務(如 GA, MIXpanel 等等)，就可以進一步分析哪些狀態可能是不必要的，來優化我們的 User Flow。

XState 在這方面也已經釋出了 [xstate-analytics](https://github.com/davidkpiano/xstate/tree/master/packages/xstate-analytics)，只是目前還不穩定，應該過一陣子後就能使用了！

> David Khourshid 今年(2019)在 ReactiveConf 上也分享了如何利用 XState 分析應用程式的 User Flow 還有可能搭配深度強化學習(Deep Reinforcement Learning)做路徑優化！推薦大家可以去看看他這場[演講](https://www.youtube.com/watch?v=na1-RumWtxE&fbclid=IwAR15N3cd_0PYZo6ilTfQHuA9uO1EclHEniHcpabZ2J6-h-YqOvzM6TnV51A)。

## 小結

XState 在推出後已經有許多知名專案使用，包括了前面提到的 Vault 以及 Gatsby 都用了 XState！除非是寫非常小型的網頁應用程式，否則我會推薦讀者嘗試導入 XState，他能讓我們更好的管理狀態甚至改善工作流程，而且 XState 是不管用哪個前端框架都可以搭配使用的，也可以應用在遊戲或手機 App 上。

讓我們期待下一篇文章 - XState 新手入門，如果有任何疑問也歡迎在下方留言給我，謝謝。
