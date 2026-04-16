import { useEffect, useState } from "react";

const slides = [
  { text: "You walked into my life like a dream 💫", image: "/slides/slide1.jpeg" },
  { text: "And suddenly everything made sense 💖", image: "/slides/slide2.jpeg" },
  { text: "Every moment with you feels magical ✨", image: "/slides/slide3.jpeg" },
  { text: "You are my safe place 🫶", image: "/slides/slide4.jpeg" },
  { text: "My favorite person, always ❤️, this reminds me of you everytime!", image: "/slides/slide5.jpeg" },
  { text: "With you, I feel complete 🌍", image: "/slides/slide6.jpeg" },
  { text: "Every laugh with you is my favourite sound 🎶", image: "/slides/slide7.jpeg" },
  { text: "You make ordinary moments extraordinary 🌸", image: "/slides/slide8.jpeg" },
  { text: "I'd choose you in every lifetime 🌙", image: "/slides/slide9.jpeg" },
  { text: "And I'll keep falling for you, always 💞", image: "/slides/slide10.jpeg" },
];

const FADE_DURATION = 1000;   // 1s fade out + fade in
const DISPLAY_DURATION = 5000; // 5s fully visible

export default function InterludeScreen({ onNext }: { onNext: () => void }) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);   // controls BOTH image and text together
  const [screenFadeOut, setScreenFadeOut] = useState(false);

  useEffect(() => {
    let index = 0;

    const cycle = () => {
      // Step 1: fade out both image and text together
      setVisible(false);

      setTimeout(() => {
        index++;

        if (index < slides.length) {
          // Step 2: swap content while invisible, then fade in together
          setCurrent(index);
          setVisible(true);

          // Step 3: schedule next cycle
          setTimeout(cycle, DISPLAY_DURATION);
        } else {
          // All slides done — fade out entire screen
          setScreenFadeOut(true);
          setTimeout(() => onNext(), FADE_DURATION);
        }
      }, FADE_DURATION);
    };

    // Start first cycle after display duration
    const firstTimer = setTimeout(cycle, DISPLAY_DURATION);

    return () => clearTimeout(firstTimer);
  }, [onNext]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 text-center transition-all duration-1000 ${
        screenFadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {/* Image and text share the same opacity so they always move together */}
      <div
        className="flex flex-col items-center gap-6 transition-all duration-1000"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(16px)" }}
      >
        <img
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
