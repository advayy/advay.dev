document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('project-modal');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogImage = document.getElementById('dialog-image');
  const dialogDate = document.getElementById('dialog-date');
  const dialogStack = document.getElementById('dialog-stack');
  const dialogDesc = document.getElementById('dialog-description');
  const dialogLink = document.getElementById('dialog-link');
  const closeBtn = document.getElementById('dialog-close');

  document.querySelectorAll('.project-folder').forEach(card => {
    const openModal = () => {
      dialogTitle.textContent = card.dataset.title;
      
      if (card.dataset.image && card.dataset.image.trim() !== "") {
        dialogImage.src = card.dataset.image;
        dialogImage.alt = card.dataset.title;
      } else {
        dialogImage.removeAttribute('src');
        dialogImage.alt = '';
      }

      dialogDate.textContent = card.dataset.date;
      dialogStack.textContent = card.dataset.stack;
      dialogDesc.textContent = card.dataset.description;
      
      if (card.dataset.link && card.dataset.link.trim() !== "") {
        dialogLink.href = card.dataset.link;
        dialogLink.textContent = card.dataset.linkText || 'View Project';
        dialogLink.style.display = 'inline-block';
      } else {
        dialogLink.style.display = 'none';
      }

      dialog.showModal();
    };

    card.addEventListener('click', openModal);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      dialog.close();
    }
  });
});