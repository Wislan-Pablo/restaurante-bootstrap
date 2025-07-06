(function NavHighlighterPlugin() {

    const links = document.querySelectorAll('#navMenu a');
    const sections = [...document.querySelectorAll('.section')];
    const activeClass = 'active';

    // Inicializa o link #home como ativo ao carregar a página
    function initializeActiveLink() {
        const homeLink = document.querySelector('#navMenu a[href="#home"]');
        if (homeLink) {
            homeLink.classList.add(activeClass);
        }
    }

    // Scroll suave + destaque no clique
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault(); // Evita o salto instantâneo
            const targetId = link.getAttribute('href').substring(1); // Remove o "#"
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                updateActiveLink(link);
            }
        });
    });

    function updateActiveLink(activeLink) {
        links.forEach(l => l.classList.remove(activeClass));
        if (activeLink) activeLink.classList.add(activeClass);
    }

    function detectSectionInView() {
        const midpoint = (window.innerHeight / 2);

        for (let section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= midpoint && rect.bottom >= midpoint) {
                const id = section.id;
                const activeLink = document.querySelector(`#navMenu a[href="#${id}"]`);
                updateActiveLink(activeLink);
                break;
            }
        }
    }

    // Chama a inicialização ao carregar a página
    initializeActiveLink();

    window.addEventListener('scroll', detectSectionInView);
})();
