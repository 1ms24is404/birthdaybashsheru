import { useState, useCallback } from "react";
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

/*
  MUSIC PLACEHOLDERS
  Place your music files in the public/ folder and update these paths:
  - Login screen: "Love Me Like You Do"
  - Level 1: "Double Take" by dhruv
  - Level 2: "Memories"
  - Interlude/Final: "I Wanna Be Yours" / "Until I Found You"

  Example: const MUSIC = { login: "/music/love-me-like-you-do.mp3", ... }
*/

const Index = () => {
  const [screen, setScreen] = useState<Screen>("intro");

  const goTo = useCallback((next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <StarField />

      {/* Progress indicator */}
      {screen !== "intro" && screen !== "ready" && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
            style={{
              width: `${
                {
                  login: 10,
                  level1: 25,
                  level2: 40,
                  level3: 55,
                  level4: 70,
                  interlude: 85,
                  final: 100,
                }[screen] ?? 0
              }%`,
            }}
          />
        </div>
      )}

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
