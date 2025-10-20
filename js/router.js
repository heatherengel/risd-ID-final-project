// router.js

(() => {
    const main = document.querySelector('#main');
    if (!main) return;

    async function loadIntoMain(url, { push = true } = {}) {
        const resp = await fetch(url, { headers: { 'X-Requested-With': 'fetch' } });
        if (!resp.ok) throw new Error(`Failed to load ${url}`);
        const html = await resp.text();

    main.innerHTML = html;
    bindPartialLinks(main);

    if (push) {
        history.pushState({ partial: true, url }, '', '#' + url);
    }

    main.scrollTop = 0;
    window.scrollTo(0, 0);
  }

    function bindPartialLinks(scope = document) {
        scope.querySelectorAll('a[data-partial]').forEach(a => {
            if (a.__boundPartial) return;
            a.__boundPartial = true;

            a.addEventListener('click', (e) => {
                const href = a.getAttribute('href');
                if (!href || /^(mailto:|tel:|https?:\/\/)/i.test(href)) return;

                e.preventDefault();
                loadIntoMain(href).catch(() => (window.location.href = href));
            });
        });
     }

    window.addEventListener('popstate', (e) => {
        const url = (e.state && e.state.url) || defaultPage;
        loadIntoMain(url, { push: false }).catch(() => window.location.reload());
    });

    const defaultPage = 'pages/home.html';
    const initial = location.hash ? location.hash.slice(1) : defaultPage;

    loadIntoMain(initial, { push: false })
        .catch(() => { });

    bindPartialLinks(document);
})();