// Main JavaScript file for CMS
console.log("Main_v1.js loaded");

/* Global variable to hold app wrapper contents */
document.addEventListener("DOMContentLoaded", () => {
    // Inject the app wrapper structure
    const root = document.querySelector('.cms-content-root');
    if (!root) return;

    root.innerHTML = `
        <div class="app-wrapper">
            <!-- HeroSlider will go here -->
            <div id="hero-slider-container"></div>
            <!-- InteractiveGrid will go here -->
            <div id="interactive-grid-container" class="scroll-fade-up"></div>
            <!-- StickyHorizontalScroll will go here -->
            <div id="sticky-horizontal-scroll-container" class="scroll-fade-up"></div>
            <!-- DynamicToggle will go here -->
            <div id="dynamic-toggle-container" class="scroll-fade-up"></div>
            <!-- CommunityCards will go here -->
            <div id="community-cards-container" class="scroll-fade-up"></div>
            <!-- TabbedGallery will go here -->
            <div id="tabbed-gallery-container" class="scroll-fade-up"></div>
            <!-- Footer will go here -->
            <div id="footer-container"></div>
        </div>
    `;

    initHeroSlider();
});

function initHeroSlider() {
    const container = document.getElementById('hero-slider-container');
    if (!container) return;

    // Use placeholder images as per instructions or external urls if kept
    // We update to /UserData/yeram/Layouts/yeram_Layout_temp/images/ if they were local,
    // but these are external so we keep them or point to placeholder if requested.
    // The prompt says: "외부 URL(http...)은 유지하고, 로컬 에셋은 /UserData/... 경로로 변환하세요."
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1768569391908-5c92c83744f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGVtcHR5JTIwcGV3cyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzMyMjUxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
            title: "은혜의 빛으로",
            subtitle: "Grace Community Church"
        },
        {
            image: "https://images.unsplash.com/photo-1589198234915-b57a9ad85d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRoZWRyYWwlMjBzdGFpbmVkJTIwZ2xhc3MlMjB3aW5kb3clMjBsaWdodHxlbnwxfHx8fDE3NzMyMjUxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
            title: "함께 걷는 믿음의 길",
            subtitle: "Walking Together in Faith"
        }
    ];

    container.innerHTML = `
        <section class="hero-slider">
            <div id="hero-slides-wrapper">
                <!-- Slides will be injected here -->
            </div>

            <!-- CI Symbol -->
            <div class="hero-ci-symbol">
                <div class="hero-ci-logo-wrap">
                    <div class="hero-ci-logo-box">
                        <span class="hero-ci-logo-text">GCC</span>
                    </div>
                    <span class="hero-ci-church-name">Grace Community Church</span>
                </div>
                <nav class="hero-nav">
                    <a href="#" class="hero-nav-item">교회소개</a>
                    <a href="#" class="hero-nav-item">예배안내</a>
                    <a href="#" class="hero-nav-item">말씀</a>
                    <a href="#" class="hero-nav-item">커뮤니티</a>
                    <a href="#" class="hero-nav-item">오시는 길</a>
                    <button class="hero-menu-btn" aria-label="메뉴" id="hero-menu-open-btn">
                        <span class="hero-menu-btn-bar"></span>
                        <span class="hero-menu-btn-bar"></span>
                        <span class="hero-menu-btn-bar"></span>
                    </button>
                </nav>
            </div>

            <!-- Mega Menu Placeholder -->
            <div id="mega-menu-container"></div>

            <!-- Pagination -->
            <div class="hero-pagination">
                <button class="hero-page-btn" id="hero-prev-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div class="hero-page-indicator">
                    <span class="hero-page-current" id="hero-current-text">01</span>
                    <span class="hero-page-divider">/</span>
                    <span class="hero-page-total" id="hero-total-text">02</span>
                </div>
                <button class="hero-page-btn" id="hero-next-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </section>
    `;

    const slidesWrapper = document.getElementById('hero-slides-wrapper');
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    const currentText = document.getElementById('hero-current-text');
    const totalText = document.getElementById('hero-total-text');

    let current = 0;
    let isAnimating = false;
    totalText.textContent = String(slides.length).padStart(2, '0');

    function renderSlide(index, enterClass, exitClass, oldIndex) {
        if (isAnimating) return;
        isAnimating = true;

        const newSlide = document.createElement('div');
        newSlide.className = `hero-slide ${enterClass}`;
        newSlide.innerHTML = `<div class="hero-slide-bg" style="background-image: url('${slides[index].image}');"></div>`;
        slidesWrapper.appendChild(newSlide);

        // Force reflow
        void newSlide.offsetWidth;

        newSlide.classList.remove(enterClass);
        newSlide.classList.add('active');

        const oldSlides = slidesWrapper.querySelectorAll('.hero-slide:not(:last-child)');
        oldSlides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.add(exitClass);
            setTimeout(() => {
                slide.remove();
            }, 800);
        });

        setTimeout(() => {
            isAnimating = false;
        }, 800);

        current = index;
        currentText.textContent = String(current + 1).padStart(2, '0');
    }

    // Initial render
    const initSlide = document.createElement('div');
    initSlide.className = 'hero-slide active';
    initSlide.innerHTML = `<div class="hero-slide-bg" style="background-image: url('${slides[current].image}');"></div>`;
    slidesWrapper.appendChild(initSlide);

    const nextSlide = () => {
        if (isAnimating) return;
        const nextIndex = (current + 1) % slides.length;
        renderSlide(nextIndex, 'enter-right', 'exit-left', current);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        const prevIndex = (current - 1 + slides.length) % slides.length;
        renderSlide(prevIndex, 'enter-left', 'exit-right', current);
    };

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    let autoplayInterval = setInterval(nextSlide, 5000);

    // Re-setup interval on manual interaction to prevent quick skips
    [nextBtn, prevBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(nextSlide, 5000);
        });
    });

    // Call initMegaMenu
    if (typeof initMegaMenu === 'function') {
        initMegaMenu();
    }
}

