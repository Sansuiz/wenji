---
layout: cnpost
title: "博客 | 雪花特效"
date: 2024-06-11 22:00:00
author: SANSUIZ
categories: cn
tags: 博客
comments: true
---

## 1 基本信息

给主页增加了一个「雪花飘落」特效，虽然我把雪花颜色修改成了「淡绿」🫠，也顺便把主页字体颜色从`#2b5781`修改为`#61ac85`。

![主页雪花飘落效果](https://cdnv2.ruguoapp.com/Fv2yGmw0WSYqQbMkUaiE7Aqx4eJlv3.png?imageMogr2/auto-orient/thumbnail/231569@%7Cwatermark/3/image/aHR0cHM6Ly93YXRlcm1hcmsucnVndW9hcHAuY29tLz90ZXh0PSVFNSU4RCVCMyVFNSU4OCVCQiUyMCU0MFNBTlNVSVomaGVpZ2h0PTE4/gravity/SouthEast/dx/10/dy/10)

新建一个snowflake.js文件，具体代码如下。

## 2 新建Js文件

```js
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    // 移动端不显示
  }
  else{
    document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:100;pointer-events:none"></canvas>');
  
    window && (()=>{
      let e = {
          flakeCount: 50,
          minDist: 150,
          color: "97, 172, 133", // 颜色修改
          size: 2,
          speed: .5,
          opacity: .2,
          stepsize: .5
      };
      const t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(e) {
          window.setTimeout(e, 1e3 / 60)
      }
      ;
      window.requestAnimationFrame = t;
      const i = document.getElementById("snow"), 
      n = i.getContext("2d"), 
      o = e.flakeCount;
      let a = -100, 
      d = -100, 
      s = [];
      i.width = window.innerWidth,
      i.height = window.innerHeight;
      const h = ()=>{
          n.clearRect(0, 0, i.width, i.height);
          const r = e.minDist;
          for (let t = 0; t < o; t++) {
              let o = s[t];
              const h = a, 
              w = d, 
              m = o.x, 
              c = o.y, 
              p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
              if (p < r) {
                  const e = (h - m) / p, 
                  t = (w - c) / p, 
                  i = r / (p * p) / 2;
                  o.velX -= i * e,
                  o.velY -= i * t
              } else
                  o.velX *= .98,
                  o.velY < o.speed && o.speed - o.velY > .01 && (o.velY += .01 * (o.speed - o.velY)),
                  o.velX += Math.cos(o.step += .05) * o.stepSize;
              n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")",
              o.y += o.velY,
              o.x += o.velX,
              (o.y >= i.height || o.y <= 0) && l(o),
              (o.x >= i.width || o.x <= 0) && l(o),
              n.beginPath(),
              n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
              n.fill()
          }
          t(h)
      }
        , l = e=>{
          e.x = Math.floor(Math.random() * i.width),
          e.y = 0,
          e.size = 3 * Math.random() + 2,
          e.speed = 1 * Math.random() + .5,
          e.velY = e.speed,
          e.velX = 0,
          e.opacity = .5 * Math.random() + .3
      }
      ;
      document.addEventListener("mousemove", (e=>{
          a = e.clientX,
          d = e.clientY
      }
      )),
      window.addEventListener("resize", (()=>{
          i.width = window.innerWidth,
          i.height = window.innerHeight
      }
      )),
      (()=>{
          for (let t = 0; t < o; t++) {
              const t = Math.floor(Math.random() * i.width)
                , n = Math.floor(Math.random() * i.height)
                , o = 3 * Math.random() + e.size
                , a = 1 * Math.random() + e.speed
                , d = .5 * Math.random() + e.opacity;
              s.push({
                  speed: a,
                  velX: 0,
                  velY: a,
                  x: t,
                  y: n,
                  size: o,
                  stepSize: Math.random() / 30 * e.stepsize,
                  step: 0,
                  angle: 180,
                  opacity: d
              })
          }
          h()
      }
      )()
    }
    )();
  }
  ```

## 3 引入页面效果

在网页.html的`<body>……</body>`字节中添加以下代码。

```html
    <!-- 雪花飘落特效 -->
    <script src="/js/snowflake.js"></script>
```