import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onComplete: () => void;
}

export default function HeroSection({ onComplete }: HeroSectionProps) {

  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 relative transition-opacity duration-500 opacity-100"
    >
      {/* Soft vignette overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-sky-blue/20" />
      </div>

      {/* Main card */}
      <div
        className={`relative z-10 transition-all duration-1000 opacity-100 translate-y-0 scale-100`}
        style={{ transitionDelay: '0.3s' }}
      >
        <div className="painterly-card p-8 md:p-12 max-w-md mx-auto text-center relative overflow-hidden">
          {/* Subtle corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-saffron/30 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-saffron/30 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-saffron/30 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-saffron/30 rounded-br-lg" />

          {/* Sunflower image */}
          <div
            className="relative mb-8 transition-all duration-1000 opacity-100 scale-100"
            style={{ transitionDelay: '0.6s' }}
          >
            <div className="relative w-56 h-56 mx-auto">
              {/* Glow effect behind sunflower */}
              <div className="absolute inset-0 bg-sunflower-gold/20 rounded-full blur-3xl scale-75 animate-pulse" />
              
              <img
                src="/sunflower.png"
                alt="Hand-drawn sunflower"
                className="w-full h-full object-contain relative z-10 animate-float"
              />
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-display text-3xl md:text-4xl text-soft-brown mb-4 text-shadow-soft transition-all duration-800 opacity-100 translate-y-0"
            style={{ transitionDelay: '0.9s' }}
          >
            A Little Sketch
          </h1>

          {/* Subtitle */}
          <p
            className="font-body text-lg text-soft-brown/70 mb-8 italic transition-all duration-800 opacity-100 translate-y-0"
            style={{ transitionDelay: '1.1s' }}
          >
            For someone who notices the details
          </p>

          {/* CTA Button */}
          <div
            className="transition-all duration-800 opacity-100 translate-y-0"
            style={{ transitionDelay: '1.3s' }}
          >
            <Button
              onClick={onComplete}
              className="group relative bg-gradient-to-r from-saffron to-sunflower-gold hover:from-sunflower-gold hover:to-saffron text-white font-body text-lg px-8 py-6 rounded-full shadow-painterly hover:shadow-glow transition-all duration-500 overflow-hidden"
            >
              <Sparkles className="w-5 h-5 mr-2 opacity-80 group-hover:animate-pulse" />
              Open this little sketch
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }} />
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      <p
        className="absolute bottom-8 text-soft-brown/40 font-body text-sm transition-all duration-1000 opacity-100"
        style={{ transitionDelay: '2s' }}
      >
        Take your time • No rush
      </p>
    </section>
  );
}
