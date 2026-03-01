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
    
    headings.forEach(heading => {
      const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
      heading.id = id;
      
      const indicator = document.createElement('div');
      indicator.className = `toc-indicator-item ${heading.tagName.toLowerCase()}`;
      indicator.dataset.target = id;
      
      const tooltip = document.createElement('div');
      tooltip.className = 'toc-tooltip';
      tooltip.textContent = heading.textContent;
      
      indicator.appendChild(tooltip);
      tocContainer.appendChild(indicator);
      
      indicator.addEventListener('click', () => {
        smoothScrollTo(heading);
        // 在移动设备上点击导航项后关闭导航
        if (window.innerWidth <= 768) {
          tocContainer.classList.remove('active');
        }
      });
    });
    
    // 创建切换按钮
    const toggleButton = document.createElement('div');
    toggleButton.className = 'toc-toggle';
    toggleButton.innerHTML = '☰';
    document.body.appendChild(toggleButton);
    
    // 点击切换按钮显示/隐藏导航
    toggleButton.addEventListener('click', () => {
      tocContainer.classList.toggle('active');
    });
    
    // 点击导航外部关闭导航
    document.addEventListener('click', (e) => {
      if (!tocContainer.contains(e.target) && !toggleButton.contains(e.target)) {
        tocContainer.classList.remove('active');
      }
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
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', setupTOC);