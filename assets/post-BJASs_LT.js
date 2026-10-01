import"./callOnAll-DvltWELv.js";async function M(){const s=new URLSearchParams(window.location.search).get("slug"),n=document.getElementById("post-header"),r=document.getElementById("post-body");if(!s){n.innerHTML="<h1>Post not found</h1>",r.innerHTML="<p>No slug provided.</p>";return}try{const[i,g]=await Promise.all([fetch("../blog/posts.json"),fetch("../assets/games.json")]),m=await i.json(),h=await g.json(),t=m.find(o=>o.slug===s);if(!t){n.innerHTML="<h1>Post not found</h1>",r.innerHTML=`<p>No post with slug "${s}".</p>`;return}const u=Object.fromEntries(h.map(o=>[o.id,o])),a=t.gameId?u[t.gameId]:null;document.title=`${t.title} — Advay.dev`;const f=a?`
      <a class="post-cartridge post-cartridge-lg"
         href="${e(a.itchUrl)}"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Play ${e(a.name)} on itch.io">
        <div class="post-cartridge-image">
          <img src="../assets/images/games/${e(a.id)}.png"
               alt="${e(a.name)}"
               onerror="this.style.display='none'">
        </div>
        <div class="post-cartridge-title">${e(a.name)}</div>
      </a>
    `:"";n.innerHTML=`
      <div class="post-header-text">
        ${t.category?`<span class="post-category">${e(t.category)}</span>`:""}
        <h1>${e(t.title)}</h1>
        <p class="post-meta">${e(t.displayDate)} · ${e(t.readTime)} · ${e(t.topic)}</p>
      </div>
      ${f}
    `;const d=await fetch(`../blog/posts/${s}.md`);if(!d.ok)throw new Error(`Markdown file not found: ${s}.md`);if((d.headers.get("content-type")||"").includes("text/html"))throw new Error(`Server returned HTML for ${s}.md.`);const y=await d.text(),$={"@context":"https://schema.org","@type":"BlogPosting",headline:t.title,datePublished:t.date,author:{"@id":"https://advay.dev/#person"},publisher:{"@id":"https://advay.dev/#person"},mainEntityOfPage:`https://advay.dev/blog/post.html?slug=${s}`},l=document.createElement("script");l.type="application/ld+json",l.textContent=JSON.stringify($),document.head.appendChild(l),marked.setOptions({breaks:!1,gfm:!0,headerIds:!1,mangle:!1});let c=marked.parse(y);c=c.replace(/(<img\s+[^>]*src=")((?!https?:|\/|data:)[^"]+)(")/g,(o,v,w,b)=>`${v}../${w}${b}`),r.innerHTML=c}catch(i){console.error("Failed to load post:",i),n.innerHTML="<h1>Something went wrong</h1>",r.innerHTML="<p>Could not load this post.</p>"}}function e(p){return String(p).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}M();
