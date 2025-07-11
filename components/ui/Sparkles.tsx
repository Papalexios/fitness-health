import React, { useEffect, useRef } from 'react';

const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface SparklesCoreProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id = "tsparticles",
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 30,
  className = "",
  particleColor = "#FFFFFF",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
    
    const init = () => {
        if (!containerRef.current) return;
        w = containerRef.current.offsetWidth;
        h = containerRef.current.offsetHeight;
        
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.scale(dpr, dpr);
        
        const particleCount = (w * h / 1000) * (particleDensity / 100);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: random(0, w),
                y: random(0, h),
                size: random(minSize, maxSize),
                speedX: random(-0.2, 0.2),
                speedY: random(-0.2, 0.2),
            });
        }
    };

    let animationFrameId: number;
    
    const animate = () => {
        if(!ctx) return;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = particleColor;
        
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            if (entry.target === containerRef.current) {
                init();
            }
        }
    });

    if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
    }
    
    return () => {
        window.cancelAnimationFrame(animationFrameId);
        if (containerRef.current) {
            resizeObserver.unobserve(containerRef.current);
        }
    };

  }, [particleDensity, minSize, maxSize, particleColor]);

  return (
    <div ref={containerRef} className={`absolute inset-0 -z-10 ${className}`}>
      <canvas
        id={id}
        ref={canvasRef}
        style={{
          backgroundColor: background,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};