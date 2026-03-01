function smoothScrollTo(element) {
  window.scrollTo({
    behavior: 'smooth',
    top: element.offsetTop - 100
  });
}

function setupTOC() {
  const headings = document.querySelectorAll('article h2, article h3, article h4');
  const tocContainer = document.createElement('div');
  tocContainer.className = 'toc-indicator';
  
  if (headings.length > 0) {
    document.body.appendChild(tocContainer);
    
    // 创建移动端汉堡按钮
    const toggleButton = document.createElement('div');
    toggleButton.className = 'toc-toggle';
    toggleButton.textContent = '≡';
    document.body.appendChild(toggleButton);
    
    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'toc-overlay';
    document.body.appendChild(overlay);
    
    headings.forEach(heading => {
      const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
      heading.id = id;
      
      const indicator = document.createElement('div');
      indicator.className = `toc-indicator-item ${heading.tagName.toLowerCase()}`;
      indicator.dataset.target = id;
      
      const dot = document.createElement('span');
      indicator.appendChild(dot);
      
      const tooltip = document.createElement('div');
      tooltip.className = 'toc-tooltip';
      tooltip.textContent = heading.textContent;
      
      indicator.appendChild(tooltip);
      tocContainer.appendChild(indicator);
      
      indicator.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡，避免触发容器的点击事件
        smoothScrollTo(heading);
        // 在移动端点击目录项后关闭目录
        if (window.innerWidth <= 480) {
          tocContainer.classList.remove('toc-open');
          overlay.classList.remove('active');
          toggleButton.textContent = '≡';
        }
      });
    });
    
    // 滚动时高亮当前章节
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY + 150;
      
      document.querySelectorAll('.toc-indicator-item').forEach(indicator => {
        indicator.classList.remove('active');
      });
      
      for (let i = headings.length - 1; i >= 0; i--) {
        if (scrollPosition >= headings[i].offsetTop) {
          const activeId = headings[i].id;
          document.querySelector(`.toc-indicator-item[data-target="${activeId}"]`)
            .classList.add('active');
          break;
        }
      }
    });
    
    // 点击汉堡按钮显示/隐藏目录
    toggleButton.addEventListener('click', () => {
      if (window.innerWidth <= 480) {
        tocContainer.classList.toggle('toc-open');
        overlay.classList.toggle('active');
        toggleButton.textContent = tocContainer.classList.contains('toc-open') ? '×' : '≡';
      }
    });
    
    // 点击遮罩层关闭目录
    overlay.addEventListener('click', () => {
      tocContainer.classList.remove('toc-open');
      overlay.classList.remove('active');
      toggleButton.textContent = '≡';
    });
    
    // 点击目录容器内部不关闭
    tocContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // 窗口大小变化时调整目录状态
    window.addEventListener('resize', () => {
      if (window.innerWidth > 480) {
        tocContainer.classList.remove('toc-open');
        overlay.classList.remove('active');
        toggleButton.textContent = '≡';
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', setupTOC);