// Renders the games page from assets/games.json

const THUMB_BASE = 'assets/images/games/';

async function loadGames() {
  const grid = document.getElementById('game-grid');
  if (!grid) return;

  try {
    const res = await fetch('assets/games.json');
    const games = await res.json();

    grid.innerHTML = games.map(game => {
      const img = `${THUMB_BASE}${game.id}.png`;
      return `
        <a class="game-cell"
           href="${escapeHtml(game.itchUrl)}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Play ${escapeHtml(game.name)} on itch.io">
          <div class="game-thumb">
            <img src="${escapeHtml(img)}" alt="${escapeHtml(game.name)}">
          </div>
          <div class="game-info">
            <h3>${escapeHtml(game.name)}</h3>
            <p class="game-meta">${escapeHtml(game.description)}</p>
            <p class="game-meta"><span class="genre">${escapeHtml(game.genre)}</span></p>
            <span class="play-badge">Play on Itch.io</span>
          </div>
        </a>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to load games:', err);
    grid.innerHTML = '<p style="text-align:center;color:rgba(0,0,0,0.4);">Could not load games.</p>';
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadGames();