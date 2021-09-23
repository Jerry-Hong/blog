---
templateKey: speaking
slug: from-fp-to-2021-typescript
title: 從 Functional Programming 的角度看 2021 的 TypeScript
image: /img/from-fp-to-2021-typescript.png
event: F2E&RGBA Meetup
time: 50 mins
date: 2021-09-23T00:19:50.133Z
description: >-
  如今的 Typescript 相較剛出來時已經熟成許多，現在是否真的值得在開發上使用 Typescript？從 Functional Programming 的角度來說 Typescript 有什麼缺陷？使用 Typescript 需要注意哪些問題？使用 Typescript 能帶來什麼優勢？什麼情況下適合導入 Typescript？
tags:
  - FP
  - Functional Programming
  - TypeScript
---

## Slide 

<iframe class="speakerdeck-iframe" frameborder="0" title="從 Functional Programming 的角度看 2021 的 TypeScript" width="560" height="315" src="//speakerdeck.com/player/d6cfb56b0cc54d27a29922d8b7969700"   frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Q&A 補充

Q1. 想問定義 Object 的型別時，何時用 `type`、何時用 `interface`？如何決定用何者？

以 code readability 來說，建議統一用 type
以 type check performance 的角度來說，[建議用 interface](https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections)
講者自己本身統一用 `type` 來定義

Q2. 不寫 function 的單元測試，以 type 代替測試是可行的嗎？這樣的做法推薦嗎？

不行，絕大多數 Strong type 的語言，Type 最多只能做到 Type Safe 不能保證程式的邏輯正確，除非語言本身有提供足夠強的 dependent type，把商業邏輯都定義在 Type 裡，才能做到不寫 unit test，像是 [Idris](https://www.idris-lang.org/)

Q3. 若因一些歷史包袱，目前工作專案存有為數不少的 any type，在重構、移除 any type 的時候，有什麼具體的建議嗎？

必須先足夠熟悉專案，對專案的功能都有一定的了解，知道需要定義哪些 Types 後，再把 `any` type 改成 `unknown` type 並足一把 Type Error 清掉。

Q4. 突然想到 async await 裡的 try catch 的  error clause 是 any

可以用 fp-ts 的 Either，讓 Promise 永遠都回傳 Either type，拿到 Either 後判斷是 `Right` 還是 `Left` 來拿到 data 或是 error， sample code 如下

```ts
import { Either, isRight, left, right } from 'fp-ts/Either';

type CreateUser = (input: UserInput) => Promise<Either<Error, User>>
const createUser: CreateUser = (input) => {
  // ...
  return User.create({ data: input })
  .then(res => right(res))
  .catch(error => {
    // change to your custom error
    console.error(error);
    return left(error)
  })
}
```