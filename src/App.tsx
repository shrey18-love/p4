"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CloudShader } from "@/components/ui/cloud-shader";
import GlassSurface from "@/components/GlassSurface.jsx";
import GooeyNav from "@/components/GooeyNav.jsx";
import FootwearShowcase from "@/components/FootwearShowcase";
import HairShowcase from "@/components/HairShowcase";
import NailShowcase from "@/components/NailShowcase";

const items = [
  { label: "Home", href: "#home" },
  { label: "Chocolate", href: "#chocolate" },
  { label: "Accessories", href: "#accessories" },
  { label: "Nail Paint", href: "#nail-paint" },
  { label: "Dress", href: "#dress" },
  { label: "Footwear", href: "#shoes" },
  { label: "Hairstyle", href: "#hairstyle" },
];

type FrameSequenceProps = {
  id: string;
  frameDirectory: string;
  frameCount: number;
  title: ReactNode;
  hint: string;
  themeClass?: string;
};

const dressChoices = [
  { 
    name: "A-Line Dress", 
    note: "Classic, flattering, and ready for anything.", 
    style: "a-line", 
    image: new URL("./assets/dresses/a-line.png", import.meta.url).href,
    video: new URL("../flowprojectoutput/linedress.mp4", import.meta.url).href
  },
  { 
    name: "Slip Dress", 
    note: "Sleek minimal elegance for evenings and dates.", 
    style: "slip", 
    image: new URL("./assets/dresses/slip.png", import.meta.url).href,
    video: new URL("../flowprojectoutput/slipdress.mp4", import.meta.url).href
  },
  { 
    name: "Shirt Dress", 
    note: "Comfy, casual, and easy to style every day.", 
    style: "shirt", 
    image: new URL("./assets/dresses/shirt.png", import.meta.url).href,
    video: new URL("../flowprojectoutput/shirtdress.mp4", import.meta.url).href
  },
  { 
    name: "Maxi Dress", 
    note: "Flowy grace for slow, beautiful days.", 
    style: "maxi", 
    image: new URL("./assets/dresses/maxi.png", import.meta.url).href,
    video: new URL("../flowprojectoutput/maxidress.mp4", import.meta.url).href
  },
  { 
    name: "Fit & Flare", 
    note: "Fun, flirty, and timelessly classic.", 
    style: "fit-flare", 
    image: new URL("./assets/dresses/fit-flare.png", import.meta.url).href,
    video: new URL("../flowprojectoutput/fitandflare.mp4", import.meta.url).href
  },
];

