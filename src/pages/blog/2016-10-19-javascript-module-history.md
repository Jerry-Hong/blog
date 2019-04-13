---
templateKey: blog-post
title: JavaScript 模組化歷程
date: 2016-11-06T15:04:10.000Z
description: 這篇文章會著重在帶大家了解 JavaScript 模組大致的發展歷程，而不會放在各個模組化機制的使用方式，希望能在這前端渾沌的時代，留下一點紀錄。
image: null
tags:
  - javascript
  - front-end
---

> JavaScript 最早是網頁的腳本語言，單純的被拿來做 DOM 的操作，而隨著時間的推演 JavaScript 逐漸成熟，但一直到 [ECMAScript2015](http://www.ecma-international.org/ecma-262/6.0/) 之前都還沒有「標準的」模組化機制。在 ES2015 推出前就發展出了許多套第三方的模組規範，像是 CommonJS, AMD, CMD, UMD...等 

> 這篇文章會著重在帶大家了解 JavaScript 模組大致的發展歷程，而不會放在各個模組化機制的使用方式，希望能在這前端渾沌的時代，留下一點紀錄。


**ECMAScript**

- ECMAScript 不是一個新的語言，它是 JavaScript 的實作規範，一份規格書，各家廠商依照這份規格實作出 JavaScript 
- ECMAScript 目前發展到 2016 版本(通稱 ES7)；目前各家瀏覽器仍在實作 ECMAScript 2015(通稱ES6)

## 發展歷程簡述

大概在 2009，有個名為 [ServerJS](https://wiki.mozilla.org/ServerJS) 的社群致力於把 JavaScript 移植到 Server 上運行，而其中一個要解決的要務就是 *制定模組化機制* ，在推出 [Module/1.0](http://wiki.commonjs.org/wiki/Modules/1.0) 規範後，在 Node.js 等環境下有了不錯的實作。

在 2009 下半年開始，社群中的成員希望把模組化的規範進一步推廣到瀏覽器，便就把社群改名為 CommonJS，但此時社區中大家對於 Modules 的下一個版本產生了激烈的爭論，逐漸分成三大流派：

- Modules/1.x: 這流派的觀點主要是我們應該基於現有的規範做一點補足移植到瀏覽器即可，要做的是新增 Modules/transport 規範。也就是在瀏覽器上執行前，通過工具先做一次編譯，轉為符合 Transport 規範的程式碼。目前比較紅的 [browserify](http://browserify.org/), [webpack](https://webpack.github.io/), [rollup](https://github.com/rollup/rollup) 都是由這套觀點衍生而來。

- Modules/async: 這個流派認為瀏覽器本身的特性與伺服器端不同，不應該用同一套規範。這個流派最著名的就是 AMD 及其實作 RequireJS

- Modules/2.0: 這個流派的觀點認為瀏覽器本身的特性確實與伺服器不同，不應該直接用 Modules/1.0 的規範，但應該盡可能的與 Modules/1.0 的規範保持一致。這個觀點的主要代表是 BravoJS 與 FlyScript。BravoJS 作者，Wes Garland，對 CommonJS 社群的貢獻很多，其設計的 Modules/2.0-draft 規範花了很多心思。而後 FlyScript 的作者提出了 Modules/Wrappings 規範，也是 CMD 規範的前身。

### CommonJS 規範

- 實作代表： Node.js
- 主要作者： ???
- 特色：最早是在 Server 端的架構下設計的，所以模組載入的方式也以同步的方式做載入，也因此無法適用於瀏覽器(所有資源是非同步加載，如果以同步的方式載入，可能檔案還沒下載完成導致發生錯誤)
- 影響：為 Node.js 奠定了良好的基礎，但因其無法直接移植瀏覽器的特性，成為後來模組之爭的關鍵原因。
- 程式範例：

```javascript
// sum.js

module.exports = function(a, b) {
	return a + b;
}

// index.js
var sum = require('./sum.js');
var result = sum(1, 2)
```

### AMD 規範

- 實作代表：RequireJS
- 主要作者：[James Burke](https://github.com/jrburke)
- 特色：是跟著 RequireJS 的發展所逐漸構成的一套規範，完全以瀏覽器特性進行設計的模組機制，具有 Early Executing 特性，並且在載入模組的撰寫方式上不符合 Principle of Proximity(就近聲明原則)，以下面程式碼為例：

**CommonJS**

```javascript
var sum = require("./sum.js") // 執行到這行，sum.js 才會同步載入並執行
```

**AMD Early Executing**

```javascript
define(["require"], function(require) {
  // 在這裡，sum.js 模組已經載入並執行完
  // ...
  var sum = require("./sum.js") // 此處僅是取得 sum.js 模組的 exports

})
```

**不符合 Principle of Proximity**

```javascript
define(["./sum.js", "test.js"], function(sum, test) {

    // 在最前面就先聲明所有要用到的模塊，並初始化

   if (false) {
       // 即使根本沒有用到 sum，但 sum 還是提前執行了
       sum(1, 2)
   }

})
```

- 影響：RequireJS 的推出使 JavaScript 第一次能夠在瀏覽器端完好的做模組區分，曾經紅極一時，非常多的 JS library 都因此採用 RequireJS 了；但因為前述的兩個特性不被 CommonJS 的社群接受，最後 AMD 就從 CommonJS 的社群中獨立出去了。

### Modules/2.0-draft

- 實作代表：BrovaJS
- 主要作者：[Wes Garland](https://github.com/wesgarland)
- 特色：BravoJS 本身偏向學術派，像是一個單純為了證明 Modules/2.0-draft 可行而寫的一個實作。

### Modules/Wrappings

- 實作代表：FlyScript
- 主要作者：khs4473
- 特色：是 Modules/2.0 中的實戰派，規範非常的簡潔能夠在瀏覽器上運行，並同時盡可能的符合 Modules/1.0 規範。
- 影響：很可惜在推出時 RequireJS 正當火紅，期間 FlyScript 的作者與 RequireJS 作者有過爭論。之後 FlyScript 作者就自我砍掉重練了，將 Github 與 官網都清空，只留下了一句話

*我會回來的，帶著更好的東西。*


> 目前官網以及 Github 都已經不在了，[這裡](https://groups.google.com/forum/#!topic/commonjs/DbIWVGh0FiI)還能看到當時大大留下的足跡

### CMD

- 實作代表：Sea.js
- 主要作者：[lifesinger(玉伯)](https://github.com/lifesinger)
- 特色：基本上採用 Modules/2.0 的觀點，根據玉伯述說是在使用 RequireJS 的過程中遇到了許多坑，給了建議卻沒有被採納故自己寫了這個實作，在語法上借鑑了 RequireJS 但本質上是採用 Modules/2.0 的觀念。

## 後續

之後在 2013 年前後出現了另一套 UMD 是希望能夠整合 CommonJS 與  AMD，會先判定是否在 Server 的環境再決定採用哪套規範，但也導致程式碼複雜，且使用人數不多故在此就略過不提了。

隨著 Browserify 與 Webpack 的推出，加上 [NPM](https://www.npmjs.com/) 的社群支援，使得近年來大家又開始往 Modules/1.x 的方向在走，而後來 ES6 標準的發佈，大家也開始用 [Babel](https://babeljs.io/) 加上一個模組化工具開始寫 ES6 模組化的語法。

這篇文章會隨著 ES2015(ES6) 標準的逐漸統一，而不再有人注意，但希望透過這篇文章的紀錄讓後來人能一窺 JavaScript 歷史。讀者如果想瞭解 ES2015 的模組化可以期待我的另一篇文章： **ES2016 模組化機制**