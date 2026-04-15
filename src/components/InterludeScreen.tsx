import { useEffect, useState } from "react";

const slides = [
  { text: "You walked into my life like a dream 💫", image: "/slides/slide1.jpeg" },
  { text: "And suddenly everything made sense 💖", image: "/slides/slide2.jpeg" },
  { text: "Every moment with you feels magical ✨", image: "/slides/slide3.jpeg" },
  { text: "You are my safe place 🫶", image: "/slides/slide4.jpeg" },
  { text: "My favorite person, always ❤️", image: "/slides/slide5.jpeg" },
  { text: "With you, I feel complete 🌍", image: "/slides/slide6.jpeg" },
];

export default function InterludeScreen({ onNext }: any) {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/perfect.mp3");
    audio.volume = 0.6;
    audio.play().catch(() => {});

    let index = 0;

    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        index++;
        if (index < slides.length) {
          setCurrent(index);
          setVisible(true);
        } else {
          clearInterval(interval);
          setFadeOut(true);

          setTimeout(() => {
            audio.pause();
            onNext();
          }, 1200);
        }
      }, 4000); // text transition
    }, 6200); // total duration

    return () => {
      clearInterval(interval);
      audio.pause();
    };
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-6 text-center transition-all duration-1000 ${
        fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <img
        src={slides[current].image}
        className="w-[320px] h-[320px] object-cover rounded-xl mb-6 shadow-lg transition-all duration-1000"
      />

      <h2
        className={`text-2xl md:text-3xl font-semibold text-white transition-all duration-[4000ms] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {slides[current].text}
      </h2>
    </div>
  );
}
