'use strict';
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn').addEventListener('click', () => {
    const t1 = document.getElementById('displayContent');
    t1.textContent = document.getElementById('no').value;
  });
});
