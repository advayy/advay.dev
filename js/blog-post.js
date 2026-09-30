// Renders a single post from ?slug= using blog/posts.json + blog/posts/{slug}.md

async function loadPost() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('slug');
  const titleEl = document.getElementById('post-title');
  const metaEl = document.getElementById('post-meta');
  const bodyEl = document.getElementById('post-body');

  if (!slug) {
    titleEl.textContent = 'Post not found';
    bodyEl.innerHTML = '<p>No slug provided.</p>';
    return;
  }

  try {
    // 1. Fetch metadata from posts.json
    const indexRes = await fetch('../blog/posts.json');
    const posts = await indexRes.json();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
      titleEl.textContent = 'Post not found';
      bodyEl.innerHTML = `<p>No post with slug "${slug}".</p>`;
      return;
    }

    // 2. Update page metadata
    document.title = `${post.title} — Advay.dev`;
    titleEl.textContent = post.title;
    // Category chip
    const existingChip = document.querySelector('.post-category');
    if (existingChip) existingChip.remove();
    if (post.category) {
    const chip = document.createElement('span');
    chip.className = 'post-category';
    chip.textContent = post.category;
    titleEl.parentNode.insertBefore(chip, titleEl);
    }
    metaEl.textContent = `${post.displayDate} · ${post.readTime} · ${post.topic}`;

    // 3. Fetch the markdown body
    const mdRes = await fetch(`../blog/posts/${slug}.md`);
    if (!mdRes.ok) throw new Error(`Markdown file not found: ${slug}.md`);
    const md = await mdRes.text();

    // 4. Configure marked and render
    marked.setOptions({
      breaks: false,
      gfm: true,
      headerIds: false,
      mangle: false,
    });

    let html = marked.parse(md);

    // 5. Rewrite relative image srcs so they resolve from /blog/post.html
    //    Anything not starting with http://, https://, /, or data: gets ../ prepended.
    html = html.replace(
      /(<img\s+[^>]*src=")((?!https?:|\/|data:)[^"]+)(")/g,
      (_, before, src, after) => `${before}../${src}${after}`
    );

    bodyEl.innerHTML = html;
  } catch (err) {
    console.error('Failed to load post:', err);
    titleEl.textContent = 'Something went wrong';
    bodyEl.innerHTML = `<p>Could not load this post. Check the console for details.</p>`;
  }
}

loadPost();