function initMegaMenu() {
    const container = document.getElementById('mega-menu-container');
    if (!container) return;

    const menuData = [
        {
            title: "교회소개",
            items: [
                { label: "인사말" },
                { label: "섬기는 사람들", children: ["교역자", "장로", "교회직원"] },
                { label: "예배시간 안내" },
                { label: "새가족 안내" },
                { label: "CI 심볼" },
                { label: "오시는 길" }
            ]
        },
        {
            title: "말씀",
            items: [
                { label: "주일 낮 예배" },
                { label: "주일 찬양 예배" },
                { label: "수요말씀사경회" },
                { label: "금요성령기도회" },
                { label: "특별행사" }
            ]
        },
        {
            title: "찬양",
            items: [
                { label: "시온찬양대" },
                { label: "노엘찬양대" },
                { label: "임마누엘찬양대" },
                { label: "호산나찬양대" },
                { label: "찬양단" },
                { label: "봉헌송 및 특별찬양" }
            ]
        },
        {
            title: "다음세대",
            items: [
                { label: "영유아부" },
                { label: "유치부" },
                { label: "유년부" },
                { label: "소년부" },
                { label: "중등부" },
                { label: "고등부" },
                { label: "청년부" }
            ]
        },
        {
            title: "공동체 (기관)",
            items: [
                { label: "은장회 / 안수집사회 / 남선교회" },
                { label: "부디아곱사회 / 여선교회" },
                { label: "예람유치원" },
                { label: "예람수양관" },
                { label: "한국기독교선교박물관" }
            ]
        },
        {
            title: "팀사역",
            items: [
                { label: "국내선교" },
                { label: "해외선교" },
                { label: "문화사역", children: ["아기학교", "탈무드창의영재학교", "토요음악교실", "A.I스쿨"] },
                { label: "예람전도대" },
                { label: "새가족 양육" },
                { label: "중보기도대" },
                { label: "늘푸른대학" },
                { label: "사회봉사" }
            ]
        },
        {
            title: "온라인행정",
            items: [
                { label: "차량예약" },
                { label: "장소예약" },
                { label: "비품수리신청" },
                { label: "증명서 발급" }
            ]
        },
        {
            title: "나눔터",
            items: [
                { label: "공지사항" },
                { label: "주보" },
                { label: "행사앨범" },
                { label: "새가족앨범" },
                { label: "방송자막요청" },
                { label: "선교지소식" },
                { label: "교무사업체" }
            ]
        }
    ];

    let gridHtml = '';
    menuData.forEach((cat, idx) => {
        let itemsHtml = '';
        cat.items.forEach(item => {
            if (item.children && item.children.length > 0) {
                let childHtml = '';
                item.children.forEach(child => {
                    childHtml += `<li><a href="#" class="mega-menu-sub-link">${child}</a></li>`;
                });
                itemsHtml += `
                    <li>
                        <button class="mega-menu-sub-btn">
                            <span>${item.label}</span>
                            <svg class="mega-menu-sub-icon" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                        <ul class="mega-menu-sub-list">
                            ${childHtml}
                        </ul>
                    </li>
                `;
            } else {
                itemsHtml += `
                    <li>
                        <a href="#" class="mega-menu-link">${item.label}</a>
                    </li>
                `;
            }
        });

        gridHtml += `
            <div class="mega-menu-category" style="transition-delay: ${0.1 + idx * 0.04}s;">
                <h3 class="mega-menu-cat-title">${cat.title}</h3>
                <ul class="mega-menu-list">
                    ${itemsHtml}
                </ul>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="mega-menu-overlay" id="mega-menu-overlay">
            <div class="mega-menu-header">
                <div class="hero-ci-logo-wrap">
                    <div class="mega-menu-ci-box">
                        <span class="mega-menu-ci-text">GCC</span>
                    </div>
                    <span class="mega-menu-church-name">Grace Community Church</span>
                </div>
                <button class="mega-menu-close-btn" id="mega-menu-close-btn" aria-label="닫기">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <path d="M6 6L22 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M22 6L6 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                </button>
            </div>

            <div class="mega-menu-grid-wrap">
                <div class="mega-menu-grid">
                    ${gridHtml}
                </div>
            </div>

            <div class="mega-menu-footer">
                <div class="mega-menu-footer-inner">
                    <span class="mega-menu-footer-text">&copy; 2026 동래중앙교회</span>
                    <span class="mega-menu-footer-text">Tel. 051-555-1234</span>
                </div>
            </div>
        </div>
    `;

    const openBtn = document.getElementById('hero-menu-open-btn');
    const closeBtn = document.getElementById('mega-menu-close-btn');
    const overlay = document.getElementById('mega-menu-overlay');

    if (openBtn && closeBtn && overlay) {
        openBtn.addEventListener('click', () => {
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });

        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        });
    }

    // Toggle logic for sub menus
    const subBtns = document.querySelectorAll('.mega-menu-sub-btn');
    subBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const list = btn.nextElementSibling;
            if (btn.classList.contains('open')) {
                btn.classList.remove('open');
                list.style.height = '0px';
                list.style.opacity = '0';
                list.classList.remove('open');
            } else {
                btn.classList.add('open');
                list.classList.add('open');
                // Calculate and set height for transition
                const height = list.scrollHeight;
                list.style.height = height + 'px';
                list.style.opacity = '1';
                // Reset to auto after transition for flexibility
                setTimeout(() => {
                    if (list.classList.contains('open')) {
                        list.style.height = 'auto';
                    }
                }, 300);
            }
        });
    });
}

