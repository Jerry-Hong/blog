---
templateKey: blog-post
slug: xstate-tutorials-state-machine
title: XState 新手教學 - Finite State Machine
image: "../../../static/img/state-machine.001.png"
date: 2019-12-08T15:30:00.000Z
description: >-
  我們上一篇文章介紹了什麼是 XState 以及為什麼推薦使用 XState，接下來幾篇文章會講解 XState 基本用法，希望能幫助大家快速地上手 XState！
tags:
  - XState
  - State Management
  - State Machine
  - React
  - Angular
  - Vue
---

![state machine image](/img/state-machine.001.png)

如果還不知道什麼是 XState 的讀者可以先看上一篇文章 [XState 簡介](/posts/xstate-introduction)。如果想要開始上手 XState 的讀者，那一定要先知道是什麼**有限狀態機**！

## [有限狀態機 (Finite State Machine)](https://zh.wikipedia.org/zh-tw/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)

有限狀態機 (Finite State Machine, FSM) 是一種數學模型用來描述系統的行為，這個系統在**任何時間點**上都只會存在於**一個狀態**。舉例來說，紅綠燈就有 `紅燈`、`綠燈`、`黃燈`  三種狀態，在任何時間點上一定是這三種狀態的其中一種，不可能在一個時間點上存在兩種或兩種以上的狀態。

一個正式的**有限狀態機**包含五個部分

- 有限數量的**狀態** (state)
- 有限數量的**事件** (event)
- 一個**初始狀態** (initial state)
- 一個**轉換函式** (transition function)，傳入當前的狀態及事件時會返回下一個狀態
- 具有 0 至 n 個**最終狀態** (final state)

需要強調的是這裡的 **狀態 (State)** 指的是系統定性的 mode 或 status，並不是指系統內所有的資料。舉例來說，水有 4 種**狀態 (State)－固態、液態、氣態** 以及**等離子態**，這就屬於狀態，但水的溫度是可變的定量且無限的可能就不屬於狀態！

只要能夠理解 FSM 的組成，接下來我們就可以進入到 XState 來撰寫程式碼了！

> 上一篇文章講到的 Statescharts 就是 FST 的擴展，這些核心的內容是完全一樣的，我們下一篇會繼續講 Statecharts 擴展了哪些功能。

## 建立第一個 [Machine](https://xstate.js.org/docs/guides/machines.html#machines)

XState 的 Machine 其實就是一個 State Machine (精確地說是 Statechart)，所以我們在建立一個 Machine 要先整理我們的程式有哪些狀態，哪些事件，以及初始狀態。

讓我們來看一個紅綠燈的例子吧！

```js
import { Machine } from 'xstate'

const lightMachine = Machine({
  states: {
    red: {},
    green: {},
    yellow: {},
  }
});
```

首先我們需要訂定 Machine 會有哪些**狀態**，傳給 Machine 一個 object 內部必須有 `states` 這個屬性，而 `states` object 的每個 key 就是這個 Machine 擁有的**狀態。**所以這段程式碼代表這個 Machine 擁有 `red` , `green` , `yellow` 三種狀態。

```javascript{5-7}
import { Machine } from 'xstate'

const lightMachine = Machine({
  states: {
    red: {},
    green: {},
    yellow: {},
  }
});
```

接下來我們要定義**初始狀態**，假如說我們希望一開始是紅燈，那就給 `initial` 如下

```js{4}
import { Machine } from 'xstate'

const lightMachine = Machine({
  initial: 'red', 
  states: {
    red: {},
    green: {},
    yellow: {},
  }
});
```

`initial` 給 `'red'` 這樣我們的 lightMachine 的初始狀態就會是 `red`。接下來我們要定義每個狀態下會有什麼**事件**，遇到這些**事件**時，會轉換成什麼狀態。這裡我們訂定三個狀態下都會有 `CLICK` 事件，並且狀態的轉換是 `red -> green -> yellow -> red ...` 那我們的程式碼就會像下這面這樣

```js{8,13,18}
import { Machine } from 'xstate'

const lightMachine = Machine({
  initial: 'red', 
  states: {
    red: {
      on: {
        CLICK: 'green',
      }
    },
    green: {
      on: {
        CLICK: 'yellow',
      }
    },
    yellow: {
      on: {
        CLICK: 'red',
      }
    },
  }
});
```

