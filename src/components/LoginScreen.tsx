import { useState } from "react";

interface LoginScreenProps {
  onNext: () => void;
}

const errorMessages = [
  "Hmm, that's not it… think back to where it all began 💭",
  "Close, but not quite… the universe knows the date 🌌",
  "Try again, my love… you know when our stars aligned ✨",
  "That's not the magic number… remember our beginning 💫",
  "Nope! Think about the day our worlds collided 🌠",
];

const LoginScreen = ({ onNext }: LoginScreenProps) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = () => {
    if (code === "20102025") {
      onNext();
    } else {
      const msg = errorMessages[Math.floor(Math.random() * errorMessages.length)];
      setError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="screen-enter flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      <div className="animate-fade-in-up max-w-md w-full">
        <h2 className="text-2xl md:text-4xl font-bold text-glow mb-3 text-foreground">
          🔐
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold mb-8 text-foreground/90">
          Enter the date we first matched
        </h3>

        <div className={`transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}>
          <input
            type="text"
            maxLength={8}
            placeholder="DDMMYYYY"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full px-6 py-4 rounded-2xl bg-muted border border-border text-center text-xl tracking-[0.3em] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {error && (
          <p className="mt-4 text-accent text-sm animate-fade-in-up">{error}</p>
        )}

        <button onClick={handleSubmit} className="btn-cosmic mt-8 w-full">
          Unlock Our Story →
        </button>

        <button
          onClick={() => setShowHint(!showHint)}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Need a hint? 💡
        </button>

        {showHint && (
          <p className="mt-2 text-xs text-muted-foreground animate-fade-in-up">
            Format: DDMMYYYY — e.g. 02012022
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
