---
templateKey: series
series: Think In FP
title: "Think in FP (04): 為什麼「純」？"
date: 2019-12-06T16:30:00.000Z
description: 在前幾篇文章中介紹了什麼是 Pure Function 以及保持 Function Pure 的第一步，今天要介紹為什麼我們推崇 Pure Function 以及 Pure Function 帶來了什麼好處！
image: /img/why-pure-function.png
tags:
  - Functional Programming
  - FP
  - Function
---


## 為什麼要 Pure Function？

![why pure function](/img/why-pure-function.png)

我們在前幾篇文章中已經提到 impure function 容易產生未知的 Bug，但我們都還沒深入地講述，為什麼要 Pure Function？

### 可預期 (確定性)
如 Think in FP (02) 所提，所有 Pure Function 的運作都是確定的，只要相同的輸入就能得到固定的輸出，不管執行幾次在什麼時間點執行都一樣，這奠定了 Pure Function 為我們帶來的各種好處！

![valid function mapping one to one](/img/fp_valid_function_set.png)

### 容易理解

如前面提到的 Pure Function 是可以預期，這讓我們可以更容易理解該 Function 的行為，相較於 Impure Function 可能會受外部環境影響，我們需要花更多時間去理解 Impure Function 的程式碼。

```javascript
let isModifying = false;

// x 是一個 impure function
function x() {
  // ...
  if (isModifying) {
    // 做某些事
  }

  // ...
}
```

如上面這段程式碼 `x` function 直接存取了外部變數，所以會受到環境影響。這讓我們單純從 `x` function 內部是無法得知它運作的行為，因為我們還需要知道 `x` 是在什麼時候被呼叫，以及 `isModifying` 有沒有被修改，在什麼時候被修改。這讓我們需要額外花許多時間才能理解整隻程式 (Context) 的運作方式。

### 可組合，可分割，可重用

因為 Pure Function 是可預期的，這讓我們可以組合各個小 Pure Function，變成一個大的 Function，也可以讓一個大的 Pure Function 切割成小的 Pure Function，而小的 Pure Function 就可以重複使用。

> 我們在 06 篇的文章會講解如何切割一個大的 Pure Function 以及如何把 Function 組合起來。

以上三點是 Pure Function 之所以重要的原因，同時也是讓 Pure Function 成為了 Functional Programming 核心的因素，整個 FP 基本上就是圍繞著 Pure Function 展開的！

## Pure Function 帶來什麼優勢？

除了上述提到的三點，Pure Function 同時帶來了其他額外的優勢，這些優勢會在某些的情境下發揮出來，幫助我們更輕鬆的面對要解決的問題！

### 更輕鬆的除錯 (Debug)

由於每個 Pure Function 都是可預期，不像 Impure Function 可能相依於某個外部變數，每次執行的結果可能不同，所以如果我們可以讓 Function 盡可能保持 Pure 的情況下，就可以很快速的找到 Bug 的來源，甚至會大幅降低 Bug 的出現。

### 更簡單的測試 (Test)

由於 Pure Function 是可預期的，這讓我們在做單元測試時會變得非常非常的容易，只要確認輸入跟輸出是符合預期的就可以了！

### 可快取 (Cache)

由於 Pure Function 的確定性，只要相同的輸入必定回得到相同的輸出，那我們要做 Memory Cache 就會非常的容易，只要透過一個 Object 或 Hash Map 把每次的輸入當作 key 返回值當作 value，並且在每次執行前先檢查輸入是否已經在該 Hash Map 裡，如果存在就直接取值返回，如果不存在再執行 Function。

一個簡單的實作如下
```javascript
let memoize = function(f) {
  let cache = {};

  return function(...args) {
    let key = JSON.stringify(args);
    cache[key] = cache[key] || f.apply(f, args);
    return cache[key];
  };
};

// ---- 使用方式 ----
const add = (x, y) => x + y;
const memoizeAdd = memoize(add);
memoizeAdd(1, 2) //3
```

### 可延遲運算 (Lazy Evaluation)

同樣的，由於 Pure Function 的確定性，不管在什麼時間點執行，只要相同的輸入就會得到相同的輸出，這使我們可以讓運算延遲也同時不會影響運算結果！而延遲運算可以幫助我們處理較大的數據，並在撰寫程式上更為容易。

> 可惜的是 JS 不像 Haskell 天生就有延遲運算的特性，對多數 JS 開發者而言不太能感受延遲運算所帶來的優勢，希望這個部分我們有機會在之後的章節講到！

### 可並行運算 (Parallelization)

最後也是最重要的一個優勢，就是我們可以並行的執行任何 Pure Function，因為 Pure Function 不會依賴外部狀態，也就是不需要共享記憶體，同時也不會有其他任何副作用，也因此不會有競爭危害  (race condition)的問題！

> 因為現代 CPU 核心數越來越多，可並行運算是現在必備的特性，也間接影響了新的語言多少都會用到 FP 的特性，尤其專門在做資料處理的語言尤為明顯。

## 小結

這篇文章介紹了為什麼我們推崇 Pure Function 以及 Pure Function 帶來哪些額外的優勢，Pure Function 是整個 Functional Programming 的核心，越到後面會發現我們其實都只是在運用 Function 這一個概念！這也是為什麼我們要花三篇文章在講解關於 Function 的理論基礎，這也是最後一篇了，下一篇讓我們進入實務的世界 - 一切從 Array 說起！