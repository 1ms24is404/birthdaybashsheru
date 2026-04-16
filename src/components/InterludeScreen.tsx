import { useEffect, useState } from "react";

const slides = [
  { text: "You walked into my life like a dream 💫", image: "/slides/slide1.jpeg" },
  { text: "And suddenly everything made sense 💖", image: "/slides/slide2.jpeg" },
  { text: "Every moment with you feels magical ✨", image: "/slides/slide3.jpeg" },
  { text: "You are my safe place 🫶", image: "/slides/slide4.jpeg" },
  { text: "My favorite person, always ❤️", image: "/slides/slide5.jpeg" },
  { text: "With you, I feel complete 🌍", image: "/slides/slide6.jpeg" },
  { text: "Every laugh with you is my favourite sound 🎶", image: "/slides/slide7.jpeg" },
  { text: "You make ordinary moments extraordinary 🌸", image: "/slides/slide8.jpeg" },
  { text: "I'd choose you in every lifetime 🌙", image: "/slides/slide9.jpeg" },
  { text: "And I'll keep falling for you, always 💞", image: "/slides/slide10.jpeg" },
];

const FADE_DURATION = 1000;
const DISPLAY_DURATION = 5000;

export default function InterludeScreen({ onNext }: { onNext: () => void }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [screenFadeOut, setScreenFadeOut] = useState(false);

  // Preload ALL images immediately so there's zero load delay when swapping
  useEffect(() => {
    slides.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []);

  useEffect(() => {
    let index = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const cycle = () => {
      // Step 1: fade out
      setVisible(false);

      t1 = setTimeout(() => {
        index++;

        if (index < slides.length) {
          // Step 2: content is swapped while fully invisible — no flicker possible
          setCurrent(index);

          // Step 3: tiny extra buffer (50ms) so React has committed the new src before fading in
          t2 = setTimeout(() => {
            setVisible(true);
            // Step 4: schedule next fade-out after display duration
            t1 = setTimeout(cycle, DISPLAY_DURATION);
          }, 50);
        } else {
          setScreenFadeOut(true);
          t1 = setTimeout(() => onNext(), FADE_DURATION);
        }
      }, FADE_DURATION);
    };

    // First slide shows immediately — start first cycle after display duration
    t1 = setTimeout(cycle, DISPLAY_DURATION);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onNext]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 text-center transition-all duration-1000 ${
        screenFadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <div
        className="flex flex-col items-center gap-6 transition-opacity transition-transform duration-1000"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0px)" : "translateY(16px)",
          transitionDuration: "1000ms",
        }}
      >
        {/* key={current} forces React to treat each slide as a fresh element — no stale image flash */}
        <img
          key={current}
          src={slides[current].image}
          className="w-[320px] h-[320px] object-cover rounded-xl shadow-lg"
          alt={`slide ${current + 1}`}
        />

        <h2 className="text-2xl md:text-3xl font-semibold text-white">
          {slides[current].text}
        </h2>
      </div>
    </div>
  );
}
