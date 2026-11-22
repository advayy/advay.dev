// Renders the projects page from assets/projects.json and wires up the modal.

async function loadProjects() {
  const grid = document.getElementById('project-grid');
  if (!grid) return;

  let projects;
  try {
    const res = await fetch('assets/projects.json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    projects = await res.json();
  } catch (err) {
    console.error('Failed to load projects:', err);
    grid.innerHTML = '<p style="text-align:center;color:rgba(0,0,0,0.4);">Could not load projects.</p>';
    return;
  }

  grid.innerHTML = projects.map((p, i) => {
    const hasImage = p.image && p.image.trim() !== '';
    const imageHtml = hasImage
      ? `<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)} preview" loading="lazy">`
      : '';
    const wrapperClass = hasImage ? 'folder-image-wrapper' : 'folder-image-wrapper empty-preview';

    return `
      <article class="project-folder" tabindex="0" data-index="${i}">
        <div class="folder-body">
          <div class="${wrapperClass}">${imageHtml}</div>
          <div class="folder-info">
            <h3>${escapeHtml(p.title)}</h3>
            <p class="folder-tech">${escapeHtml(p.cardStack || p.stack)}</p>
            <p class="folder-date">${escapeHtml(p.date)}</p>
          </div>
        </div>
      </article>
    `;
  }).join('');

  setupModal(projects, grid);
}

function setupModal(projects, grid) {
  const dialog = document.getElementById('project-modal');
  if (!dialog) return;

  const dialogTitle = document.getElementById('dialog-title');
  const dialogImage = document.getElementById('dialog-image');
  const dialogDate = document.getElementById('dialog-date');
  const dialogStack = document.getElementById('dialog-stack');
  const dialogDesc = document.getElementById('dialog-description');
  const dialogLink = document.getElementById('dialog-link');
  const closeBtn = document.getElementById('dialog-close');

  const openModal = (project) => {
    if (!project) return;

    dialogTitle.textContent = project.modalTitle || project.title;

    if (project.image && project.image.trim() !== '') {
      dialogImage.src = project.image;
      dialogImage.alt = project.title;
      dialogImage.style.display = '';
    } else {
      dialogImage.removeAttribute('src');
      dialogImage.alt = '';
      dialogImage.style.display = 'none';
    }

    dialogDate.textContent = project.date || '';
    dialogStack.textContent = project.stack || '';
    dialogDesc.textContent = project.description || '';

    if (project.link && project.link.trim() !== '') {
      dialogLink.href = project.link;
      dialogLink.textContent = project.linkText || 'View Project';
      dialogLink.style.display = 'inline-block';
    } else {
      dialogLink.style.display = 'none';
    }

    dialog.showModal();
  };

  const cardFor = (el) => el.closest('.project-folder');

  grid.addEventListener('click', (e) => {
    const card = cardFor(e.target);
    if (!card) return;
    openModal(projects[Number(card.dataset.index)]);
  });

  grid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = cardFor(e.target);
    if (!card) return;
    e.preventDefault();
    openModal(projects[Number(card.dataset.index)]);
  });

  closeBtn.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width;
    if (!isInDialog) dialog.close();
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadProjects();