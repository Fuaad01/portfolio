import { useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Footer from "./Footer";
import ContactBanner from "./ContactBanner";
import Landing from "./Landing";
import Marquee from "./Marquee";
import Navbar from "./Navbar";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import BackgroundGlows from "./utils/BackgroundGlows";
import setSplitText from "./utils/splitText";
import { setCharTimeline, setAllTimeline } from "./utils/GsapScroll";
import { setProgress } from "./utils/loadingUtils";
import { useLoading } from "../context/LoadingContext";

const MainContainer = () => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const { setLoading } = useLoading();

  // Auto-complete loading screen (no character model to load)
  useEffect(() => {
    const progress = setProgress(setLoading);
    progress.loaded();
  }, [setLoading]);

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  // Initialize section scroll animations after ScrollSmoother is ready
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCharTimeline();
      setAllTimeline();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="container-main">
      <div id="smooth-wrapper">
        <Navbar />
        <BackgroundGlows />
        <div id="smooth-content">
          <Landing />
          <Marquee />
          <About />
          <WhatIDo />
          <Career />
          <Work />
          <ContactBanner />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
