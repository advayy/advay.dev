import"./callOnAll-BJ1NXt9b.js";const l="assets/images/games/";async function c(){const s=document.getElementById("game-grid");if(s)try{const t=await(await fetch("assets/games.json")).json();s.innerHTML=t.map(e=>{const r=`${l}${e.id}.png`;return`
        <a class="game-cell"
           href="${a(e.itchUrl)}"
           target="_blank"
           rel="noopener noreferrer"
           aria-label="Play ${a(e.name)} on itch.io">
          <div class="game-thumb">
            <img src="${a(r)}" alt="${a(e.name)}">
          </div>
          <div class="game-info">
            <h3>${a(e.name)}</h3>
            <p class="game-meta">${a(e.description)}</p>
            <p class="game-meta"><span class="genre">${a(e.genre)}</span></p>
            <span class="play-badge">Play on Itch.io</span>
          </div>
        </a>
      `}).join("")}catch(n){console.error("Failed to load games:",n),s.innerHTML='<p style="text-align:center;color:rgba(0,0,0,0.4);">Could not load games.</p>'}}function a(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}c();
