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
  
  // 创建目录内容容器
  const tocContent = document.createElement('div');
  tocContent.className = 'toc-content';
  
  if (headings.length > 0) {
    // 构建HTML结构
    tocContainer.appendChild(tocContent);
    document.body.appendChild(tocContainer);
    
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
      tocContent.appendChild(indicator);
      
      indicator.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡，避免触发容器的点击事件
        smoothScrollTo(heading);
        // 在移动端点击目录项后关闭目录
        if (window.innerWidth <= 480) {
          tocContainer.classList.remove('toc-open');
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
    
    // 移动端点击导航区域显示/隐藏目录
    tocContainer.addEventListener('click', (e) => {
      if (window.innerWidth <= 480) {
        e.stopPropagation();
        tocContainer.classList.toggle('toc-open');
      }
    });
    
    // 点击其他区域关闭目录
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 480) {
        if (!tocContainer.contains(e.target)) {
          tocContainer.classList.remove('toc-open');
        }
      }
    });
    
    // 窗口大小变化时调整目录状态
    window.addEventListener('resize', () => {
      if (window.innerWidth > 480) {
        tocContainer.classList.remove('toc-open');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', setupTOC);