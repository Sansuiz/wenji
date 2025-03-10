function generateTOC() {
  const tocContainer = document.getElementById('toc-sidebar');
  const headings = document.querySelectorAll('article h2, article h3, article h4');
  
  if (headings.length > 0) {
    let tocHTML = '<h4>目录</h4><nav class="toc-nav">';
    
    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      const anchorId = `toc-${index}`;
      heading.id = anchorId;
      
      tocHTML += `<a href="#${anchorId}" class="toc-item level-${level}">
        ${heading.textContent}
      </a>`;
    });
    
    tocHTML += '</nav>';
    tocContainer.innerHTML = tocHTML;
    
    // 滚动监听
    window.addEventListener('scroll', function() {
      const currentScroll = window.pageYOffset;
      const links = document.querySelectorAll('.toc-nav a');
      
      links.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section.offsetTop <= currentScroll + 100) {
          links.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    });
  }
}

// 初始化
if (document.getElementById('toc-sidebar')) {
  generateTOC();
}