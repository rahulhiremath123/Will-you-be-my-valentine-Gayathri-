import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Sparkles, Calendar, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ResponseType = 'yes' | 'date' | 'maybe' | null;

export default function FinaleModal({ isOpen, onClose }: FinaleModalProps) {
  const [response, setResponse] = useState<ResponseType>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Generate random values on component mount to avoid impure function calls during render
  const [randomValues] = useState(() => ({
    heartAnimations: [...Array(12)].map(() => ({
      duration: 2 + Math.random() * 2,
      left: 50 + (Math.random() * 40 - 20)
    }))
  }));

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setTimeout(() => {
        setIsVisible(false);
        setResponse(null);
        setShowCelebration(false);
      }, 0);
    }
  }, [isOpen]);

  const handleResponse = (type: ResponseType) => {
    setResponse(type);
    if (type === 'yes' || type === 'date') {
      setShowCelebration(true);
      
      // Trigger confetti explosion
      if (type === 'yes') {
        // Multiple confetti bursts for more dramatic effect
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          
          // Confetti from left side
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ['#F2C94C', '#E6A23C', '#D4932A', '#8B4513', '#FBF7F2'],
            angle: randomInRange(45, 135)
          });
          
          // Confetti from right side
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ['#F2C94C', '#E6A23C', '#D4932A', '#8B4513', '#FBF7F2'],
            angle: randomInRange(225, 315)
          });
        }, 250);
        
        // Center explosion
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F2C94C', '#E6A23C', '#D4932A', '#8B4513', '#FBF7F2'],
            angle: 90
          });
        }, 100);
        
        // Additional burst after a delay
        setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#F2C94C', '#E6A23C', '#D4932A', '#8B4513', '#FBF7F2']
          });
        }, 800);
      } else if (type === 'date') {
        // Simpler confetti for date voucher
        confetti({
          particleCount: 60,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#F2C94C', '#E6A23C', '#D4932A']
        });
      }
    }
  };

  const reset = () => {
    setResponse(null);
    setShowCelebration(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-soft-brown/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative z-10 w-full max-w-lg transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
        }`}
      >
        <div className="painterly-card p-8 md:p-12 relative overflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-soft-brown/40 hover:text-soft-brown transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Celebration effects */}
          {showCelebration && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 left-1/2 animate-float"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${randomValues.heartAnimations[i]?.duration}s`,
                    left: `${randomValues.heartAnimations[i]?.left}%`,
                  }}
                >
                  <Heart 
                    className="w-6 h-6 text-sunflower-gold fill-sunflower-gold animate-pulse" 
                    style={{ opacity: 0.6 }}
                  />
                </div>
              ))}
            </div>
          )}

          {!response ? (
            <div className="text-center animate-fade-up">
              {/* Sunflower icon */}
              <div
                className="mb-6 transition-all duration-500"
                style={{ animation: 'bloom 0.6s ease-out' }}
              >
                <div className="w-20 h-20 mx-auto relative">
                  <div className="absolute inset-0 bg-sunflower-gold/30 rounded-full blur-xl animate-pulse" />
                  <img 
                    src="/sunflower.png" 
                    alt="Sunflower" 
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
              </div>

              <h2 className="font-display text-3xl md:text-4xl text-soft-brown mb-2 animate-fade-up">
                Will you be my Valentine?
              </h2>

              <p className="font-body text-soft-brown/70 italic mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
                No pressure, just honest words
              </p>

              <div className="space-y-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <Button
                  onClick={() => handleResponse('yes')}
                  className="w-full bg-gradient-to-r from-saffron to-sunflower-gold hover:from-sunflower-gold hover:to-saffron text-white font-body text-lg py-6 rounded-xl shadow-painterly hover:shadow-glow transition-all duration-500"
                >
                  <Heart className="w-5 h-5 mr-2 fill-white" />
                  Yes, absolutely
                </Button>

                <Button
                  onClick={() => handleResponse('date')}
                  variant="outline"
                  className="w-full border-saffron/40 text-saffron hover:bg-saffron/10 font-body text-lg py-6 rounded-xl transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Yes — Date Voucher
                </Button>

                <Button
                  onClick={() => handleResponse('maybe')}
                  variant="ghost"
                  className="w-full text-soft-brown/60 hover:text-soft-brown hover:bg-transparent font-body py-4 transition-all duration-300"
                >
                  Maybe / Not Yet
                </Button>
              </div>
            </div>
          ) : response === 'yes' || response === 'date' ? (
            <div className="text-center animate-fade-up">
              <div
                className="mb-6"
                style={{ animation: 'bloom 0.6s ease-out' }}
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-saffron to-sunflower-gold rounded-full flex items-center justify-center shadow-glow">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>

              <h3 className="font-display text-3xl text-soft-brown mb-4">
                {response === 'yes' ? "You've made me so happy!" : "Date voucher claimed!"}
              </h3>

              <p className="font-body text-lg text-soft-brown/80 mb-6">
                {response === 'yes' 
                  ? "I can't wait to spend Valentine's Day with you." 
                  : "I'll plan something special for us."}
              </p>

              <p className="font-body text-soft-brown/60 italic mb-8">
                "Every love story is beautiful, but ours is my favorite."
              </p>

              <Button
                onClick={reset}
                variant="outline"
                className="border-saffron/40 text-saffron hover:bg-saffron/10 font-body px-6 py-4 rounded-full"
              >
                Start over
              </Button>
            </div>
          ) : (
            <div className="text-center animate-fade-up">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto opacity-60">
                  <img 
                    src="/sunflower.png" 
                    alt="Sunflower" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <h3 className="font-display text-2xl text-soft-brown mb-4">
                I understand
              </h3>

              <p className="font-body text-lg text-soft-brown/80 mb-6">
                There's no pressure here. What we have is real, and I'm grateful for it either way.
              </p>

              <p className="font-body text-soft-brown/60 italic mb-8">
                "The best things grow slowly, like sunflowers reaching for light."
              </p>

              <Button
                onClick={reset}
                variant="outline"
                className="border-saffron/40 text-saffron hover:bg-saffron/10 font-body px-6 py-4 rounded-full"
              >
                Back to the question
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
