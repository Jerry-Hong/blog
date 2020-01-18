---
templateKey: series
series: Think In FP
title: 'Think in FP (05): 一切從 Array 說起'
date: 2019-12-16T16:30:00.000Z
description: Array 是一種我們經常使用的資料格式，不管用什麼程式語言，都一定會碰觸到 array。但過去我們剛開始學習寫程式的時候，通常都是用 imperative 的方式在學習如何撰寫程式，讓我們很少有機會去更深入的認識 array 。
tags:
  - Functional Programming
  - FP
  - Function
  - Array
---

## Imperative 的世界

過去我們在學程式的時候，只要學到 array 基本上就會跟著 for...loop 一起學，使用起來就像是下面這樣

```js
const arr = [1, 2, 3];

for (let i = 0; i < arr.length; i++) {
  // do something...
}
```

`for (let i = 0;i < arr.length;i++)` 似乎變成了一個公式一直跟著我們，每當我們需要操作 array 時，就會使用 for (或 while) 迴圈。舉一個例子，假如我們有一組任務資料，如下

```js
var taskArray = [
  {
    id: 1,
    userId: 1,
    userName: 'Jerry',
    complete: false,
    title: 'Write 《Think in FP》 serise article',
    content: '...',
    dueDate: '2020-05-31',
    priority: 0,
  },
  ...
];
```

這時候如果我們想過濾出已經完成的資料，就會寫成這樣

```js
const result = [];
for (let i = 0; i < taskArray.length; i++) {
  if (taskArray[i].complete) {
    result.push(taskArray[i]);
  }
}
```

完成後，因為需要在不同地方使用到同樣的邏輯，這時我們就會想把他包成一個 function，如下

```js
function filterTaskArray(taskArray) {
  const result = [];
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].complete) {
      result.push(taskArray[i]);
    }
  }
  return result;
}
```

但過沒多久，可能有其中一個使用到 `filterTaskArray` 的邏輯會變成，除了要濾出 complete 的 task 之外，還需要過濾出某個特定的 userId，有可能就會變成下面這樣

```js
function filterTaskArray(taskArray, { filterComplete = false, filterUserId = undefined } = {}) {
  const result = [];
  for (let i = 0; i < taskArray.length; i++) {
    if (
      (filterComplete && !taskArray[i].complete) ||
      (filterUserId != null && taskArray[i].userId !== filterUserId)
    ) {
      continue;
    }
    result.push(taskArray[i]);
  }
  return result;
}
```

`filterTaskArray` 使用方式變成

```js
const taskArray = [...];
const result = filterTaskArray(taskArray, {
  filterComplete: true,
  filterUserId: 1
});
```

到這裡程式碼已經變得有點複雜了，看 `filterTaskArray` 內部的實作可能都還要想一下，如果這時候我們希望可以過濾某個日期之後的 task 那就會變成

```js{4,11}
function filterTaskArray(
  taskArray,
  { filterComplete = false, filterUserId = null, filterDueDate = null } = {}
) {
  const result = [];
  for (let i = 0; i < taskArray.length; i++) {
    if (
      (filterComplete && !taskArray[i].complete) ||
      (filterUserId != null && taskArray[i].userId !== filterUserId) ||
      (filterDueDate != null && taskArray[i].dueDate <= filterDueDate)
    ) {
      continue;
    }
    result.push(taskArray[i]);
  }
  return result;
}
```

寫到這裡應該大家就會發現，這樣的抽象是非常糟糕的，除了 `filterTaskArray` 整個實作非常複雜之外，過濾的條件也幾乎有無限種可能，每當有新的過濾條件就必須修改一次 `filterTaskArray`，使維護成本變得非常高，而且當條件越多時 API 介面就會越複雜，對使用這個 function 的人來說，也很難使用！

## 抽象最小化

當我們把一段程式碼包成一個 function 時，其實就是在作抽象化，如果抽象化的不好就會讓這個 function 極難維護，也會讓使用的人不知如何使用。如果想要做一個好的抽象，那我們應該讓每次的抽象都盡可能的「**小**」，並且把不必要的邏輯交給外部的使用者決定！

以前面的例子來說，當我們希望一個 function 可以過濾出一個 array 某些特定的元素時，我們需要抽象的只有一件事情就是**過濾 Array**，至於是過濾什麼條件就應該由外部的使用者決定！用原本的程式碼表示，如下

```js{1,4}
function filterTaskArray(taskArray) { // 只過濾 array，所以不應該限定是什麼 array
  const result = [];
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].complete) { // 條件應該由外部決定
      result.push(taskArray[i]);
    }
  }
  return result;
}
```

在 FP 的世界裡，要把部分邏輯交由外部的使用者決定是很簡單的，我們只要要求使用者傳一個 function 進來，並預期這個 function 會回傳某種值就可以了，以這裡來說就是 Boolean 值。

```js{1,4}
function filter(array, fn) { // function 改名為 filter，參數改名為 array
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) { // 傳 array[i] 進去，並預期 fn(array[i]) 會回傳 Boolean。
      result.push(array[i]);
    }
  }
  return result;
}
```

首先我們把 function name 改成 `filter` 參數名稱改為 `array` 並另外傳入一個 fn，再把原本的條件改成 `fn(array[i])` 如此一來就可以讓使用的人決定什麼條件下要過濾掉，使用方式變成下面這樣

```js
const taskArray = [...];
const result = filter(taskArray, item => item.complete && item.userId = 1)
```

使用 `filter` 的人只要傳一個 array，以及一個 function 進來，這個 function 可以拿到 array 的元素並回傳一個 Boolean 值，如果 Boolean 值為 `true` 時，該元素就會留在新的 array 內，如果為 `false` 就會被過濾掉。這樣一來我們就成功讓這個 function 的抽象只做過濾 array 一件事情，並把過濾的條件交由外部使用者決定了！

