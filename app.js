const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // console.log(entry);
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElems = document.querySelectorAll('.hidden');
hiddenElems.forEach((el) => {observer.observe(el)});
