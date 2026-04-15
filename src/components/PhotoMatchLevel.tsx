import { useState, useEffect } from "react";

interface PhotoMatchLevelProps {
  onNext: () => void;
}

const pairs = [
  { id: 1, photo: "photo1.jpg", caption: "The moment everything started 🌟" },
  { id: 2, photo: "photo2.jpg", caption: "We couldn't stop smiling that day 💫" },
  { id: 3, photo: "photo3.jpg", caption: "The day it became real 💜" },
  { id: 4, photo: "photo4.jpg", caption: "The world saw you for the first time 👀" },
  { id: 5, photo: "photo5.jpg", caption: "When you showed me off 🥰" },
  { id: 6, photo: "photo6.jpg", caption: "My favourite version of you 🖤" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const PhotoMatchLevel = ({ onNext }: PhotoMatchLevelProps) => {
  const [shuffledPhotos] = useState(() => shuffle(pairs));
  const [shuffledCaptions] = useState(() => shuffle(pairs));
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ photo: number; caption: number } | null>(null);
  const [correctFlash, setCorrectFlash] = useState<number | null>(null);

  const handlePhotoClick = (id: number) => {
    if (matched.has(id)) return;
    setSelectedPhoto(id);
    setWrongPair(null);
  };

  const handleCaptionClick = (id: number) => {
    if (matched.has(id) || selectedPhoto === null) return;

    if (selectedPhoto === id) {
      // Correct match
      setCorrectFlash(id);
      setTimeout(() => {
        const newMatched = new Set(matched);
        newMatched.add(id);
        setMatched(newMatched);
        setSelectedPhoto(null);
        setCorrectFlash(null);
      }, 600);
    } else {
      // Wrong match
      setWrongPair({ photo: selectedPhoto, caption: id });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedPhoto(null);
      }, 1000);
    }
  };

  useEffect(() => {
    if (matched.size === pairs.length) {
      setTimeout(onNext, 1500);
    }
  }, [matched, onNext]);

  return (
    <div className="screen-enter flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10">
      <div className="animate-fade-in-up text-center mb-8">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Level 2</p>
        <h2 className="text-2xl md:text-3xl font-bold text-glow text-foreground mb-2">
          Photo Match 📸
        </h2>
        <p className="text-sm text-muted-foreground">Match each memory to its moment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Photos column */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-2">Photos</p>
          {shuffledPhotos.map((pair) => (
            <div
              key={pair.id}
              onClick={() => handlePhotoClick(pair.id)}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
                matched.has(pair.id)
                  ? "border-accent/50 opacity-50 pointer-events-none"
                  : selectedPhoto === pair.id
                  ? "border-primary ring-2 ring-primary/40 scale-[1.02]"
                  : wrongPair?.photo === pair.id
                  ? "border-destructive animate-[shake_0.5s]"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Placeholder photo */}
              <div className="h-20 bg-muted flex items-center justify-center text-muted-foreground text-sm">
                📷 {pair.photo}
              </div>
              {correctFlash === pair.id && (
                <div className="absolute inset-0 bg-accent/20 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Captions column */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground text-center mb-2">Captions</p>
          {shuffledCaptions.map((pair) => (
            <div
              key={pair.id}
              onClick={() => handleCaptionClick(pair.id)}
              className={`px-4 py-4 rounded-xl cursor-pointer transition-all duration-300 border-2 text-sm ${
                matched.has(pair.id)
                  ? "border-accent/50 bg-accent/10 opacity-50 pointer-events-none"
                  : wrongPair?.caption === pair.id
                  ? "border-destructive bg-destructive/10 animate-[shake_0.5s]"
                  : correctFlash === pair.id
                  ? "border-accent bg-accent/10"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted"
              }`}
            >
              {pair.caption}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-accent">
        {matched.size}/{pairs.length} matched
      </p>

      {matched.size === pairs.length && (
        <div className="mt-4 animate-scale-in">
          <p className="text-lg text-accent font-semibold">All memories matched! 💕</p>
        </div>
      )}
    </div>
  );
};

export default PhotoMatchLevel;
