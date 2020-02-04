---
templateKey: blog-post
slug: xstate-tutorials-context-actions
title: XState 新手教學 - Context & Actions
image: '../../../static/img/counter-machine.png'
date: 2020-01-18T20:30:00.000Z
description: >-
  上一篇文章中介紹了如何定義狀態，但我們還沒講到 XState 如何處理可變的資料，這篇文章會講解 XState 如何儲存可變資料以及如何改變這些資料。

tags:
  - XState
  - State Management
  - State Machine
---

## Context

在[上一篇文章](https://blog.jerry-hong.com/posts/xstate-tutorials-state-machine/)中我們有介紹到一個 Machine 的**狀態(state)** 是有限的，例如水的狀態 (固、液、氣、等離子)，但我們仍然會需要儲存非定性的可變**資料(data)**，這些資料我們會儲存在 context 中，如下

```js
const machine = Machine({
  context: {
    // 資料 (data) 存在 context 裡，key 可以自己訂
    count: 0,
    user: null,
  },
  states: {
    //...
  },
});
```

我們可以透過 `withContext()` 動態的給定初始資料，如下

```js
const myMachine = machine.withContext({
  count: 10,
  user: {
    name: 'Jerry',
  },
});
```

在任何狀態下，我們都可以拿到 context 的值

```js
machine.initialState.context;
// { user: null, count: 0 }

const service = interpret(machine.withContext({
  count: 10,
  user: {
    name: 'Jerry'
  },
});
service.start();
service.state.context;
// { user: { name: 'Jerry' }, count: 10 }
```

至於要如何在特定的狀態中改變 machine 內的 context 呢？我們會需要用到 **Assign** **Actions**。**Actions** 是一種 **理射後不理 (Fire-and-forget)的** **Effect**，專門用來處理單一次的作用，另外在 XState 中還有許多不同種類的 Effects。

## Effects

在 Statecharts 的世界裡，Side Effect 可以依行為區分為兩類

- **Fire-and-forget effects** - 指執行 Side Effect 後不會另外送任何 event 回 statechart 的 effect。
- **Invoked effects -** 指除了可執行 Side Effect 之外還能發送和接收 events 的 effect。

這兩類 Effect 在 XState 中依據不同的使用方式，又可以分為

- Fire-and-forget effects
  - Actions - 用於單次、離散的 Effect
  - Activities - 用於連續的 Effect
- Invoked effects
  - Invoked Promises
  - Invoked Callbacks
  - Invoked Observables
  - invoked Machines

這篇文章會先介紹實務上較最常用的 Actions，剩下的有機會在之後的文章中介紹。

> 關於什麼是 Side Effect 可以參考本站的 [Think in FP(03): 我們的 Function 不一樣](/series/fp/think-in-fp-03)

> 關於什麼是 Observalbe 可以參考本站的 [30 天精通 RxJS (04)：什麼是 Observable ?](/series/rxjs/thirty-days-RxJS-04/)

## Actions

Action 本身就是一個 function，接收三個參數分別是 context, event 以及 actionMeta，context 就是當前 machine 的 context，event 則是觸發當前狀態切換的事件，actionMeta 則會存放當前的 state 以及 action 物件。

```js
const action = (context, event, actionMeta) => {
  // do something...
};
```

我們可以把 actions 寫在任何 State 的任何事件裡，如下

```js
const lightMachine = Machine({
  initial: 'red',
  states: {
    red: {
      on: {
        CLICK: {
          // 轉換到 green 的狀態
          target: 'green',
          // transition actions
          actions: (context, event) => console.log('hello green'),
        },
      },
    },
    green: {
      on: {
        CLICK: {
          target: 'red',
          // transition actions
          actions: (context, event) => console.log('hello red'),
        },
      },
    },
  },
});
```

可以到 [這裡](https://xstate.js.org/viz/?gist=1fa94bab78e68057bf1a179984b31f5d) 開啟 console 看看，在點擊事件時就會執行 action。這些在狀態切換間觸發的 **actions** 我們稱為 **transition actions**。

另外還有兩種 **actions**，分別是在**進入 state** 以及**離開 state** 時觸發，如下

```js
const lightMachine = Machine({
  initial: 'red',
  states: {
    red: {
      // entry actions
      entry: (context, event) => console.log('entry red'),
      // exit actions
      exit: (context, event) => console.log('exit red'),
      on: {
        CLICK: {
          target: 'green',
        },
      },
    },
    //...
  },
});
```

可以到 [這裡](https://xstate.js.org/viz/?gist=aef64c2a0674530ef7ebb5517f93d70e) 開啟 console 看看，在進入 red 狀態時會觸發 red 內部的 entry，在離開 red 狀態時會觸發 red 內部的 exit。這兩種 actions 我們稱為 **entry actions** 以及 **exit actions**。

另外 actions 可以定義在 machine options 內，並透過 string 來指定執行的 action，如下

```js
const lightMachine = Machine({
  initial: 'red',
  states: {
    red: {
      // entry actions
      entry: 'entryRed'
      // exit actions
      exit: 'exitRed',
      on: {
        CLICK: {
          target: 'green',
          // transition actions
          actions: 'redClick',
        },
      }
    },
    //...
  }
}, {
  actions: {
    entryRed: (context, event) => console.log('entry red'),
    exitRed: (context, event) => console.log('exit red'),
    redClick: (context, event) => console.log('hello green'),
  },
});
```

所有設定 actions 的地方都可以是一個 array，依序執行多個 actions，如下

```js
const lightMachine = Machine(
  {
    initial: 'red',
    states: {
      red: {
        // entry actions
        entry: ['entryRed', 'temp'],
        // exit actions
        exit: ['exitRed', 'temp'],
        on: {
          CLICK: {
            target: 'green',
            // transition actions
            actions: ['redClick', 'temp'],
          },
        },
      },
      //...
    },
  },
  {
    actions: {
      entryRed: (context, event) => console.log('entry red'),
      exitRed: (context, event) => console.log('exit red'),
      redClick: (context, event) => console.log('hello green'),
      temp: (context, event) => console.log('temp'),
    },
  }
);
```

可以到 [這裡](https://xstate.js.org/viz/?gist=4a28a80b653a0fd1f0babea3fc0c6b42) 開啟 console 看看，如果是 array 的話會依序執行 array 內的 actions。

> 在實務開發上，**不建議**直接把 action function inline 在 machine config 裡，如下，這會造成之後難以除錯、測試以及圖像化。
>
> ```js
>   CLICK: {
>     target: 'gerrn',
>     actions: (context, event) => console.log('hello green')
>   }
> ```
>
> 建議統一把 actions 放在 machine options 內，如下
>
> ```js
> const lightMachine = Machine(
>   {
>     initial: 'red',
>     states: {
>       red: {
>         // entry actions
>         entry: ['entryRed', 'temp'],
>         //...
>       },
>       //...
>     },
>   },
>   {
>     actions: {
>       entryRed: (context, event) => console.log('entry red'),
>       temp: (context, event) => console.log('temp'),
>     },
>   }
> );
> ```

## Assign Action

`assign` 是一個 function 專門用來更新 machine context，它吃一個 **assigner** 參數，這個參數會表示 context 要更新成什麼值。

**assigner** 可以是一個 object (推薦用法)，用法如下

```js
import { Machine, assign } from 'xstate';

// ...
actions: assign({
  // 透過外部傳進來的 event 來改變 count
  count: (context, event) => context.count + event.value,
  message: 'value 也可以直接是 static value',
});
// ...
```

**assigner** 也可以是一個 function，用法如下

```js
// ...
  // 他會 partial update context
	actions: assign((context, event) => {
    return {
      count: context.count + event.value,
      message: 'value 也可以直接是 static value'
    }
  }),
// ...
```

讓我們直接來看一個簡單的例子吧

```js
const counterMachine = Machine(
  {
    id: 'counter',
    initial: 'ENABLED',
    context: {
      count: 0,
    },
    states: {
      ENABLED: {
        on: {
          INC: {
            actions: ['increment'],
          },
          DYNAMIC_INC: {
            actions: ['dynamic_increment'],
          },
          RESET: {
            actions: ['reset'],
          },
          DISABLE: 'DISABLED',
        },
      },
      DISABLED: {
        on: {
          ENABLE: 'ENABLED',
        },
      },
    },
  },
  {
    actions: {
      increment: assign({
        count: context => context.count + 1,
      }),
      dynamic_increment: assign({
        count: (context, event) => context.count + (event.value || 0),
      }),
      reset: assign({
        count: 0,
      }),
    },
  }
);
```

搭配畫面會長像這樣

<iframe
  src="https://codesandbox.io/embed/wonderful-haslett-94ek4?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview"
  style="border:0; border-radius: 4px; overflow:hidden;"
  title="react-xstate-example-1"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>

從上面這個範例，可以看出使用 XState 能夠很清楚的定義出什麼狀態下可以接收哪些 event，例如在 **DISABLED** 的**狀態**下就只會對 `ENABLE` 的 event 會有反應，對於 `INC`, `RESET` 等事件就不會有反應。

另外從 `DYNAMIC_INC` 事件可以看出如何根據外部傳入的參數控制增長數值，詳細可以參考以下這段程式碼

```js
//...
on: {
  [COUNTER_EVENTS.DYNAMIC_INC]: {
    actions: ['dynamic_increment'],
  },
}
//...
actions: {
  dynamic_increment: assign({
    count: (context, event) => context.count + (event.value || 0)
    // event 除了 type 這個屬性之外有什麼 property 是外部決定的
  }),
},
//...
//...
<Button
  label="Increment"
  onClick={() =>
    // 這裡傳入 DYNAMIC_INC event 同時要給 value
    send({ type: COUNTER_EVENTS.DYNAMIC_INC, value: Number(value) })
  }
/>
//...
```

### 注意事項

- 永遠不要從外部修改一個 machine 內的 context，任何改變 context 的行為都應該來自 event。
- 推薦使用 `assign({ ... })` 的寫法，這個寫法利於未來的工具做分析。
- 跟所有 actions 相同不建議 inline 寫在 machine 裡面，建議定義在 machine options 的 actions 內。
- 理想上，context 應該是一個 JS 的 plain object，並且應該可以被序列化。
- 記得 `assign` 就只是 pure function 回傳一個 action 物件，並直接對 machine 造成影響。

## 小結

原本這篇文章要接著 Invoked Promise 一起介紹，但礙於篇幅的長度只好拆成兩篇文章。這篇文章介紹了 XState 如何處理可變資料，以及要如何操作 machine 內部的 context，如果有任何問題歡迎在下方留言給我喔。

下一篇文章我們會介紹 Invoked Promise 以及 Transition State！
