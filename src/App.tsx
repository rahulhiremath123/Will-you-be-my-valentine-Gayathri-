import { useState, useRef } from 'react';
import HeroSection from './sections/HeroSection';
import TimelineSection from './sections/TimelineSection';
import SunflowerGrowSection from './sections/SunflowerGrowSection';
import PaintRevealSection from './sections/PaintRevealSection';
import LetterSection from './sections/LetterSection';
import FinaleModal from './sections/FinaleModal';

export type Section = 'hero' | 'timeline' | 'sunflower' | 'paint' | 'letter' | 'finale';

function App() {
  const [currentSection, setCurrentSection] = useState<Section>('hero');
  const [showFinale, setShowFinale] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSectionComplete = (nextSection: Section) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Fade out current section
    setTimeout(() => {
      setCurrentSection(nextSection);
      if (nextSection === 'finale') {
        setShowFinale(true);
      }
      setIsTransitioning(false);
    }, 500);
  };

  const getSectionIndex = (section: Section) => {
    const sections: Section[] = ['hero', 'timeline', 'sunflower', 'paint', 'letter', 'finale'];
    return sections.indexOf(section);
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full relative overflow-x-hidden"
    >
      {/* Progress indicator */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {(['hero', 'timeline', 'sunflower', 'paint', 'letter'] as Section[]).map((section, index) => {
          const currentIndex = getSectionIndex(currentSection);
          const isActive = getSectionIndex(section) <= currentIndex;
          
          return (
            <div
              key={section}
              className={`h-2 rounded-full transition-all duration-500 ${
                isActive ? 'bg-saffron w-6' : 'bg-warm-ink/20 w-2'
              }`}
              style={{ 
                transitionDelay: `${index * 0.1}s`,
                transform: isActive ? 'scale(1)' : 'scale(0.8)'
              }}
            />
          );
        })}
      </div>

      {/* Main content with fade transitions */}
      <div 
        className={`transition-all duration-500 ${
          isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {currentSection === 'hero' && (
          <HeroSection 
            key="hero" 
            onComplete={() => handleSectionComplete('timeline')} 
          />
        )}
        
        {currentSection === 'timeline' && (
          <TimelineSection 
            key="timeline" 
            onComplete={() => handleSectionComplete('sunflower')} 
          />
        )}
        
        {currentSection === 'sunflower' && (
          <SunflowerGrowSection 
            key="sunflower" 
            onComplete={() => handleSectionComplete('paint')} 
          />
        )}
        
        {currentSection === 'paint' && (
          <PaintRevealSection 
            key="paint" 
            onComplete={() => handleSectionComplete('letter')} 
          />
        )}
        
        {currentSection === 'letter' && (
          <LetterSection 
            key="letter" 
            onComplete={() => handleSectionComplete('finale')} 
          />
        )}
      </div>

      {/* Finale Modal */}
      <FinaleModal 
        isOpen={showFinale} 
        onClose={() => setShowFinale(false)} 
      />
    </div>
  );
}

export default App;
