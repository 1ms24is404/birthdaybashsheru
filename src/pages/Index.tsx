import { useState, useCallback, useRef } from "react";
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

  const mainMusic = useRef<HTMLAudioElement | null>(null);

  const startMainMusic = () => {
    if (!mainMusic.current) {
      mainMusic.current = new Audio("/music/perfect.mp3");
      mainMusic.current.loop = true;
      mainMusic.current.volume = 0.5;
    }
    mainMusic.current.play().catch(() => {});
  };

  const pauseMainMusic = () => {
    mainMusic.current?.pause();
  };

  const resumeMainMusic = () => {
    mainMusic.current?.play().catch(() => {});
  };

  const goTo = useCallback((next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (next === "ready") startMainMusic();
    if (next === "interlude") pauseMainMusic();
    if (next === "final") resumeMainMusic();
  }, []);

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
