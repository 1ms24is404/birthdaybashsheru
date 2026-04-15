import { useState, useEffect } from "react";

const photos = [
  { id: 1, src: "/photos/photo1.jpeg" },
  { id: 2, src: "/photos/photo2.jpeg" },
  { id: 3, src: "/photos/photo3.jpeg" },
  { id: 4, src: "/photos/photo4.jpeg" },
  { id: 5, src: "/photos/photo5.jpeg" },
  { id: 6, src: "/photos/photo6.jpeg" },
];

const originalCaptions = [
  { id: 1, text: "The moment everything started 🌟" },
  { id: 2, text: "We couldn’t stop smiling that day 💫" },
  { id: 3, text: "The day it became real 💜" },
  { id: 4, text: "The world saw you for the first time 👀" },
  { id: 5, text: "When you showed me off 🥰" },
  { id: 6, text: "My favourite version of you 🖤" },
];

export default function PhotoMatchLevel({ onNext }: any) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [captions, setCaptions] = useState(originalCaptions);

  // 🔀 SHUFFLE captions once
  useEffect(() => {
    const shuffled = [...originalCaptions].sort(() => Math.random() - 0.5);
    setCaptions(shuffled);
  }, []);

  const handlePhotoClick = (id: number) => {
    setSelectedPhoto(id);
  };

  const handleCaptionClick = (id: number) => {
    if (selectedPhoto === id) {
      setMatched([...matched, id]);
      setSelectedPhoto(null);

      if (matched.length + 1 === photos.length) {
        setTimeout(onNext, 1500);
      }
    } else {
      setSelectedPhoto(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 text-center">Match the memories 💖</h1>

      <div className="grid grid-cols-2 gap-8">

        {/* 📸 PHOTOS (BIGGER) */}
        <div className="grid grid-cols-2 gap-5">
          {photos.map((p) => (
            <div
              key={p.id}
              onClick={() => handlePhotoClick(p.id)}
              className={`cursor-pointer border-2 rounded-xl overflow-hidden ${
                selectedPhoto === p.id ? "border-pink-500" : "border-transparent"
              } ${matched.includes(p.id) ? "opacity-40" : ""}`}
            >
              <img 
                src={p.src} 
                className="w-full h-40 object-cover" 
              />
            </div>
          ))}
        </div>

        {/* 📝 CAPTIONS */}
        <div className="flex flex-col gap-4 justify-center">
          {captions.map((c) => (
            <div
              key={c.id}
              onClick={() => handleCaptionClick(c.id)}
              className={`p-4 rounded-lg cursor-pointer text-center ${
                matched.includes(c.id)
                  ? "bg-green-500 text-white"
                  : "bg-muted hover:bg-pink-500/20"
              }`}
            >
              {c.text}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
