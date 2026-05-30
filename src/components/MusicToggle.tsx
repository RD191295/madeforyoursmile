import { useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2, Music2, Play, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MUSIC_URL = "/audio/ambient-birthday.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const setupAudio = () => {
    if (audioRef.current) return audioRef.current;

    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = volume;

    audio.addEventListener("playing", () => {
      setPlaying(true);
      setLoading(false);
      setError(false);
    });

    audio.addEventListener("pause", () => {
      setPlaying(false);
      setLoading(false);
    });

    audio.addEventListener("waiting", () => {
      setLoading(true);
    });

    audio.addEventListener("canplay", () => {
      setLoading(false);
      setError(false);
    });

    audio.addEventListener("error", () => {
      setLoading(false);
      setPlaying(false);
      setError(true);
    });

    audioRef.current = audio;
    return audio;
  };

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = async () => {
    const audio = setupAudio();

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    setLoading(true);
    setError(false);

    try {
      audio.currentTime = audio.currentTime || 0;
      await audio.play();
      setPlaying(true);
      setError(false);
    } catch {
      setPlaying(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed top-5 right-5 z-50 flex items-center gap-2"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass flex items-center gap-3 rounded-full px-4 py-2"
          >
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-mauve)]">
                ambient
              </span>
              <span className="font-serif text-sm text-[color:var(--color-ink)]">
                soft birthday theme
              </span>
            </div>
            <Volume2 size={12} className="text-[color:var(--color-ink-soft)]" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-[color:var(--color-mauve)]/25 accent-[color:var(--color-mauve)]"
              aria-label="Volume"
            />
            {error && (
              <AlertCircle
                size={14}
                className="text-[color:var(--color-gold)]"
                aria-hidden="true"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label={playing ? "Mute music" : "Play music"}
        className="glass relative flex h-12 w-12 items-center justify-center rounded-full text-[color:var(--color-ink)]"
      >
        {loading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : playing ? (
          <Music2 size={18} />
        ) : error ? (
          <AlertCircle size={18} />
        ) : (
          <Play size={18} className="ml-0.5" />
        )}
        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border border-[color:var(--color-mauve)]/50"
            animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
}
