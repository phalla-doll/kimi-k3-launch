import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete
        });
      }
    });

    // Animate progress value
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].val));
      }
    }, 0);

    // Animate the line
    tl.to(lineRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: 'power2.inOut',
    }, 0);

    // Text exit
    tl.to(textRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
    }, 1.2);

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink text-paper"
    >
      <div ref={textRef} className="flex flex-col items-center gap-4">
        <h1 className="font-display text-4xl tracking-widest uppercase">KIMI / K3</h1>
        <div className="text-xs font-sans tracking-widest text-gray uppercase tabular-nums">
          INITIALIZING {progress.toString().padStart(3, '0')}%
        </div>
        <div className="w-64 h-[1px] bg-dark mt-4 relative overflow-hidden">
          <div 
            ref={lineRef} 
            className="absolute inset-0 bg-paper origin-left scale-x-0" 
          />
        </div>
      </div>
    </div>
  );
}
