interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: IntroScreenProps) => {
  return (
    <div className="screen-enter flex flex-col items-center justify-center min-h-screen px-6 text-center relative z-10">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-glow mb-6 text-foreground">
          Happy Birthday, My Love
        </h1>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-glow-pink mb-12 text-accent">
          Darshil 💫
        </h2>
      </div>
      <div className="animate-fade-in-up" style={{ animationDelay: "0.5s", opacity: 0 }}>
        <button onClick={onNext} className="btn-cosmic text-lg">
          Begin →
        </button>
      </div>
    </div>
  );
};

export default IntroScreen;
