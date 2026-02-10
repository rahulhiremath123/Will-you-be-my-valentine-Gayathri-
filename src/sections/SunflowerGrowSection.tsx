import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface SunflowerGrowSectionProps {
  onComplete: () => void;
}

interface Petal {
  id: number;
  text: string;
  angle: number;
}

const petals: Petal[] = [
  { id: 1, text: "You think deeply, even when no one is watching.", angle: 0 },
  { id: 2, text: "You keep going, not loudly, but honestly.", angle: 72 },
  { id: 3, text: "You notice details most people rush past.", angle: 144 },
  { id: 4, text: "You face uncertainty without pretending it isn't there.", angle: 216 },
  { id: 5, text: "Being with you makes things feel more real.", angle: 288 }
];

export default function SunflowerGrowSection({ onComplete }: SunflowerGrowSectionProps) {
  const [revealedPetals, setRevealedPetals] = useState<number[]>([]);
  const [isFullyBloom, setIsFullyBloom] = useState(false);
  const [isVisible] = useState(true);
  const [activePetal, setActivePetal] = useState<number | null>(null);

  const handlePetalClick = (id: number) => {
    if (!revealedPetals.includes(id)) {
      const newRevealed = [...revealedPetals, id];
      setRevealedPetals(newRevealed);
      setActivePetal(id);
      
      if (newRevealed.length === petals.length) {
        setTimeout(() => setIsFullyBloom(true), 1000);
      }
      
      // Clear active after animation
      setTimeout(() => setActivePetal(null), 2000);
    }
  };

  // Generate petal path
  const getPetalPath = (angle: number, isRevealed: boolean) => {
    const rad = (angle * Math.PI) / 180;
    const innerRadius = 55;
    const outerRadius = isRevealed ? 140 : 120;
    const width = isRevealed ? 35 : 30;
    
    const tipX = Math.cos(rad) * outerRadius;
    const tipY = Math.sin(rad) * outerRadius;
    
    const baseAngle1 = rad - (width * Math.PI) / 180;
    const baseAngle2 = rad + (width * Math.PI) / 180;
    
    const base1X = Math.cos(baseAngle1) * innerRadius;
    const base1Y = Math.sin(baseAngle1) * innerRadius;
    const base2X = Math.cos(baseAngle2) * innerRadius;
    const base2Y = Math.sin(baseAngle2) * innerRadius;
    
    // Control points for curved petal
    const cp1X = Math.cos(rad - 0.15) * (outerRadius * 0.7);
    const cp1Y = Math.sin(rad - 0.15) * (outerRadius * 0.7);
    const cp2X = Math.cos(rad + 0.15) * (outerRadius * 0.7);
    const cp2Y = Math.sin(rad + 0.15) * (outerRadius * 0.7);
    
    return `M ${base1X} ${base1Y} Q ${cp1X} ${cp1Y} ${tipX} ${tipY} Q ${cp2X} ${cp2Y} ${base2X} ${base2Y} Z`;
  };

  return (
    <section
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl transition-all duration-1000 ${
            isFullyBloom ? 'bg-sunflower-gold/40 scale-125' : 'bg-sunflower-gold/20 scale-100'
          }`}
          style={{ animation: isFullyBloom ? 'pulseGlow 3s ease-in-out infinite' : 'none' }}
        />
      </div>

      {/* Header */}
      <div
        className={`text-center mb-6 relative z-10 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <h2 className="font-display text-3xl md:text-4xl text-soft-brown mb-3">
          What I See in You
        </h2>
        <p className="font-body text-soft-brown font-semibold">
          Click each petal to reveal
        </p>
      </div>

      {/* Sunflower SVG */}
      <div
        className={`relative z-10 transition-all duration-800 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{ transitionDelay: '0.3s' }}
      >
        <svg 
          width="400" 
          height="400" 
          viewBox="-180 -180 360 360"
          className="mx-auto"
        >
          {/* Glow filter */}
          <defs>
            <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8B4513" />
              <stop offset="50%" stopColor="#654321" />
              <stop offset="100%" stopColor="#4A3728" />
            </radialGradient>
            <radialGradient id="petalGradientRevealed" cx="50%" cy="0%" r="100%">
              <stop offset="0%" stopColor="#F2C94C" />
              <stop offset="60%" stopColor="#E6A23C" />
              <stop offset="100%" stopColor="#D4932A" />
            </radialGradient>
            <linearGradient id="petalGradientHidden" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF8E7" />
              <stop offset="100%" stopColor="#F5E6C8" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#8B4513" floodOpacity="0.2"/>
            </filter>
          </defs>

          {/* Stem */}
          <path 
            d="M 0 55 Q 5 120 0 180" 
            stroke="#5D8C3A" 
            strokeWidth="6" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Leaves */}
          <ellipse cx="-25" cy="110" rx="20" ry="10" fill="#6B9B47" transform="rotate(-30 -25 110)" />
          <ellipse cx="25" cy="140" rx="18" ry="9" fill="#6B9B47" transform="rotate(25 25 140)" />

          {/* Petals */}
          {petals.map((petal) => {
            const isRevealed = revealedPetals.includes(petal.id);
            const isActive = activePetal === petal.id;
            
            return (
              <g key={petal.id}>
                <path
                  d={getPetalPath(petal.angle, isRevealed)}
                  fill={isRevealed ? 'url(#petalGradientRevealed)' : 'url(#petalGradientHidden)'}
                  stroke={isRevealed ? '#D4932A' : '#E6A23C'}
                  strokeWidth={isRevealed ? 1.5 : 2}
                  filter={isRevealed ? 'url(#glow)' : 'url(#softShadow)'}
                  className={`cursor-pointer transition-all duration-500 ${
                    isActive ? 'animate-petalBloom' : ''
                  }`}
                  style={{
                    transformOrigin: '0 0',
                    transform: isActive ? 'scale(1.1)' : isRevealed ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  onClick={() => handlePetalClick(petal.id)}
                />
                {/* Petal number when hidden */}
                {!isRevealed && (
                  <text
                    x={Math.cos((petal.angle * Math.PI) / 180) * 95}
                    y={Math.sin((petal.angle * Math.PI) / 180) * 95}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#E6A23C"
                    fontSize="16"
                    fontFamily="Georgia, serif"
                    fontWeight="bold"
                    className="pointer-events-none"
                  >
                    {petal.id}
                  </text>
                )}
              </g>
            );
          })}

          {/* Center disk */}
          <circle 
            r="55" 
            fill="url(#centerGradient)"
            filter="url(#softShadow)"
          />
          
          {/* Center texture (seeds) */}
          {[...Array(3)].map((_, ring) => (
            <circle 
              key={ring}
              r={18 + ring * 12} 
              fill="none"
              stroke="#A67B5B"
              strokeWidth="0.5"
              strokeDasharray="3 3"
              opacity="0.5"
            />
          ))}
          
          {/* Seed dots */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const r = 25;
            return (
              <circle
                key={i}
                cx={Math.cos(angle) * r}
                cy={Math.sin(angle) * r}
                r="2"
                fill="#C4A574"
              />
            );
          })}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180;
            const r = 40;
            return (
              <circle
                key={`outer-${i}`}
                cx={Math.cos(angle) * r}
                cy={Math.sin(angle) * r}
                r="2.5"
                fill="#C4A574"
              />
            );
          })}
        </svg>

        {/* Revealed message */}
        {activePetal && (
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
            style={{ marginTop: '180px' }}
          >
            <div className="painterly-card px-6 py-4 text-center animate-fade-up whitespace-nowrap">
              <p className="font-body text-soft-brown font-semibold">
                {petals.find(p => p.id === activePetal)?.text}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8 relative z-10">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className={`h-2 rounded-full transition-all duration-300 ${
              revealedPetals.includes(petal.id) 
                ? 'bg-saffron w-4' 
                : 'bg-saffron/30 w-2'
            }`}
          />
        ))}
      </div>

      {/* Bloom completion */}
      {isFullyBloom && (
        <div className="text-center mt-8 relative z-10 animate-fade-up">
          <p className="font-display text-2xl text-soft-brown mb-2">
            🌻 Fully Bloomed 🌻
          </p>
          <p className="font-body text-soft-brown/70 italic font-semibold mb-6">
            Like a sunflower turning toward light
          </p>
          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-saffron to-sunflower-gold hover:from-sunflower-gold hover:to-saffron text-white font-body text-lg px-8 py-5 rounded-full shadow-painterly hover:shadow-glow transition-all duration-500"
          >
            Continue
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes petalBloom {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-petalBloom {
          animation: petalBloom 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}
