---
templateKey: blog-post
slug: webpack-for-beginner
title: Webpack for beginner
date: 2016-11-06T15:04:10.000Z
description: Webpack是 JS 模組化的工具同時也能很好的整合其他工具像是 babel, css-module 等，也因為如此使她成為目前前端必學的工具之一。
image: "/img/webpack_cover.jpg"
tags:
  - Front End
  - Webpack
  - JavaScript
---

> 隨著網頁的應用程式化，我們對於JS的要求越來越高，原生的JS已經漸漸的無法滿足我們的需求，需要許多額外的工具來補足原生的JS。

## 模組化

因為 JavaScript 最早是腳本語言，所以在 ES5 以前是沒有模組化功能的，也就是說在沒有模組化之前我們所有的資料或變數的傳遞都必須透過全域物件（window）。

舉例來說像我們以前在創作網站很常用到的 [jQuery](http://jquery.com/) ，當我們把jQuery透過 script 標籤載入時，jQuery 就被塞到全域物件，jQuery 相關的套就會直接從全域取得 jQuery。

這種透過全域傳遞變數的做法會造成以下幾點困擾

- 全域變數衝突
- 載入順序錯誤
- 開發人員必須自行解決套件之間相依問題
- 在大型專案下，模組的管理會變的很沒有效率且難以維護

為了解決這些問題，發展出許多模組機制，像是主流的 CommonJS, AMD 還有ES6 正式的模組化，詳細的JS模組化歷程可以參考我的另一篇文章 **[JavaScript 模組化歷程](/posts/2016-10-19-javascript-module-history/)**，至於 Webpack 在目前主流的模組化機制中都有支援，讀者可先繼續往下看。

## Webpack 基本運作原理

由於網頁的任何資源存取都是非同步的，webpack 之所以可以用 commonJS 的模組機制來做開發，其實原理很簡單，就是我們在開發時，透過 CommonJS 的語法載入模組，之後在執行前先把所有的模組編譯成一包，而網頁再載入這一包 JS 資源即可；如此一來就不會有非同步的問題！

> 這樣的做法會有一個問題，就是編譯出來的那包js檔會非常大，而實際上 webpack 有提供 **區塊化** 技術來解決這個問題，可以參考我的另一篇文章 **webpack chunks**

## Webpack 的特色

其實在 Webpack 出來之前就有一個很紅的模組化工具，[Browserify](http://browserify.org/)，其運作的原理、使用的方式都與 Webpack 基本上一樣；Webpack 能以後起之秀超越前者，有極大的原因是在於他在設計上的構想，Webpack 希望所有的檔案都能夠成為 JS 的模組，例如 HTML(jade)、CSS(Sass, less)、圖檔...等靜態資源都能當作 JS 的模組載入，這使得他的衍生功能變得非常的強大！另一方面又能很好的整合其他工具，以及完整的最佳化解決方案，這幾個因素使她快速的竄紅！

![](/img/what-is-webpack_u1vbyt.png)

## Webpack 快速上手

### 安裝 webpack

在了解 Webpack 的作用後，我們直接來試著使用 Webpack 。（這裡假設讀者都已經會使用基本的 NPM 了）

我們先裝全域的 webpack ，方便我們之後練習。

```bash
npm install webpack -g
```

> 全域安裝會需要管理者權限，mac 請在前面加 sudo

### 第一次 webpack 編譯

接著我們來建立練習用的專案(webpack_demo)

```bash
mkdir webpack_demo
cd webpack_demo
npm init
npm install webpack --save-dev
```

完成後，我們在專案資料夾(webpacl_demo)下

**建立 entry.js**

```javascript
// entry.js
document.write("這是 entry 檔案");
```

**建立 index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>webpack demo</title>
</head>
<body>
    <script src="./bundle.js"></script>
</body>
</html>
```
![建立 entry.js 跟 index.html](/img/add_entry.png)

在 Command Line 執行 

```bash
webpack ./entry.js bundle.js
```

這時 webpack 會編譯你的檔案，並且建立一個 bundle.js 檔
如果成功編譯了會出現以下訊息

![webpack 編譯成功訊息](/img/webpack_success_build.png)

接著用 browser 打開 index.html 就會在畫面上看到以下訊息，就代表成功了！

![網頁成功畫面](/img/entry_success.png)

### 建立模組並載入

**建立 sum.js**

```javascript
// sum.js
module.exports = function(a, b) {
  return a + b;
}
```

這裡利用 CommonJS 的語法輸出一個 function ，這個 function 會回傳兩個數值的總和

**修改 entry.js**

```javascript
// entry.js
var sum = require('./sum.js');

var result = sum(2, 3);

document.write('sum(2,3) =>' + result);
```

這裡的 sum 變數就是我們在 sum.js 輸出的 function，可以直接拿來執行！

在 Command Line 再執行一次做編譯

```bash
webpack ./entry.js bundle.js
```

接著重整我們的網頁就會看到以下內容

![](/img/sum_result.png)

以上我們都是透過 CLI 來設定 webpack ，隨著我們的需求越來越複雜，我們會需要一個獨立的檔案來做這些設定。

### 使用設定檔做編譯

**加入 webpack.config.js (檔案名稱需完全一致)**

![webpack config 檔案](/img/webpack_config.png)

請在 webpack.config.js 寫以下的程式碼

```javascript
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  }
};
```

上面的程式碼很單純，首先透過 module.export 輸出一個物件，物件內至少要有 entry 跟 output 兩個屬性，entry 是我們程式碼的入口檔案，output 則是給一個物件包含路徑(`__dirname` 是 nodejs 的全域變數，會取得目前檔案的絕對路徑)以及檔名

> webpack 本身就是跑在 nodejs 上的，所以這個設定檔的程式碼就是在寫 nodejs 的 code

接著我們只要執行 `webpack` 就會自動讀取這個設定檔，並且完成編譯

### 從 npm 下載模組

我們除了可以用自己的模組之外，也能透過 npm 下載並直接使用

**下載 jQuery**

```bash
npm install jquery --save
```

**修改entry.js**

```javascript
// entry.js
var $ = require('jquery'); // 直接給模組名稱
var sum = require('./sum.js'); // 給相對路徑

