---
templateKey: series
series: Think In FP
title: "Think in FP (00): 關於本系列文章"
date: 2019-10-12T18:05:00.000Z
description: 今年Modern Web 2019 演講結束時，有多位聽眾來問我要怎麼開始在專案中實際應用 Functional Programming？有沒有什麼相關的學習資源？當下我才意識到，其實目前關於 Functional Programming 的中文學習資源還是不夠充足的，所以希望可以透過這個系列的文章讓大家可以更輕鬆地上手 Functional Programming。
image: null
tags:
  - Functional Programming
  - FP
  - JavaScript
  - Rmada
---
## 前言

自從去年 2018 換了工作後，已經有一段時間沒有對外分享技術跟文章了。雖然這段時間對於技術的收穫頗豐，但一直沒有時間靜下心來整理。直到今年去 [Modern Web](https://modernweb.tw/) 分享了 [Abstract Thinking](https://blog.jerry-hong.com/speaking/abstract-thinking-from-fp/) 才重新回到技術社群。希望藉由這次的演講，能夠重新整理自己過去還沒機會分享的主題。

## 為什麼寫 [Functional Programming](https://en.wikipedia.org/wiki/Functional_programming) ?

今年[Modern Web 2019 演講](https://blog.jerry-hong.com/speaking/abstract-thinking-from-fp/)結束時，有許多聽眾來問我要怎麼開始在專案中實際應用 Functional Programming？有沒有什麼相關的學習資源？當下我才意識到，其實目前關於 Functional Programming 的中文學習資源仍是不夠充足的，所以希望可以透過這個系列的文章讓大家可以更輕鬆地上手 Functional Programming。

### Funtional Programming 崛起

Functional Programming(FP) 從 [Lisp](https://zh.wikipedia.org/zh-tw/LISP) 開始算起也將近 60 幾年了，但直到近 10 幾年來才越來越受到重視，不但新的 Functional Programming Languages（如 [Clojure](https://clojure.org/), [Elm](https://elm-lang.org/), [Elixir](https://elixir-lang.org)）不斷的出現。主流的語言（如 [JavaScript](https://zh.wikipedia.org/zh-tw/JavaScript), [Python](https://www.python.org/), [Swift](https://developer.apple.com/swift/)）也都具備支援 FP 的特性，連老牌語言如 Java, PHP 也都相繼加入支持 FP 的語言特性。FP 的思想不只是影響程式語言設計上，軟體架構也都受到了 FP 的影響， 例如 Google 提出的 [MapReduce](https://zh.wikipedia.org/zh-tw/MapReduce) 用來處理大量資料的並行運算。如今 Functional Programming 的重要性已經不言可喻，幾乎可以說是軟體工程師必備的知識。

### 跨領域語言

如同前面所述，目前所有主流語言對於 FP 都有很強的支援，學習 FP 的觀念對於學習不同領域的語言會有很大的幫助，尤其是理解特別抽象的觀念後，上手一門新語言的成本會大大的降低！

### 抽象化思維

其實 FP 對筆者最大的影響不在於撰寫程式上，而是一種思維上的轉變。 FP 所帶來的啟示遠不只於程式語言也不止於工作，因為在學習 FP 時，我們所學的是一種抽象化的方式，這種抽象化的方式會幫助我們更好地理解這個世界，並幫助我們面對人中不同的課題！

> 系列文的最後會有一篇文章，寫關於「程式與人生」，希望對大家會有所幫助。

## 目標

這個系列的文章會以 [JavaScript](https://zh.wikipedia.org/zh-tw/JavaScript) 為主要的語言，在講解一些較為抽象的觀念時，會視情況使用基本的 [Haskell](https://www.haskell.org/) 語法。希望這個系列的文章可以盡可能地涵蓋 FP 在 JavaScript 中的應用，並且能用淺顯的語言解釋各種 FP 的觀念，以及抽象化的手法。讓讀者可以用最低的成本入門 Functional Programming，並實際應用在工作上！

## 大綱規劃

- 基本觀念：FP 的基礎觀念，及前置知識等。
- 實務應用：FP 在 JavaScript 實務上的應用。
- Types 與 Data Type：FP 的 Type Signature 以及 Data Type。
- 後記：寫一些關於思想及人生觀的影響。

## 問題與討論

如果讀者對於文章內容有任何疑問或是建議，可以直接在留言區留言給我，我會看每一則留言！