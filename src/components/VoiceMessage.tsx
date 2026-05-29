import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Mic } from "lucide-react";

const LINES = [
  "Hi Urvi,",
  "I just wanted to take a quiet moment today",
  "to say happy birthday — properly.",
  "Thank you for being patient, and kind,",
  "and for making these early days feel easy.",
  "I hope this year is gentle to you.",
  "Take care of yourself. Always.",
];

// Approx seconds spoken per line — used for visual cadence.
const DURATIONS = [1.2, 2.4, 2.1, 2.6, 2.7, 2.3, 1.9];
const TOTAL = DURATIONS.reduce((a, b) => a + b, 0);

export function VoiceMessage() {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const baseRef = useRef<number>(0);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const tick = () => {
    const elapsed = baseRef.current + (performance.now() - startRef.current) / 1000;
    if (elapsed >= TOTAL) {
      setT(TOTAL);
      setPlaying(false);
      baseRef.current = 0;
      return;
    }
    setT(elapsed);
    rafRef.current = requestAnimationFrame(tick);
  };

  const speak = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(LINES.join(" "));
    u.rate = 0.92;
    u.pitch = 1;
    u.volume = 0.9;
    synthRef.current = u;
    window.speechSynthesis.speak(u);
  };

  const toggle = () => {
    if (playing) {
      setPlaying(false);
      baseRef.current = t >= TOTAL ? 0 : t;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (typeof window !== "undefined") window.speechSynthesis?.pause();
    } else {
      if (t >= TOTAL) {
        baseRef.current = 0;
        setT(0);
        speak();
      } else if (baseRef.current === 0 && t === 0) {
        speak();
      } else if (typeof window !== "undefined" && window.speechSynthesis?.paused) {
        window.speechSynthesis.resume();
      } else {
        speak();
      }
      startRef.current = performance.now();
      setPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  // Which line is currently being spoken
  let acc = 0;
  let activeLine = -1;
  for (let i = 0; i < DURATIONS.length; i++) {
    acc += DURATIONS[i];
    if (t < acc) {
      activeLine = i;
      break;
    }
  }
  if (t >= TOTAL) activeLine = LINES.length - 1;

  const progress = Math.min(1, t / TOTAL);

  return (
    <section className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-mauve)]">
          A voice note
        </p>
        <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
          If I could say it out loud
        </h2>
        <p className="mt-3 font-script text-2xl text-[color:var(--color-gold)] sm:text-3xl">
          press play, softly
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="glass relative mx-auto mt-14 max-w-xl rounded-3xl p-7 sm:p-9"
      >
        <div className="flex items-center gap-5">
          <button
            onClick={toggle}
            aria-label={playing ? "Pause voice message" : "Play voice message"}
            className="group relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-ink)] text-[color:var(--color-cream)] shadow-[0_15px_40px_-15px_rgba(58,47,63,0.6)] transition-transform hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[color:var(--color-mauve)] via-[color:var(--color-rose)] to-[color:var(--color-gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            {playing ? (
              <Pause size={20} className="relative" />
            ) : (
              <Play size={20} className="relative translate-x-0.5" />
            )}
            {playing && (
              <motion.span
                className="absolute inset-0 rounded-full border border-[color:var(--color-gold)]/60"
                animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink-soft)]">
              <Mic size={11} className="text-[color:var(--color-mauve)]" />
              voice note · 00:{String(Math.floor(TOTAL)).padStart(2, "0")}
            </div>

            {/* Waveform */}
            <div className="mt-3 flex h-10 items-center gap-[3px]">
              {Array.from({ length: 48 }).map((_, i) => {
                const reached = i / 48 < progress;
                const base = 8 + ((i * 37) % 22);
                return (
                  <motion.span
                    key={i}
                    className="w-[3px] rounded-full"
                    style={{
                      height: base,
                      background: reached
                        ? "linear-gradient(180deg,#d4af6a,#c9a7d4)"
                        : "rgba(58,47,63,0.18)",
                    }}
                    animate={
                      playing && reached
                        ? { scaleY: [0.6, 1.4, 0.8, 1.2, 0.7] }
                        : { scaleY: 1 }
                    }
                    transition={{
                      duration: 0.9 + (i % 5) * 0.1,
                      repeat: playing && reached ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-7 space-y-2 font-serif text-[16px] leading-relaxed text-[color:var(--color-ink-soft)] sm:text-[17px]">
          {LINES.map((l, i) => (
            <motion.p
              key={i}
              animate={{
                opacity: i === activeLine ? 1 : i < activeLine ? 0.7 : 0.35,
                x: i === activeLine ? 4 : 0,
              }}
              transition={{ duration: 0.5 }}
              className={i === activeLine ? "text-[color:var(--color-ink)]" : ""}
            >
              {l}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
