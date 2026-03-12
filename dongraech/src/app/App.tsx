import { HeroSlider } from "./components/HeroSlider";
import { InteractiveGrid } from "./components/InteractiveGrid";
import { StickyHorizontalScroll } from "./components/StickyHorizontalScroll";
import { DynamicToggle } from "./components/DynamicToggle";
import { CommunityCards } from "./components/CommunityCards";
import { TabbedGallery } from "./components/TabbedGallery";
import { Footer } from "./components/Footer";
import { ScrollFadeUp } from "./components/ScrollFadeUp";

export default function App() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ fontFamily: "'HsBombaram20', 'Wanted Sans Variable', 'Wanted Sans', 'Noto Sans KR', sans-serif" }}
    >
      <HeroSlider />
      <ScrollFadeUp>
        <InteractiveGrid />
      </ScrollFadeUp>
      <ScrollFadeUp>
        <StickyHorizontalScroll />
      </ScrollFadeUp>
      <ScrollFadeUp>
        <DynamicToggle />
      </ScrollFadeUp>
      <ScrollFadeUp>
        <CommunityCards />
      </ScrollFadeUp>
      <ScrollFadeUp>
        <TabbedGallery />
      </ScrollFadeUp>
      <Footer />
    </div>
  );
}