---
layout: cnpost
title: "博客 | 鼠标指针美化"
date: 2024-06-06 16:00:00
author: SANSUIZ
categories: cn
tags: 博客
comments: true
---

## 1 基本信息

瞎折腾一下，跟着网上的教程，实现网页鼠标指针美化效果。

我是直接在js、css文件夹里，分别新建了一个js文件和一个css文件，具体代码如下。

## 2 新建Js文件

```js
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle = (el, attr) => {
    try {
        return window.getComputedStyle
            ? window.getComputedStyle(el)[attr]
            : el.currentStyle[attr];
    } catch (e) {}
    return "";
};

class Cursor {
    constructor() {
        this.pos = {curr: null, prev: null};
        this.pt = [];
        this.create();
        this.init();
        this.render();
    }

    move(left, top) {
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");
            this.cursor.id = "cursor";
            this.cursor.classList.add("hidden");
            document.body.append(this.cursor);
        }

        var el = document.getElementsByTagName('*');
        for (let i = 0; i < el.length; i++)
            if (getStyle(el[i], "cursor") == "pointer")
                this.pt.push(el[i].outerHTML);

        document.body.appendChild((this.scr = document.createElement("style")));
        this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='.5'/></svg>") 4 4, auto}`;
    }

    refresh() {
        this.scr.remove();
        this.cursor.classList.remove("hover");
        this.cursor.classList.remove("active");
        this.pos = {curr: null, prev: null};
        this.pt = [];

        this.create();
        this.init();
        this.render();
    }

    init() {
        document.onmouseover  = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
        document.onmouseout   = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
        document.onmousemove  = e => {(this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = {x: e.clientX - 8, y: e.clientY - 8}; this.cursor.classList.remove("hidden");};
        document.onmouseenter = e => this.cursor.classList.remove("hidden");
        document.onmouseleave = e => this.cursor.classList.add("hidden");
        document.onmousedown  = e => this.cursor.classList.add("active");
        document.onmouseup    = e => this.cursor.classList.remove("active");
    }

    render() {
        if (this.pos.prev) {
            this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
            this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());
    }
}

(() => {
    CURSOR = new Cursor();
    // 需要重新获取列表时，使用 CURSOR.refresh()
})();
```

## 3 新建CSS文件

```css
#cursor {
    position: fixed;
    width: 16px;
    height: 16px;
    background: #000;
    border-radius: 8px;
    opacity: 0.25;
    z-index: 10086;
    pointer-events: none;
    transition: 0.2s ease-in-out;
    transition-property: background, opacity, transform;
  }
  
  #cursor.hidden {
    opacity: 0;
  }
  
  #cursor.hover {
    opacity: 0.1;
    transform: scale(2.5);
  }
  
  #cursor.active {
    opacity: 0.5;
    transform: scale(0.5);
  }
  ```

## 4 引入页面效果

我的网站是在_layouts文件夹中，
在网页.html的`<body>……</body>`字节中添加以下代码。

```html
  <!-- 鼠标指针样式 -->
  <link rel="stylesheet" href="{{ site.baseurl }}/css/mouse.css">
  <script src="{{ site.baseurl }}/js/mouse.js"></script>
```

## 5 代码说明

控制鼠标指针移动速度的方法在代码中已经体现在`render()`方法中的线性插值`（lerp）`部分。

通过调整平滑系数（第三个参数）可以控制移动速度。
在`render()`方法中，使用Math.lerp函数来计算前一帧和当前帧之间的插值。

函数调用如下：

```js
this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
```

其中，0.15是平滑系数，用于控制移动速度和平滑度。

较小的平滑系数会导致更平滑的移动效果，但可能会移动速度较慢；

较大的平滑系数则会导致更快的移动速度，但可能会有明显的抖动。