var result = sum(2, 3);

$('body').append('sum(2,3) =>' + result + '(made by jQuery)');
```

一樣在執行一次 `webpack` ，並重新整理網頁，就能看到結果。

### 加入 Loader 

我們在文章的開頭就有提到 webpack 希望所有靜態檔案都能被當作 JavaScript 的模組，而要做到這樣的效果需要依靠的技術就是 Loader。

Loader 的運作原理非常的簡單，就是我們每次載入一個檔案時，會先通過特定的 Loader 做處理，轉成 JS 能讀取的資料，然後我們就能在 JS 中使用！

> Loader 就一個濾紙，幫我們把靜態檔案轉成我們想要的資源。

這裡我們用載入圖片做範例，讀者可以先下載這張[圖檔](https://webpack.github.io/assets/what-is-webpack.png)並把它放到專案資料夾下。

**安裝 loader**

```bash
npm install url-loader file-loader --save-dev
```

這裡我們會用到兩個模組，這兩個模組的作用我們最後再做解釋。

**修改entry.js**

```javascript
// entry.js
var $ = require('jquery'); // 直接給模組名稱
var sum = require('./sum.js'); // 給相對路徑
var webpackImage = require('url-loader!./what-is-webpack.png');

var result = sum(2, 3);

$('body').append('sum(2,3) =>' + result + '(made by jQuery)');
var img = new Image();
img.src = webpackImage;
$('body').append(img);
```

這裡可以看到我們載入了剛剛下載的圖檔，但在相對路徑前加上 `url-loader!` 代表這個資源會經過這個 loader，最後我們在底下生成一個新的 img DOM 物件，塞到 body。

這裡我們在執行一次  `webpack`，並重新整理網頁，可以看得到圖片有成功顯示，透過開發者工具可以發現圖檔被轉成 base64 的字串。

![成功顯示圖片](/img/url-loader_show_image.png)

雖然我們成功的顯示圖檔了，但把所有圖檔都轉成 base64 是不太合理的，因為 base64 會比原本的檔案大小再增加約 10%，通常是小圖呈現才會轉成 base64，以減少網頁的 request 成本。

而 url-loader 有提供一個參數，limit，讓我們來修改一下程式碼

**修改entry.js**

```javascript
// entry.js
// ... 
var webpackImage = require('url-loader?limit=10000!./what-is-webpack.png');
// ...
```

這裡我們在 url-loader 後面加上 ? 並且給 limit 參數10000，這代表當我的圖檔大於 10kb 的話就透過 file-loader 用相對路徑來載入，小於的話就用 url-loader 轉成 base64。

這時我們在執行一次 `webpack` 並重新整理網頁，會發現圖檔變成用相對路徑載入了！

![file-loader載入圖片](/img/file-loader_show_image.png)

到這裡我們已經成功使用 webpack 來載入圖片了，但我們如果每次載入圖片都要寫一次其實非常的麻煩且不好維護，所以我們通常會把 Loader 設定在 webpack.config.js 裡。

**修改 webpack.config.js**

```javascript
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { 
        test: /\.png$/, 
        loader: "url-loader?limit=10000" 
      }
    ]
  }
};
```

在 webpack.config.js 設定 Loader 必須寫在 module 物件底下的 loaders 陣列裡，loaders 陣列裡可以放多個物件，每個物件都是一個 Loader 設定。

這個物件裡面至少會有 test 及 loader 兩個屬性，test 屬性要給正則表示式，只要符合這個正則表示式的載入模組，就會經過這個設定的 loader。

以我們的範例來說，就是所有檔名結尾是 .png 的檔案就會通過 url-loader。

這樣一來我們在載入圖檔時就不用再寫一次！

**修改entry.js**

```javascript
// entry.js
// ... 
var webpackImage = require('./what-is-webpack.png');
// ...
```

一樣重新執行一次`webpack`並重新整理網頁，如果一樣有顯示就代表成功了！

## 後續

這次 Webpack for beginner 的文章就到這裡了，其實 webpack 的功能非常多，這篇文章只涵蓋了一些基本的應用。如果讀者想學習更多 webpack 的功能，可以期待我下一篇文章，Webpack for react project!