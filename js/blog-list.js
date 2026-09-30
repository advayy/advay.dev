// Populates the blog listing page from blog/posts.json

async function loadPosts() {
  const list = document.getElementById('blog-list');
  if (!list) return;

  try {
    const res = await fetch('blog/posts.json');
    const posts = await res.json();

    // Newest first
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

list.innerHTML = posts.map(post => `
  <a class="blog-card" href="blog/post.html?slug=${encodeURIComponent(post.slug)}">
    ${post.category ? `<span class="blog-category">${escapeHtml(post.category)}</span>` : ''}
    <h2>${escapeHtml(post.title)}</h2>
    <p class="blog-meta">${escapeHtml(post.displayDate)} · ${escapeHtml(post.readTime)} · ${escapeHtml(post.topic)}</p>
    <p class="blog-excerpt">${escapeHtml(post.excerpt)}</p>
    <span class="read-more">Read →</span>
  </a>
`).join('');
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