document.querySelectorAll('.highlight').forEach(block => {
  const btn = document.createElement('button');
  btn.className = 'copy-btn';
  btn.textContent = '复制';
  
  btn.addEventListener('click', () => {
    const code = block.querySelector('code').textContent;
    navigator.clipboard.writeText(code).then(() => {
      btn.textContent = '已复制!';
      setTimeout(() => btn.textContent = '复制', 1500);
    });
  });
  
  block.appendChild(btn);
});