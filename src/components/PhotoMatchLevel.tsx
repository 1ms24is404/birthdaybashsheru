import { useState, useEffect } from "react";

const pairs = [
  { id: 1, photo: "/photos/photo1.jpg", caption: "The moment everything started 🌟" },
  { id: 2, photo: "/photos/photo2.jpg", caption: "We couldn’t stop smiling that day 💫" },
  { id: 3, photo: "/photos/photo3.jpg", caption: "The day it became real 💜" },
  { id: 4, photo: "/photos/photo4.jpg", caption: "The world saw you for the first time 👀" },
  { id: 5, photo: "/photos/photo5.jpg", caption: "When you showed me off 🥰" },
  { id: 6, photo: "/photos/photo6.jpg", caption: "My favourite version of you 🖤" }
];

export default function PhotoMatchLevel({ onNext }: any) {
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
    if (matched.length === pairs.length) {
      setTimeout(onNext, 1500);
    }
  }, [matched]);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Match the memories 💖</h1>
      <div className="grid grid-cols-3 gap-4">
        {pairs.map((p) => (
          <div key={p.id}>
            <img src={p.photo} className="w-full h-32 object-cover rounded-lg" />
            <p className="text-xs mt-2">{p.caption}</p>
          </div>
        ))}
      </div>
      <button onClick={onNext} className="mt-6">Next →</button>
    </div>
  );
}
