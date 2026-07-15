document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('.fa');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const themeStorageKey = 'victor-youdom-theme';

    const readSavedTheme = () => {
        try {
            const savedTheme = window.localStorage.getItem(themeStorageKey);
            return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : null;
        } catch {
            return null;
        }
    };

    const saveTheme = (theme) => {
        try {
            window.localStorage.setItem(themeStorageKey, theme);
        } catch {
            // The selected theme still works for this page view when storage is unavailable.
        }
    };

    let savedTheme = readSavedTheme();

    const currentTheme = () => savedTheme || (systemTheme.matches ? 'dark' : 'light');

    const updateThemeToggle = (theme) => {
        if (!themeToggle || !themeIcon) {
            return;
        }

        const isDark = theme === 'dark';
        const nextTheme = isDark ? 'light' : 'dark';

        themeIcon.classList.toggle('fa-sun-o', !isDark);
        themeIcon.classList.toggle('fa-moon-o', isDark);
        themeToggle.dataset.currentTheme = theme;
        themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        themeToggle.setAttribute('title', `Switch to ${nextTheme} theme`);
    };

    if (savedTheme) {
        document.documentElement.dataset.theme = savedTheme;
    }

    updateThemeToggle(currentTheme());

    themeToggle?.addEventListener('click', () => {
        savedTheme = currentTheme() === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = savedTheme;
        saveTheme(savedTheme);
        updateThemeToggle(savedTheme);
    });

    systemTheme.addEventListener('change', () => {
        if (!savedTheme) {
            updateThemeToggle(currentTheme());
        }
    });

    const navbarBurgers = document.querySelectorAll('.navbar-burger');

    navbarBurgers.forEach((burger) => {
        const targetId = burger.dataset.target;
        const target = document.getElementById(targetId);

        if (!target) {
            return;
        }

        const setMenuState = (isOpen) => {
            burger.classList.toggle('is-active', isOpen);
            target.classList.toggle('is-active', isOpen);
            burger.setAttribute('aria-expanded', String(isOpen));
            burger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        };

        burger.addEventListener('click', () => {
            setMenuState(!burger.classList.contains('is-active'));
        });

        target.querySelectorAll('.navbar-item').forEach((link) => {
            link.addEventListener('click', () => setMenuState(false));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && burger.classList.contains('is-active')) {
                setMenuState(false);
                burger.focus();
            }
        });
    });
});
