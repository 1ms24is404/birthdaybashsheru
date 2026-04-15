import { useEffect } from "react";

const slides = [
  { text: "I wanna be your vacuum cleaner", image: "/slides/slide1.jpg" },
  { text: "Breathing in your dust", image: "/slides/slide2.jpg" },
  { text: "I wanna be yours", image: "/slides/slide3.jpg" }
];

const music = new Audio("/music/interlude.mp3");

export default function InterludeScreen({ onNext }: any) {
  useEffect(() => {
    music.currentTime = 0;
    music.play();

    setTimeout(() => {
      music.pause();
      onNext();
    }, 15000);

    return () => music.pause();
  }, []);

  return (
    <div className="p-6 text-center">
      {slides.map((s, i) => (
        <div key={i} className="mb-6">
          <img src={s.image} className="w-full h-64 object-cover rounded-lg mb-3" />
          <h2 className="text-lg">{s.text}</h2>
        </div>
      ))}
    </div>
  );
}
