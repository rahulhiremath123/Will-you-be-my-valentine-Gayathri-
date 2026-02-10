import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Heart } from 'lucide-react';

interface LetterSectionProps {
  onComplete: () => void;
}

export default function LetterSection({ onComplete }: LetterSectionProps) {
  const letterRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Show continue button after letter animation
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownload = async () => {
    if (!letterRef.current) return;
    
    setIsDownloading(true);
    
    // Simple download using canvas API
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size
      canvas.width = 800;
      canvas.height = 1000;

      // Fill background
      ctx.fillStyle = '#FBF7F2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add decorative corners
      ctx.strokeStyle = 'rgba(230, 162, 60, 0.3)';
      ctx.lineWidth = 2;
      
      // Top left corner
      ctx.beginPath();
      ctx.moveTo(40, 80);
      ctx.lineTo(40, 40);
      ctx.lineTo(80, 40);
      ctx.stroke();

      // Top right corner
      ctx.beginPath();
      ctx.moveTo(720, 40);
      ctx.lineTo(760, 40);
      ctx.lineTo(760, 80);
      ctx.stroke();

      // Bottom left corner
      ctx.beginPath();
      ctx.moveTo(40, 920);
      ctx.lineTo(40, 960);
      ctx.lineTo(80, 960);
      ctx.stroke();

      // Bottom right corner
      ctx.beginPath();
      ctx.moveTo(720, 960);
      ctx.lineTo(760, 960);
      ctx.lineTo(760, 920);
      ctx.stroke();

      // Add text
      ctx.fillStyle = '#5a3d35';
      ctx.font = 'italic 32px Georgia, serif';
      ctx.fillText('Mon étoile,', 80, 140);

      ctx.font = '24px Georgia, serif';
      const lines = [
        '',
        'I like how you move through the world — thoughtfully, deliberately,',
        'with a quiet kind of courage. You question things. You try again',
        "when it would be easier not to. You keep becoming.",
        '',
        'Being with you has made me steadier, sharper, and more honest',
        "with myself. Even when things weren't smooth, we chose to understand",
        'each other instead of walking away. That matters to me more than',
        'grand gestures ever could.',
        '',
        "I don't need a perfect story. I want more real days with you —",
        'conversations that stretch late, shared silences that feel full,',
        'and the slow work of growing side by side.',
        '',
        'Will you be my Valentine?',
        '',
        '— Rahul'
      ];

      let y = 200;
      lines.forEach((line) => {
        if (line === 'Will you be my Valentine?') {
          ctx.font = 'italic 36px Georgia, serif';
          ctx.fillStyle = '#E6A23C';
          ctx.textAlign = 'center';
          ctx.fillText(line, 400, y);
          ctx.textAlign = 'left';
          ctx.fillStyle = '#5a3d35';
          ctx.font = '24px Georgia, serif';
        } else if (line === '— Rahul') {
          ctx.font = 'italic 24px Georgia, serif';
          ctx.textAlign = 'right';
          ctx.fillText(line, 720, y);
          ctx.textAlign = 'left';
          ctx.font = '24px Georgia, serif';
        } else if (line === '') {
          // Empty line
        } else {
          ctx.fillText(line, 80, y);
        }
        y += line === '' ? 20 : 35;
      });

      // Download
      const link = document.createElement('a');
      link.download = 'my-valentine-letter.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error creating letter:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const letterLines = [
    { text: "Mon étoile,", delay: 0.3, isItalic: true },
    { text: "", delay: 0.5 },
    { text: "I like how you move through the world — thoughtfully, deliberately,", delay: 0.7 },
    { text: "with a quiet kind of courage. You question things. You try again", delay: 0.9 },
    { text: "when it would be easier not to. You keep becoming.", delay: 1.1 },
    { text: "", delay: 1.3 },
    { text: "Being with you has made me steadier, sharper, and more honest", delay: 1.5 },
    { text: "with myself. Even when things weren't smooth, we chose to understand", delay: 1.7 },
    { text: "each other instead of walking away. That matters to me more than", delay: 1.9 },
    { text: "grand gestures ever could.", delay: 2.1 },
    { text: "", delay: 2.3 },
    { text: "I don't need a perfect story. I want more real days with you —", delay: 2.5 },
    { text: "conversations that stretch late, shared silences that feel full,", delay: 2.7 },
    { text: "and the slow work of growing side by side.", delay: 2.9 },
    { text: "", delay: 3.1 },
    { text: "Will you be my Valentine?", delay: 3.3, isHighlight: true },
    { text: "", delay: 3.5 },
    { text: "— Rahul", delay: 3.7, isSignature: true },
  ];

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
          A Letter for You
        </h2>
        <p className="font-body text-lg text-soft-brown/60 italic">
          Save it if you'd like
        </p>
      </div>

      {/* Letter card */}
      <div
        className={`relative max-w-xl w-full mx-auto transition-all duration-800 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ transitionDelay: '0.2s' }}
      >
        <div 
          ref={letterRef}
          className="painterly-card p-8 md:p-12 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #FFFEFB 0%, #FBF7F2 100%)'
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-saffron/20" />
          <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-saffron/20" />
          <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-saffron/20" />
          <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-saffron/20" />

          {/* Sunflower watermark */}
          <div className="absolute bottom-8 right-8 opacity-5">
            <img 
              src="/sunflower.png" 
              alt="" 
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Letter content */}
          <div className="relative z-10">
            {letterLines.map((line, index) => (
              <p
                key={index}
                className={`font-body leading-relaxed transition-all duration-600 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                } ${
                  line.isHighlight 
                    ? 'text-2xl md:text-3xl font-display text-saffron mt-6 mb-2 text-center'
                    : line.isSignature
                    ? 'text-right text-soft-brown/80 italic mt-4'
                    : line.isItalic
                    ? 'italic text-xl'
                    : line.text === ''
                    ? 'h-4'
                    : 'text-soft-brown/90 text-lg'
                }`}
                style={{ transitionDelay: `${line.delay}s` }}
              >
                {line.text}
              </p>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mt-8 transition-all duration-600 ${
            showContinue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            variant="outline"
            className="border-saffron/40 text-saffron hover:bg-saffron/10 font-body text-lg px-6 py-5 rounded-full transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            {isDownloading ? 'Saving...' : 'Save as postcard'}
          </Button>

          <Button
            onClick={onComplete}
            className="bg-gradient-to-r from-saffron to-sunflower-gold hover:from-sunflower-gold hover:to-saffron text-white font-body text-lg px-8 py-5 rounded-full shadow-painterly hover:shadow-glow transition-all duration-500"
          >
            The Question
            <Heart className="w-5 h-5 ml-2 fill-white" />
          </Button>
        </div>
      </div>
    </section>
  );
}