大家應該會發現，當我們把抽象最小化之後得到的 funtion 其實彈性是非常大的，只要是 array 都可以使用，並且邏輯可以交由使用的人依據情況決定，也幾乎不再需要再修改這個 function！

> 這裡用到了 Function 是一等公民(first-class)的觀念，如果忘記什麼是一等公民的讀者，可以去參考 Think in FP 01 篇。

> 其實這樣的抽象化手法很常見喔！在 React 跟 Vue 相關的 Library 都能看到，大家知道叫什麼嗎？

> 這樣抽象化的方式，在 OOP 的世界裡稱作 **反轉控制(Inversion of control)**，只是 OOP 不只需要抽象**邏輯**同時還需要抽象**類別之間的依賴**，所以通常會跟 **介面(Interface)** 以及 **相依性注入(DI, Dependency injection)** 一起。相較之下，FP 就只需要知道把 function 當作參數就行了。

## Array 的定式

因為 array 是我們最常操作的資料格式，所以這種極小抽象化的 function 其實大多數語言都有內建，這裡我們舉幾個常用的方法。

### map

map 可以替換 array 的元素，最後得到一個新的 array，如下

```js
const arr = [1, 2, 3];
const result = arr.map(x => x + 1); // [2, 3, 4]
```

### filter

filter 可以過濾 array 內的元素，需要傳一個 function 這個 function 要返回 boolean，如下

```js
const arr = [1, 2, 3];
const result = arr.filter(x => x % 2 === 0); // [2]
```

### reduce

reduce 可以將陣列化為單一值，第一個參數是一個 function 會傳入目前的狀態以及 array 中的元素並返回下一個狀態，第二的參數是初始狀態。

```js
const arr = [1, 2, 3];
const result = arr.reduce((acc, current) => acc + current, 0); // 6
// 0 是初始值，acc 是每次回傳的累計值，current 是 array 中的元素。
```

> 其實 Array 的任何操作都可以用 reduce 來完成，比如說可以用 reduce 來做 map, filter, find... 做的事情，但建議大家盡可能使用 filter, map, find... 等等，不要任何操作都用 reduce 做喔。

> reduce 可以做到任何 Array 的操作，讀者們會好奇 reduce 是怎麼抽象來的嗎？可以關注我後續的文章喔！

其他還有包括 forEach, find, includes, flat, flatMap... 等，記得這些方法都是 immutable 的操作資料

```js
const arr = [1, 2, 3];
const result = arr.map(x => x + 1); // [2, 3, 4]
// arr 還是 [1, 2, 3]
```

有一些 JS 原生的 array 方法是 mutable 的，要**盡量避免使用**，我把它全部列在這裡

- push
- pop
- reverse
- shift
- sort
- splice
- unshift
- unwatch (非標準)
- watch (非標準)
- copyWithin

以上這些方法是 mutable 的操作資料，可以用其他 immutable 的方法替代

```js
const arr = [1, 2, 3];
// ES5
const arr2 = arr.concat(4); // 取代 push
const arr3 = [0].concat(arr); // 取代 unshift
// ES6
const arr4 = [0, ...arr, 4]; // 取代 push 跟 unshift
const [head, ...rest] = arr; // 取代 shift
const { [arr.length - 1]: last  } = arr; // 取代 pop
```

也可以限制 mutation 的操作在一個 function 內，如下

```js
const safeSort = (arr, fn) => {
  // ES5 的寫法： `var clone = arr.concat()`
  const clone = [...arr]; // 複製一份，避免 arr 被修改到
  clone.sort(fn);
  return clone;
};
```

這樣一來我們就可以避免掉 mutable 的操作了。只要夠熟悉 array 的 map, filter, find, reduce... 等內建的方法，就基本上不會再用到 for loop 了，除非是非常複雜的算法要做極致的效能優化，才有機會使用 for loop！

> 讀者可以試試看 array 的 slice 究竟是 mutable 的操作還是 immutable 的操作呢？歡迎在下面留言跟我說喔。

## 練習

最後讓我們來用最近剛釋出的 [Advent of Code 2019 Day 1](https://adventofcode.com/2019/day/1) 當作練習吧

Day 1 的題目是我們會有一組數字，如下

```js
const data = [
  129561,
  125433,
  97919,
  // ...
];
```

我們要對每個數字先**除以 3** 並**無條件捨去至個位數**然後再**減 2**，最後把每個數字做**加總**。如果用 imperative code 撰寫的話，大概就會像下面這樣

```js
function calFuel(data) {
  let result = 0;

  for (let i = 0; i < data.length; i++) {
    const ans = Math.floor(data[i] / 3) - 2;
    result = result + ans;
  }

  return result;
}
```

如果用 FP 的方式撰寫，可以把題目給的每個要求都列出來

1. 除以 3
2. 無條件捨去至個位數
3. 減 2
4. 對每個數字加總

```js
const result = data
  .map(x => x / 3) // 除以 3
  .map(Math.floor) // 無條件捨去
  .map(x => x - 2) // 減 2
  .reduce((x, y) => x + y); // 加總
```

大家會發現我們的程式碼寫起來非常的簡潔，甚至還可以把 3 個 map 合併成 1 個，程式碼不但簡短而且可讀性也很高！

## 小結

這篇文章是我們進入實務的一篇，我們從 array 的操作講解 function 在做抽象化時的基本手法，並介紹了一些 array 原生提供的方法，最後用 FP 的方式來解題！但這一切仍然不夠好，原因是我們還沒有辦法把這些小 function 組合起來，也有太多不必要的變數命名，讓我們期待下一篇文章 - Think in FP (06): 解放 Function - Curry！
