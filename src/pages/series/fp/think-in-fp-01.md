---
templateKey: series
series: Think In FP
title: "Think in FP (01): Why Functional Programming?"
date: 2019-10-21T18:05:00.000Z
description: 相信不少人應該都看過世界奇觀，當我們接手或開發一個無比龐大又極度不穩定的系統時，可能會發出這樣的感嘆。最常遇到的麻煩是，當我們修改 A 組件(Component) 時，我們已經確認所有使用 A 組件的地方也都跟著修改，但修改完後仍然造成 B、Ｃ 壞掉，當我們再去把 B、Ｃ 修好時，可能 D、Ｅ 又壞了。最後不得不把整個系統打掉重寫。
image: null
tags:
  - Functional Programming
  - FP
  - JavaScript
  - Haskell
  - Lisp
---

> 我們上禮拜講了 關於這個系列，還沒看過的讀者可以先往這邊走 [Think in FP (00): 關於本系列文章](https://blog.jerry-hong.com/series/fp/think-in-fp-00/)

## 糟了，是世界奇觀！

相信不少人應該都看過世界奇觀，當我們接手或開發一個無比龐大又極度不穩定的系統時，可能會發出這樣的感嘆。最常遇到的麻煩是，當我們修改 A 組件(Component) 時，我們已經確認所有使用 A 組件的地方也都跟著修改，但修改完後仍然造成 B、C 壞掉，當我們再去把 B、C 修好時，可能 D、E 又壞了。最後不得不把整個系統打掉重寫。

![](/img/terrible-world.gif)

### 系統難以維護的原因

什麼原因導致我們的系統會出現改 A 壞 B，改了 B 又壞 C 呢？理論上我們修改了 A，只要確保 A 組件輸入輸出是否有改動，如果有就去找到所有使用 A 的地方做對應的修改，就不會有錯了。但為什麼還是會出現沒被發現的 Bug？

最有可能的原因就是 A 組件是不 ***pure*** 的，它改動了外部的資料狀態，當你改了 A 的行為，可能同時影響到了外部資料狀態的改變，而 B 又相依於這個外部的狀態，導致 B 壞掉。

用 sample code 來表示的話大概是像下面這樣

```javascript
var state = {
  xxx: 1,
}

function A (x) {
  var s;
  // 省略 100 行...
  state.xxx = s;
  // 省略 100 行...

  return s;
}

function B (y) {
  var z;
  // 省略 100 行...
  z = ooo + state.xxx
  // 省略 100 行...

  return z;
}
// A 跟 B 沒有直接相關，B 也沒有使用到 A，但修改 A 時有可能會造成 B 壞掉。
```

如果用 Functional Programming 的寫法，我們會完全避免這種 Function 的產生，這會讓我們大大降低軟體系統的狀態複雜度，進而減少 Bug 也讓我們更輕鬆的除錯。

> Pure 是指一個 Function 只要傳入相同的參數就永遠會回傳相同的值，並且不會造成任何 Side Effect (如修改外部狀態)。我們之後的文章會更詳細的解釋 FP 相關的詞彙。

> Functional Programming 雖然不能完全避免 Bug，但可以讓我們減少不必要的複雜度，讓系統更好維護。

> [Out of the Tar Pit](http://curtclifton.net/papers/MoseleyMarks06a.pdf?fbclid=IwAR0gb8bUhNOewLehDjazJapgwIQAFaG6NEGiL_WWpLqXs1c8KaIKtJAZCiE) 這篇論文就在探討各種編程範式能不能降低軟體系統的複雜度，其中就有提到 FP 可以很好的避免因狀態所導致的複雜性問題。

## Functional Programming 的優勢

FP 究竟帶給我們什麼優勢，又為什麼 FP 會越來越流行呢？

### 低複雜度(Complexity)

如果上一段所述，FP 世界裡的 Function 不會有狀態，也不會直接存取或修改外部的狀態，只要同一個 Function 輸入相同的參數，就永遠會回傳相同的值。因此我們程式碼會變得更好維護，同時也開發的更快，不容易出現莫名的 Bug。

### 簡單(Simple)，也更容易(Easy)

FP 的世界裡只要學會 Function，不用再學各種 pattern，我們透過 Function 的組合以及好的命名，就能讓程式碼更可讀也更具有彈性。

![](/img/all-functions.png)

[Functional Programming Design Patterns](https://vimeo.com/113588389) 

> 在 [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy/) 演講中，就有提到簡單(simplicity)是可靠(reliability)的先決條件、簡單(simplicity)帶來的好處是：容易理解、容易改變、容易除錯和具有彈性。推薦大家去看這場演講。

### 程式碼簡潔

FP 使用大量的 Function，幾乎每個 Function 都可以由非常小的 Function 組合出來，減少程式碼的重複，因此 FP 的寫法通常程式碼較短。

在 2002 年，[Revenge of the Nerds](http://www.paulgraham.com/icad.html) 文中提到 ITA 的總裁說同樣的功能下 1 **行的 Lisp 可以取代 20 行的 C**。

> Lisp 是最早的 Functional Programing Language ，一開始 Lisp 只是打算拿來當作一種理論演算，並非要設計成程式語言 (Programming Language)，是後來無意中從純理論發展成為程式語言。

> Lisp 之所以可以 1 行程式碼取代 20 行的 C，並不是因為 Function 的組合及重用，大部分原因來自於 Lisp 語法更加的抽象，可以用簡單的語法來表達更多的事情。在本系列文章後半部分會再提到，是使用 Haskell 跟 TypeScript 比對來呈現。

> 在《人月神話》第八章有提到，選擇適合的高階程式語言 (相較於低階語言程式碼行數較少)，有助於提升軟體專案的開發速度，生產力可以提升到五倍。而筆者這裡認為 FP 能提升開發速度的原因不在於行數減少，而是降低了 Bug 產生的可能性，花更少的時間除錯。(在《人月神話》中推估測試與除錯要花整個專案開發時間的一半)

## 小結

今天講了我們為什麼需要 Functional Programming，以及 Functional Programming 所帶來的優勢。下一篇我們會開始講什麼是 Functional Programming！