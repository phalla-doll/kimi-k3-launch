import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navigation from './components/Navigation';
import Loader from './components/Loader';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    // Wait for fonts to load before declaring ready
    document.fonts.ready.then(() => {
      // Font is ready
    });

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf); };
  }, []);

  useGSAP(() => {
    if (!loaded) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(containerRef.current, { height: "auto" });
      gsap.set(stickyRef.current, { position: "relative", height: "auto", overflow: "visible" });
      gsap.set(".scene-01, .scene-02, .scene-03, .scene-04, .scene-05, .scene-06, .scene-07", { 
        position: "relative", opacity: 1, pointerEvents: "auto", height: "100vh" 
      });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.15) setActiveScene(0);      // HERO
          else if (progress < 0.35) setActiveScene(1); // CONTEXT
          else if (progress < 0.65) setActiveScene(2); // CAPABILITIES
          else if (progress < 0.8) setActiveScene(3);  // ACCESS / INDEX
          else setActiveScene(4);                      // CLIMAX / CTA
        }
      }
    });

    // SCENE 01: HERO
    tl.to(".hero-meta, .hero-scroll, .hero-k3", { opacity: 0, y: -50, duration: 2, ease: "power2.out" }, 0);
    tl.to(".hero-imi", { x: '50vw', opacity: 0, duration: 4, ease: "power2.inOut" }, 0);
    tl.to(".hero-k", {
      scale: 150,
      xPercent: 200, 
      yPercent: 0,
      transformOrigin: "center center",
      duration: 6,
      ease: "power2.inOut"
    }, 1);

    // SCENE 02: INSIDE THE K
    tl.fromTo(".scene-02", { opacity: 0 }, { opacity: 1, duration: 2 }, 3);
    
    tl.fromTo(".s2-word", 
      { opacity: 0, y: 50, scale: 0.8 }, 
      { opacity: 1, y: 0, scale: 1, stagger: 0.5, duration: 2, ease: "power2.out" }, 
      4
    );
    tl.to(".s2-word", { opacity: 0, scale: 2, stagger: 0.3, duration: 2, ease: "power2.in" }, 8);
    tl.to(".s2-line", { rotation: 0, scaleX: 200, duration: 3, ease: "power2.inOut" }, 9);
    
    tl.to(".scene-02", { opacity: 0, duration: 1 }, 12);
    
    // SCENE 03: ONE MILLION CONTEXT
    tl.to(".master-bg", { backgroundColor: "#F1EFE8", color: "#090A0A", duration: 2 }, 11);
    tl.fromTo(".scene-03", { opacity: 0 }, { opacity: 1, duration: 2 }, 11);

    tl.to(".s3-numbers-container", { xPercent: -70, duration: 8, ease: "none" }, 13);
    
    tl.to(".s3-final-6", { scale: 150, xPercent: -300, transformOrigin: "center center", duration: 4, ease: "power3.inOut" }, 19);
    
    // Fade to dark before revealing capabilities to ensure contrast
    tl.to(".master-bg", { backgroundColor: "#090A0A", color: "#F1EFE8", duration: 2 }, 21);
    tl.to(".scene-03", { opacity: 0, duration: 1 }, 23);

    // SCENE 04: CAPABILITIES
    tl.fromTo(".scene-04", { opacity: 0 }, { opacity: 1, duration: 1 }, 23);

    tl.fromTo(".s4-reason", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2 }, 24);
    tl.to(".s4-reason", { scaleX: 1.5, letterSpacing: "0.2em", duration: 2 }, 27);
    tl.to(".s4-reason", { opacity: 0, filter: "blur(20px)", duration: 2 }, 29);

    tl.fromTo(".s4-code", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 2 }, 30);
    tl.to(".s4-code", { opacity: 0, filter: "blur(20px)", duration: 2 }, 33);

    tl.fromTo(".s4-build", { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 2 }, 34);
    tl.to(".s4-build", { opacity: 0, duration: 2 }, 37);
    
    tl.to(".scene-04", { opacity: 0, duration: 0.5 }, 39);

    // SCENE 05: K3 INDEX
    tl.fromTo(".scene-05", { opacity: 0 }, { opacity: 1, duration: 2 }, 40);
    tl.fromTo(".s5-rows", { y: "60vh" }, { y: "-60vh", duration: 6, ease: "none" }, 41);
    
    tl.to(".s5-row", { color: "#D6FF3F", stagger: 0.5, duration: 0.5 }, 42);
    
    tl.to(".scene-05", { opacity: 0, duration: 2 }, 47);

    // SCENE 06: CLIMAX
    tl.to(".master-bg", { backgroundColor: "#D6FF3F", color: "#090A0A", duration: 2 }, 47);
    tl.fromTo(".scene-06", { opacity: 0 }, { opacity: 1, duration: 1 }, 48);
    
    tl.fromTo(".s6-statement", { scale: 15 }, { scale: 1, duration: 5, ease: "power3.out" }, 48);
    tl.to(".s6-statement", { letterSpacing: "-0.08em", lineHeight: "0.75", duration: 3 }, 54);
    tl.to(".s6-statement", { opacity: 0, filter: "blur(30px)", scale: 0.8, duration: 2 }, 57);
    tl.to(".scene-06", { opacity: 0, duration: 0.5 }, 59);

    // SCENE 07: FINAL CTA
    tl.to(".master-bg", { backgroundColor: "#090A0A", color: "#F1EFE8", duration: 2 }, 58);
    tl.fromTo(".scene-07", { opacity: 0 }, { opacity: 1, duration: 2 }, 59);

  }, { scope: containerRef, dependencies: [loaded] });

  return (
    <div className="relative w-full text-paper selection:bg-signal selection:text-ink">
      <Loader onComplete={() => setLoaded(true)} />
      <Navigation activeScene={activeScene} />

      <div ref={containerRef} className="h-[2000vh] w-full relative" style={{ opacity: loaded ? 1 : 0 }}>
        <div ref={stickyRef} className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center master-bg text-paper bg-ink">
          
          {/* SCENE 07: FINAL CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center scene-07 opacity-0 z-70 pointer-events-none text-paper">
            <div className="pointer-events-auto flex flex-col items-center text-center gap-12">
              <h2 className="font-display text-[12vw] leading-none tracking-tighter">KIMI K3</h2>
              <div className="font-sans uppercase tracking-widest text-sm text-gray">
                NOW AVAILABLE<br/>
                Try the model through OpenRouter.
              </div>
              <a href="#" className="group relative overflow-hidden bg-paper text-ink px-8 py-4 font-sans font-bold uppercase tracking-widest text-sm">
                <span className="relative z-10 flex items-center gap-2">
                  TRY KIMI K3 <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </span>
                <div className="absolute inset-0 bg-signal transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </a>
              <div className="font-mono text-xs text-gray uppercase">moonshotai/kimi-k3</div>
            </div>
            <div className="absolute -bottom-[20vh] left-1/2 -translate-x-1/2 font-display text-[50vw] leading-none text-dark opacity-50 pointer-events-none">
              K
            </div>
          </div>

          {/* SCENE 06: CLIMAX */}
          <div className="absolute inset-0 flex items-center justify-center scene-06 opacity-0 z-60 pointer-events-none text-ink">
            <h2 className="s6-statement font-display text-[10vw] uppercase text-center leading-[0.9] tracking-tight">
              NOT A CHAT WINDOW.<br/>
              A WORKING INTELLIGENCE.
            </h2>
          </div>

          {/* SCENE 05: K3 INDEX */}
          <div className="absolute inset-0 flex items-center scene-05 opacity-0 z-50 pointer-events-none px-12 md:px-24 text-paper">
            <div className="w-1/2 font-display text-[30vw] leading-none">K3</div>
            <div className="w-1/2 font-sans text-xs md:text-sm uppercase tracking-widest flex flex-col gap-12 s5-rows">
              {['MODEL — KIMI K3', 'MODEL ID — MOONSHOTAI/KIMI-K3', 'ACCESS — OPENROUTER', 'INTERFACE — CHAT COMPLETIONS', 'CONTEXT — 1,048,576', 'STATUS — AVAILABLE'].map((row, i) => (
                <div key={i} className="border-b border-dark pb-4 flex justify-between w-full s5-row">
                  <span>{row.split(' — ')[0]}</span>
                  <span className="text-gray">{row.split(' — ')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SCENE 04: CAPABILITIES */}
          <div className="absolute inset-0 flex items-center justify-center scene-04 opacity-0 z-40 pointer-events-none text-paper">
            <div className="absolute inset-0 flex flex-col items-center justify-center s4-reason">
              <div className="font-mono text-xs text-gray mb-8">01 / REASON</div>
              <h2 className="font-display text-[8vw] uppercase leading-none text-center">FOLLOW THE PROBLEM<br/>BEYOND THE FIRST ANSWER.</h2>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center s4-code opacity-0">
              <div className="font-mono text-xs text-gray mb-8">02 / CODE</div>
              <h2 className="font-display text-[8vw] uppercase leading-none text-center">MOVE FROM INTENT<br/>TO WORKING SYSTEMS.</h2>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center s4-build opacity-0">
              <div className="font-mono text-xs text-gray mb-8">03 / BUILD</div>
              <h2 className="font-display text-[8vw] uppercase leading-none text-center">PLAN.<br/>EXECUTE.<br/>VERIFY.<br/>ITERATE.</h2>
            </div>
          </div>

          {/* SCENE 03: ONE MILLION CONTEXT */}
          <div className="absolute inset-0 flex items-center scene-03 opacity-0 z-30 overflow-hidden pointer-events-none text-ink">
            <div className="flex items-center h-full whitespace-nowrap w-max s3-numbers-container pt-[20vh] px-[10vw]">
              <div className="flex font-display text-[40vw] leading-none tracking-tighter">
                <span>1</span>
                <span className="opacity-30 mx-[10vw]">,</span>
                <span>048</span>
                <span className="opacity-30 mx-[10vw]">,</span>
                <span>57<span className="s3-final-6 inline-block">6</span></span>
              </div>
              <div className="ml-[20vw] flex flex-col gap-16 font-sans uppercase tracking-widest text-sm opacity-70 font-bold">
                <div>LONG CONTEXT</div>
                <div>CONNECTED REASONING</div>
                <div>COMPLETE PROJECT AWARENESS</div>
                <div>FEWER ARTIFICIAL BOUNDARIES</div>
              </div>
            </div>
          </div>

          {/* SCENE 02: INSIDE THE K */}
          <div className="absolute inset-0 flex items-center justify-center scene-02 opacity-0 z-20 pointer-events-none perspective-[1000px] text-paper">
            <div className="absolute w-[2px] h-[150vh] bg-dark rotate-45 s2-line"></div>
            <div className="flex flex-col text-center font-display text-[10vw] leading-[0.8] uppercase mix-blend-difference z-10">
              <span className="s2-word">THINK</span>
              <span className="s2-word">ACROSS</span>
              <span className="s2-word">THE ENTIRE</span>
              <span className="s2-word">PROBLEM</span>
            </div>
          </div>

          {/* SCENE 01: HERO */}
          <div className="absolute inset-0 flex items-center justify-center scene-01 z-10 pointer-events-none text-paper">
            <h1 className="font-display text-[30vw] leading-[0.75] tracking-tighter uppercase flex">
              <span className="hero-k inline-block">K</span>
              <span className="hero-imi inline-block">IMI</span>
            </h1>
            <div className="absolute top-1/2 right-12 -translate-y-1/2 hero-k3 font-display text-[8vw]">
              K3
            </div>
            <div className="absolute bottom-8 left-8 text-[10px] md:text-xs font-sans uppercase tracking-widest text-gray hero-meta">
              A NEW SCALE OF INTELLIGENCE<br/>
              MOONSHOTAI / KIMI-K3<br/>
              AVAILABLE THROUGH OPENROUTER
            </div>
            <div className="absolute bottom-8 right-8 text-[10px] md:text-xs font-sans uppercase tracking-widest text-gray hero-scroll">
              SCROLL TO ENTER
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
