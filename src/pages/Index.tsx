import { useState, useCallback, useRef, useEffect } from "react";
import StarField from "@/components/StarField";
import IntroScreen from "@/components/IntroScreen";
import ReadyScreen from "@/components/ReadyScreen";
import LoginScreen from "@/components/LoginScreen";
import WordSearchLevel from "@/components/WordSearchLevel";
import PhotoMatchLevel from "@/components/PhotoMatchLevel";
import TimelineLevel from "@/components/TimelineLevel";
import DecryptLevel from "@/components/DecryptLevel";
import InterludeScreen from "@/components/InterludeScreen";
import FinalScreen from "@/components/FinalScreen";

type Screen =
  | "intro"
  | "ready"
  | "login"
  | "level1"
  | "level2"
  | "level3"
  | "level4"
  | "interlude"
  | "final";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");

  // Create audio ONCE on mount — never recreated
  const mainMusic = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/music/perfect.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    mainMusic.current = audio;

    // Cleanup on unmount
    return () => {
      audio.pause();
      mainMusic.current = null;
    };
  }, []); // ← runs once only

  const startMainMusic = useCallback(() => {
    mainMusic.current?.play().catch(() => {});
  }, []);

  const goTo = useCallback((next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (next === "ready") startMainMusic();
  }, [startMainMusic]);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />

      {screen === "intro" && <IntroScreen onNext={() => goTo("ready")} />}
      {screen === "ready" && <ReadyScreen onNext={() => goTo("login")} />}
      {screen === "login" && <LoginScreen onNext={() => goTo("level1")} />}
      {screen === "level1" && <WordSearchLevel onNext={() => goTo("level2")} />}
      {screen === "level2" && <PhotoMatchLevel onNext={() => goTo("level3")} />}
      {screen === "level3" && <TimelineLevel onNext={() => goTo("level4")} />}
      {screen === "level4" && <DecryptLevel onNext={() => goTo("interlude")} />}
      {screen === "interlude" && <InterludeScreen onNext={() => goTo("final")} />}
      {screen === "final" && <FinalScreen />}
    </div>
  );
};

export default Index;
