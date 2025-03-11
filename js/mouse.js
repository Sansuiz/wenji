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
    // 创建右键菜单
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'context-menu-item';
        div.textContent = item.text;
        div.onclick = item.action;
        menu.appendChild(div);
    });
    document.body.appendChild(menu);

    // 右键事件监听
    document.addEventListener('contextmenu', e => {
        e.preventDefault();
        menu.style.display = 'block';
        const menuWidth = 150;
        const menuHeight = 200;
        
        // 动态计算定位
        let x = e.clientX + window.scrollX + 10;
        let y = e.clientY + window.scrollY + 10;
        
        // 边界检测
        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;
        
        if (x + menuWidth > viewportWidth + window.scrollX) {
          x = viewportWidth + window.scrollX - menuWidth;
        }
        if (y + menuHeight > viewportHeight + window.scrollY) {
          y = viewportHeight + window.scrollY - menuHeight;
        }
        
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
    });

    // 点击关闭菜单
    document.addEventListener('mousedown', e => {
        if (!menu.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

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

const menuItems = [
    {text: '回到顶部', action: () => window.scrollTo({top: 0, behavior: 'smooth'})},
    {text: '刷新页面', action: () => location.reload()},
    {text: '返回首页', action: () => location.href = '/wenji/'},
    {text: '文章归档', action: () => location.href = '/wenji/cnarchive/'},
    {text: '备注留言', action: () => window.open('https://f.wps.cn/g/hQQzfcZC/', '_blank')},
    {text: 'SANSUIZ', action: () => window.open('https://bento.me/sansuiz', '_blank')}
];

(() => {
    CURSOR = new Cursor();
    // 需要重新获取列表时，使用 CURSOR.refresh()
})();

// 添加以下CSS样式到对应文件
const css = `
.context-menu {
    position: absolute;
    background: rgba(255,255,255,0.95);
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10086;
    display: none;
    min-width: 120px;
    padding: 8px 0;
    font-family: 'LXGW WenKai', sans-serif;
    backdrop-filter: blur(5px);
}

.context-menu-item {
    padding: 10px 24px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #444;
    font-size: 14px;
}

.context-menu-item:hover {
    background: rgba(240, 100, 100, 0.12);
    color:rgb(180, 45, 56);
    transform: translateX(2px);
}`;

document.head.appendChild(document.createElement('style')).textContent = css;