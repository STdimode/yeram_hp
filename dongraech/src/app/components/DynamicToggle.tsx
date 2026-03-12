import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: "next-gen",
    title: "다음세대",
    subtitle: "Next Generation",
    description:
      "미래의 주역인 영유아부터 청년까지, 하나님의 말씀 안에서 꿈을 키우고 건강하게 성장하는 신앙 교육 공동체입니다.",
    image:
      "https://images.unsplash.com/photo-1518130064817-2bcb096c1303?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGFpcnBsYW5lJTIwZmx5aW5nJTIwYmx1ZSUyMHNreXxlbnwxfHx8fDE3NzMyMzgxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    links: ["영유아부", "유치부", "유년부", "소년부", "중등부", "고등부", "청년부"],
  },
  {
    id: "ministry",
    title: "팀사역",
    subtitle: "Ministry",
    description:
      "국내외 선교, 문화 사역, 교육 및 봉사 등 각자의 은사에 맞춰 하나님의 사랑을 실천하고 세상을 섬기는 전문 사역 팀들의 모임입니다.",
    image:
      "https://images.unsplash.com/photo-1608782583532-c551f3a0e8ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBwaW5rJTIwYmx1ZSUyMGNvdHRvbiUyMGNhbmR5JTIwc2t5JTIwc3Vuc2V0fGVufDF8fHx8MTc3MzIzODA4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    links: ["국내선교", "해외선교", "문화사역", "예람전도대", "새가족 양육", "중보기도대", "늘푸른대학", "사회봉사"],
  },
  {
    id: "admin",
    title: "온라인 행정",
    subtitle: "Administration",
    description:
      "성도님들의 원활한 교회 활동을 위해 장소 및 차량 예약, 각종 증명서 발급 등을 언제 어디서나 간편하게 처리할 수 있는 지원 서비스입니다.",
    image:
      "https://images.unsplash.com/photo-1636569698616-94d5307b956b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjbG9zZXVwJTIwa2V5Ym9hcmQlMjBtaW5pbWFsJTIwY2xlYW58ZW58MXx8fHwxNzczMjM4MTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    links: ["차량예약", "장소예약", "비품수리신청", "증명서 발급"],
  },
];

const CARD_HEIGHT_DESKTOP = 520;
const CARD_HEIGHT_MOBILE = 720;
const STACK_OFFSET = 24;

// Timeline: [dwell0] [transition0→1] [dwell1] [transition1→2] [dwell2] [extra dwell for last card]
// Animations complete by 0.78 of progress, leaving ~22% extra dwell for the last card
const DWELL = 0.19;
const TRANSITION = 0.15;
const TIMELINE_END = 0.78; // animations finish here, rest is extra dwell

function getCardTimeline(index: number) {
  // Card 0: enters at 0, dwells [0, DWELL], pushed during [DWELL, DWELL+TRANSITION]
  // Card 1: enters during [DWELL, DWELL+TRANSITION], dwells [DWELL+TRANSITION, 2*DWELL+TRANSITION], pushed during [2*DWELL+TRANSITION, 2*DWELL+2*TRANSITION]
  // Card N: enterStart = N*(DWELL+TRANSITION) - TRANSITION (for N>0), dwellStart = N*(DWELL+TRANSITION), dwellEnd = N*(DWELL+TRANSITION)+DWELL
  
  if (index === 0) {
    return {
      enterStart: -1, // already visible
      enterEnd: -1,
      dwellStart: 0,
      dwellEnd: DWELL,
      pushStart: DWELL,
      pushEnd: DWELL + TRANSITION,
    };
  }

  const transitionStart = index * DWELL + (index - 1) * TRANSITION;
  const transitionEnd = transitionStart + TRANSITION;
  const dwellEnd = transitionEnd + DWELL;
  const nextPushStart = dwellEnd;
  const nextPushEnd = nextPushStart + TRANSITION;

  return {
    enterStart: transitionStart,
    enterEnd: transitionEnd,
    dwellStart: transitionEnd,
    dwellEnd: dwellEnd,
    pushStart: nextPushStart,
    pushEnd: Math.min(1, nextPushEnd),
  };
}