我們在每個**狀態**下加入 `on` 屬性， `on` 的 key 代表事件名稱，value 則代表轉移的下一個狀態。

這時候我們就可以拿 `lightMachine` 來使用了！透過 `.transition(state, event)` 這個方法來取得下一個狀態

```js
import { Machine } from 'xstate'

const lightMachine = Machine({
  //...
});

const state0 = lightMachine.initialState;
console.log(state0);
const state1 = lightMachine.transition(state0, 'CLICK');
console.log(state1);
const state2 = lightMachine.transition(state1, 'CLICK');
console.log(state2);
const state3 = lightMachine.transition(state2, 'CLICK');
console.log(state3);
```

這個回傳的 state object 有兩個常用的方法及屬性分別是

- value
- matches(parentStateValue)
- nextEvents

value 可以拿到當前的狀態，matches 則可以用來判斷現在是否在某個狀態，比如說

```js
import { Machine } from 'xstate'

const lightMachine = Machine({
  //...
});

const state0 = lightMachine.initialState;
console.log(state0.value) // 'red'
const state1 = lightMachine.transition(state0, 'CLICK');
console.log(state1.value) // 'green'

state0.matches('red') // true
state0.matches('yellow') // false
state0.matches('green') // false
```

nextEvents 則可以拿到該 state 有哪些 events 可以使用

```js
import { Machine } from 'xstate'

const lightMachine = Machine({
  //...
});

const state0 = lightMachine.initialState;
console.log(state0.nextEvents) // 'CLICK'
```

最後，把程式碼放到 XState Visualizer 上就會長相這樣

<iframe frameborder="0" height="300" src="https://xstate.js.org/viz/?gist=3f050a91cd0fad00c004ec165bb20554&embed=1"></iframe>

這樣一來我們就完成了一個簡單的 Machine，但我們的 `lightMachine` 每次都要傳入當前的 state 跟 event 才能做狀態轉換，這是為了讓 `transition` 保持是一個 Pure Function，它不會改變 `lightMachine` 物件的狀態，方便我們做單元測試。但我們通常不想要自己儲存及管理狀態，所以 XState 提供了 Interpret！

> 如果不知道什麼是 Pure Function 的讀者，建議看一下 [Think in FP (03): 我們的 Function 不一樣](/series/fp/think-in-fp-03)

## Interpret

XState 提供了一個叫 `interpret` 的 function 可以把一個 machine 實例轉換成一個具有狀態的 service，如下

```js{6-16}
import { Machine, interpret } from 'xstate'

const lightMachine = Machine({
  //...
});

const service = interpret(lightMachine);

// 啟動 service
service.start();

// Send events
service.send('CLICK');

// 停止 service 當你不在使用它
service.stop();
```

interpret 得到的 service 具有自己的狀態，當 `start()` 後，這個 service 就會到**初始狀態**，同時可以對他傳送(send)**事件**，同時也可以透過 `service.state` 拿到當前的**狀態**，如下

```js{12-14}
import { Machine, interpret } from 'xstate'

const lightMachine = Machine({
  //...
});

const service = interpret(lightMachine);

// 啟動 service
service.start();

console.log(service.state.value); // 'red'
service.send('CLICK'); // Send events
console.log(service.state.value); // 'green'

// 停止 service 當你不在使用它
service.stop();
```

這樣一來我們就可以很簡單的透過 service 來管理及保存當前的狀態！

> XState 4.7 之後，一個 service start 後，其實是一個 subscribable 的物件，可以搭配 Observable 相關的 library 互相操作，比如說可以透過 rxjs 的 from 把 start 後的 service 轉乘 rxjs 的 observable！如果對 Observable 有興趣的讀者可以參考本站的 [30 天精通 RxJS 系列文](/series/rxjs)。

## 實作紅綠燈

這裡我們使用 React 當作 UI Library 來實作，需求是畫面上會有一個 Button 以及一個圓點，點擊 Button 以後圓點的顏色會改變，顏色改變順序為 紅 → 綠 → 黃 → 紅... 不斷接續。

