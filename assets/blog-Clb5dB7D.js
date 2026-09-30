import"./callOnAll-DyVq4ULm.js";async function r(){const a=document.getElementById("blog-list");if(a)try{const l=await(await fetch("blog/posts.json")).json();l.sort((e,s)=>new Date(s.date)-new Date(e.date)),a.innerHTML=l.map(e=>`
  <a class="blog-card" href="blog/post.html?slug=${encodeURIComponent(e.slug)}">
    ${e.category?`<span class="blog-category">${t(e.category)}</span>`:""}
    <h2>${t(e.title)}</h2>
    <p class="blog-meta">${t(e.displayDate)} · ${t(e.readTime)} · ${t(e.topic)}</p>
    <p class="blog-excerpt">${t(e.excerpt)}</p>
    <span class="read-more">Read →</span>
  </a>
`).join("")}catch(o){console.error("Failed to load posts:",o),a.innerHTML='<p style="text-align:center;color:rgba(0,0,0,0.4);">Could not load posts.</p>'}}function t(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}r();
