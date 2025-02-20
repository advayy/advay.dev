document.addEventListener("DOMContentLoaded", () => {
    loadGallery("Amoebash");
  });
  
  async function loadGallery(collection) {
    const galleryTitle = document.getElementById("gallery-title");
    const artworkGrid = document.getElementById("artwork-grid");
  
    galleryTitle.textContent = collection.replace("-", " ");
    artworkGrid.innerHTML = "";
  
    try {
      const response = await fetch(`assets/pixel-art/${collection}.json`);
      const images = await response.json();
  
      images.forEach(fileName => {
        const imgPath = `assets/pixel-art/${collection}/${fileName}`;
        const img = document.createElement("img");
        img.src = imgPath;
        img.alt = fileName;
        img.classList.add("artwork");
  
        img.onerror = () => img.remove();
        artworkGrid.appendChild(img);
      });
    } catch (error) {
      console.error("Error loading gallery:", error);
    }
  }
  
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  document.body.appendChild(overlay);
  
  document.getElementById('artwork-grid').addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {

      const centeredImg = event.target.cloneNode();
      centeredImg.classList.add('centered-image');
  
      document.body.appendChild(centeredImg);
  
      overlay.classList.add('active');
  
      overlay.addEventListener('click', function() {
        centeredImg.remove();
        overlay.classList.remove('active');
      });
    }
  });
  