async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const headerEl = document.getElementById('post-header');
  const bodyEl = document.getElementById('post-body');


  if (!slug) {
    headerEl.innerHTML = '<h1>Post not found</h1>';
    bodyEl.innerHTML = '<p>No slug provided.</p>';
    return;
  }

  try {
    const [indexRes, gamesRes] = await Promise.all([
      fetch('../blog/posts.json'),
      fetch('../assets/games.json'),
    ]);
    const posts = await indexRes.json();
    const games = await gamesRes.json();

    const post = posts.find(p => p.slug === slug);
    if (!post) {
      headerEl.innerHTML = '<h1>Post not found</h1>';
      bodyEl.innerHTML = `<p>No post with slug "${slug}".</p>`;
      return;
    }

    const gameMap = Object.fromEntries(games.map(g => [g.id, g]));
    const game = post.gameId ? gameMap[post.gameId] : null;

    document.title = `${post.title} — Advay.dev`;

    const cartridge = game ? `
      <a class="post-cartridge post-cartridge-lg"
         href="${escapeHtml(game.itchUrl)}"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Play ${escapeHtml(game.name)} on itch.io">
        <div class="post-cartridge-image">
          <img src="../assets/images/games/${escapeHtml(game.id)}.png"
               alt="${escapeHtml(game.name)}"
               onerror="this.style.display='none'">
        </div>
        <div class="post-cartridge-title">${escapeHtml(game.name)}</div>
      </a>
    ` : '';

    headerEl.innerHTML = `
      <div class="post-header-text">
        ${post.category ? `<span class="post-category">${escapeHtml(post.category)}</span>` : ''}
        <h1>${escapeHtml(post.title)}</h1>
        <p class="post-meta">${escapeHtml(post.displayDate)} · ${escapeHtml(post.readTime)} · ${escapeHtml(post.topic)}</p>
      </div>
      ${cartridge}
    `;

    const mdRes = await fetch(`../blog/posts/${slug}.md`);
    if (!mdRes.ok) throw new Error(`Markdown file not found: ${slug}.md`);

    const ct = mdRes.headers.get('content-type') || '';
    if (ct.includes('text/html')) {
      throw new Error(`Server returned HTML for ${slug}.md.`);
    }

    const md = await mdRes.text();

      const schema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "datePublished": post.date,
      "author": { "@id": "https://advay.dev/#person" },
      "publisher": { "@id": "https://advay.dev/#person" },
      "mainEntityOfPage": `https://advay.dev/blog/post.html?slug=${slug}`
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);


    marked.setOptions({ breaks: false, gfm: true, headerIds: false, mangle: false });
    let html = marked.parse(md);

    html = html.replace(
      /(<img\s+[^>]*src=")((?!https?:|\/|data:)[^"]+)(")/g,
      (_, before, src, after) => `${before}../${src}${after}`
    );

    bodyEl.innerHTML = html;
  } catch (err) {
    console.error('Failed to load post:', err);
    headerEl.innerHTML = '<h1>Something went wrong</h1>';
    bodyEl.innerHTML = '<p>Could not load this post.</p>';
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

loadPost();