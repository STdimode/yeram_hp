import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const galleries = {
  event: [
    {
      image:
        "https://images.unsplash.com/photo-1761166478784-dc565cffb472?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBibHVlJTIwc2t5JTIwY2xvdWRzJTIwc29mdHxlbnwxfHx8fDE3NzMyMzc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "2026 부활절 연합예배",
      date: "2026년 3월 26일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1764445578321-d11ed50fa9cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjBvY2VhbiUyMGNhbG0lMjBzZXJlbmV8ZW58MXx8fHwxNzczMjM3NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "찬양 페스티벌",
      date: "2023년 10월 15일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1660254149771-23c6a0bc5694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBibHVlJTIwYWJzdHJhY3QlMjB0ZXh0dXJlJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMyMzc0NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "가을 야유회",
      date: "2022년 11월 12일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1674043072969-2c63c0e1216e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmx1ZSUyMGZsb3dlcnMlMjBoeWRyYW5nZWElMjBwYXN0ZWx8ZW58MXx8fHwxNzczMjM3NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "세례식",
      date: "2023년 5월 20일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1771700496753-09196abbad4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjB3YXRlciUyMHJpcHBsZSUyMGNhbG18ZW58MXx8fHwxNzczMjM3NDY3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "주일 예배",
      date: "2023년 1월 1일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1612457506498-e394426f27cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBibHVlJTIwbW91bnRhaW4lMjBmb2clMjBtaXN0eXxlbnwxfHx8fDE3NzMyMzc0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "소그룹 성경 공부",
      date: "2023년 7월 15일",
    },
  ],
  newcomer: [
    {
      image:
        "https://images.unsplash.com/photo-1742403412928-c077668aad2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmx1ZSUyMG1hcmJsZSUyMHRleHR1cmUlMjBzbW9vdGh8ZW58MXx8fHwxNzczMjM3NDY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "새가족 환영회",
      date: "2023년 9월 1일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1628880635807-fa5bf0df26b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBibHVlJTIwZnJvemVuJTIwY3J5c3RhbCUyMGNsb3NlfGVufDF8fHx8MTc3MzIzNzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "어린이 프로그램",
      date: "2023년 10월 1일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1649711115004-4c5215684b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWxlJTIwYmx1ZSUyMGdyYWRpZW50JTIwd2FsbCUyMHBhaW50fGVufDF8fHx8MTc3MzIzNzQ2OHww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "봉사팀 오리엔테이션",
      date: "2023년 8월 1일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1641651495195-f1d8b6f63121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwYmx1ZSUyMGZlYXRoZXIlMjBkZWxpY2F0ZSUyMHBhc3RlbHxlbnwxfHx8fDE3NzMyMzc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "교회 투어",
      date: "2023년 11월 1일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544032735-4ed3ae9685e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwcGFzdGVsJTIwZGF3biUyMGhvcml6b24lMjBtaW5pbWFsfGVufDF8fHx8MTc3MzIzNzQ2OXww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "중보기도",
      date: "2023년 12월 1일",
    },
    {
      image:
        "https://images.unsplash.com/photo-1741663888387-d7510d1253b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodCUyMGJsdWUlMjBzaWxrJTIwZmFicmljJTIwZmxvd2luZ3xlbnwxfHx8fDE3NzMyMzc0NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "예배 안내",
      date: "2023년 1월 1일",
    },
  ],
};

const tabs = [
  { id: "event" as const, label: "행사 앨범" },
  { id: "newcomer" as const, label: "새가족 앨범" },
];

export function TabbedGallery() {
  const [activeTab, setActiveTab] = useState<"event" | "newcomer">("event");
  const [scrollX, setScrollX] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const items = galleries[activeTab];
  const cardWidth = isMobile ? 240 : 310;
  const gap = isMobile ? 14 : 20;
  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1920;
  const containerWidth = isMobile ? viewportWidth - 48 : 1400 - 128;
  const totalWidth = items.length * (cardWidth + gap) - gap;
  const maxScroll = Math.max(0, totalWidth - containerWidth);

  const handlePrev = () => {
    setScrollX((prev) => Math.max(0, prev - (cardWidth + gap)));
  };

  const handleNext = () => {
    setScrollX((prev) => Math.min(maxScroll, prev + (cardWidth + gap)));
  };

  const handleTabChange = (tab: "event" | "newcomer") => {
    setActiveTab(tab);
    setScrollX(0);
  };

  return (
    <section className="relative py-[3rem] md:py-[5rem] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1522123472015-2d9f7ee5608d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5saWdodCUyMGNhc3RpbmclMjBzaGFkb3dzJTIwY29uY3JldGUlMjB3YWxsJTIwbWluaW1hbHxlbnwxfHx8fDE3NzMyMzY0MzR8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-[87.5rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[4rem]">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-[1.5rem] md:mb-[2.5rem] gap-[1.25rem] md:gap-0">
          {/* Left: Label + Title + Tabs */}
          <div>
            {/* Gallery label */}
            <span
              className="text-white/70 tracking-[5px] uppercase block mb-[0.5rem] md:mb-[1rem]"
              style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.25rem)", fontWeight: 500 }}
            >
              Gallery
            </span>

            {/* Title + Tabs inline */}
            <div className="flex items-baseline gap-[1rem] md:gap-[2rem]">
              <h2
                className="text-white"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.8125rem)", fontWeight: 700, letterSpacing: "-1px" }}
              >
                동래중앙 앨범
              </h2>

              {/* Tabs */}
              <div className="flex items-baseline gap-[0.75rem] md:gap-[1.25rem]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`transition-colors duration-300 pb-1 ${
                      activeTab === tab.id
                        ? "text-white border-b border-white"
                        : "text-white/50 hover:text-white/80 border-b border-transparent"
                    }`}
                    style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", fontWeight: activeTab === tab.id ? 700 : 400 }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Navigation */}
          <div className="flex items-center gap-2">
            {/* Progress line */}
            <div className="w-[6rem] md:w-48 h-px bg-white/35 mr-[0.5rem] md:mr-4 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white/75"
                animate={{
                  width: `${maxScroll > 0 ? (scrollX / maxScroll) * 100 : 0}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <button
              onClick={handlePrev}
              disabled={scrollX === 0}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/45 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-20"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              onClick={handleNext}
              disabled={scrollX >= maxScroll}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/45 flex items-center justify-center text-white hover:bg-white/10 transition-all duration-300 disabled:opacity-20"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Carousel - full width overflow */}
      <div className="relative z-10 max-w-[87.5rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[4rem]">
        <div className="overflow-visible">
          <motion.div
            ref={trackRef}
            className="flex"
            animate={{ x: -scrollX }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ gap: `${gap}px` }}
          >
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={`${activeTab}-${i}`}
                  className="flex-shrink-0 group cursor-pointer relative"
                  style={{ width: `${cardWidth}px` }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.caption}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Hover overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
                      style={{
                        background: "rgba(15,15,15,0.3)",
                      }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <p
                          className="text-white mb-1.5"
                          style={{ fontSize: "1.25rem", fontWeight: 600, lineHeight: 1.4 }}
                        >
                          {item.caption}
                        </p>
                        <p
                          className="text-white/50"
                          style={{ fontSize: "1rem", fontWeight: 300, fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif" }}
                        >
                          {item.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}