function DressWardrobe() {
  const [selectedDress, setSelectedDress] = useState(0);
  const choice = dressChoices[selectedDress];

  const handlePrev = () => {
    setSelectedDress((prev) => (prev - 1 + dressChoices.length) % dressChoices.length);
  };

  const handleNext = () => {
    setSelectedDress((prev) => (prev + 1) % dressChoices.length);
  };

  return (
    <section id="dress" className="dress-room">
      {/* Left side: Dress Image and Description with Left/Right Buttons */}
      <div className="dress-room__left">
        <div className="dress-card">
          <div className="dress-card__image-container">
            <button className="nav-btn nav-btn--prev" onClick={handlePrev} aria-label="Previous dress">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            
            {choice.image && (
              <img src={choice.image} alt={choice.name} className="dress-card__image" />
            )}
            
            <button className="nav-btn nav-btn--next" onClick={handleNext} aria-label="Next dress">
              <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
          
          <div className="dress-card__details">
            <span className="dress-room__eyebrow">CHOOSE YOUR LOOK</span>
            <h2>{choice.name}</h2>
            <p className="dress-room__intro">{choice.note}</p>
            
            {/* Visual indicator dots */}
            <div className="dress-indicators">
              {dressChoices.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`indicator-dot ${selectedDress === idx ? 'active' : ''}`}
                  onClick={() => setSelectedDress(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Autoplaying Video corresponding to the selected dress */}
      <div className="dress-room__right">
        <div className="video-card">
          <video
            key={choice.video}
            autoPlay
            loop
            muted
            playsInline
            className="video-card__video"
          >
            <source src={choice.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="video-card__overlay" />
        </div>
      </div>
    </section>
  );
}





function FrameScrollSequence({ id, frameDirectory, frameCount, title, hint, themeClass = "" }: FrameSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let animationFrame = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) return;
    const frames = new Map<number, HTMLImageElement>();
    let requestedFrame = 0;
    let renderedFrame = -1;

    let isVisible = false;
    const frameUrl = (index: number) => `/${frameDirectory}/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "medium";
      drawFrame(renderedFrame < 0 ? 0 : renderedFrame);
    };
    const drawFrame = (index: number) => {
      const image = frames.get(index);
      if (!image?.complete || !image.naturalWidth) return;
      const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
      const width = image.naturalWidth * scale;
      const height = image.naturalHeight * scale;
      context.fillStyle = "#1b0532";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
      renderedFrame = index;
    };
    const loadFrame = (index: number) => {
      if (index < 0 || index >= frameCount || frames.has(index)) return;
      const image = new Image();
      image.decoding = "async";
      image.onload = () => { if (index === requestedFrame || renderedFrame < 0) drawFrame(index); };
      image.src = frameUrl(index);
      frames.set(index, image);
    };
    const queueFrames = (index: number) => {
      for (let offset = -4; offset <= 14; offset += 1) loadFrame(index + offset);
      if (frames.size > 28) {
        for (const [key, image] of frames) {
          if (Math.abs(key - index) > 12) { image.src = ""; frames.delete(key); }
          if (frames.size <= 24) break;
        }
      }
    };
    const update = () => {
      animationFrame = 0;
      if (!isVisible) return;
      const section = sectionRef.current;
      const title = titleRef.current;
      if (!section || !title) return;
      const rect = section.getBoundingClientRect();
      const travel = Math.max(section.offsetHeight - window.innerHeight, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      requestedFrame = Math.min(frameCount - 1, Math.floor(progress * (frameCount - 1)));
      queueFrames(requestedFrame);
      drawFrame(requestedFrame);
      title.style.opacity = `${Math.max(0, 1 - progress * 3.8)}`;
      title.style.transform = `translate(-50%, calc(-50% - ${progress * 32}px)) scale(${1 - progress * .08})`;
    };
    const requestUpdate = () => {
      if (isVisible && !animationFrame) animationFrame = window.requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) requestUpdate();
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    requestUpdate();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", resizeCanvas);
      window.cancelAnimationFrame(animationFrame);
      frames.forEach(image => { image.src = ""; });
    };
  }, []);

  return (
    <section id={id} className={`chocolate-video ${themeClass}`} ref={sectionRef}>
      <div className="chocolate-video__sticky">
        <canvas ref={canvasRef} className="chocolate-video__media" aria-label={`${id} scroll animation`} />
        <div className="chocolate-video__shade" aria-hidden="true" />
        <h2 ref={titleRef}>{title}</h2>
        <p className="chocolate-video__hint">{hint}</p>
      </div>
    </section>
  );
}


export function CloudShaderDemo() {
  const [activeNavIndex, setActiveNavIndex] = useState(0);

  useEffect(() => {
    const sections = items.map(item => item.href.slice(1));
    const updateFromHash = () => {
      const hash = window.location.hash.slice(1);
      const index = sections.indexOf(hash);
      if (index >= 0) setActiveNavIndex(index);
    };
    window.addEventListener("hashchange", updateFromHash);
    updateFromHash();
    return () => { window.removeEventListener("hashchange", updateFromHash); };
  }, []);

  const handleNavChange = (index: number) => {
    setActiveNavIndex(index);
    window.scrollTo({ top: 0, behavior: "instant" });
    const targetHash = items[index]?.href;
    if (targetHash && window.location.hash !== targetHash) {
      window.history.pushState(null, "", targetHash);
    }
  };

  return (
    <main className="cloud-page">
      <header className="cloud-page__nav">
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={999}
          backgroundOpacity={0.1}
          saturation={1.3}
          displace={0.18}
          distortionScale={-105}
          className="cloud-page__nav-surface"
        >
          <GooeyNav
            items={items}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            activeIndex={activeNavIndex}
            onActiveChange={handleNavChange}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </GlassSurface>
      </header>

      {activeNavIndex === 0 && (
        <section id="home" className="cloud-page__home">
          <CloudShader className="cloud-page__shader" />
          <div className="cloud-page__hero">
            <h1><span>I Know You</span><span>Quite a Bit 🤔</span></h1>
            <p>Lets check <span>😋</span></p>
          </div>
        </section>
      )}

      {activeNavIndex === 1 && (
        <FrameScrollSequence
          id="chocolate"
          frameDirectory="bubbly-frames"
          frameCount={290}
          title={<>Ofcourse<br />It Is Bubbly</>}
          hint="Scroll to unwrap the bubbles"
        />
      )}

      {activeNavIndex === 2 && (
        <FrameScrollSequence
          id="accessories"
          frameDirectory="jhumka-frames"
          frameCount={300}
          title={<>Ofcourse<br />It Is Jhumka</>}
          hint="Scroll to discover the details"
          themeClass="accessories-sequence"
        />
      )}

      {activeNavIndex === 3 && <NailShowcase />}

      {activeNavIndex === 4 && <DressWardrobe />}

      {activeNavIndex === 5 && <FootwearShowcase />}

      {activeNavIndex === 6 && <HairShowcase />}
    </main>
  );
}

export default CloudShaderDemo;
