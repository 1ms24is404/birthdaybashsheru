import { useEffect, useState } from "react";

const slides = [
  { text: "You walked into my life like a dream 💫", image: "/slides/slide1.jpeg" },
  { text: "And suddenly everything made sense 💖", image: "/slides/slide2.jpeg" },
  { text: "Every moment with you feels magical ✨", image: "/slides/slide3.jpeg" },
  { text: "You are my safe place 🫶", image: "/slides/slide4.jpeg" },
  { text: "My favorite person, always ❤️,this always reminds me of you", image: "/slides/slide5.jpeg" },
  { text: "With you, I feel complete 🌍", image: "/slides/slide6.jpeg" },
  { text: "Every memory with you is my treasure 💎", image: "/slides/slide7.jpeg" },
  { text: "I never want to lose you 🥺", image: "/slides/slide8.jpeg" },
  { text: "You are my forever ♾️", image: "/slides/slide9.jpeg" },
  { text: "And I will always choose you 💕", image: "/slides/slide10.jpeg" },
];

export default function InterludeScreen({ onNext }: any) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setTimeout(() => setStart(true), 100);

    // 🎵 PLAY PERFECT
    const audio = new Audio("/music/perfect.mp3");
    audio.volume = 0.6;
    audio.play().catch(() => {});

    let index = 0;

    const runSlide = () => {
      setVisible(false);

      setTimeout(() => {
        setCurrent(index);
        setVisible(true);
      }, 50);

      setTimeout(() => {
        index++;
        if (index < slides.length) {
          runSlide();
        } else {
          setTimeout(() => {
            setFadeOut(true);

            setTimeout(() => {
              audio.pause(); // stop when leaving
              onNext();
            }, 1200);
          }, 1000);
        }
      }, 6200);
    };

    runSlide();

    return () => {
      audio.pause();
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 text-center transition-all duration-1000 ${
        fadeOut
          ? "opacity-0 scale-95"
          : start
          ? "opacity-100 scale-100"
          : "opacity-0 scale-110"
      }`}
    >
      {/* IMAGE */}
      <img
        src={slides[current].image}
        className="w-[320px] h-[320px] object-cover rounded-xl mb-6 shadow-lg transition-all duration-1000"
      />

      {/* TEXT */}
      <h2
        className={`text-2xl md:text-3xl font-semibold text-white transition-all duration-[6200ms] ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {slides[current].text}
      </h2>
    </div>
  );
}
