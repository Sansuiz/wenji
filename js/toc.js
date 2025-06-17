document.addEventListener('DOMContentLoaded', function() {
  const headings = document.querySelectorAll('article h2, article h3, article h4');
  const tocContainer = document.getElementById('toc-container');
  
  if (headings.length > 0 && tocContainer) {
    let tocHtml = '<h4>目录</h4><ul>';
    
    headings.forEach(heading => {
      const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
      heading.id = id;
      
      const level = parseInt(heading.tagName.substring(1));
      const indent = (level - 2) * 15;
      
      tocHtml += `
        <li style="margin-left: ${indent}px">
          <a href="#${id}">${heading.textContent}</a>
        </li>`;
    });
    
    tocHtml += '</ul>';
    tocContainer.innerHTML = tocHtml;
  }
});