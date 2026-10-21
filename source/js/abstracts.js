// Configure MathJax before the local bundle loads. Render only visible abstracts.
window.MathJax = {
    tex: {
        inlineMath: [['\\(', '\\)'], ['$', '$']],
        displayMath: [['\\[', '\\]'], ['$$', '$$']],
        // Paper-specific notation: number of parties and proving threshold.
        macros: {
            ttn: 'n',
            ttt: 't'
        }
    },
    svg: { fontCache: 'local' },
    options: { enableMenu: false },
    startup: { typeset: false }
};

document.addEventListener('DOMContentLoaded', () => {
    const rendered = new WeakSet();
    let typesetting = Promise.resolve();

    document.querySelectorAll('.paper-abstract').forEach((disclosure, index) => {
        const body = disclosure.querySelector('.abstract-body');
        const summary = disclosure.querySelector('summary');
        const actions = disclosure.closest('li')?.querySelector('.resource-actions');
        let toggle;

        if (body && summary && actions) {
            // Keep the native summary as a fallback when JavaScript is unavailable.
            body.id ||= `paper-abstract-${index + 1}`;
            toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = summary.className;
            toggle.innerHTML = summary.innerHTML;
            toggle.setAttribute('aria-controls', body.id);
            toggle.setAttribute('aria-expanded', String(disclosure.open));
            toggle.addEventListener('click', () => {
                disclosure.open = !disclosure.open;
                toggle.setAttribute('aria-expanded', String(disclosure.open));
            });
            actions.append(toggle);
            summary.hidden = true;
        }

        const renderAbstract = () => {
            toggle?.setAttribute('aria-expanded', String(disclosure.open));
            if (!disclosure.open || !body || rendered.has(body)) {
                return;
            }

            // Serialize work when several abstracts are opened in quick succession.
            typesetting = typesetting.then(async () => {
                await window.MathJax.startup.promise;
                if (!disclosure.open || rendered.has(body)) {
                    return;
                }
                await window.MathJax.typesetPromise([body]);
                rendered.add(body);
            }).catch((error) => {
                // Native disclosure and the original text remain usable on failure.
                console.error('Could not typeset abstract mathematics:', error);
            });
        };

        disclosure.addEventListener('toggle', renderAbstract);
        renderAbstract();
    });
});
