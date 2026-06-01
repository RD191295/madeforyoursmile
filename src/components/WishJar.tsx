import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function WishJar() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    if (trimmed.length > 2000) {
      setError("Maybe a little shorter? (under 2000 chars)");
      return;
    }
    setStatus("sending");
    setError(null);
    const { error: insertError } = await supabase
      .from("wishes")
      .insert({ name: name.trim().slice(0, 80) || null, message: trimmed });
    if (insertError) {
      setStatus("error");
      setError("Couldn't send it — try once more?");
      return;
    }
    setStatus("sent");
    setMessage("");
    setName("");
  }

  return (
    <section className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-mauve)]">
          A quiet little jar
        </p>
        <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
          Leave a tiny wish
        </h2>
        <p className="mt-3 font-script text-2xl text-[color:var(--color-gold)] sm:text-3xl">
          just between us
        </p>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
          A small space for a thought, a thank-you, a memory — anything you want to say back.
          Only I'll read it.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        <AnimatePresence mode="wait">
          {!open && status !== "sent" && (
            <motion.div
              key="closed"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-center"
            >
              <button
                onClick={() => setOpen(true)}
                className="group relative inline-flex items-center gap-3 rounded-full bg-[color:var(--color-ink)] px-8 py-4 text-sm font-medium tracking-wide text-[color:var(--color-cream)] shadow-[0_20px_50px_-20px_rgba(58,47,63,0.6)] transition-transform hover:scale-[1.03]"
              >
                <Sparkles size={16} className="text-[color:var(--color-gold)] transition-transform group-hover:rotate-12" />
                Open the wish jar
              </button>
            </motion.div>
          )}

          {open && status !== "sent" && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9"
            >
          

              <label className="mt-5 block text-[11px] font-medium uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
                Your wish
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={2000}
                rows={5}
                required
                placeholder="anything you want to say — i'll read every word."
                className="mt-2 w-full resize-none rounded-xl border border-[color:var(--color-mauve)]/20 bg-white/60 px-4 py-3 text-[15px] leading-relaxed text-[color:var(--color-ink)] placeholder:text-[color:var(--color-ink-soft)]/50 focus:border-[color:var(--color-gold)]/60 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-gold)]/20"
              />
              <div className="mt-1 text-right text-[11px] text-[color:var(--color-ink-soft)]/60">
                {message.length}/2000
              </div>

              {error && (
                <p className="mt-3 text-sm text-[color:var(--color-mauve)]">{error}</p>
              )}

              <div className="mt-6 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm text-[color:var(--color-ink-soft)] underline-offset-4 hover:underline"
                >
                  not now
                </button>
                <button
                  type="submit"
                  disabled={status === "sending" || !message.trim()}
                  className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-sm font-medium text-[color:var(--color-cream)] shadow-[0_20px_50px_-20px_rgba(58,47,63,0.6)] transition-transform hover:scale-[1.03] disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={14} className="transition-transform group-hover:translate-x-0.5" />
                  {status === "sending" ? "sending…" : "drop it in the jar"}
                </button>
              </div>
            </motion.form>
          )}

          {status === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass relative overflow-hidden rounded-3xl p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 14 }}
                className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-rose)] to-[color:var(--color-gold)] text-white shadow-lg"
              >
                <Heart size={22} fill="white" />
              </motion.div>
              <h3 className="font-serif text-3xl font-light text-[color:var(--color-ink)]">
                kept safely.
              </h3>
              <p className="mt-3 font-script text-2xl text-[color:var(--color-mauve)]">
                thank you — really.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setOpen(true);
                }}
                className="mt-6 text-sm text-[color:var(--color-ink-soft)] underline-offset-4 hover:underline"
              >
                leave another
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
