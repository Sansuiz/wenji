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

        // 自定义右键菜单
        this.menu = document.createElement('div');
        this.menu.className = 'context-menu';
        
        const menuItems = [
            {text: '刷新页面', action: () => location.reload()},
            {text: '返回首页', action: () => location.href = '/'}
        ];

        menuItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'context-menu-item';
            div.textContent = item.text;
            div.addEventListener('click', () => {
                item.action();
                this.menu.classList.remove('visible');
                this.menu.style.display = 'none'; // 新增隐藏display属性
            });
            // 添加过渡结束事件
            this.menu.addEventListener('transitionend', (e) => {
                if (!this.menu.classList.contains('visible')) {
                    this.menu.style.display = 'none';
                }
            });
            this.menu.appendChild(div);
        });

        document.body.appendChild(this.menu);

        document.addEventListener('contextmenu', e => {
            console.log('Context menu triggered');
            e.preventDefault();
            this.menu.style.left = `${e.pageX}px`;
            this.menu.style.top = `${e.pageY}px`;
            this.menu.classList.add('visible');
        });

        document.addEventListener('click', e => {
            console.log('点击目标:', e.target);
            console.log('当前菜单可见状态:', this.menu.classList.contains('visible'));
            console.log('菜单元素层级:', getStyle(this.menu, 'z-index'));
            if (!this.menu.contains(e.target) && this.menu.classList.contains('visible')) {
                console.log('触发菜单隐藏');
                this.menu.classList.remove('visible');
            }
        });
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