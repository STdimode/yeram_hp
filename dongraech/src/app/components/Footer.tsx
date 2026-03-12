export function Footer() {
  return (
    <footer className="bg-[#0f0f0f]" style={{ fontFamily: "'Wanted Sans Variable', 'Wanted Sans', sans-serif" }}>
      <div className="max-w-[1400px] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-[4rem] py-[2rem] md:py-[3rem]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[2rem] md:gap-0">
          {/* Left Side */}
          <div className="flex flex-col md:flex-row md:items-center gap-[1.25rem] md:gap-10">
            {/* Logo */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 border border-[#E8EDF4]/50 flex items-center justify-center">
                <span
                  className="text-[#E8EDF4]/90"
                  style={{ fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "2px" }}
                >
                  동래
                </span>
              </div>
              <div>
                <span
                  className="text-white block"
                  style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "1px" }}
                >
                  동래중앙교회
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1.5">
              <span
                className="text-[#E8EDF4]/55"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1rem)", fontWeight: 300, lineHeight: 1.6 }}
              >
                <span className="text-[#E8EDF4]/70" style={{ fontWeight: 500 }}>ADDRESS.</span>{" "}
                부산광역시 동래구 충렬대로202번가길 24 (수안동, 2-3번지)
              </span>
              <span
                className="text-[#E8EDF4]/55"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1rem)", fontWeight: 300, lineHeight: 1.6 }}
              >
                <span className="text-[#E8EDF4]/70" style={{ fontWeight: 500 }}>TEL.</span>{" "}
                051-558-1191{" "}
                <span className="text-[#E8EDF4]/30 mx-1">|</span>{" "}
                <span className="text-[#E8EDF4]/70" style={{ fontWeight: 500 }}>FAX.</span>{" "}
                051-555-8474
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start md:items-end gap-1.5">
            <span
              className="text-[#E8EDF4]/55"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1rem)", fontWeight: 300 }}
            >
              Copyright &copy; 2026 동래중앙교회
            </span>
            <span
              className="text-[#E8EDF4]/45"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1rem)", fontWeight: 300 }}
            >
              All rights reserved. Designed by (주)스데반정보
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}