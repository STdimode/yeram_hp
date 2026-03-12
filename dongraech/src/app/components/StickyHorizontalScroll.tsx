import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    title: "주일 낮예배",
    sermon: "예수께서 머물고 부르시는 그 곳에",
    verse: "마가복음10장46-52절",
    pastor: "정대훈 목사",
    date: "2026.03.08",
    image:
      "https://images.unsplash.com/photo-1728062816724-57b626d1affc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcmFtYXRpYyUyMHNreSUyMGNsb3VkcyUyMHN1bmxpZ2h0fGVufDF8fHx8MTc3MzIzNTU2N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    offsetY: 0,
  },
  {
    title: "주일 찬양 예배",
    sermon: "익숙함의 늪을 떠나",
    verse: "누가복음 9장57-62절",
    pastor: "강신영 목사",
    date: "2026.03.08",
    image:
      "https://images.unsplash.com/photo-1747079310346-1eb40f39bde0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBzdW5zZXQlMjBjbG91ZHMlMjBuYXR1cmV8ZW58MXx8fHwxNzczMjM1NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    offsetY: 80,
  },
  {
    title: "수요말씀사경회",
    sermon: "우리가 남이가",
    verse: "에베소서 2장11-22절",
    pastor: "박세영 목사",
    date: "2026.03.04",
    image:
      "https://images.unsplash.com/photo-1768938360590-bf49368f0e9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwd2hpdGUlMjBjbG91ZHMlMjBibHVlJTIwc2t5JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzczMjM1NTY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    offsetY: 160,
  },
  {
    title: "금요성령기도회",
    sermon: "금요성령기도회 입니다.",
    verse: "",
    pastor: "ooo 목사",
    date: "2026.03.13",
    image:
      "https://images.unsplash.com/photo-1655058402270-de7dd5838ed5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwZGFyayUyMGNsb3Vkc3xlbnwxfHx8fDE3NzMyMzU2Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    offsetY: 240,
  },
];

export function StickyHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const windowH = window.innerHeight;
      const scrolled = -rect.top;
      const total = containerHeight - windowH;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Responsive card width
  const cardWidth = viewportWidth < 768 ? viewportWidth * 0.75 : viewportWidth < 1024 ? 420 : 600;
  const gap = viewportWidth < 768 ? 24 : viewportWidth < 1024 ? 32 : 48;
  const rightPadding = viewportWidth * 0.1;
  const totalCardsWidth = cards.length * cardWidth + (cards.length - 1) * gap + rightPadding;
  const sidepadding = viewportWidth < 768 ? 24 : viewportWidth < 1024 ? 40 : 64;
  const maxTranslate = Math.max(0, totalCardsWidth - viewportWidth + sidepadding);

  const horizontalProgress = Math.min(1, Math.max(0, (scrollProgress - 0.15) / 0.55));
  const translateX = -horizontalProgress * maxTranslate;

  // Background & text color transition based on scroll
  const colorProgress = Math.min(1, scrollProgress / 0.5);
  const bgR = Math.round(255 - colorProgress * (255 - 18));
  const bgG = Math.round(255 - colorProgress * (255 - 25));
  const bgB = Math.round(255 - colorProgress * (255 - 52));
  const bgColor = `rgb(${bgR}, ${bgG}, ${bgB})`;

  const textR = Math.round(26 + colorProgress * (245 - 26));
  const textG = Math.round(39 + colorProgress * (245 - 39));
  const textB = Math.round(68 + colorProgress * (245 - 68));
  const titleColor = `rgb(${textR}, ${textG}, ${textB})`;
  const subtitleColor = `rgba(${textR}, ${textG}, ${textB}, 0.7)`;
  const metaColor = `rgba(${textR}, ${textG}, ${textB}, 0.6)`;

  const accentR = Math.round(43 + colorProgress * (120 - 43));
  const accentG = Math.round(93 + colorProgress * (180 - 93));
  const accentB = Math.round(140 + colorProgress * (230 - 140));
  const accentColor = `rgb(${accentR}, ${accentG}, ${accentB})`;

  const arrowBgColor = colorProgress > 0.5 ? `rgba(255,255,255,0.15)` : `rgb(26,39,68)`;
  const arrowIconColor = colorProgress > 0.5 ? "#ffffff" : "#ffffff";

  return (
    <section
      ref={containerRef}
      className="relative bg-white"
      style={{ height: "400vh" }}
    >
      {/* Sticky Container */}
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      >
        {/* Section Header */}
        <div className="max-w-[87.5rem] mx-auto w-full px-[1.5rem] md:px-[2.5rem] lg:px-[4rem] mb-[2rem] md:mb-[2.5rem] lg:mb-[4rem]">
          <span
            className="tracking-[6px] uppercase block mb-[0.5rem] md:mb-[1rem]"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)", fontWeight: 500, color: accentColor }}
          >
            Weekly Schedule
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.8125rem)",
              fontWeight: 800,
              letterSpacing: "-1px",
              color: titleColor,
            }}
          >
            예배와 모임
          </h2>
        </div>

        {/* Horizontal Scrolling Cards */}
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}px)`,
            gap: `${gap}px`,
            willChange: "transform",
            transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
            paddingLeft: viewportWidth >= 1024
              ? `max(4rem, calc((100vw - 87.5rem) / 2 + 4rem))`
              : `${sidepadding}px`,
            paddingRight: "calc(100vw * 0.1)",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="flex-shrink-0 group cursor-pointer"
              style={{
                width: `${cardWidth}px`,
              }}
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-[16/10] mb-[0.75rem] md:mb-[1rem] lg:mb-[1.25rem]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <div className="relative">
                <p
                  className="mb-[0.25rem]"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 700, color: subtitleColor }}
                >
                  {card.title}
                </p>
                <h3
                  className="mb-[0.25rem]"
                  style={{ fontSize: "clamp(1.125rem, 2vw, 1.75rem)", fontWeight: 700, color: titleColor }}
                >
                  {card.sermon}
                </h3>
                {card.verse && (
                  <p
                    className="mb-[0.5rem]"
                    style={{ fontSize: "clamp(0.8125rem, 1.2vw, 1rem)", fontWeight: 400, color: metaColor }}
                  >
                    {card.verse}
                  </p>
                )}

                {/* Meta info */}
                <p
                  style={{ fontSize: "clamp(0.8125rem, 1.2vw, 1rem)", fontWeight: 400, color: metaColor, fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif" }}
                >
                  {card.pastor} | {card.date}
                </p>

                {/* Hover Arrow Icon */}
                <div
                  className="absolute right-0 bottom-0 w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  style={{ backgroundColor: arrowBgColor }}
                >
                  <ArrowRight className="w-[1.125rem] h-[1.125rem] md:w-[1.25rem] md:h-[1.25rem]" style={{ color: arrowIconColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}