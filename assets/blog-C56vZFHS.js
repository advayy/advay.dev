import"./callOnAll-BJ1NXt9b.js";async function g(){const s=document.getElementById("blog-list");if(s)try{const[r,o]=await Promise.all([fetch("blog/posts.json"),fetch("assets/games.json")]),l=await r.json(),n=await o.json(),c=Object.fromEntries(n.map(e=>[e.id,e]));l.sort((e,t)=>new Date(t.date)-new Date(e.date)),s.innerHTML=l.map(e=>{const t=e.gameId?c[e.gameId]:null,i=t?`
        <a class="post-cartridge"
           href="${a(t.itchUrl)}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Play ${a(t.name)} on itch.io">
          <div class="post-cartridge-image">
            <img src="assets/images/games/${a(t.id)}.png"
                 alt="${a(t.name)}"
                 onerror="this.style.display='none'">
          </div>
          <div class="post-cartridge-title">${a(t.name)}</div>
        </a>
      `:"";return`
        <div class="blog-card">
          <a class="blog-card-link" href="blog/post.html?slug=${encodeURIComponent(e.slug)}">
            <div class="blog-card-text">
              ${e.category?`<span class="blog-category">${a(e.category)}</span>`:""}
              <h2>${a(e.title)}</h2>
              <p class="blog-meta">${a(e.displayDate)} · ${a(e.readTime)} · ${a(e.topic)}</p>
              <p class="blog-excerpt">${a(e.excerpt)}</p>
              <span class="read-more">Read →</span>
            </div>
          </a>
          ${i}
        </div>
      `}).join("")}catch(r){console.error("Failed to load posts:",r),s.innerHTML='<p style="text-align:center;color:rgba(0,0,0,0.4);">Could not load posts.</p>'}}function a(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}g();
