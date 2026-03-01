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
  }
}

document.addEventListener('DOMContentLoaded', setupTOC);