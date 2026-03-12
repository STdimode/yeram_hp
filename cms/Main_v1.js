// Main JavaScript file for CMS
console.log("Main_v1.js loaded");

/* Global variable to hold app wrapper contents */
document.addEventListener("DOMContentLoaded", () => {
    // Inject the app wrapper structure
    const root = document.querySelector('.cms-content-root');
    if (!root) return;

    // root.innerHTML injection removed (now in cshtml)

    initHeroSlider();
    initInteractiveGrid();
    initStickyHorizontalScroll();
    initDynamicToggle();
    initCommunityCards();
    initTabbedGallery();
    initFooter();
    initScrollFadeUp();
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
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
            title: "은혜의 빛으로",
            subtitle: "Grace Community Church"
        },
        {
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
            title: "함께 걷는 믿음의 길",
            subtitle: "Walking Together in Faith"
        }
    ];



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
        const slideBg = document.createElement("div");
        slideBg.className = "hero-slide-bg";
        slideBg.style.backgroundImage = `url('${slides[index].image}')`;
        newSlide.appendChild(slideBg);
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
    const slideBg = document.createElement("div");
    slideBg.className = "hero-slide-bg";
    slideBg.style.backgroundImage = `url('${slides[current].image}')`;
    initSlide.appendChild(slideBg);
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
    const noticeBg = "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg";
    const welcomeBg = "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg";

    const svgUserPlus = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>`;
    const svgClock = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const svgMapPin = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`;

    const svgMegaphone = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`;
    const svgNewspaper = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>`;
    const svgFileText = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="igrid-icon"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`;

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
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
        },
        {
            title: "주일 찬양 예배",
            sermon: "익숙함의 늪을 떠나",
            verse: "누가복음 9장57-62절",
            pastor: "강신영 목사",
            date: "2026.03.08",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
        },
        {
            title: "수요말씀사경회",
            sermon: "우리가 남이가",
            verse: "에베소서 2장11-22절",
            pastor: "박세영 목사",
            date: "2026.03.04",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
        },
        {
            title: "금요성령기도회",
            sermon: "금요성령기도회 입니다.",
            verse: "",
            pastor: "ooo 목사",
            date: "2026.03.13",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
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
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
            links: ["영유아부", "유치부", "유년부", "소년부", "중등부", "고등부", "청년부"]
        },
        {
            id: "ministry",
            title: "팀사역",
            subtitle: "Ministry",
            description: "국내외 선교, 문화 사역, 교육 및 봉사 등 각자의 은사에 맞춰 하나님의 사랑을 실천하고 세상을 섬기는 전문 사역 팀들의 모임입니다.",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
            links: ["국내선교", "해외선교", "문화사역", "예람전도대", "새가족 양육", "중보기도대", "늘푸른대학", "사회봉사"]
        },
        {
            id: "admin",
            title: "온라인 행정",
            subtitle: "Administration",
            description: "성도님들의 원활한 교회 활동을 위해 장소 및 차량 예약, 각종 증명서 발급 등을 언제 어디서나 간편하게 처리할 수 있는 지원 서비스입니다.",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg",
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
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg"
        },
        {
            id: 2,
            title: "루디아권사회/\n여선교회",
            description: "사랑의 섬김과 간절한 기도로 공동체를 따뜻하게 보듬는 아름다운 여성 공동체입니다.",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg"
        },
        {
            id: 3,
            title: "예람유치원",
            description: "하나님의 사랑 안에서 아이들의 꿈과 지혜가 쑥쑥 자라나는 믿음의 첫 교육 터전입니다.",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg"
        },
        {
            id: 4,
            title: "예람수양관",
            description: "도심을 벗어나 주님의 품 안에서 영혼의 안식과 깊은 영성을 회복하는 아름다운 쉼터입니다.",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg"
        },
        {
            id: 5,
            title: "한국기독교\n선교박물관",
            description: "한국 기독교 선교의 소중한 발자취와 신앙의 유산을 한눈에 돌아보는 역사의 현장입니다.",
            image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg"
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
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "2023 가을 부흥회", date: "2023년 10월 15일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "여름 성경 학교", date: "2023년 8월 5일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "성탄절 칸타타", date: "2023년 12월 24일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "청년부 단기선교", date: "2023년 7월 20일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "추수감사절 예배", date: "2023년 11월 19일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "소그룹 성경 공부", date: "2023년 7월 15일" }
        ],
        newcomer: [
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "새가족 환영회", date: "2023년 9월 1일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "어린이 프로그램", date: "2023년 10월 1일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "봉사팀 오리엔테이션", date: "2023년 8월 1일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "교회 투어", date: "2023년 11월 1일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "중보기도", date: "2023년 12월 1일" },
            { image: "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg", caption: "예배 안내", date: "2023년 1월 1일" }
        ]
    };

    const bgUrl = "/UserData/yeram/Layouts/yeram_Layout_temp/images/placeholder.jpg";
    const svgChevronLeft = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-nav-icon"><path d="m15 18-6-6 6-6"/></svg>`;
    const svgChevronRight = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cc-nav-icon"><path d="m9 18 6-6-6-6"/></svg>`;



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
