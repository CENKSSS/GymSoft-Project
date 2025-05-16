// lightbox.js

document.addEventListener('DOMContentLoaded', () => {
  const lb = document.getElementById('lightbox');
  if (!lb) return;

  const bigImg = lb.querySelector('img');

  document.querySelectorAll('.photo-item img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      bigImg.src = img.src;
      lb.classList.add('visible');
    });
  });

  lb.addEventListener('click', () => {
    lb.classList.remove('visible');
  });
});