function CardStackItem({
  cat,
  index,
  scrollProgress,
  cardHeight,
}: {
  cat: (typeof categories)[0];
  index: number;
  scrollProgress: number;
  cardHeight: number;
}) {
  const timeline = getCardTimeline(index);

  // Remap scroll progress so all animations complete by TIMELINE_END,
  // leaving the rest as extra dwell time for the last card
  const mappedProgress = Math.min(1, scrollProgress / TIMELINE_END);

  let translateY = 0;
  let scale = 1;
  let opacity = 1;

  if (index === 0) {
    // First card: always visible, shrinks when pushed
    if (mappedProgress <= timeline.dwellEnd) {
      // Dwelling - fully visible
      translateY = 0;
      scale = 1;
      opacity = 1;
    } else if (mappedProgress <= timeline.pushEnd) {
      // Being pushed back
      const pushProgress = (mappedProgress - timeline.pushStart) / TRANSITION;
      const p = Math.max(0, Math.min(1, pushProgress));
      scale = 1 - p * 0.06;
      translateY = -p * STACK_OFFSET;
      opacity = 1 - p * 0.35;
    } else {
      // Fully pushed back
      scale = 0.94;
      translateY = -STACK_OFFSET;
      opacity = 0;
    }
  } else {
    if (mappedProgress < timeline.enterStart) {
      // Not yet reached
      translateY = cardHeight + 80;
      opacity = 0;
    } else if (mappedProgress <= timeline.enterEnd) {
      // Entering - sliding up
      const enterProgress = (mappedProgress - timeline.enterStart) / TRANSITION;
      const p = Math.max(0, Math.min(1, enterProgress));
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      translateY = (1 - eased) * (cardHeight + 80);
      opacity = 0.2 + eased * 0.8;
    } else if (mappedProgress <= timeline.dwellEnd) {
      // Dwelling - fully visible
      translateY = 0;
      scale = 1;
      opacity = 1;
    } else if (mappedProgress <= timeline.pushEnd && index < categories.length - 1) {
      // Being pushed back by next card
      const pushProgress = (mappedProgress - timeline.pushStart) / TRANSITION;
      const p = Math.max(0, Math.min(1, pushProgress));
      scale = 1 - p * 0.06;
      translateY = -p * STACK_OFFSET;
      opacity = 1 - p * 0.35;
    } else if (index < categories.length - 1) {
      // Fully pushed back
      scale = 0.94;
      translateY = -STACK_OFFSET;
      opacity = 0;
    } else {
      // Last card stays
      translateY = 0;
      scale = 1;
      opacity = 1;
    }
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        zIndex: index + 1,
        height: `${cardHeight}px`,
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        transition: "transform 0.15s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] bg-white">
        {/* Left: Image */}
        <div className="relative overflow-hidden min-h-[14rem] md:min-h-0">
          <img
            src={cat.image}
            alt={cat.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
        </div>

        {/* Right: Content */}
        <div className="flex flex-col justify-center px-[1.5rem] md:px-[2.5rem] lg:px-[4rem] py-[1.5rem] md:py-[2rem] lg:py-[3rem]">
          <span
            className="text-[#2B5D8C] tracking-[4px] uppercase block mb-[0.5rem] md:mb-[0.75rem]"
            style={{ fontSize: "1rem", fontWeight: 500 }}
          >
            {cat.subtitle}
          </span>
          <h3
            className="text-[#1A2744] mb-[0.5rem] md:mb-[1.25rem]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 700 }}
          >
            {cat.title}
          </h3>
          <p
            className="text-[#1A2744]/70 mb-[1rem] md:mb-[2rem] max-w-lg"
            style={{
              fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
              fontWeight: 300,
              lineHeight: 1.9,
            }}
          >
            {cat.description}
          </p>
          <div className="flex flex-wrap gap-[0.5rem] md:gap-[0.75rem]">
            {cat.links.map((link) => (
              <button
                key={link}
                className="border border-[#1A2744]/40 px-[0.875rem] md:px-[1.25rem] py-[0.375rem] md:py-[0.625rem] text-[#1A2744] hover:bg-[#1A2744] hover:text-white hover:border-[#1A2744] transition-all duration-300 rounded-full cursor-pointer"
                style={{
                  fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)",
                  fontWeight: 500,
                }}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Arrow button */}
          <div className="mt-[1rem] md:mt-[2rem]">
            <button className="flex items-center gap-3 text-[#1A2744]/70 hover:text-[#2B5D8C] transition-colors duration-300 cursor-pointer group">
              <span
                className="tracking-[2px] uppercase"
                style={{ fontSize: "0.9375rem", fontWeight: 500 }}
              >
                VIEW MORE
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DynamicToggle() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const cardHeight = isMobile ? CARD_HEIGHT_MOBILE : CARD_HEIGHT_DESKTOP;
  const scrollHeight = categories.length * 120 + 160;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F7F8F9]"
      style={{ height: `${scrollHeight}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[87.5rem] mx-auto w-full px-[1.5rem] md:px-[2.5rem] lg:px-[4rem]">
          {/* Section Header */}
          <div className="mb-[1.5rem] md:mb-[2rem] lg:mb-[3rem]">
            <span
              className="text-[#2B5D8C] tracking-[6px] uppercase block mb-[0.5rem] md:mb-[1rem]"
              style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)", fontWeight: 500 }}
            >
              Ministry
            </span>
            <h2
              className="text-[#1A2744]"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.8125rem)", fontWeight: 800, letterSpacing: "-1px" }}
            >
              사역과 프로그램
            </h2>
          </div>

          {/* Card Stack Container */}
          <div
            className="relative mx-auto"
            style={{ height: `${cardHeight}px` }}
          >
            {categories.map((cat, index) => (
              <CardStackItem
                key={cat.id}
                cat={cat}
                index={index}
                scrollProgress={scrollProgress}
                cardHeight={cardHeight}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}