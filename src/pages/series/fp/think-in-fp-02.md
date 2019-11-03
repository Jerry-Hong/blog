---
templateKey: series
series: Think In FP
title: "Think in FP (02): All You Need Is Function"
date: 2019-10-12T18:05:00.000Z
description: 這篇文章介紹了什麼是 Functional Programming 以及在 FP 世界裡 Function 的定義，還有 Function 具有哪些特性，最後用集合抽象的來看 Function 所代表的意義，希望讀者們都能有所收穫。
image: null
tags:
  - Functional Programming
  - FP
  - JavaScript
---

> 雖然在寫 [30天精通 RxJS](https://blog.jerry-hong.com/series/rxjs) 時，已經[提到過 Functional Programming](https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-02/)，但那時對於 FP 的著墨甚少。這篇文章會更深入的說明 FP。

## Functional Programming 是什麼?

Functional Programming(FP) 是一種編程範式(programming paradigm)，FP 的核心思想就是透過 **Function** 來解決各種問題，並且所有的 **Function** 都是以「**數學函數**」為模型。在 Functional Programming 裡 Function 是有更明確的定義的：

「Functions 是一種表達式，她可以輸入參數，一但輸入參數後就可以**被簡化(reduced)**或是說**被運算(evaluated)**」

    add(1)(2) // 可以被簡化成 3

> 所有 Pure Functional Programming Language 都是由表達式（expression）所組成的，這跟其他大多數語言不同，大多數程式語言由表達式（expression）和語句（statement）組成。

> 最早的 Functional Programing Language 是 Lisp，一開始 Lisp 只是打算拿來當作一種理論演算，並非要設計成程式語言（Programming Language），後來無意中從純理論發展成為程式語言。

> 其實 Functional Programming Language 是由 Lambda Calculus 發展而來，FP Language 的基礎就是 Lambda Calculus，但這裡並不打算寫 Lambda Calculus，讀者可以先把 Lambda Calculus 當作 Function 的另一種表達形式就可以了。

## Function

### 一等公民 (First-Class)

在 Functional Programming 的世界裡 Function 是**一等公民(first-class)**，所謂的**一等公民**指的是 Function 跟其他資料型別是具有相同的地位，也就是說 Function 可以當作一個 Function 的參數，也可以被當作一個 Function 的回傳值，也可以賦值給變數或是存在資料結構中。

    function request(onSuccess) { // onSuccess 是一個 function 被當作參數傳給 request
      // ...
      // onSuccess(data) 
    }
    
    function add (x) {
      return function (y) { // function 被當作 add 的回傳值
        return x + y;
      }
    }
    
    const hello = () => 'hello world!'; // function 當作 value 賦值給 hello 變數

> 一個程式語言要支援 Functional Programming，最少要符合 Function 是一等公民這個條件，才有辦法用 FP 的手法來撰寫程式。

### 引用透明 (Referential Transparency)

在 Functional Programming 的世界裡 Function 是**引用透明(Referential Transparency)**的，點單來說引用透明指的是同一個 funciton 傳入相同的參數，永遠會得到相同的回傳值，也就是說只要有相同的輸入，那輸出就一定是可預測的。

    const add = x => y => x + y;
    
    add(1)(2);
    add(1)(2); 
    // add 不管執行幾次，只要傳入的參數相同，永遠都會拿到相同的回傳值，

### 抽象的來看 Function

如果抽象的來看 Function，其實 Function 就是把**一群可能的參數（集合）轉換成一群輸出（集合）**舉例來說

$$$
f(1) = A
$$$

$$$
f(2) = B
$$$

$$$
f(3) = C
$$$

其實就是 `{ 1, 2, 3 }` 的集合透過 function f 轉換成了 `{ A, B, C }` 的集合，其中的重點在於當我們今天傳給 function f `1`  的時候，function f 永遠都會回傳 `A`！

相對的，下面這個 function 就不符合 Functional Programming 定義的 function 了

$$$
f(1) = A
$$$

$$$
f(1) = B
$$$

$$$
f(2) = C
$$$

因為同樣的 f function 傳入 `1` 但回傳值確有時候是 `A` 也有時是 `B` ，這就是不可預測且不合法的 Function。如果是不同的輸入相同的輸出，則是合法的，如下

$$$
f(1) = A
$$$

$$$
f(2) = Ａ
$$$

$$$
f(3) = A
$$$

這裡 f 不管是傳入 `1`、`2` 還是 `3` 都會回傳 A，這是合法的，我們只要確保如果傳入相同的參數，永遠會回傳相同的值。

用圖形來理解的話就像下面這樣

![valid function mapping one to one](/img/valid-function-set.png)

![invalid function mapping two to one](/img/invalid-function-set.png)

![valid function mapping three to one](/img/valid-function-set-2.png)

## 小結

這篇文章介紹了什麼是 Functional Programming 以及在 FP 世界裡 Function 的定義，還有 Function 具有哪些特性，最後用集合抽象的來看 Function 所代表的意義，希望讀者們都能有所收穫。