> 這裡也提供 [Vue 版本](https://codesandbox.io/s/vue-xstate-1-f11ox)以及 [Angular 版本](https://codesandbox.io/s/angular-xstate-1-3c6l3)的實作。

首先讓我們建立好 Machine，筆者習慣會先把一個 Machine 會用到的 States 跟 Events 都用獨立寫出來，如下

```js
const LIGHT_STATES = {
  RED: 'RED',
  GREEN: 'green',
  YELLOW: 'yellow'
};

const LIGHT_EVENTS = {
  CLICK: 'CLICK',
};
```

再定義 lightMachine

```js
import { useMachine } from '@xstate/react';

const LIGHT_STATES = {
  RED: 'RED',
  GREEN: 'GREEN',
  YELLOW: 'YELLOW'
};

const LIGHT_EVENTS = {
  CLICK: 'CLICK',
};

const lightMachine = Machine({
  initial: LIGHT_STATES.RED,
  states: {
    [LIGHT_STATES.RED]: {
      on: {
        [LIGHT_EVENTS.CLICK]: LIGHT_STATES.GREEN,
      },
    },
    [LIGHT_STATES.GREEN]: {
      on: {
        [LIGHT_EVENTS.CLICK]: LIGHT_STATES.YELLOW,
      },
    },
    [LIGHT_STATES.YELLOW]: {
      on: {
        [LIGHT_EVENTS.CLICK]: LIGHT_STATES.RED,
      },
    },
  },
});
```

接著完成 React 的部分

```js
import React from 'react';
import { useMachine } from '@xstate/react';

function App() {
  const [state, send] = useMachine(lightMachine);
  return (
    //...
  );
}
```

React 的部分我們使用了 XState 官方提供的 `@xstate/react` Library，這裡用到的 `useMachine` 其實就是用了前面提到的 `interpret` 它已經幫我們產生好 service 並會回傳 `[state, send, service]` 。

```js
import React from 'react';
import { useMachine } from '@xstate/react';

function App() {
  const [state, send] = useMachine(lightMachine);
  return (
    <div className="App">
      {state.matches(LIGHT_STATES.RED) && <RedLight />}
      {state.matches(LIGHT_STATES.GREEN) && <GreenLight />}
      {state.matches(LIGHT_STATES.YELLOW) && <YellowLight />}
      <button
        onClick={() => {
          send(LIGHT_EVENTS.CLICK);
        }}
      >
        click me
      </button>
    </div>
  );
}
```

最後 return 時只要透過 `state.matches` 決定要顯示哪個狀態的畫面，並且在 button onClick 時傳送 `LIGHT_EVENTS.CLICK` 事件就可以囉 👍

完整的範例程式碼在[這裡](https://codesandbox.io/s/frosty-darkness-ipsft)

<iframe
  src="https://codesandbox.io/embed/frosty-darkness-ipsft?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
  style="border:0; border-radius: 4px; overflow:hidden;"
  title="react-xstate-example-1"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

## 自我練習

做一個互動按鈕，初始狀態為空心的讚，點擊後會秀出實心的讚以及實心的愛心，點擊其中一個會改變原本按鈕的內容，如下

<iframe
  src="https://codesandbox.io/embed/react-xstate-practice-1-wd0qo?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="border:0; border-radius: 4px; overflow:hidden;"
  title="react-xstate-example-1"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

大家可以從下面連結的 Codesandbox fork 一個開始做

- [React 版本](https://codesandbox.io/s/react-xstate-practice-1-ydtdm)
- [Angular 版本](https://codesandbox.io/s/angular-xstate-practice-1-nmnb9)
- [Vue 版本](https://codesandbox.io/s/vue-xstate-practice-1-pipwx)

可以先想一下會有哪些狀態、哪些事件，把 Machine 建好再來處理畫面！如果寫完的可以在下方留言分享喔，如果有遇到問題的也歡迎留言提問！

## 小結

這篇文章我們講了什麼是 State Machine 以及 XState 的基本用法，下一篇文章我們會講 XState 如何處理可變的資料！

> 下一篇文章： [XState 新手教學 - Context & Actions](/posts/xstate-tutorials-context-actions/)
