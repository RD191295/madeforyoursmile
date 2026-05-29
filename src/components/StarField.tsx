import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";

const MESSAGES = [
  "You make ordinary days feel quietly special.",
  "Your laugh is my favourite sound this month.",
  "Thank you for being patient with my words.",
  "I notice the small kindnesses. All of them.",
  "Whatever this becomes — today, I'm grateful.",
  "You deserve every soft, beautiful thing.",
  "There's a calm about you that feels like home.",
  "Here's to slow conversations and warm tea.",
  "I hope this year is gentle and a little brave.",
];

type Star = { id: number; x: number; y: number; size: number; delay: number; msg: string };

export function StarField() {
  const [open, setOpen] = useState<number | null>(null);

  const stars = useMemo<Star[]>(
    () =>
      MESSAGES.map((msg, i) => ({
        id: i,
        x: 8 + Math.random() * 84,
        y: 10 + Math.random() * 75,
        size: 10 + Math.random() * 8,
        delay: Math.random() * 3,
        msg,
      })),
    [],
  );

  const active = open !== null ? stars.find((s) => s.id === open) : null;

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-mauve)]">
          A small night sky
        </p>
        <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
          Tap a star, find a thought
        </h2>
        <p className="mt-3 font-script text-2xl text-[color:var(--color-gold)] sm:text-3xl">
          little wishes, hidden softly
        </p>
      </div>

      <div className="relative mx-auto mt-14 h-[420px] max-w-4xl overflow-hidden rounded-3xl glass">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 100%, rgba(201,167,212,0.25) 0%, transparent 70%), linear-gradient(180deg, rgba(58,47,63,0.06) 0%, rgba(233,222,248,0.15) 100%)",
          }}
        />
        {stars.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => setOpen(s.id)}
            aria-label="Reveal a hidden message"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-[color:var(--color-gold)] focus:outline-none"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 3 + (s.id % 4), delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.6 }}
          >
            <span className="absolute inset-0 -m-2 rounded-full bg-[color:var(--color-gold)]/40 blur-md" />
            <Star size={s.size} fill="currentColor" strokeWidth={0} className="relative" />
          </motion.button>
        ))}

        <AnimatePresence>
          {active && (
            <motion.div
              key="msg"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-10 flex items-center justify-center p-6"
            >
              <div
                aria-hidden
                onClick={() => setOpen(null)}
                className="absolute inset-0 bg-[color:var(--color-cream)]/40 backdrop-blur-sm"
              />
              <div className="glass relative max-w-md rounded-2xl p-7 text-center">
                <button
                  onClick={() => setOpen(null)}
                  className="absolute right-3 top-3 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <Star
                  size={20}
                  fill="currentColor"
                  className="mx-auto mb-3 text-[color:var(--color-gold)]"
                />
                <p className="font-serif text-xl leading-relaxed text-[color:var(--color-ink)] sm:text-2xl">
                  {active.msg}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mx-auto mt-6 max-w-md text-center text-sm text-[color:var(--color-ink-soft)]/80">
        nine little stars, nine little thoughts — tap any of them
      </p>
    </section>
  );
}
