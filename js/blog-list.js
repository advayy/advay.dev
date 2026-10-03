async function loadPosts() {
  const list = document.getElementById('blog-list');
  if (!list) return;

  try {
    const [postsRes, gamesRes] = await Promise.all([
      fetch('blog/posts.json'),
      fetch('assets/games.json'),
    ]);
    const posts = await postsRes.json();
    const games = await gamesRes.json();

    const gameMap = Object.fromEntries(games.map(g => [g.id, g]));

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    list.innerHTML = posts.map(post => {
      const game = post.gameId ? gameMap[post.gameId] : null;

      const cartridge = game ? `
        <a class="post-cartridge"
           href="${escapeHtml(game.itchUrl)}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Play ${escapeHtml(game.name)} on itch.io">
          <div class="post-cartridge-image">
            <img src="assets/images/games/${escapeHtml(game.id)}.png"
                 alt="${escapeHtml(game.name)}"
                 onerror="this.style.display='none'">
          </div>
          <div class="post-cartridge-title">${escapeHtml(game.name)}</div>
        </a>
      ` : '';

      return `
        <div class="blog-card">
          <a class="blog-card-link" href="blog/post?slug=${encodeURIComponent(post.slug)}">
            <div class="blog-card-text">
              ${post.category ? `<span class="blog-category">${escapeHtml(post.category)}</span>` : ''}
              <h2>${escapeHtml(post.title)}</h2>
              <p class="blog-meta">${escapeHtml(post.displayDate)} · ${escapeHtml(post.readTime)} · ${escapeHtml(post.topic)}</p>
              <p class="blog-excerpt">${escapeHtml(post.excerpt)}</p>
              <span class="read-more">Read →</span>
            </div>
          </a>
          ${cartridge}
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Failed to load posts:', err);
    list.innerHTML = '<p style="text-align:center;color:rgba(0,0,0,0.4);">Could not load posts.</p>';
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadPosts();