import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, RefreshCw } from 'lucide-react';

interface PaintRevealSectionProps {
  onComplete: () => void;
}

export default function PaintRevealSection({ onComplete }: PaintRevealSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isPainting, setIsPainting] = useState(false);
  const [isVisible] = useState(true);

  const canvasWidth = 500;
  const canvasHeight = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with paint wash
    ctx.fillStyle = 'rgba(220, 236, 246, 0.95)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Add some texture
    for (let i = 0; i < 1000; i++) {
      const x = Math.random() * canvasWidth;
      const y = Math.random() * canvasHeight;
      ctx.fillStyle = `rgba(200, 220, 235, ${Math.random() * 0.3})`;
      ctx.fillRect(x, y, 2, 2);
    }
  }, []);

  const calculateRevealProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    const pixels = imageData.data;
    let transparentPixels = 0;
    const totalPixels = pixels.length / 4;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] < 50) {
        transparentPixels++;
      }
    }

    const progress = (transparentPixels / totalPixels) * 100;
    setRevealProgress(progress);

    if (progress > 40 && !isRevealed) {
      setIsRevealed(true);
    }
  }, [isRevealed]);

  const paint = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const brushSize = 40;
    
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();

    // Add soft edges
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.7, 'rgba(0,0,0,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    calculateRevealProgress();
  }, [calculateRevealProgress]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsPainting(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasWidth / rect.width);
    const y = (e.clientY - rect.top) * (canvasHeight / rect.height);
    
    paint(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isPainting) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvasWidth / rect.width);
    const y = (e.clientY - rect.top) * (canvasHeight / rect.height);
    paint(x, y);
  };

  const handleMouseUp = () => {
    setIsPainting(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsPainting(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvasWidth / rect.width);
    const y = (touch.clientY - rect.top) * (canvasHeight / rect.height);
    
    paint(x, y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isPainting) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) * (canvasWidth / rect.width);
    const y = (touch.clientY - rect.top) * (canvasHeight / rect.height);
    paint(x, y);
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(220, 236, 246, 0.95)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    setIsRevealed(false);
    setRevealProgress(0);
  };

  return (
    <section
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Header */}
      <div
        className={`text-center mb-8 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <h2 className="font-display text-3xl md:text-4xl text-soft-brown mb-3">
          Paint the Memory
        </h2>
        <p className="font-body text-lg text-soft-brown font-semibold italic">
          Drag to paint away and reveal what's beneath
        </p>
      </div>

      {/* Canvas container */}
      <div
        className={`relative transition-all duration-800 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ transitionDelay: '0.3s' }}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-painterly">
          {/* Hidden message */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-8"
            style={{ 
              background: 'linear-gradient(135deg, #FBF7F2 0%, #F5F0E8 100%)',
            }}
          >
            <div className="text-center">
              <p
                className={`font-display text-2xl md:text-3xl text-soft-brown font-semibold mb-4 transition-opacity duration-1000 ${
                  isRevealed ? 'opacity-100' : 'opacity-30'
                }`}
              >
                "I remember the way you listen —
              </p>
              <p
                className={`font-body text-lg text-soft-brown/90 italic font-semibold transition-opacity duration-1000 ${
                  isRevealed ? 'opacity-100' : 'opacity-30'
                }`}
                style={{ transitionDelay: '0.2s' }}
              >
                not just waiting for your turn to speak,
                <br />
                but truly hearing."
              </p>
            </div>
          </div>

          {/* Paint canvas */}
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            className="relative z-10 cursor-crosshair touch-none"
            style={{ 
              width: '100%', 
              maxWidth: '500px',
              height: 'auto'
            }}
          />
        </div>

        {/* Progress bar */}
        <div className="mt-4 flex items-center gap-4" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="flex-1 h-2 bg-cream-canvas rounded-full overflow-hidden border border-saffron/20">
            <div
              className="h-full bg-gradient-to-r from-saffron to-sunflower-gold transition-all duration-300"
              style={{ width: `${Math.min(revealProgress * 2.5, 100)}%` }}
            />
          </div>
          <span className="font-body text-sm text-soft-brown/60 w-16 text-right">
            {Math.min(Math.round(revealProgress * 2.5), 100)}%
          </span>
        </div>

        {/* Reset button */}
        <button
          onClick={resetCanvas}
          className="mt-4 mx-auto flex items-center gap-2 text-saffron hover:text-sunflower-gold transition-colors font-body text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Paint again
        </button>
      </div>

      {/* Continue button */}
      {isRevealed && (
        <div
          className="mt-8 animate-fade-up"
        >
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-saffron to-sunflower-gold hover:from-sunflower-gold hover:to-saffron text-white font-body text-lg px-8 py-5 rounded-full shadow-painterly hover:shadow-glow transition-all duration-500"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </section>
  );
}
