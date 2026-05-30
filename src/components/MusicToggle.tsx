import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MUSIC_URL =
  "https://cdn.jsdelivr.net/gh/anars/blank-audio@master/2-minutes-of-silence.mp3";
const FALLBACK_URLS = [
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1ada6736f8.mp3?filename=relaxing-piano-music-15009.mp3",
  "https://www.bensound.com/bensound-music/bensound-tenderness.mp3",
  "https://cdn.pixabay.com/download/audio/2023/06/27/audio_a107d4985c.mp3?filename=relaxing-music-vol1-149456.mp3",
];

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const tryPlay = async (urls: string[]): Promise<HTMLAudioElement | null> => {
    for (const url of urls) {
      const a = new Audio();
      a.crossOrigin = "anonymous";
      a.loop = true;
      a.volume = volume;
      a.preload = "auto";
      a.src = url;
      try {
        await a.play();
        return a;
      } catch (e) {
        a.pause();
      }
    }
    return null;
  };

  const toggle = async () => {
    if (playing && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setPlaying(true);
        return;
      } catch {
        // fall through to recreate
      }
    }
    const a = await tryPlay([MUSIC_URL, ...FALLBACK_URLS]);
    if (a) {
      audioRef.current = a;
      setPlaying(true);
      setError(false);
    } else {
      setError(true);
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
                for your evening
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
        {playing ? <Music2 size={18} /> : <VolumeX size={18} />}
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
