---
templateKey: series
series: Think In FP
title: "Think in FP (03): 我們的 Function 不一樣"
date: 2019-11-12T12:30:00.000Z
description: 在上一篇文章我們介紹了什麼是 Function，今天這篇文章想再跟大家釐清，我們平常用到的 Function 其實跟上一篇文章裡說的 Function 是不一樣的東西。
image: null
tags:
  - Functional Programming
  - FP
  - Function
  - Ramda
  - Immutable
---

> 我們上禮拜講了 All You Need Is Function，還沒看過的讀者可以先往這邊走 [Think in FP (02): All You Need Is Function](https://blog.jerry-hong.com/series/fp/think-in-fp-02/)

## 雖然都叫 Function 但不一樣

在 Pure Functional Programming Language 的世界裡，所有 Function 都是 Pure Function，不會也不能有任何**副作用 (Side Effect)**。但在 Imperative Languages (如 JavaScript)的世界裡 Function 幾乎不可避免地會有**副作用 (Side Effect)**，也因此雖然都叫 Function 但本質上是不一樣的。

從 FP 的角度來說，[Imperative languages](https://zh.wikipedia.org/zh-tw/%E6%8C%87%E4%BB%A4%E5%BC%8F%E7%B7%A8%E7%A8%8B) 裡的 Function 應該稱為 **[Procedure](https://zh.wikipedia.org/wiki/%E5%AD%90%E7%A8%8B%E5%BA%8F#%E7%A8%8B%E5%BA%8F)**，因為我們可以在 Function 裡做任何事而不是單純的運算返回值。

## 什麼是副作用(Side Effect)?

我們已經不只一次提到 Side Effect 這個詞，那究竟什麼是 Side Effect 呢？ Side Effect 是指在**運算的過程中，改變了系統狀態或是對外部世界進行交互**。

常見的 Side Effect 包括：
- 修改傳進來的參數
- 修改外部的狀態
- 發送 HTTP Request
- DB 查詢
- 印出 log
- 獲取 Input
- DOM 查詢
- 訪問系統狀態

上面只是列出了常見的 Side Effect，實務上有非常多的行為都是 Side Effect 而我們是列不完的，所以只要記得改變系統狀態或是跟真實世界產生交互就是 Side Effect。

Side Effect 是造成 Bug 的主要來源之一，所以我們應該要盡可能控制 Side Effect，讓他們存在於一個可控的範圍內。

> 讀者應該已經發覺平常我們撰寫的 Function 幾乎不可避免的都會包含上面的行為，所以才會說 Imperative Languages 裡的 Function 跟我們上一篇文章所說的 Function 是不同的。

## Imperative Languages 世界中的 Function

在 Imperative languages (如 JavaScript) 的世界裡，我們可以把 Function 簡單區分為：

- Pure Function: 只做運算跟回傳，沒有 side effect
- Impure Function:
    - 只有 Effect 沒有回傳值
    - 有回傳值，同時有 Side Effect

```javascript
// Pure function
const add = (x, y) => x + y; 
add(1, 2) // 3

// -- Impure function --
// 只有 Effect 沒有回傳值
const hello = () => {
  console.log('Hello World!');
}

// 有回傳值，同時有 Side Effect
let isRequesting = false;

const getData = () => {
  if (!isRequesting) {
    isRequesting = true;
    return fetch('url...')
  } 
}
```

儘管 JavaScript 世界中，我們無法完全避免掉 Side Effect，但我們可以透過一些手法來控管 Side Effect，讓 Side Effect 只作用在一定的範圍內，以確保我們的程式碼能順利運行！在我們學到如何處理 Side Effect 之前，先讓我們盡量避開這些具有 Side Effect 的 Function，並盡可能地保持 Function Pure。

## 保持 Function Pure 的第一步 - Immutable

所有講 Functional Programming 的文章或書籍都會提到 Immutable Data Structure，所謂的 immutable data 就是一旦建立後就不會再改變的資料，所有對於 immutable data 的操作都只是回傳一個新的 immutable data，但很可惜的是 JavaScript 原生的資料結構都是 mutable 的，如下

```javascript
var a = {
  name: 'Jerry',
  age: 18
};

var b = a;
b.age = 19;

console.log(a); // { name: 'Jerry', age: 19 }
console.log(a === b); // true
// 修改 b 的數據其實同時修改了 a
// `b.age = 19` 是一個 mutable 的操作
```

從上面這段程式碼可以看得出來，當我們今天使用 mutable 操作改變某個變數的資料時，同時可能造成別的變數也跟著變動，這也是 bug 最可能產生的來源之一。

那我們要如何讓 JS 的數據結構變成 immutable 的呢？大多數的文章會推薦大家使用 [immutable.js](https://github.com/immutable-js/immutable-js)，寫法會像下面這樣

```javascript
import { Map } from 'immutable'
const a = Map({ a: 1, b: 2, c: 3 });
const b = a.set('b', 50);

console.log(a.toJS()) // { a: 1, b: 2, c: 3 }
console.log(a === b) // false
// 修改了 b 不會影養 a
// map1.set('b', 50); 實際上只是回傳一個新的物件給 b 
```

像上面這段程式碼，我們對變數 `a` 的操作，實際上只是回傳了一個新的物件，原本的物件 `a` 是完全不受影響的，這就是 immutable data！

但這裡筆者不建議大家使用 immutable.js，主要原因是目前多數的 JS 套件都是吃原生物件，如果用了 immutable.js 就常常需要在原生物件及 immutable.js 的物件中轉換，這個過程會增加認知成本，常常需要判斷當前拿到的資料是原生物件還是 immtuble.js 的物件。

> 本系列文章核心的目標是希望提供讀者在前端開發實務上能夠利用 Functional Programming 的觀念來更輕鬆地維護程式，同時盡可能地避免額外的負擔，能夠同時享受 FP 帶來的好處也能舒適的開發！這也是為什麼主題訂做 Think in FP，而不是 Learn FP。

如果不使用 immutable.js 那我們又要如何確保資料是 immutable 的呢？答案是我們只使用 **immutable 的方式操作資料**

### 1. 使用原生 Immutable 的資料操作

```javascript
var a = {
  name: 'Jerry',
  age: 18
};

// ES6
var b = { ...a, age: 19 };
// ES5
// var b = Object.assign({}, a, { age: 19 });

console.log(a); // { name: 'Jerry', age: 18 }
console.log(a === b); // false
```

如上，JavaScript 仍然有提供一些 immutable 的資料操作方式，我們只要確保所有**對資料的操作是 immutable** 的就可以了！

### 2. 使用 Ramda 來操作複雜的資料

如果是較複雜的資料結構，可以改用 Ramda 的 `assocPath` 或是 `dissocPath` 來操作，例如

```javascript
import * as R from 'ramda';

var a = {
  name: 'Jerry',
  age: 18,
  job: {
    company: 'Branch8',
    title: 'RD'
  }
};

// 較複雜的資料結構用 spread operator 會有點麻煩
var b = {
  ...a,
  job: {
    ...a.job,
    title: 'Tech Lead',
  }
};

// 可以改用 Ramda 的 assocPath
var b = R.assocPath(['job', 'title'], 'Tech Lead', a);
```
[Demo](https://ramdajs.com/repl/?v=0.26.1#?var%20a%20%3D%20%7B%0A%09name%3A%20%27Jerry%27%2C%0A%20%20age%3A%2018%2C%0A%20%20job%3A%20%7B%0A%20%20%20%20company%3A%20%27Branch8%27%2C%0A%20%20%20%20title%3A%20%27RD%27%0A%20%20%7D%0A%7D%3B%0A%0Avar%20b%20%3D%20R.assocPath%28%5B%27job%27%2C%20%27title%27%5D%2C%20%27Tech%20Lead%27%2C%20a%29%3B%0A)

> Ramda 所有 function 對資料的操作都是 immutable 的，後面我們會介紹更多關於 Ramda 提供的 function，以及 Ramda 文件的查看方式！

### 3. 確保團隊不會使用 mutable 的方式操作資料

如果讀者已經習慣透過 immutable 的方式操作資料，那我們要如何在不導入 immutable.js 或相關 library 的前提下，確保團隊成員都不會使用 mutable 的方式操作資料呢？

**使用 ESLint**

我們可以把專案 ESLint 的設定加入 [eslint-plugin-immutable](https://github.com/jhusain/eslint-plugin-immutable)，並在 commit 時或是 CI 流程中檢查 ESLint 是否有 Error，就可以確保專案內不會有任何 mutable 的操作。

這裡建議設定以下幾個 rules

- [no-let](https://github.com/jhusain/eslint-plugin-immutable#no-let)
- [no-this](https://github.com/jhusain/eslint-plugin-immutable#no-this)
- [no-mutation](https://github.com/jhusain/eslint-plugin-immutable#no-mutation)
- [no-var](https://eslint.org/docs/rules/no-var)
- [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)

只要我們透過上面 3 個方式，就可以確保程式的資料都是 immutable 的操作，也不會再出現任何 function 修改外部的狀態或是修改外部傳入的參數了！儘管我們還無法完全避免 Side Effect 的出現但這樣做已經能大幅度降低程式的複雜度以及 Bug 出現的可能。

> 我們會在本系列的第 11 篇文章寫到，要如何把 Side Effect 集中起來管理，但在這之前我們需要先學會更多關於 Function 的知識。

## 小結

這篇文章講述了 FP 裡說的 Function 跟 JS 世界裡的 Function 是不一樣的東西，以及什麼是 Side Effect，最後介紹了什麼是 Immutable，以及如何確保資料的操作是 Immutable 的。下一篇文章我們講為什麼希望 Function 是 Pure 的，以及 Pure Funciton 帶來哪些好處！如果有任何疑問，歡迎在下方留言給我喔！