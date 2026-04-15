import { useState, useEffect } from "react";

interface FinalScreenProps {}

const LETTER = `My Dearest Darshil,

From the very first moment our paths crossed, my universe shifted. You became the gravity that holds my world together, the light that makes every dark corner glow.

Every day with you feels like discovering a new constellation — beautiful, vast, and full of wonder. You are my favourite adventure, my safest place, and my most beautiful dream come to life.

I don't know what I did to deserve someone as incredible as you, but I promise to spend every day making sure you know just how loved you are.

You are my forever and my universe.

Happy Birthday, my love. Here's to a million more moments together. 🌌💕

With all my heart,
Yours, always & forever ♾️`;

const photos = [
"collage1.jpeg", "collage2.jpeg", "collage3.jpeg",
"collage4.jpeg", "collage5.jpeg", "collage6.jpeg"
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

```
return () => clearInterval(timer);
```

}, []);

return ( <div className="screen-enter min-h-screen px-4 py-12 relative z-10"> <div className="max-w-2xl mx-auto">

```
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

        <div className="grid grid-cols-2 gap-4 md:gap-5 mb-12">
          {photos.map((photo, i) => (
            <div
              key={photo}
              className="aspect-square rounded-xl overflow-hidden bg-muted border border-border animate-scale-in"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <img
                src={`/collage/${photo}`}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
                alt="memory"
              />
            </div>
          ))}
        </div>

        {/* Signature */}
        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: "1s", opacity: 0 }}
        >
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
```

);
};

export default FinalScreen;
