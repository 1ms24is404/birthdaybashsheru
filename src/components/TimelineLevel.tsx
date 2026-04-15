import { useState, useEffect } from "react";

interface TimelineLevelProps {
  onNext: () => void;
}

const MILESTONES = [
  "We matched…",
  "First late-night conversation",
  "First time we met",
  "First photo together",
  "Made it official",
  'First "I love you"',
  "Today…",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const TimelineLevel = ({ onNext }: TimelineLevelProps) => {
  const [items, setItems] = useState(() => shuffle(MILESTONES));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [wrongIndices, setWrongIndices] = useState<Set<number>>(new Set());

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const newItems = [...items];
    const [removed] = newItems.splice(dragIndex, 1);
    newItems.splice(index, 0, removed);
    setItems(newItems);
    setDragIndex(index);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const checkOrder = () => {
    const correct = items.every((item, i) => item === MILESTONES[i]);
    if (correct) {
      setIsCorrect(true);
      setShowFeedback(true);
      setWrongIndices(new Set());
    } else {
      setShowFeedback(true);
      const wrong = new Set<number>();
      items.forEach((item, i) => {
        if (item !== MILESTONES[i]) wrong.add(i);
      });
      setWrongIndices(wrong);
      setTimeout(() => setShowFeedback(false), 2000);
    }
  };

  // Move item with buttons for mobile
  const moveItem = (from: number, to: number) => {
    if (to < 0 || to >= items.length) return;
    const newItems = [...items];
    const [removed] = newItems.splice(from, 1);
    newItems.splice(to, 0, removed);
    setItems(newItems);
    setWrongIndices(new Set());
  };

  useEffect(() => {
    if (isCorrect) {
      setTimeout(onNext, 2000);
    }
  }, [isCorrect, onNext]);

  return (
    <div className="screen-enter flex flex-col items-center justify-center min-h-screen px-4 py-8 relative z-10">
      <div className="animate-fade-in-up text-center mb-8">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Level 3</p>
        <h2 className="text-2xl md:text-3xl font-bold text-glow text-foreground mb-2">
          Timeline Scramble ⏳
        </h2>
        <p className="text-sm text-muted-foreground">Arrange our milestones from first to latest</p>
      </div>

      <div className="max-w-md w-full space-y-2 mb-8">
        {items.map((item, index) => (
          <div
            key={item}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-300 cursor-grab active:cursor-grabbing ${
              isCorrect
                ? "border-accent/50 bg-accent/10"
                : dragIndex === index
                ? "border-primary bg-primary/10 scale-[1.02] shadow-lg"
                : showFeedback && wrongIndices.has(index)
                ? "border-destructive/50 bg-destructive/5"
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <span className="text-xs text-muted-foreground font-mono w-5">{index + 1}</span>
            <span className="flex-1 text-sm text-foreground">{item}</span>
            <div className="flex flex-col gap-0.5">
              <button
                onClick={() => moveItem(index, index - 1)}
                className="text-muted-foreground hover:text-foreground text-xs leading-none"
                disabled={index === 0}
              >
                ▲
              </button>
              <button
                onClick={() => moveItem(index, index + 1)}
                className="text-muted-foreground hover:text-foreground text-xs leading-none"
                disabled={index === items.length - 1}
              >
                ▼
              </button>
            </div>
          </div>
        ))}
      </div>

      {!isCorrect && (
        <button onClick={checkOrder} className="btn-cosmic">
          Check Order ✓
        </button>
      )}

      {showFeedback && !isCorrect && (
        <p className="mt-4 text-sm text-accent animate-fade-in-up">
          Almost there… some moments are out of place 💭
        </p>
      )}

      {isCorrect && (
        <div className="mt-4 animate-scale-in text-center">
          <p className="text-lg text-accent font-semibold">Perfect timeline! Our story in order 💕</p>
        </div>
      )}
    </div>
  );
};

export default TimelineLevel;
