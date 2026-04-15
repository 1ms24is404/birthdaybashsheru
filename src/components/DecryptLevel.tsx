import { useState, useEffect } from "react";

interface DecryptLevelProps {
  onNext: () => void;
}

const ANSWER = "you are my forever and my universe";

const emojiMap: Record<string, string> = {
  "💛": "you",
  "🌟": "are",
  "🌙": "my",
  "♾️": "forever",
  "🤝": "and",
  "💫": "my",
  "🌌": "universe",
};

const emojiSequence = ["💛", "🌟", "🌙", "♾️", "🤝", "💫", "🌌"];

const DecryptLevel = ({ onNext }: DecryptLevelProps) => {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const handleCheck = () => {
    if (answer.trim().toLowerCase() === ANSWER) {
      setIsCorrect(true);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  useEffect(() => {
    if (isCorrect) setTimeout(onNext, 2000);
  }, [isCorrect, onNext]);

  return (
    <div className="screen-enter flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10">
      <div className="animate-fade-in-up text-center mb-8">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Level 4</p>
        <h2 className="text-2xl md:text-3xl font-bold text-glow text-foreground mb-2">
          Love Letter Decrypt 💌
        </h2>
        <p className="text-sm text-muted-foreground">Decode the hidden message using the key</p>
      </div>

      {/* Emoji sequence */}
      <div className="animate-fade-in-up bg-card border border-border rounded-2xl p-6 mb-6 max-w-md w-full">
        <p className="text-center text-3xl md:text-4xl tracking-widest leading-relaxed">
          {emojiSequence.join(" ")}
        </p>
      </div>

      {/* Key */}
      <div className="animate-fade-in-up bg-muted rounded-2xl p-4 mb-6 max-w-md w-full" style={{ animationDelay: "0.2s", opacity: 0 }}>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 text-center">Decoder Key</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {Object.entries(emojiMap).map(([emoji, word]) => (
            <div key={emoji + word} className="flex items-center gap-2 text-foreground/80">
              <span className="text-lg">{emoji}</span>
              <span>= {word}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className={`max-w-md w-full ${shake ? "animate-[shake_0.5s]" : ""}`}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          placeholder="Type the decoded message…"
          className="w-full px-5 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all text-sm"
        />
      </div>

      {!isCorrect && (
        <button onClick={handleCheck} className="btn-cosmic mt-6">
          Decode 🔓
        </button>
      )}

      <button
        onClick={() => setShowHint(!showHint)}
        className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Need help? 💡
      </button>

      {showHint && (
        <p className="mt-2 text-xs text-primary animate-fade-in-up max-w-sm text-center">
          Read each emoji left to right and look up the word in the key. Put them together to form a sentence 💕
        </p>
      )}

      {isCorrect && (
        <div className="mt-6 animate-scale-in text-center">
          <p className="text-lg text-accent font-semibold">"{ANSWER}" 💖</p>
          <p className="text-sm text-muted-foreground mt-2">Message decoded beautifully!</p>
        </div>
      )}
    </div>
  );
};

export default DecryptLevel;
