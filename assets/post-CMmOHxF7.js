import"./callOnAll-DvltWELv.js";async function M(){const s=new URLSearchParams(window.location.search).get("slug"),r=document.getElementById("post-header"),n=document.getElementById("post-body");if(!s){r.innerHTML="<h1>Post not found</h1>",n.innerHTML="<p>No slug provided.</p>";return}try{const[i,p]=await Promise.all([fetch("../blog/posts.json"),fetch("../assets/games.json")]),g=await i.json(),m=await p.json(),e=g.find(o=>o.slug===s);if(!e){r.innerHTML="<h1>Post not found</h1>",n.innerHTML=`<p>No post with slug "${s}".</p>`;return}const h=Object.fromEntries(m.map(o=>[o.id,o])),a=e.gameId?h[e.gameId]:null;document.title=`${e.title} — Advay.dev`;const f=a?`
      <a class="post-cartridge post-cartridge-lg"
         href="${t(a.itchUrl)}"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Play ${t(a.name)} on itch.io">
        <div class="post-cartridge-image">
          <img src="../assets/images/games/${t(a.id)}.png"
               alt="${t(a.name)}"
               onerror="this.style.display='none'">
        </div>
        <div class="post-cartridge-title">${t(a.name)}</div>
      </a>
    `:"";r.innerHTML=`
      <div class="post-header-text">
        ${e.category?`<span class="post-category">${t(e.category)}</span>`:""}
        <h1>${t(e.title)}</h1>
        <p class="post-meta">${t(e.displayDate)} · ${t(e.readTime)} · ${t(e.topic)}</p>
      </div>
      ${f}
    `;const c=await fetch(`../blog/posts/${s}.md`);if(!c.ok)throw new Error(`Markdown file not found: ${s}.md`);if((c.headers.get("content-type")||"").includes("text/html"))throw new Error(`Server returned HTML for ${s}.md.`);const u=await c.text();marked.setOptions({breaks:!1,gfm:!0,headerIds:!1,mangle:!1});let l=marked.parse(u);l=l.replace(/(<img\s+[^>]*src=")((?!https?:|\/|data:)[^"]+)(")/g,(o,$,w,y)=>`${$}../${w}${y}`),n.innerHTML=l}catch(i){console.error("Failed to load post:",i),r.innerHTML="<h1>Something went wrong</h1>",n.innerHTML="<p>Could not load this post.</p>"}}function t(d){return String(d).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}M();
