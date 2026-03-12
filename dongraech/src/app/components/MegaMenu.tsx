import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MenuItem {
  label: string;
  children?: string[];
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    title: "교회소개",
    items: [
      { label: "인사말" },
      {
        label: "섬기는 사람들",
        children: ["교역자", "장로", "교회직원"],
      },
      { label: "예배시간 안내" },
      { label: "새가족 안내" },
      { label: "CI 심볼" },
      { label: "오시는 길" },
    ],
  },
  {
    title: "말씀",
    items: [
      { label: "주일 낮 예배" },
      { label: "주일 찬양 예배" },
      { label: "수요말씀사경회" },
      { label: "금요성령기도회" },
      { label: "특별행사" },
    ],
  },
  {
    title: "찬양",
    items: [
      { label: "시온찬양대" },
      { label: "노엘찬양대" },
      { label: "임마누엘찬양대" },
      { label: "호산나찬양대" },
      { label: "찬양단" },
      { label: "봉헌송 및 특별찬양" },
    ],
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
      { label: "청년부" },
    ],
  },
  {
    title: "공동체 (기관)",
    items: [
      { label: "은장회 / 안수집사회 / 남선교회" },
      { label: "부디아곱사회 / 여선교회" },
      { label: "예람유치원" },
      { label: "예람수양관" },
      { label: "한국기독교선교박물관" },
    ],
  },
  {
    title: "팀사역",
    items: [
      { label: "국내선교" },
      { label: "해외선교" },
      {
        label: "문화사역",
        children: ["아기학교", "탈무드창의영재학교", "토요음악교실", "A.I스쿨"],
      },
      { label: "예람전도대" },
      { label: "새가족 양육" },
      { label: "중보기도대" },
      { label: "늘푸른대학" },
      { label: "사회봉사" },
    ],
  },
  {
    title: "온라인행정",
    items: [
      { label: "차량예약" },
      { label: "장소예약" },
      { label: "비품수리신청" },
      { label: "증명서 발급" },
    ],
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
      { label: "교무사업체" },
    ],
  },
];

function SubMenuItem({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  if (!hasChildren) {
    return (
      <li>
        <a
          href="#"
          className="text-[#555555] hover:text-[#333333] transition-colors duration-200 inline-block"
          style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 }}
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[#555555] hover:text-[#333333] transition-colors duration-200 group w-full"
        style={{ fontSize: "1rem", fontWeight: 400, lineHeight: 1.6 }}
      >
        <span>{item.label}</span>
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="text-[#999999] group-hover:text-[#555555] transition-colors flex-shrink-0"
        >
          <path
            d="M3 5.5L7 9.5L11 5.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="flex flex-col gap-1.5 pl-4 mt-1.5 border-l border-[#333333]/10 ml-1"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: "hidden" }}
          >
            {item.children!.map((child) => (
              <li key={child}>
                <a
                  href="#"
                  className="text-[#888888] hover:text-[#333333] transition-colors duration-200 inline-block"
                  style={{ fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.7 }}
                >
                  {child}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white overflow-y-auto"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-[5vw] py-[2.5vh] md:px-[4vw] md:py-[3vh] lg:px-[4rem] lg:py-[2rem]">
            <div className="flex items-center gap-[0.75rem]">
              <div className="w-[2.5rem] h-[2.5rem] border-2 border-[#333333] flex items-center justify-center">
                <span
                  className="text-[#333333]"
                  style={{ fontSize: "0.875rem", fontWeight: 700, letterSpacing: "2px" }}
                >
                  GCC
                </span>
              </div>
              <span
                className="text-[#333333] tracking-[3px] uppercase hidden md:inline"
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                Grace Community Church
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-[2.5rem] h-[2.5rem] flex items-center justify-center text-[#333333] hover:text-[#000000] transition-colors"
              aria-label="닫기"
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 6L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 6L6 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Menu Grid */}
          <div className="max-w-[87.5rem] mx-auto px-[5vw] md:px-[4vw] lg:px-[4rem] pt-[1.5rem] md:pt-[2rem] pb-[3rem] md:pb-[4rem] lg:pb-[5rem]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[2rem] md:gap-x-[2.5rem] lg:gap-x-[3rem] gap-y-[2rem] md:gap-y-[2.5rem] lg:gap-y-[3.5rem]">
              {menuData.map((category, idx) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + idx * 0.04 }}
                >
                  <h3
                    className="text-[#333333] pb-[0.75rem] mb-[1rem] border-b border-[#333333]/15"
                    style={{ fontSize: "1.5rem", fontWeight: 700 }}
                  >
                    {category.title}
                  </h3>
                  <ul className="flex flex-col gap-[0.625rem]">
                    {category.items.map((item) => (
                      <SubMenuItem key={item.label} item={item} />
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Line */}
          <div className="max-w-[87.5rem] mx-auto px-[5vw] md:px-[4vw] lg:px-[4rem] pb-[2rem] md:pb-[3rem]">
            <div className="border-t border-[#333333]/10 pt-[1.5rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-[0.5rem]">
              <span
                className="text-[#999999]"
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 400,
                  fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif",
                }}
              >
                &copy; 2026 동래중앙교회
              </span>
              <span
                className="text-[#999999]"
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 400,
                  fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif",
                }}
              >
                Tel. 051-555-1234
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}