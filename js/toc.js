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
      if (heading.tagName === 'H3') item.style.paddingLeft = '1rem';
      if (heading.tagName === 'H4') item.style.paddingLeft = '2rem';
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
    const activeHeading = Array.from(headings).find(h => {
      const rect = h.getBoundingClientRect();
      return rect.top <= 200 && rect.bottom >= 100;
    });
    
    document.querySelectorAll('.toc-item').forEach(item => {
      item.classList.toggle('active', item.querySelector('a')?.hash === `#${activeHeading?.id}`);
    });
  });
});