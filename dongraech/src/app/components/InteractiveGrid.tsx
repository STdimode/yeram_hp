import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { UserPlus, Clock, MapPin, Megaphone, Newspaper, FileText } from "lucide-react";
import guideBg from "figma:asset/a9f990c9275b65d453fabd77bda4140e722a2e8c.png";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function WelcomeCard() {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const show = hovered || isMobile;

  return (
    <motion.div
      className="relative aspect-square overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(https://images.unsplash.com/photo-1501082123646-4978a639c397?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaHVyY2glMjBhcmNoaXRlY3R1cmUlMjBtaW5pbWFsfGVufDF8fHx8MTc3MzIyNTE1Nnww&ixlib=rb-4.1.0&q=80&w=1080)`,
        }}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Overlay - Black */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: hovered
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(0, 0, 0, 0.5)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-[1.5rem] md:p-[2rem] lg:p-[3rem] text-center z-10">
        <motion.p
          className="text-[#E8EDF4]/80 tracking-[4px] uppercase mb-[0.5rem] md:mb-[1rem]"
          style={{ fontSize: "1.25rem", fontWeight: 400 }}
          animate={{ y: show ? -20 : 0 }}
          transition={{ duration: 0.4 }}
        >
          Welcome
        </motion.p>

        <motion.h3
          className="text-[#E8EDF4] mb-[0.5rem] md:mb-[1rem]"
          style={{ fontSize: "clamp(2rem, 5vw, 4.0625rem)", fontWeight: 400, letterSpacing: "-0.5px" }}
          animate={{ y: show ? -20 : 0 }}
          transition={{ duration: 0.4 }}
        >
          처음오셨나요?
        </motion.h3>

        {/* Hover description */}
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="max-w-md"
        >
          <p
            className="text-[#E8EDF4]/85 mb-[1.5rem] md:mb-[2.5rem]"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", fontWeight: 300, lineHeight: 1.9 }}
          >
            동래중앙교회에 오신것을 환영합니다.
            <br />
            온 열방을 향하여 복음을 힘써 전하는 건강한 교회,
            <br />
            동래중앙교회입니다.
          </p>
        </motion.div>

        {/* Bottom icon links */}
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem]"
        >
          {[
            { icon: UserPlus, label: "새가족 안내" },
            { icon: Clock, label: "예배시간 안내" },
            { icon: MapPin, label: "오시는 길" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-[0.5rem] md:gap-[0.75rem] group/btn"
            >
              <div className="w-[3.5rem] h-[3.5rem] md:w-[4rem] md:h-[4rem] flex items-center justify-center">
                <item.icon
                  className="w-[1.75rem] h-[1.75rem] md:w-[2rem] md:h-[2rem] text-[#E8EDF4]/90 group-hover/btn:text-[#3B82F6] transition-colors duration-300"
                  strokeWidth={1.2}
                />
              </div>
              <span
                className="relative text-[#E8EDF4]/90 group-hover/btn:text-[#3B82F6] transition-colors duration-300"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 400 }}
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[0.09375rem] bg-[#3B82F6] group-hover/btn:w-full transition-all duration-300 ease-out" />
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

function NoticeCard() {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const show = hovered || isMobile;

  return (
    <motion.div
      className="relative aspect-square overflow-hidden cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${guideBg})`,
        }}
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: hovered
            ? "rgba(11, 29, 51, 0.85)"
            : "rgba(11, 29, 51, 0.55)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-[1.5rem] md:p-[2rem] lg:p-[3rem] text-center z-10">
        <motion.p
          className="text-[#E8EDF4]/80 tracking-[4px] uppercase mb-[0.5rem] md:mb-[1rem]"
          style={{ fontSize: "1.25rem", fontWeight: 400 }}
          animate={{ y: show ? -20 : 0 }}
          transition={{ duration: 0.4 }}
        >
          Notice
        </motion.p>

        <motion.h3
          className="text-[#E8EDF4] mb-[0.5rem] md:mb-[1rem]"
          style={{ fontSize: "clamp(2rem, 5vw, 4.0625rem)", fontWeight: 400, letterSpacing: "-0.5px" }}
          animate={{ y: show ? -20 : 0 }}
          transition={{ duration: 0.4 }}
        >
          성도를 위한 안내
        </motion.h3>

        {/* Hover description */}
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="max-w-md"
        >
          <p
            className="text-[#E8EDF4]/85 mb-[1.5rem] md:mb-[2.5rem]"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", fontWeight: 300, lineHeight: 1.9 }}
          >
            교회의 주요 공지사항 및
            <br />
            예배를 위한 주보를 편하게 확인해보시기 바랍니다.
          </p>
        </motion.div>

        {/* Bottom icon links */}
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
          animate={{ opacity: show ? 1 : 0, y: show ? 0 : 20 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex items-center gap-[1.5rem] md:gap-[2rem] lg:gap-[3rem]"
        >
          {[
            { icon: Megaphone, label: "공지사항" },
            { icon: Newspaper, label: "주보" },
            { icon: FileText, label: "방송자막요청" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-[0.5rem] md:gap-[0.75rem] group/btn"
            >
              <div className="w-[3.5rem] h-[3.5rem] md:w-[4rem] md:h-[4rem] flex items-center justify-center">
                <item.icon
                  className="w-[1.75rem] h-[1.75rem] md:w-[2rem] md:h-[2rem] text-[#E8EDF4]/90 group-hover/btn:text-[#3B82F6] transition-colors duration-300"
                  strokeWidth={1.2}
                />
              </div>
              <span
                className="relative text-[#E8EDF4]/90 group-hover/btn:text-[#3B82F6] transition-colors duration-300"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 400 }}
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[0.09375rem] bg-[#3B82F6] group-hover/btn:w-full transition-all duration-300 ease-out" />
              </span>
            </button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export function InteractiveGrid() {
  return (
    <section className="w-full bg-[#E8EDF4]">
      <div className="max-w-[120rem] mx-auto grid grid-cols-1 md:grid-cols-2">
        <WelcomeCard />
        <NoticeCard />
      </div>
    </section>
  );
}