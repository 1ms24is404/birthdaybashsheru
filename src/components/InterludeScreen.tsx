import { useState, useEffect, useRef } from "react";

interface InterludeScreenProps {
  onNext: () => void;
}

/* 
  LYRICS & IMAGES PLACEHOLDER
  Replace lyrics and image paths below.
  Song: "I Wanna Be Yours" or "Until I Found You"
*/
const slides = [
  { lyric: "I wanna be your vacuum cleaner", image: "slide1.jpg", layout: "left" },
  { lyric: "Breathing in your dust", image: "slide2.jpg", layout: "right" },
  { lyric: "I wanna be your Ford Cortina", image: "slide3.jpg", layout: "left" },
  { lyric: "I will never rust", image: "slide4.jpg", layout: "right" },
  { lyric: "I wanna be your electric meter", image: "slide5.jpg", layout: "center" },
  { lyric: "I will not run out", image: "slide6.jpg", layout: "left" },
  { lyric: "I wanna be your raincoat", image: "slide7.jpg", layout: "right" },
  { lyric: "For the permanent midnight", image: "slide8.jpg", layout: "center" },
  { lyric: "I wanna be yours", image: "slide9.jpg", layout: "center" },
  { lyric: "I wanna be yours", image: "slide10.jpg", layout: "center" },
];

const InterludeScreen = ({ onNext }: InterludeScreenProps) => {
  const [started, setStarted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = () => {
    setStarted(true);
    // Try to play interlude music (audio element should be managed by parent)
  };

  useEffect(() => {
    if (!started) return;
    timerRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= slides.length - 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setTimeout(onNext, 3000);
          return prev;
        }
        return prev + 1;
      });
    }, 5000); // 5 seconds per slide

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, onNext]);

  if (!started) {
    return (
      <div className="screen-enter flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-glow mb-8 text-foreground">
            Before the finale…
          </h2>
          <div className="space-y-4 mb-10">
            <p className="text-lg text-muted-foreground flex items-center justify-center gap-3">
              <span className="text-2xl">🎧</span> Put your headphones on
            </p>
            <p className="text-lg text-muted-foreground flex items-center justify-center gap-3">
              <span className="text-2xl">📱</span> Start screen recording
            </p>
          </div>
          <button onClick={start} className="btn-cosmic text-lg">
            Play Our Story ▶
          </button>
        </div>
      </div>
    );
  }

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-10 overflow-hidden">
      <div
        key={currentSlide}
        className={`w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8 ${
          slide.layout === "right" ? "md:flex-row-reverse" : ""
        } ${slide.layout === "center" ? "flex-col text-center" : ""}`}
      >
        {/* Image */}
        <div
          className={`flex-1 ${
            currentSlide % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
          }`}
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted border border-border flex items-center justify-center text-muted-foreground">
            📷 {slide.image}
          </div>
        </div>

        {/* Lyric */}
        <div
          className={`flex-1 ${
            currentSlide % 2 === 0 ? "animate-slide-in-right" : "animate-slide-in-left"
          }`}
        >
          <p className="text-2xl md:text-4xl font-bold text-glow text-foreground leading-relaxed italic">
            "{slide.lyric}"
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i === currentSlide ? "bg-accent w-6" : i < currentSlide ? "bg-primary/50" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default InterludeScreen;
