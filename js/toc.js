document.addEventListener('DOMContentLoaded', () => {
  const tocNav = document.getElementById('toc');
  const headings = document.querySelectorAll('h2, h3, h4');
  
  // 精简模式只显示h3
  const createMinimalToc = () => {
    tocNav.innerHTML = '';
    headings.forEach(heading => {
      if (heading.tagName === 'H3') {
        const item = document.createElement('div');
        item.className = 'toc-item';
        item.innerHTML = `<a href='#${heading.id}'>${heading.textContent}</a>`;
        tocNav.appendChild(item);
      }
    });
  };

  // 完整目录模式
  const createFullToc = () => {
    tocNav.innerHTML = '';
    headings.forEach(heading => {
      const item = document.createElement('div');
      item.className = 'toc-item';
      item.innerHTML = `<a href='#${heading.id}'>${heading.textContent}</a>`;
      item.setAttribute('data-level', heading.tagName.toLowerCase());
      tocNav.appendChild(item);
    });
  };

  // 初始加载精简模式
  createMinimalToc();

  // 悬停切换模式
  tocNav.parentElement.addEventListener('mouseenter', createFullToc);
  tocNav.parentElement.addEventListener('mouseleave', createMinimalToc);

  // 优化后的滚动监听
  window.addEventListener('scroll', () => {
    const activeHeading = Array.from(headings).reduce((closest, h) => {
      const rect = h.getBoundingClientRect();
      const distance = Math.abs(rect.top - 150);
      return distance < (closest.distance || Infinity) ? {element:h, distance} : closest;
    }, {}).element;
    
    // 移除所有激活状态
    document.querySelectorAll('.toc-item').forEach(item => {
      item.classList.remove('active-current');
    });
    
    // 设置当前激活项
    const activeItem = document.querySelector(`.toc-item a[href='#${activeHeading?.id}']`)?.parentElement;
    if(activeItem) {
      activeItem.classList.add('active-current');
      activeItem.scrollIntoView({block: 'nearest'});
    }
  });

  // 移除原有的模式切换事件
  window.addEventListener('mouseenter', createFullToc);
  window.addEventListener('mouseleave', createMinimalToc);
});