function initInteractiveGrid() {
    const container = document.getElementById('interactive-grid-container');
    if (!container) return;

    // Notice bg image from original source was an imported asset, we use a placeholder or the provided format
    // Replace with provided format if given
    const noticeBg = "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80";
    const welcomeBg = "https://images.unsplash.com/photo-1501082123646-4978a639c397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaHVyY2glMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsfGVufDF8fHx8MTc3MzIyNTE1Nnww&ixlib=rb-4.1.0&q=80&w=1080";

    const svgUserPlus = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`;
    const svgClock = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const svgMapPin = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;

    const svgMegaphone = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`;
    const svgNewspaper = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`;
    const svgFileText = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;

    container.innerHTML = `
        <section class="igrid-section">
            <div class="igrid-container">
                <!-- Welcome Card -->
                <div class="igrid-card welcome">
                    <div class="igrid-bg" style="background-image: url('${welcomeBg}');"></div>
                    <div class="igrid-overlay"></div>
                    <div class="igrid-content">
                        <p class="igrid-label">Welcome</p>
                        <h3 class="igrid-title">처음오셨나요?</h3>
                        <div class="igrid-desc-wrap">
                            <p class="igrid-desc">동래중앙교회에 오신것을 환영합니다.<br>온 열방을 향하여 복음을 힘써 전하는 건강한 교회,<br>동래중앙교회입니다.</p>
                        </div>
                        <div class="igrid-links-wrap">
                            <button class="igrid-link-btn">
                                <div class="igrid-icon-box">${svgUserPlus}</div>
                                <span class="igrid-link-text">새가족 안내<span class="igrid-link-underline"></span></span>
                            </button>
                            <button class="igrid-link-btn">
                                <div class="igrid-icon-box">${svgClock}</div>
                                <span class="igrid-link-text">예배시간 안내<span class="igrid-link-underline"></span></span>
                            </button>
                            <button class="igrid-link-btn">
                                <div class="igrid-icon-box">${svgMapPin}</div>
                                <span class="igrid-link-text">오시는 길<span class="igrid-link-underline"></span></span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Notice Card -->
                <div class="igrid-card notice">
                    <div class="igrid-bg" style="background-image: url('${noticeBg}');"></div>
                    <div class="igrid-overlay"></div>
                    <div class="igrid-content">
                        <p class="igrid-label">Notice</p>
                        <h3 class="igrid-title">성도를 위한 안내</h3>
                        <div class="igrid-desc-wrap">
                            <p class="igrid-desc">교회의 주요 공지사항 및<br>예배를 위한 주보를 편하게 확인해보시기 바랍니다.</p>
                        </div>
                        <div class="igrid-links-wrap">
                            <button class="igrid-link-btn">
                                <div class="igrid-icon-box">${svgMegaphone}</div>
                                <span class="igrid-link-text">공지사항<span class="igrid-link-underline"></span></span>
                            </button>
                            <button class="igrid-link-btn">
                                <div class="igrid-icon-box">${svgNewspaper}</div>
                                <span class="igrid-link-text">주보<span class="igrid-link-underline"></span></span>
                            </button>
                            <button class="igrid-link-btn">
                                <div class="igrid-icon-box">${svgFileText}</div>
                                <span class="igrid-link-text">방송자막요청<span class="igrid-link-underline"></span></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    // Other inits might be called in the single event listener
    initInteractiveGrid();
});

