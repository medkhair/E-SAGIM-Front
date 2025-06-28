(function () {
    "use strict";

    // Spinner
    const spinner = () => {
        setTimeout(() => {
            const spinnerEl = document.getElementById('spinner');
            if (spinnerEl) {
                spinnerEl.classList.remove('show');
            }
        }, 1);
    };
    spinner();

    // Back to top button
    window.addEventListener('scroll', () => {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
            backToTop.style.opacity = '1';
            backToTop.style.transition = 'opacity 0.5s';
        } else {
            backToTop.style.opacity = '0';
            setTimeout(() => {
                if (backToTop.style.opacity === '0') {
                    backToTop.style.display = 'none';
                }
            }, 500);
        }
    });

    document.querySelectorAll('.back-to-top').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Sidebar Toggler
    document.querySelectorAll('.sidebar-toggler').forEach(toggler => {
        toggler.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.sidebar, .content').forEach(el => {
                el.classList.toggle('open');
            });
        });
    });

    // Progress Bar (alternative to .waypoint using IntersectionObserver)
    const progressBars = document.querySelectorAll('.pg-bar');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.progress .progress-bar').forEach(bar => {
                        const value = bar.getAttribute('aria-valuenow');
                        if (value) {
                            bar.style.width = value + '%';
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2 // roughly 80% from bottom
        });

        progressBars.forEach(bar => {
            observer.observe(bar);
        });
    }
})();
