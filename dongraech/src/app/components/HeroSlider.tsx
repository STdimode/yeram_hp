import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MegaMenu } from "./MegaMenu";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1768569391908-5c92c83744f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBpbnRlcmlvciUyMGVtcHR5JTIwcGV3cyUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NzMyMjUxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "은혜의 빛으로",
    subtitle: "Grace Community Church",
  },
  {
    image:
      "https://images.unsplash.com/photo-1589198234915-b57a9ad85d1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXRoZWRyYWwlMjBzdGFpbmVkJTIwZ2xhc3MlMjB3aW5kb3clMjBsaWdodHxlbnwxfHx8fDE3NzMyMjUxNTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "함께 걷는 믿음의 길",
    subtitle: "Walking Together in Faith",
  },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ x: direction > 0 ? "100%" : "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: direction > 0 ? "-100%" : "100%" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* CI Symbol */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-[5vw] py-[2vh] md:px-[4vw] md:py-[3vh] lg:px-[4rem] lg:py-[2rem]">
        <div className="flex items-center gap-[0.75rem]">
          <div className="w-[2.5rem] h-[2.5rem] border-2 border-[#E8EDF4] flex items-center justify-center">
            <span
              className="text-[#E8EDF4]"
              style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "2px" }}
            >
              GCC
            </span>
          </div>
          <span
            className="text-[#E8EDF4] tracking-[3px] uppercase hidden md:inline"
            style={{ fontSize: "0.75rem", fontWeight: 500 }}
          >
            Grace Community Church
          </span>
        </div>
        <nav className="flex items-center gap-[1.5rem] md:gap-[2rem] lg:gap-[2.5rem]">
          {["교회소개", "예배안내", "말씀", "커뮤니티", "오시는 길"].map((item) => (
            <a
              key={item}
              href="#"
              className="hidden lg:inline-block text-[#E8EDF4]/80 hover:text-[#E8EDF4] transition-colors tracking-wider"
              style={{ fontSize: "1.25rem", fontWeight: 400 }}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-[#E8EDF4]/80 hover:text-[#E8EDF4] transition-colors lg:ml-[0.5rem] flex flex-col items-center justify-center gap-[0.3125rem]" aria-label="메뉴">
            <span className="block w-[1.5rem] h-[0.125rem] bg-current" />
            <span className="block w-[1.5rem] h-[0.125rem] bg-current" />
            <span className="block w-[1.5rem] h-[0.125rem] bg-current" />
          </button>
        </nav>
      </div>

      {/* Mega Menu Overlay */}
      <MegaMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Pagination */}
      <div className="absolute bottom-[3vh] right-[5vw] md:bottom-[4vh] md:right-[4vw] lg:bottom-[3rem] lg:right-[4rem] z-20 flex items-center gap-[1rem]">
        <button
          onClick={prev}
          className="w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] rounded-full border border-[#E8EDF4]/50 flex items-center justify-center text-[#E8EDF4]/80 hover:border-[#E8EDF4]/70 hover:text-[#E8EDF4] transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-[0.25rem]" style={{ fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif", fontSize: "1.125rem", fontWeight: 600 }}>
          <span className="text-[#E8EDF4]">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-[#E8EDF4]/60 mx-[0.25rem]">/</span>
          <span className="text-[#E8EDF4]/60">
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
        <button
          onClick={next}
          className="w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem] rounded-full border border-[#E8EDF4]/50 flex items-center justify-center text-[#E8EDF4]/80 hover:bg-white/20 hover:border-[#E8EDF4]/70 hover:text-[#E8EDF4] transition-all duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}