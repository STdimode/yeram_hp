import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const cards = [
  {
    id: 1,
    title: "은장회/안수집사회/\n남선교회",
    description:
      "기도로 교회를 든든히 세우고 뜨거운 열정으로 헌신하며 본을 보이는 남성 공동체입니다.",
    image:
      "https://images.unsplash.com/photo-1673429249844-b14f29e619b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9zcyUyMHNpbGhvdWV0dGUlMjBjaHVyY2glMjByb29mdG9wfGVufDF8fHx8MTc3MzIyNTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 2,
    title: "루디아권사회/\n여선교회",
    description:
      "사랑의 섬김과 간절한 기도로 공동체를 따뜻하게 보듬는 아름다운 여성 공동체입니다.",
    image:
      "https://images.unsplash.com/photo-1769184615259-e609796f63e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFwZWwlMjB3aW5kb3clMjBsaWdodCUyMGJlYW0lMjByYXlzfGVufDF8fHx8MTc3MzIyNTE2MXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    title: "예람유치원",
    description:
      "하나님의 사랑 안에서 아이들의 꿈과 지혜가 쑥쑥 자라나는 믿음의 첫 교육 터전입니다.",
    image:
      "https://images.unsplash.com/photo-1567746512136-f005499a7575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW5kZXJnYXJ0ZW4lMjBjbGFzc3Jvb20lMjBlbXB0eSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MzIyNTE2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    title: "예람수양관",
    description:
      "도심을 벗어나 주님의 품 안에서 영혼의 안식과 깊은 영성을 회복하는 아름다운 쉼터입니다.",
    image:
      "https://images.unsplash.com/photo-1771849316619-56a52f7a6f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRyZWF0JTIwY2VudGVyJTIwbW91bnRhaW4lMjBjYWJpbiUyMG5hdHVyZXxlbnwxfHx8fDE3NzMyMjUxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    title: "한국기독교\n선교박물관",
    description:
      "한국 기독교 선교의 소중한 발자취와 신앙의 유산을 한눈에 돌아보는 역사의 현장입니다.",
    image:
      "https://images.unsplash.com/photo-1770819372115-dafe72a8c8b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBnYWxsZXJ5JTIwZXhoaWJpdGlvbiUyMGVtcHR5JTIwaGFsbHxlbnwxfHx8fDE3NzMyMjUxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const CARD_W = 340;
const CARD_W_MOBILE = 260;
const GAP = 24;
const GAP_MOBILE = 16;
const STEP = CARD_W + GAP;
const VISIBLE = 3;
const TOTAL = cards.length;

export function CommunityCards() {
  const extCards = [...cards, ...cards, ...cards];
  const [pos, setPos] = useState(TOTAL);
  const [animate, setAnimate] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardW = isMobile ? CARD_W_MOBILE : CARD_W;
  const gap = isMobile ? GAP_MOBILE : GAP;
  const step = cardW + gap;

  const realIndex = ((pos % TOTAL) + TOTAL) % TOTAL;
  const currentNum = String(realIndex + 1).padStart(2, "0");
  const totalNum = String(TOTAL).padStart(2, "0");

  const handleNext = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimate(true);
    setPos((p) => p + 1);
  }, []);

  const handlePrev = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setAnimate(true);
    setPos((p) => p - 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    isTransitioning.current = false;
    if (pos >= TOTAL * 2 || pos < TOTAL) {
      setAnimate(false);
      setPos(TOTAL + realIndex);
    }
  }, [pos, realIndex]);

  useEffect(() => {
    if (!animate) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          isTransitioning.current = false;
        });
      });
    }
  }, [animate]);

  const translateX = -(pos * step);

  return (
    <section className="bg-white py-[3rem] md:py-[5rem] lg:py-[7rem] overflow-hidden">
      <div
        className="flex flex-col md:flex-row gap-[2rem] md:gap-[2.5rem] lg:gap-[4rem] items-start"
        style={{
          paddingLeft: isMobile ? "1.5rem" : "max(4rem, calc((100vw - 87.5rem) / 2 + 4rem))",
          paddingRight: isMobile ? "1.5rem" : undefined,
        }}
      >
        {/* Left Side - Title & Navigation */}
        <div className="flex-shrink-0 self-center w-full md:w-[20rem]">
          <span
            className="text-[#1A2744]/60 tracking-[6px] uppercase block mb-[0.75rem] md:mb-[1.25rem]"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)", fontWeight: 500 }}
          >
            Ministry
          </span>

          {/* Mobile: title + counter + arrows in one row */}
          <div className="flex md:hidden items-center justify-between mb-[1rem]">
            <h2
              className="text-[#1A2744]"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.8125rem)",
                fontWeight: 800,
                lineHeight: 1.35,
                letterSpacing: "-0.5px",
              }}
            >공동체</h2>
            <div className="flex items-center gap-4">
              <div>
                <span
                  className="text-[#1A2744]"
                  style={{ fontSize: "1.375rem", fontWeight: 700, fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif" }}
                >
                  {currentNum}
                </span>
                <span
                  className="text-[#1A2744]/45"
                  style={{ fontSize: "1.375rem", fontWeight: 300, fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif" }}
                >
                  /{totalNum}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-9 h-9 rounded-full border border-[#1A2744]/30 flex items-center justify-center text-[#1A2744] hover:bg-[#1A2744] hover:text-white hover:border-[#1A2744] transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-9 h-9 rounded-full border border-[#1A2744]/30 flex items-center justify-center text-[#1A2744] hover:bg-[#1A2744] hover:text-white hover:border-[#1A2744] transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop: original vertical layout */}
          <h2
            className="text-[#1A2744] mb-[1.5rem] md:mb-[4rem] hidden md:block"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.8125rem)",
              fontWeight: 800,
              lineHeight: 1.35,
              letterSpacing: "-0.5px",
            }}
          >공동체<br /></h2>

          {/* Counter */}
          <div className="mb-[0.75rem] md:mb-[1.25rem] hidden md:block">
            <span
              className="text-[#1A2744]"
              style={{ fontSize: "1.375rem", fontWeight: 700, fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif" }}
            >
              {currentNum}
            </span>
            <span
              className="text-[#1A2744]/45"
              style={{ fontSize: "1.375rem", fontWeight: 300, fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif" }}
            >
              /{totalNum}
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-[#1A2744]/30 flex items-center justify-center text-[#1A2744] hover:bg-[#1A2744] hover:text-white hover:border-[#1A2744] transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-[#1A2744]/30 flex items-center justify-center text-[#1A2744] hover:bg-[#1A2744] hover:text-white hover:border-[#1A2744] transition-all duration-300"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Right Side - Cards */}
        <div
          className="w-full md:flex-1"
          style={{
            height: isMobile ? "340px" : "440px",
            clipPath: "inset(0 -100vw 0 0)",
          }}
        >
          <div
            ref={trackRef}
            className="flex items-end h-full"
            style={{
              gap: `${gap}px`,
              transform: `translateX(${translateX}px)`,
              transition: animate
                ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extCards.map((card, i) => {
              const isActive = i === pos;
              const FULL_H = isMobile ? 340 : 440;
              const SMALL_H = Math.round(FULL_H * 0.72);

              return (
                <div
                  key={`${card.id}-${i}`}
                  className="flex-shrink-0 relative overflow-hidden cursor-pointer group"
                  style={{
                    width: `${cardW}px`,
                    height: isActive ? `${FULL_H}px` : `${SMALL_H}px`,
                    borderRadius: "16px",
                    opacity: isActive ? 1 : 0.6,
                    transition:
                      "height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-[1.25rem] md:p-[2rem]">
                    {/* Title */}
                    <h3
                      className="text-white whitespace-pre-line"
                      style={{
                        fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                        fontWeight: 700,
                        lineHeight: 1.35,
                      }}
                    >
                      {card.title}
                    </h3>

                    {/* Bottom content */}
                    <div>
                      {isActive && (
                        <p
                          className="text-white/80 mb-[1rem] md:mb-[1.5rem]"
                          style={{
                            fontSize: "clamp(0.875rem, 1.3vw, 1.125rem)",
                            fontWeight: 300,
                            lineHeight: 1.8,
                          }}
                        >
                          {card.description}
                        </p>
                      )}

                      {/* VIEW MORE */}
                      <div className="flex items-center justify-end gap-2">
                        <span
                          className="text-white tracking-[2px] uppercase"
                          style={{
                            fontSize: "clamp(0.8125rem, 1.2vw, 1rem)",
                            fontWeight: 600,
                          }}
                        >
                          View More
                        </span>
                        <ArrowRight
                          className="w-4 h-4 text-white"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}