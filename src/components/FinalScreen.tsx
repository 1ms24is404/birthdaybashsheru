import { useState, useEffect } from "react";

interface FinalScreenProps {}

/* 
  LOVE LETTER PLACEHOLDER
  Replace the text below with your personal letter.
*/
const LETTER = `My Dearest Darshil,

From the very first moment our paths crossed, my universe shifted. You became the gravity that holds my world together, the light that makes every dark corner glow.

Every day with you feels like discovering a new constellation — beautiful, vast, and full of wonder. You are my favourite adventure, my safest place, and my most beautiful dream come to life.

I don't know what I did to deserve someone as incredible as you, but I promise to spend every day making sure you know just how loved you are.

You are my forever and my universe.

Happy Birthday, my love. Here's to a million more moments together. 🌌💕

With all my heart,
Yours, always & forever ♾️`;

const photos = [
  "collage1.jpg", "collage2.jpg", "collage3.jpg",
  "collage4.jpg", "collage5.jpg", "collage6.jpg",
  "collage7.jpg", "collage8.jpg", "collage9.jpg",
];

const FinalScreen = ({}: FinalScreenProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCollage, setShowCollage] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < LETTER.length) {
        setDisplayedText(LETTER.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCollage(true), 500);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="screen-enter min-h-screen px-4 py-12 relative z-10">
      <div className="max-w-2xl mx-auto">
        {/* Letter */}
        <div className="animate-fade-in-up mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-glow text-center mb-8 text-foreground">
            A Letter For You 💌
          </h2>
          <div className="bg-card/50 backdrop-blur border border-border rounded-2xl p-6 md:p-10">
            <p className="text-foreground/90 leading-relaxed whitespace-pre-line font-light text-sm md:text-base">
              {displayedText}
              <span className="animate-pulse text-accent">|</span>
            </p>
          </div>
        </div>

        {/* Photo collage */}
        {showCollage && (
          <div className="animate-fade-in-up">
            <h3 className="text-2xl font-bold text-glow-pink text-center mb-6 text-accent">
              Our Moments 📸
            </h3>
            <div className="grid grid-cols-3 gap-2 md:gap-3 mb-12">
              {photos.map((photo, i) => (
                <div
                  key={photo}
                  className="aspect-square rounded-xl overflow-hidden bg-muted border border-border flex items-center justify-center text-muted-foreground text-xs animate-scale-in"
                  style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}
                >
                  📷 {photo}
                </div>
              ))}
            </div>

            {/* Signature */}
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "1s", opacity: 0 }}>
              <p className="text-xl md:text-2xl font-bold text-glow text-foreground mb-2">
                Forever yours, in this universe and every other ♾️💕
              </p>
              <p className="text-muted-foreground text-sm mt-4">
                Made with infinite love 🌌
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalScreen;
