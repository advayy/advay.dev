import"./callOnAll-CicWmXiM.js";async function y(){const i=document.getElementById("project-grid");if(!i)return;let a;try{const t=await fetch("assets/projects.json");if(!t.ok)throw new Error(`HTTP ${t.status}`);a=await t.json()}catch(t){console.error("Failed to load projects:",t),i.innerHTML='<p style="text-align:center;color:rgba(0,0,0,0.4);">Could not load projects.</p>';return}i.innerHTML=a.map((t,s)=>{const l=t.image&&t.image.trim()!=="",r=l?`<img src="${o(t.image)}" alt="${o(t.title)} preview" loading="lazy">`:"";return`
      <article class="project-folder" tabindex="0" data-index="${s}">
        <div class="folder-body">
          <div class="${l?"folder-image-wrapper":"folder-image-wrapper empty-preview"}">${r}</div>
          <div class="folder-info">
            <h3>${o(t.title)}</h3>
            <p class="folder-tech">${o(t.cardStack||t.stack)}</p>
            <p class="folder-date">${o(t.date)}</p>
          </div>
        </div>
      </article>
    `}).join(""),p(a,i)}function p(i,a){const t=document.getElementById("project-modal");if(!t)return;const s=document.getElementById("dialog-title"),l=document.getElementById("dialog-image"),r=document.getElementById("dialog-date"),c=document.getElementById("dialog-stack"),u=document.getElementById("dialog-description"),d=document.getElementById("dialog-link"),f=document.getElementById("dialog-close"),g=e=>{e&&(s.textContent=e.modalTitle||e.title,e.image&&e.image.trim()!==""?(l.src=e.image,l.alt=e.title,l.style.display=""):(l.removeAttribute("src"),l.alt="",l.style.display="none"),r.textContent=e.date||"",c.textContent=e.stack||"",u.textContent=e.description||"",e.link&&e.link.trim()!==""?(d.href=e.link,d.textContent=e.linkText||"View Project",d.style.display="inline-block"):d.style.display="none",t.showModal())},m=e=>e.closest(".project-folder");a.addEventListener("click",e=>{const n=m(e.target);n&&g(i[Number(n.dataset.index)])}),a.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const n=m(e.target);n&&(e.preventDefault(),g(i[Number(n.dataset.index)]))}),f.addEventListener("click",()=>t.close()),t.addEventListener("click",e=>{const n=t.getBoundingClientRect();n.top<=e.clientY&&e.clientY<=n.top+n.height&&n.left<=e.clientX&&e.clientX<=n.left+n.width||t.close()})}function o(i){return String(i).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}y();
