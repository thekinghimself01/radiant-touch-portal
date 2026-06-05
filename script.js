/* ==============================
   RADIANT TOUCH — PREMIUM JS
   ============================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ── PARTICLES ── */
    const particleContainer = document.getElementById('hero-particles');
    if (particleContainer) {
        const count = window.innerWidth < 768 ? 16 : 30;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 4 + 2;
            p.style.cssText = `
                left:${Math.random()*100}%;
                top:${Math.random()*100}%;
                width:${size}px; height:${size}px;
                animation-duration:${Math.random()*8+6}s;
                animation-delay:${Math.random()*-10}s;
                opacity:${Math.random()*0.5+0.2};
            `;
            particleContainer.appendChild(p);
        }
    }

    /* ── MOBILE MENU ── */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            });
        });
    }

    /* ── HEADER SCROLL EFFECT ── */
    const header = document.getElementById('site-header');
    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 80);
                ticking = false;
            });
            ticking = true;
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ── SMOOTH SCROLL ── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href');
            if (href === '#' || !href) return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ── SCROLL REVEAL ── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;
                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);
                revealObserver.unobserve(el);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
        // Stagger siblings within same parent
        const siblings = el.parentElement.querySelectorAll('.reveal');
        siblings.forEach((sib, idx) => {
            sib.dataset.delay = idx * 80;
        });
        revealObserver.observe(el);
    });

    /* ── LAZY LOAD BG IMAGES ── */
    const bgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.dataset.bg) {
                    el.style.backgroundImage = `url(${el.dataset.bg})`;
                    el.classList.add('loaded');
                }
                obs.unobserve(el);
            }
        });
    }, { rootMargin: '200px' });
    document.querySelectorAll('[data-bg]').forEach(el => bgObserver.observe(el));

    /* ── LAZY LOAD IMG ── */
    const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                obs.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));

    /* ── COUNTER ANIMATION ── */
    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.count, 10);
                const suffix = el.dataset.suffix || '';
                const duration = 1800;
                const start = performance.now();
                const animate = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(ease * target) + suffix;
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                obs.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

    /* ── RIPPLE EFFECT ── */
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const r = document.createElement('span');
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            r.style.cssText = `
                width:${size}px; height:${size}px;
                left:${e.clientX - rect.left - size/2}px;
                top:${e.clientY - rect.top - size/2}px;
            `;
            r.classList.add('ripple-effect');
            btn.appendChild(r);
            setTimeout(() => r.remove(), 700);
        });
    });

    /* ── SCROLL INDICATOR FADE ── */
    const scrollIndicator = document.getElementById('scroll-indicator');
    window.addEventListener('scroll', () => {
        if (scrollIndicator) {
            scrollIndicator.style.opacity = Math.max(1 - window.scrollY / 280, 0);
        }
    }, { passive: true });

    /* ── BACK TO TOP ── */
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.scrollY > 350);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ── FAQ ── */
    document.querySelectorAll('.faq-item').forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isOpen) item.classList.add('active');
        });
    });

    /* ── STAR RATING ── */
    const stars = document.querySelectorAll('.rating-input i');
    const ratingInput = document.getElementById('rating-value');
    if (stars.length && ratingInput) {
        const update = (val) => {
            stars.forEach(s => {
                const v = parseInt(s.dataset.value);
                s.classList.toggle('fas', v <= val);
                s.classList.toggle('far', v > val);
                s.style.color = v <= val ? '#f59e0b' : '#e2e8f0';
            });
        };
        stars.forEach(s => {
            s.addEventListener('mouseover', () => update(parseInt(s.dataset.value)));
            s.addEventListener('mouseout', () => update(parseInt(ratingInput.value) || 0));
            s.addEventListener('click', () => {
                ratingInput.value = s.dataset.value;
                update(parseInt(s.dataset.value));
                stars.forEach((star, i) => {
                    if (parseInt(star.dataset.value) <= parseInt(s.dataset.value)) {
                        star.style.transform = 'scale(1.3)';
                        setTimeout(() => star.style.transform = '', 220 + i * 30);
                    }
                });
            });
        });
    }

    /* ── MODAL ── */
    const modal = document.getElementById('rateModal');
    const openModal = () => { modal.classList.add('active'); document.body.style.overflow = 'hidden'; };
    const closeModal = () => { modal.classList.remove('active'); document.body.style.overflow = ''; };

    document.querySelectorAll('.rate-us-btn, .open-rate-modal').forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
    document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => btn.addEventListener('click', closeModal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });

    /* ── FORM SUBMIT STATES ── */
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            const btn = form.querySelector('button[type="submit"]');
            if (!btn) return;
            const text = btn.querySelector('.btn-text');
            const loader = btn.querySelector('.loader');
            if (text && loader) {
                text.style.display = 'none';
                loader.style.display = 'inline-block';
                btn.disabled = true;
            }
        });
    });

    /* ── NAV ACTIVE STATE ── */
    const sections = document.querySelectorAll('section[id]');
    const navAs = document.querySelectorAll('.nav-links a[href^="#"]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navAs.forEach(a => a.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { threshold: 0.4 });
    sections.forEach(s => navObserver.observe(s));

    console.log('%c✨ Radiant Touch — Developed by GrowithAI', 'color:#1a9ee5; font-size:14px; font-weight:bold;');
});

/* ── SERVICE WORKER ── */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
}
