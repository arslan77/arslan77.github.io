/* ===========================================================
   Arslan Arshad — Portfolio interactions
   =========================================================== */
(function () {
    'use strict';

    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Theme ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme')
        || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        const icon = themeToggle && themeToggle.querySelector('i');
        if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', next);
            applyTheme(next);
        });
    }

    /* ---------- Mobile menu ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    function closeMenu() {
        if (!navLinks) return;
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('i').className = 'fas fa-bars';
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            const open = navLinks.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(open));
            menuToggle.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
        });
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    /* ---------- Smooth scroll for in-page anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#' || id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    });

    /* ---------- Scroll reveal ---------- */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }

    /* ---------- Animated stat counters ---------- */
    const counters = document.querySelectorAll('.stat-number');
    function runCounter(el) {
        const target = parseInt(el.getAttribute('data-target'), 10) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        if (prefersReducedMotion) { el.textContent = target + suffix; return; }
        const duration = 1200;
        const start = performance.now();
        function tick(now) {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(function (c) { statObserver.observe(c); });
    } else {
        counters.forEach(runCounter);
    }

    /* ---------- Nav state, active links, back-to-top ---------- */
    const nav = document.getElementById('nav');
    const backToTop = document.getElementById('backToTop');
    const sections = document.querySelectorAll('main section[id]');
    const linkMap = {};
    document.querySelectorAll('.nav-link').forEach(function (link) {
        linkMap[link.getAttribute('href')] = link;
    });

    let ticking = false;
    function onScroll() {
        const y = window.pageYOffset;

        if (nav) nav.classList.toggle('scrolled', y > 8);
        if (backToTop) backToTop.classList.toggle('visible', y > 600);

        let current = '';
        sections.forEach(function (section) {
            if (y >= section.offsetTop - 120) current = section.id;
        });
        Object.keys(linkMap).forEach(function (href) {
            linkMap[href].classList.toggle('active', href === '#' + current);
        });
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        });
    }

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    console.log('%cArslan Arshad — Senior Software Engineer', 'color:#4f46e5;font-size:14px;font-weight:600;');
})();