function initStickyHorizontalScroll() {
    const container = document.getElementById('sticky-horizontal-scroll-container');
    if (!container) return;

    const cardsData = [
        {
            title: "주일 낮예배",
            sermon: "예수께서 머물고 부르시는 그 곳에",
            verse: "마가복음10장46-52절",
            pastor: "정대훈 목사",
            date: "2026.03.08",
            image: "https://images.unsplash.com/photo-1728062816724-57b626d1affc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHNreSUyMGNsb3VkcyUyMHN1bmxpZ2h0fGVufDF8fHx8MTc3MzIzNTU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            title: "주일 찬양 예배",
            sermon: "익숙함의 늪을 떠나",
            verse: "누가복음 9장57-62절",
            pastor: "강신영 목사",
            date: "2026.03.08",
            image: "https://images.unsplash.com/photo-1747079310346-1eb40f39bde0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBzdW5zZXQlMjBjbG91ZHMlMjBuYXR1cmV8ZW58MXx8fHwxNzczMjM1NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            title: "수요말씀사경회",
            sermon: "우리가 남이가",
            verse: "에베소서 2장11-22절",
            pastor: "박세영 목사",
            date: "2026.03.04",
            image: "https://images.unsplash.com/photo-1768938360590-bf49368f0e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwd2hpdGUlMjBjbG91ZHMlMjBibHVlJTIwc2t5JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzczMjM1NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            title: "금요성령기도회",
            sermon: "금요성령기도회 입니다.",
            verse: "",
            pastor: "ooo 목사",
            date: "2026.03.13",
            image: "https://images.unsplash.com/photo-1655058402270-de7dd5838ed5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwZGFyayUyMGNsb3Vkc3xlbnwxfHx8fDE3NzMyMzU2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        }
    ];

    const svgArrowRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shs-arrow-icon"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

    let cardsHtml = '';
    cardsData.forEach(card => {
        const verseHtml = card.verse ? `<p class="shs-card-verse" style="color: var(--shs-meta-color)">${card.verse}</p>` : '';
        cardsHtml += `
            <div class="shs-card">
                <div class="shs-thumb-box">
                    <img src="${card.image}" alt="${card.title}" class="shs-thumb-img">
                </div>
                <div class="shs-card-content">
                    <p class="shs-card-title" style="color: var(--shs-subtitle-color)">${card.title}</p>
                    <h3 class="shs-card-sermon" style="color: var(--shs-title-color)">${card.sermon}</h3>
                    ${verseHtml}
                    <p class="shs-card-meta" style="color: var(--shs-meta-color)">${card.pastor} | ${card.date}</p>
                    <div class="shs-arrow-btn" style="background-color: var(--shs-arrow-bg)">
                        ${svgArrowRight}
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <section class="shs-section" id="shs-section">
            <div class="shs-sticky-wrap" id="shs-sticky-wrap">
                <div class="shs-header">
                    <span class="shs-label" style="color: var(--shs-accent-color)">Weekly Schedule</span>
                    <h2 class="shs-title" style="color: var(--shs-title-color)">예배와 모임</h2>
                </div>
                <div class="shs-scroll-wrap" id="shs-scroll-wrap">
                    ${cardsHtml}
                </div>
            </div>
        </section>
    `;

    const section = document.getElementById('shs-section');
    const stickyWrap = document.getElementById('shs-sticky-wrap');
    const scrollWrap = document.getElementById('shs-scroll-wrap');
    const cards = scrollWrap.querySelectorAll('.shs-card');

    function updateLayout() {
        const vw = window.innerWidth;
        const cardWidth = vw < 768 ? vw * 0.75 : vw < 1024 ? 420 : 600;
        const gap = vw < 768 ? 24 : vw < 1024 ? 32 : 48;
        const rightPadding = vw * 0.1;
        const sidepadding = vw < 768 ? 24 : vw < 1024 ? 40 : 64;

        cards.forEach(card => {
            card.style.width = cardWidth + 'px';
        });
        scrollWrap.style.gap = gap + 'px';

        let paddingLeft = `${sidepadding}px`;
        if (vw >= 1024) {
            // max(4rem, calc((100vw - 87.5rem) / 2 + 4rem))
            // 4rem = 64px, 87.5rem = 1400px
            const calc = (vw - 1400) / 2 + 64;
            paddingLeft = Math.max(64, calc) + 'px';
        }
        scrollWrap.style.paddingLeft = paddingLeft;

        const totalCardsWidth = cardsData.length * cardWidth + (cardsData.length - 1) * gap + rightPadding;
        const maxTranslate = Math.max(0, totalCardsWidth - vw + sidepadding);

        return maxTranslate;
    }

    let maxTranslate = updateLayout();

    window.addEventListener('resize', () => {
        maxTranslate = updateLayout();
        handleScroll();
    });

    function handleScroll() {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const containerHeight = section.offsetHeight;
        const windowH = window.innerHeight;
        const scrolled = -rect.top;
        const total = containerHeight - windowH;
        let progress = scrolled / total;
        progress = Math.max(0, Math.min(1, progress));

        // Horizontal transform logic
        let horizontalProgress = (progress - 0.15) / 0.55;
        horizontalProgress = Math.max(0, Math.min(1, horizontalProgress));
        const translateX = -horizontalProgress * maxTranslate;
        scrollWrap.style.transform = `translateX(${translateX}px)`;

        // Color transition logic
        let colorProgress = progress / 0.5;
        colorProgress = Math.max(0, Math.min(1, colorProgress));

        const bgR = Math.round(255 - colorProgress * (255 - 18));
        const bgG = Math.round(255 - colorProgress * (255 - 25));
        const bgB = Math.round(255 - colorProgress * (255 - 52));

        const textR = Math.round(26 + colorProgress * (245 - 26));
        const textG = Math.round(39 + colorProgress * (245 - 39));
        const textB = Math.round(68 + colorProgress * (245 - 68));

        const accentR = Math.round(43 + colorProgress * (120 - 43));
        const accentG = Math.round(93 + colorProgress * (180 - 93));
        const accentB = Math.round(140 + colorProgress * (230 - 140));

        stickyWrap.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`;
        stickyWrap.style.setProperty('--shs-title-color', `rgb(${textR}, ${textG}, ${textB})`);
        stickyWrap.style.setProperty('--shs-subtitle-color', `rgba(${textR}, ${textG}, ${textB}, 0.7)`);
        stickyWrap.style.setProperty('--shs-meta-color', `rgba(${textR}, ${textG}, ${textB}, 0.6)`);
        stickyWrap.style.setProperty('--shs-accent-color', `rgb(${accentR}, ${accentG}, ${accentB})`);

        const arrowBgColor = colorProgress > 0.5 ? `rgba(255,255,255,0.15)` : `rgb(26,39,68)`;
        stickyWrap.style.setProperty('--shs-arrow-bg', arrowBgColor);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
}

document.addEventListener("DOMContentLoaded", () => {
    // Other inits...
    if (typeof initStickyHorizontalScroll === 'function') {
        initStickyHorizontalScroll();
    }
});

function initDynamicToggle() {
    const container = document.getElementById('dynamic-toggle-container');
    if (!container) return;

    const categories = [
        {
            id: "next-gen",
            title: "다음세대",
            subtitle: "Next Generation",
            description: "미래의 주역인 영유아부터 청년까지, 하나님의 말씀 안에서 꿈을 키우고 건강하게 성장하는 신앙 교육 공동체입니다.",
            image: "https://images.unsplash.com/photo-1518130064817-2bcb096c1303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGFpcnBsYW5lJTIwZmx5aW5nJTIwYmx1ZSUyMHNreXxlbnwxfHx8fDE3NzMyMzgxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
            links: ["영유아부", "유치부", "유년부", "소년부", "중등부", "고등부", "청년부"]
        },
        {
            id: "ministry",
            title: "팀사역",
            subtitle: "Ministry",
            description: "국내외 선교, 문화 사역, 교육 및 봉사 등 각자의 은사에 맞춰 하나님의 사랑을 실천하고 세상을 섬기는 전문 사역 팀들의 모임입니다.",
            image: "https://images.unsplash.com/photo-1608782583532-c551f3a0e8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBwaW5rJTIwYmx1ZSUyMGNvdHRvbiUyMGNhbmR5JTIwc2t5JTIwc3Vuc2V0fGVufDF8fHx8MTc3MzIzODA4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
            links: ["국내선교", "해외선교", "문화사역", "예람전도대", "새가족 양육", "중보기도대", "늘푸른대학", "사회봉사"]
        },
        {
            id: "admin",
            title: "온라인 행정",
            subtitle: "Administration",
            description: "성도님들의 원활한 교회 활동을 위해 장소 및 차량 예약, 각종 증명서 발급 등을 언제 어디서나 간편하게 처리할 수 있는 지원 서비스입니다.",
            image: "https://images.unsplash.com/photo-1636569698616-94d5307b956b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjbG9zZXVwJTIwa2V5Ym9hcmQlMjBtaW5pbWFsJTIwY2xlYW58ZW58MXx8fHwxNzczMjM4MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
            links: ["차량예약", "장소예약", "비품수리신청", "증명서 발급"]
        }
    ];

    const CARD_HEIGHT_DESKTOP = 520;
    const CARD_HEIGHT_MOBILE = 720;
    const STACK_OFFSET = 24;
    const DWELL = 0.19;
    const TRANSITION = 0.15;
    const TIMELINE_END = 0.78;
    const scrollHeight = categories.length * 120 + 160;

    let cardsHtml = '';
    categories.forEach((cat, index) => {
        let linksHtml = '';
        cat.links.forEach(link => {
            linksHtml += `<button class="dt-link-btn">${link}</button>`;
        });

        cardsHtml += `
            <div class="dt-card" id="dt-card-${index}" style="z-index: ${index + 1};">
                <div class="dt-card-inner">
                    <div class="dt-img-wrap">
                        <img src="${cat.image}" alt="${cat.title}" class="dt-img">
                        <div class="dt-img-overlay"></div>
                    </div>
                    <div class="dt-info">
                        <span class="dt-info-subtitle">${cat.subtitle}</span>
                        <h3 class="dt-info-title">${cat.title}</h3>
                        <p class="dt-info-desc">${cat.description}</p>
                        <div class="dt-links">
                            ${linksHtml}
                        </div>
                        <div class="dt-more-wrap">
                            <button class="dt-more-btn">
                                <span class="dt-more-text">VIEW MORE</span>
                                <svg class="dt-more-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <section class="dt-section" id="dt-section" style="height: ${scrollHeight}vh;">
            <div class="dt-sticky-wrap">
                <div class="dt-content">
                    <div class="dt-header">
                        <span class="dt-label">Ministry</span>
                        <h2 class="dt-title">사역과 프로그램</h2>
                    </div>
                    <div class="dt-stack-container" id="dt-stack-container">
                        ${cardsHtml}
                    </div>
                </div>
            </div>
        </section>
    `;

    const section = document.getElementById('dt-section');
    const stackContainer = document.getElementById('dt-stack-container');
    const cards = [];
    categories.forEach((_, i) => {
        cards.push(document.getElementById(`dt-card-${i}`));
    });

    function getCardTimeline(index) {
        if (index === 0) {
            return { enterStart: -1, enterEnd: -1, dwellStart: 0, dwellEnd: DWELL, pushStart: DWELL, pushEnd: DWELL + TRANSITION };
        }
        const transitionStart = index * DWELL + (index - 1) * TRANSITION;
        const transitionEnd = transitionStart + TRANSITION;
        const dwellEnd = transitionEnd + DWELL;
        const nextPushStart = dwellEnd;
        const nextPushEnd = nextPushStart + TRANSITION;
        return { enterStart: transitionStart, enterEnd: transitionEnd, dwellStart: transitionEnd, dwellEnd: dwellEnd, pushStart: nextPushStart, pushEnd: Math.min(1, nextPushEnd) };
    }

    let isMobile = false;

    function handleResize() {
        isMobile = window.innerWidth < 768;
        const cardHeight = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP;
        stackContainer.style.height = `${cardHeight}px`;
        cards.forEach(card => card.style.height = `${cardHeight}px`);
        handleScroll();
    }

    function handleScroll() {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const sectionHeight = section.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrolled = -rect.top;
        const totalScrollable = sectionHeight - viewportHeight;
        let progress = scrolled / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));

        const mappedProgress = Math.min(1, progress / TIMELINE_END);
        const cardHeight = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP;

        cards.forEach((card, index) => {
            const timeline = getCardTimeline(index);
            let translateY = 0;
            let scale = 1;
            let opacity = 1;

            if (index === 0) {
                if (mappedProgress <= timeline.dwellEnd) {
                    translateY = 0; scale = 1; opacity = 1;
                } else if (mappedProgress <= timeline.pushEnd) {
                    const pushProgress = (mappedProgress - timeline.pushStart) / TRANSITION;
                    const p = Math.max(0, Math.min(1, pushProgress));
                    scale = 1 - p * 0.06;
                    translateY = -p * STACK_OFFSET;
                    opacity = 1 - p * 0.35;
                } else {
                    scale = 0.94; translateY = -STACK_OFFSET; opacity = 0;
                }
            } else {
                if (mappedProgress < timeline.enterStart) {
                    translateY = cardHeight + 80; opacity = 0;
                } else if (mappedProgress <= timeline.enterEnd) {
                    const enterProgress = (mappedProgress - timeline.enterStart) / TRANSITION;
                    const p = Math.max(0, Math.min(1, enterProgress));
                    const eased = 1 - Math.pow(1 - p, 3);
                    translateY = (1 - eased) * (cardHeight + 80);
                    opacity = 0.2 + eased * 0.8;
                } else if (mappedProgress <= timeline.dwellEnd) {
                    translateY = 0; scale = 1; opacity = 1;
                } else if (mappedProgress <= timeline.pushEnd && index < categories.length - 1) {
                    const pushProgress = (mappedProgress - timeline.pushStart) / TRANSITION;
                    const p = Math.max(0, Math.min(1, pushProgress));
                    scale = 1 - p * 0.06;
                    translateY = -p * STACK_OFFSET;
                    opacity = 1 - p * 0.35;
                } else if (index < categories.length - 1) {
                    scale = 0.94; translateY = -STACK_OFFSET; opacity = 0;
                } else {
                    translateY = 0; scale = 1; opacity = 1;
                }
            }

            card.style.transform = `translateY(${translateY}px) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.transition = "transform 0.1s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.1s cubic-bezier(0.25, 0.1, 0.25, 1)";
        });
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    handleResize(); // Initial setup
}

document.addEventListener("DOMContentLoaded", () => {
    // Other inits...
    if (typeof initDynamicToggle === 'function') {
        initDynamicToggle();
    }
});

function initCommunityCards() {
    const container = document.getElementById('community-cards-container');
    if (!container) return;

    const cards = [
        {
            id: 1,
            title: "은장회/안수집사회/\n남선교회",
            description: "기도로 교회를 든든히 세우고 뜨거운 열정으로 헌신하며 본을 보이는 남성 공동체입니다.",
            image: "https://images.unsplash.com/photo-1673429249844-b14f29e619b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zcyUyMHNpbGhvdWV0dGUlMjBjaHVyY2glMjByb29mdG9wfGVufDF8fHx8MTc3MzIyNTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
            id: 2,
            title: "루디아권사회/\n여선교회",
            description: "사랑의 섬김과 간절한 기도로 공동체를 따뜻하게 보듬는 아름다운 여성 공동체입니다.",
            image: "https://images.unsplash.com/photo-1769184615259-e609796f63e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFwZWwlMjB3aW5kb3clMjBsaWdodCUyMGJlYW0lMjByYXlzfGVufDF8fHx8MTc3MzIyNTE2MXww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
            id: 3,
            title: "예람유치원",
            description: "하나님의 사랑 안에서 아이들의 꿈과 지혜가 쑥쑥 자라나는 믿음의 첫 교육 터전입니다.",
            image: "https://images.unsplash.com/photo-1567746512136-f005499a7575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBlbXB0eSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzIyNTE2NXww&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
            id: 4,
            title: "예람수양관",
            description: "도심을 벗어나 주님의 품 안에서 영혼의 안식과 깊은 영성을 회복하는 아름다운 쉼터입니다.",
            image: "https://images.unsplash.com/photo-1771849316619-56a52f7a6f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRyZWF0JTIwY2VudGVyJTIwbW91bnRhaW4lMjBjYWJpbiUyMG5hdHVyZXxlbnwxfHx8fDE3NzMyMjUxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        {
            id: 5,
            title: "한국기독교\n선교박물관",
            description: "한국 기독교 선교의 소중한 발자취와 신앙의 유산을 한눈에 돌아보는 역사의 현장입니다.",
            image: "https://images.unsplash.com/photo-1770819372115-dafe72a8c8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMGVtcHR5JTIwaGFsbHxlbnwxfHx8fDE3NzMyMjUxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
        }
    ];

    const extCards = [...cards, ...cards, ...cards];
    const TOTAL = cards.length;

    const svgChevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-nav-icon"><path d="m15 18-6-6 6-6"/></svg>`;
    const svgChevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-nav-icon"><path d="m9 18 6-6-6-6"/></svg>`;
    const svgArrowRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

    let trackHtml = '';
    extCards.forEach((card, i) => {
        trackHtml += `
            <div class="cc-card" id="cc-card-${i}">
                <img src="${card.image}" alt="${card.title}" class="cc-card-img">
                <div class="cc-card-overlay"></div>
                <div class="cc-card-content">
                    <h3 class="cc-card-title">${card.title}</h3>
                    <div>
                        <p class="cc-card-desc">${card.description}</p>
                        <div class="cc-card-more">
                            <span class="cc-card-more-text">View More</span>
                            ${svgArrowRight}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <section class="cc-section">
            <div class="cc-container" id="cc-container">
                <div class="cc-left">
                    <span class="cc-label">Ministry</span>

                    <!-- Mobile Header -->
                    <div class="cc-mobile-header">
                        <h2 class="cc-title" style="margin-bottom:0;">공동체</h2>
                        <div class="cc-mobile-controls">
                            <div class="cc-counter">
                                <span class="cc-counter-current" id="cc-current-m"></span>
                                <span class="cc-counter-total" id="cc-total-m"></span>
                            </div>
                            <div class="cc-nav-btns">
                                <button class="cc-nav-btn cc-prev-btn">${svgChevronLeft}</button>
                                <button class="cc-nav-btn cc-next-btn">${svgChevronRight}</button>
                            </div>
                        </div>
                    </div>

                    <!-- Desktop Header -->
                    <div class="cc-desktop-header">
                        <h2 class="cc-title">공동체<br></h2>
                        <div class="cc-counter" style="margin-bottom: 1.25rem;">
                            <span class="cc-counter-current" id="cc-current-d"></span>
                            <span class="cc-counter-total" id="cc-total-d"></span>
                        </div>
                        <div class="cc-nav-btns">
                            <button class="cc-nav-btn cc-prev-btn">${svgChevronLeft}</button>
                            <button class="cc-nav-btn cc-next-btn">${svgChevronRight}</button>
                        </div>
                    </div>
                </div>

                <div class="cc-right" id="cc-right">
                    <div class="cc-track" id="cc-track">
                        ${trackHtml}
                    </div>
                </div>
            </div>
        </section>
    `;

    const track = document.getElementById('cc-track');
    const containerEl = document.getElementById('cc-container');
    const rightEl = document.getElementById('cc-right');
    const cardsEl = track.querySelectorAll('.cc-card');

    const currentM = document.getElementById('cc-current-m');
    const totalM = document.getElementById('cc-total-m');
    const currentD = document.getElementById('cc-current-d');
    const totalD = document.getElementById('cc-total-d');
    const prevBtns = document.querySelectorAll('.cc-prev-btn');
    const nextBtns = document.querySelectorAll('.cc-next-btn');

    const CARD_W = 340;
    const CARD_W_MOBILE = 260;
    const GAP = 24;
    const GAP_MOBILE = 16;

    let pos = TOTAL;
    let isTransitioning = false;
    let isMobile = false;
    let animate = true;

    function updateLayout() {
        isMobile = window.innerWidth < 768;
        const cardW = isMobile ? CARD_W_MOBILE : CARD_W;
        const gap = isMobile ? GAP_MOBILE : GAP;

        containerEl.style.paddingLeft = isMobile ? '1.5rem' : 'max(4rem, calc((100vw - 87.5rem) / 2 + 4rem))';
        containerEl.style.paddingRight = isMobile ? '1.5rem' : '0';

        rightEl.style.height = isMobile ? '340px' : '440px';
        track.style.gap = `${gap}px`;

        cardsEl.forEach(card => {
            card.style.width = `${cardW}px`;
        });

        renderState();
    }

    function renderState() {
        const cardW = isMobile ? CARD_W_MOBILE : CARD_W;
        const gap = isMobile ? GAP_MOBILE : GAP;
        const step = cardW + gap;
        const translateX = -(pos * step);

        track.style.transform = `translateX(${translateX}px)`;
        track.style.transition = animate ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none";

        cardsEl.forEach((card, i) => {
            if (i === pos) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        const realIndex = ((pos % TOTAL) + TOTAL) % TOTAL;
        const currentNum = String(realIndex + 1).padStart(2, '0');
        const totalNumStr = '/' + String(TOTAL).padStart(2, '0');

        currentM.textContent = currentNum;
        currentD.textContent = currentNum;
        totalM.textContent = totalNumStr;
        totalD.textContent = totalNumStr;
    }

    function handleNext() {
        if (isTransitioning) return;
        isTransitioning = true;
        animate = true;
        pos++;
        renderState();
    }

    function handlePrev() {
        if (isTransitioning) return;
        isTransitioning = true;
        animate = true;
        pos--;
        renderState();
    }

    track.addEventListener('transitionend', (e) => {
        if (e.propertyName === 'transform') {
            isTransitioning = false;
            if (pos >= TOTAL * 2 || pos < TOTAL) {
                animate = false;
                const realIndex = ((pos % TOTAL) + TOTAL) % TOTAL;
                pos = TOTAL + realIndex;
                renderState();

                // Force reflow and re-enable transition
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        animate = true;
                        isTransitioning = false;
                    });
                });
            }
        }
    });

    prevBtns.forEach(btn => btn.addEventListener('click', handlePrev));
    nextBtns.forEach(btn => btn.addEventListener('click', handleNext));
    window.addEventListener('resize', updateLayout);

    updateLayout();
}

document.addEventListener("DOMContentLoaded", () => {
    // Other inits...
    if (typeof initCommunityCards === 'function') {
        initCommunityCards();
    }
});

function initTabbedGallery() {
    const container = document.getElementById('tabbed-gallery-container');
    if (!container) return;

    const galleries = {
        event: [
            { image: "https://images.unsplash.com/photo-1548625361-ec8580228d44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmx1ZSUyMGdyYWRpZW50JTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzMyMzc0NjR8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "2023 가을 부흥회", date: "2023년 10월 15일" },
            { image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMGJsdWUlMjBwaW5rJTIwc21vb3RofGVufDF8fHx8MTc3MzIzNzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "여름 성경 학교", date: "2023년 8월 5일" },
            { image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGxpZ3h0JTIwYmx1ZSUyMHRleHR1cmV8ZW58MXx8fHwxNzczMjM3NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "성탄절 칸타타", date: "2023년 12월 24일" },
            { image: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdXJwbGUlMjBwaW5rJTIwYmx1ZSUyMGdyYWRpZW50fGVufDF8fHx8MTc3MzIzNzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080", caption: "청년부 단기선교", date: "2023년 7월 20일" },
            { image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMHJlbmRlciUyMGFic3RyYWN0JTIwYmx1ZXxlbnwxfHx8fDE3NzMyMzc0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "추수감사절 예배", date: "2023년 11월 19일" },
            { image: "https://images.unsplash.com/photo-1612457506498-e394426f27cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBibHVlJTI0bW91bnRhaW4lMjBmb2clMjBtaXN0eXxlbnwxfHx8fDE3NzMyMzc0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "소그룹 성경 공부", date: "2023년 7월 15일" }
        ],
        newcomer: [
            { image: "https://images.unsplash.com/photo-1742403412928-c077668aad2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmx1ZSUyMG1hcmJsZSUyMHRleHR1cmUlMjBzbW9vdGh8ZW58MXx8fHwxNzczMjM3NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080", caption: "새가족 환영회", date: "2023년 9월 1일" },
            { image: "https://images.unsplash.com/photo-1628880635807-fa5bf0df26b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBibHVlJTIwZnJvemVuJTIwY3J5c3RhbCUyMGNsb3NlfGVufDF8fHx8MTc3MzIzNzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080", caption: "어린이 프로그램", date: "2023년 10월 1일" },
            { image: "https://images.unsplash.com/photo-1649711115004-4c5215684b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlJTIwYmx1ZSUyMGdyYWRpZW50JTIwd2FsbCUyMHBhaW50fGVufDF8fHx8MTc3MzIzNzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080", caption: "봉사팀 오리엔테이션", date: "2023년 8월 1일" },
            { image: "https://images.unsplash.com/photo-1641651495195-f1d8b6f63121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmx1ZSUyMGZlYXRoZXIlMjBkZWxpY2F0ZSUyMHBhc3RlbHxlbnwxfHx8fDE3NzMyMzc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "교회 투어", date: "2023년 11월 1일" },
            { image: "https://images.unsplash.com/photo-1544032735-4ed3ae9685e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwcGFzdGVsJTIwZGF3biUyMGhvcml6b24lMjBtaW5pbWFsfGVufDF8fHx8MTc3MzIzNzQ2OXww&ixlib=rb-4.1.0&q=80&w=1080", caption: "중보기도", date: "2023년 12월 1일" },
            { image: "https://images.unsplash.com/photo-1741663888387-d7510d1253b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjBzaWxrJTIwZmFicmljJTIwZmxvd2luZ3xlbnwxfHx8fDE3NzMyMzc0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080", caption: "예배 안내", date: "2023년 1월 1일" }
        ]
    };

    const bgUrl = "https://images.unsplash.com/photo-1522123472015-2d9f7ee5608d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5saWdodCUyMGNhc3RpbmclMjBzaGFkb3dzJTIwY29uY3JldGUlMjB3YWxsJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMyMzY0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080";
    const svgChevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-nav-icon"><path d="m15 18-6-6 6-6"/></svg>`;
    const svgChevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-nav-icon"><path d="m9 18 6-6-6-6"/></svg>`;

    container.innerHTML = `
        <section class="tg-section">
            <div class="tg-bg">
                <img src="${bgUrl}" alt="" class="tg-bg-img">
                <div class="tg-bg-overlay"></div>
            </div>

            <div class="tg-content">
                <div class="tg-header-row">
                    <div>
                        <span class="tg-label">Gallery</span>
                        <div class="tg-title-wrap">
                            <h2 class="tg-title">동래중앙 앨범</h2>
                            <div class="tg-tabs">
                                <button class="tg-tab-btn active" data-tab="event">행사 앨범</button>
                                <button class="tg-tab-btn" data-tab="newcomer">새가족 앨범</button>
                            </div>
                        </div>
                    </div>

                    <div class="tg-nav-wrap">
                        <div class="tg-progress-bar">
                            <div class="tg-progress-fill" id="tg-progress-fill"></div>
                        </div>
                        <button class="tg-nav-btn" id="tg-prev-btn" disabled>${svgChevronLeft}</button>
                        <button class="tg-nav-btn" id="tg-next-btn">${svgChevronRight}</button>
                    </div>
                </div>

                <div class="tg-track-wrap">
                    <div class="tg-track" id="tg-track">
                        <!-- Cards injected here -->
                    </div>
                </div>
            </div>
        </section>
    `;

    const track = document.getElementById('tg-track');
    const prevBtn = document.getElementById('tg-prev-btn');
    const nextBtn = document.getElementById('tg-next-btn');
    const progressFill = document.getElementById('tg-progress-fill');
    const tabBtns = document.querySelectorAll('.tg-tab-btn');

    let activeTab = 'event';
    let scrollX = 0;
    let maxScroll = 0;
    let isMobile = false;
    let cardWidth = 310;
    let gap = 20;

    function renderCards() {
        const items = galleries[activeTab];
        let cardsHtml = '';
        items.forEach(item => {
            cardsHtml += `
                <div class="tg-item" style="width: ${cardWidth}px;">
                    <div class="tg-img-box">
                        <img src="${item.image}" alt="${item.caption}" class="tg-img">
                        <div class="tg-item-overlay">
                            <div class="tg-item-info">
                                <p class="tg-item-caption">${item.caption}</p>
                                <p class="tg-item-date">${item.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        track.innerHTML = cardsHtml;
        track.style.gap = `${gap}px`;

        // Trigger enter animations
        setTimeout(() => {
            const itemsEl = track.querySelectorAll('.tg-item');
            itemsEl.forEach((el, i) => {
                setTimeout(() => {
                    el.classList.add('show');
                }, i * 60); // Stagger animation
            });
        }, 50);

        updateLayout();
    }

    function updateLayout() {
        isMobile = window.innerWidth < 768;
        cardWidth = isMobile ? 240 : 310;
        gap = isMobile ? 14 : 20;
        const viewportWidth = window.innerWidth;
        const containerWidth = isMobile ? viewportWidth - 48 : 1400 - 128;

        const items = galleries[activeTab];
        const totalWidth = items.length * (cardWidth + gap) - gap;
        maxScroll = Math.max(0, totalWidth - containerWidth);

        scrollX = Math.min(scrollX, maxScroll);

        track.style.gap = `${gap}px`;
        const itemsEl = track.querySelectorAll('.tg-item');
        itemsEl.forEach(el => {
            el.style.width = `${cardWidth}px`;
        });

        applyScroll();
    }

    function applyScroll() {
        track.style.transform = `translateX(-${scrollX}px)`;

        const progress = maxScroll > 0 ? (scrollX / maxScroll) * 100 : 0;
        progressFill.style.width = `${progress}%`;

        prevBtn.disabled = scrollX <= 0;
        nextBtn.disabled = scrollX >= maxScroll;
    }

    function handlePrev() {
        scrollX = Math.max(0, scrollX - (cardWidth + gap));
        applyScroll();
    }

    function handleNext() {
        scrollX = Math.min(maxScroll, scrollX + (cardWidth + gap));
        applyScroll();
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeTab = e.target.getAttribute('data-tab');
            scrollX = 0;
            renderCards();
        });
    });

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);
    window.addEventListener('resize', updateLayout);

    renderCards();
}

document.addEventListener("DOMContentLoaded", () => {
    // Other inits...
    if (typeof initTabbedGallery === 'function') {
        initTabbedGallery();
    }
});

function initFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    container.innerHTML = `
        <footer class="ft-wrapper">
            <div class="ft-container">
                <div class="ft-row">
                    <div class="ft-left">
                        <div class="ft-logo-wrap">
                            <div class="ft-logo-box">
                                <span class="ft-logo-text">동래</span>
                            </div>
                            <div>
                                <span class="ft-title">동래중앙교회</span>
                            </div>
                        </div>

                        <div class="ft-info">
                            <span class="ft-info-line">
                                <span class="ft-info-label">ADDRESS.</span> 부산광역시 동래구 충렬대로202번가길 24 (수안동, 2-3번지)
                            </span>
                            <span class="ft-info-line">
                                <span class="ft-info-label">TEL.</span> 051-558-1191
                                <span class="ft-info-divider">|</span>
                                <span class="ft-info-label">FAX.</span> 051-555-8474
                            </span>
                        </div>
                    </div>

                    <div class="ft-right">
                        <span class="ft-copyright">Copyright &copy; 2026 동래중앙교회</span>
                        <span class="ft-credit">All rights reserved. Designed by (주)스데반정보</span>
                    </div>
                </div>
            </div>
        </footer>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    // Other inits...
    if (typeof initFooter === 'function') {
        initFooter();
    }
});

function initScrollFadeUp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded up
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it comes fully into view
    });

    const fadeElements = document.querySelectorAll('.scroll-fade-up');
    fadeElements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
    // Note: Since elements might be injected asynchronously or simultaneously via our init functions,
    // we should wait a tick or just call it after all inits are done.
    setTimeout(() => {
        if (typeof initScrollFadeUp === 'function') {
            initScrollFadeUp();
        }
    }, 100);
});
