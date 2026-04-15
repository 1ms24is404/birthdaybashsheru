import { useEffect, useState } from "react";

const slides = [
  { text: "You walked into my life like a dream 💫", image: "/slides/slide1.jpeg" },
  { text: "And suddenly everything made sense 💖", image: "/slides/slide2.jpeg" },
  { text: "Every moment with you feels magical ✨", image: "/slides/slide3.jpeg" },
  { text: "You are my safe place 🫶", image: "/slides/slide4.jpeg" },
  { text: "My favorite person, always ❤️", image: "/slides/slide5.jpeg" },
  { text: "With you, I feel complete 🌍", image: "/slides/slide6.jpeg" },
  { text: "Every memory with you is my treasure 💎", image: "/slides/slide7.jpeg" },
  { text: "I never want to lose you 🥺", image: "/slides/slide8.jpeg" },
  { text: "You are my forever ♾️", image: "/slides/slide9.jpeg" },
  { text: "And I will always choose you 💕", image: "/slides/slide10.jpeg" },
];

export default function InterludeScreen({ onNext }: any) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const audio = new Audio("/music/interlude.mp3");
    audio.volume = 0.7;
    audio.play().catch(() => {});

    let index = 0;

    const interval = setInterval(() => {
      index++;
      if (index < slides.length) {
        setCurrent(index);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          audio.pause();
          onNext();
        }, 2000);
      }
    }, 2500); // speed of slides

    return () => {
      audio.pause();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">

      <div
        key={current}
        className="transition-all duration-700 ease-in-out animate-fade-in-up"
      >

        {/* IMAGE */}
        <img
          src={slides[current].image}
          className="w-[300px] h-[300px] object-cover rounded-xl mb-6 shadow-lg"
        />

        {/* TEXT */}
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          {slides[current].text}
        </h2>

      </div>

    </div>
  );
}
