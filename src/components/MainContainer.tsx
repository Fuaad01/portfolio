import { useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
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
      <BackgroundGlows />
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing />
            <Marquee />
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
