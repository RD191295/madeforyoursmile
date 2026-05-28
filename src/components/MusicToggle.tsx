import { useEffect, useRef, useState } from "react";
import { Music2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

// A soft ambient music URL (royalty-free piano loop). Falls back gracefully if blocked.
const MUSIC_URL =
  "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1ada6736f8.mp3?filename=relaxing-piano-music-15009.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? "Mute music" : "Play music"}
      className="glass fixed top-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-[color:var(--color-ink)]"
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
  );
}
