function includeHTML() {
    const promises = [];
    const elements = document.querySelectorAll('[w3-include-html]');

    elements.forEach(el => {
        const file = el.getAttribute('w3-include-html');
        if (file) {
            const promise = fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    el.innerHTML = data;
                    el.removeAttribute('w3-include-html');
                })
                .catch(error => {
                    console.error('Error including HTML:', error);
                    el.innerHTML = 'Page not found.';
                });
            promises.push(promise);
        }
    });

    return Promise.all(promises);
}