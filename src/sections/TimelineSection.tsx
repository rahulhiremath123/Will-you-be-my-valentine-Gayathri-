import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart } from 'lucide-react';

interface TimelineSectionProps {
  onComplete: () => void;
}

interface Milestone {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "The First Conversation",
    description: "When words flowed easily, and silence felt comfortable too.",
    icon: "💭"
  },
  {
    id: 2,
    title: "Shared Curiosity",
    description: "Questioning things together, finding wonder in the ordinary.",
    icon: "🔍"
  },
  {
    id: 3,
    title: "Quiet Understanding",
    description: "Those moments when no explanation was needed.",
    icon: "🌙"
  },
  {
    id: 4,
    title: "Growing Together",
    description: "Choosing to understand rather than walk away.",
    icon: "🌱"
  }
];

export default function TimelineSection({ onComplete }: TimelineSectionProps) {
  const [revealedMilestones, setRevealedMilestones] = useState<number[]>([]);
  const [currentMilestone, setCurrentMilestone] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible] = useState(true);

  const handleReveal = (index: number) => {
    if (!revealedMilestones.includes(index)) {
      const newRevealed = [...revealedMilestones, index];
      setRevealedMilestones(newRevealed);
      if (index < milestones.length - 1) {
        setTimeout(() => setCurrentMilestone(index + 1), 600);
      } else {
        setTimeout(() => setIsComplete(true), 1000);
      }
    }
  };

  return (
    <section
      className={`min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 transition-all duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Header */}
      <div
        className={`text-center mb-12 transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
        }`}
      >
        <h2 className="font-display text-3xl md:text-4xl text-soft-brown mb-3">
          Brushstrokes of Us
        </h2>
        <p className="font-body text-lg text-soft-brown font-semibold italic">
          Click each moment to reveal
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative max-w-2xl w-full mx-auto">
        {/* Central line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-saffron/30 to-transparent transform -translate-x-1/2" />

        {/* Milestones */}
        <div className="space-y-8">
          {milestones.map((milestone, index) => {
            const isRevealed = revealedMilestones.includes(index);
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={milestone.id}
                className={`relative flex items-center transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-x-0' : `opacity-0 ${isEven ? '-translate-x-12' : 'translate-x-12'}`
                }`}
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                {/* Content card */}
                <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  {isRevealed ? (
                    <div
                      className="painterly-card p-5 relative overflow-hidden animate-bloom"
                    >
                      {/* Brush stroke reveal effect */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-sky-blue/30 via-pastel-green/30 to-transparent origin-left"
                        style={{ animation: 'paintReveal 0.8s ease-out forwards' }}
                      />
                      
                      <div className="relative z-10">
                        <span className="text-2xl mb-2 block">{milestone.icon}</span>
                        <h3 className="font-display text-xl text-soft-brown mb-2">
                          {milestone.title}
                        </h3>
                        <p className="font-body text-soft-brown/70 text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleReveal(index)}
                      className="w-full h-24 rounded-xl border-2 border-dashed border-saffron/30 bg-cream-canvas/50 hover:bg-sky-blue/20 transition-all duration-300 flex items-center justify-center group hover:scale-105 hover:border-saffron"
                    >
                      <span className="font-body text-saffron/60 group-hover:text-saffron transition-colors">
                        {currentMilestone === index ? 'Click to reveal' : '...'}
                      </span>
                    </button>
                  )}
                </div>

                {/* Center node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <button
                    onClick={() => handleReveal(index)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-120 ${
                      isRevealed
                        ? 'bg-saffron shadow-glow'
                        : 'bg-cream-canvas border-2 border-saffron/40 hover:border-saffron'
                    }`}
                  >
                    {isRevealed ? (
                      <Heart className="w-5 h-5 text-white fill-white" />
                    ) : (
                      <span className="text-saffron text-sm font-display">{index + 1}</span>
                    )}
                  </button>
                </div>

                {/* Empty space for other side */}
                <div className="w-5/12" />
              </div>
            );
          })}
        </div>

        {/* Completion message */}
        {isComplete && (
          <div
            className="text-center mt-12 animate-fade-up"
          >
            <p className="font-body text-xl text-soft-brown/90 italic mb-6 font-semibold">
              "Every moment with you adds another stroke to our story"
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
      </div>
    </section>
  );
}
