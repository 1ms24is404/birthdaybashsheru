interface ReadyScreenProps {
  onNext: () => void;
}

const ReadyScreen = ({ onNext }: ReadyScreenProps) => {
  return (
    <div className="screen-enter flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      <div className="animate-fade-in-up">
        <h2 className="text-3xl md:text-5xl font-bold text-glow mb-10 text-foreground">
          Ready to take a journey through us?
        </h2>
      </div>
      <div className="animate-fade-in-up space-y-4 mb-12" style={{ animationDelay: "0.4s", opacity: 0 }}>
        <p className="text-lg text-muted-foreground flex items-center justify-center gap-3">
          <span className="text-2xl">🎧</span> Headphones recommended
        </p>
        <p className="text-lg text-muted-foreground flex items-center justify-center gap-3">
          <span className="text-2xl">📱</span> Screen recording recommended
        </p>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "0.8s", opacity: 0 }}>
        <button onClick={onNext} className="btn-cosmic text-lg">
          I'm Ready →
        </button>
      </div>
    </div>
  );
};

export default ReadyScreen;
