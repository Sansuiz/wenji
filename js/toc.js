document.addEventListener('DOMContentLoaded', () => {
  const tocNav = document.getElementById('toc');
  const headings = document.querySelectorAll('h2, h3, h4');
  const tocItems = [];
  
  // 生成目录结构
  headings.forEach(heading => {
    const id = heading.textContent.replace(/ /g, '_');
    heading.id = id;
    
    const item = document.createElement('div');
    item.className = 'toc-item';
    item.innerHTML = `<a href='#${id}'>${heading.textContent}</a>`;
    
    if (heading.tagName === 'H3') item.style.paddingLeft = '1.2rem';
    if (heading.tagName === 'H4') item.style.paddingLeft = '2.4rem';
    
    tocItems.push(item);
    tocNav.appendChild(item);
  });

  // 滚动监听
  window.addEventListener('scroll', () => {
    const fromTop = window.scrollY + 100;
    
    tocItems.forEach((item, index) => {
      const heading = headings[index];
      const rect = heading.getBoundingClientRect();
      
      if (rect.top <= 150 && rect.bottom >= 50) {
        item.classList.add('active');
        item.querySelector('a').classList.add('active-toc');
      } else {
        item.classList.remove('active');
        item.querySelector('a').classList.remove('active-toc');
      }
    });
  });
});