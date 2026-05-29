import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

export function LoadingScreen() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 50%, #fdf8f3 0%, #f5e6ee 60%, #e9def8 100%)",
          }}
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative flex h-20 w-20 items-center justify-center"
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-[color:var(--color-rose)]/50 blur-2xl"
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="relative text-[color:var(--color-mauve)]"
              >
                <Heart size={36} fill="currentColor" strokeWidth={1.2} />
              </motion.div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-8 font-script text-2xl text-[color:var(--color-mauve)]"
            >
              a little something, just for you…
            </motion.p>

            <div className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-[color:var(--color-mauve)]/15">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
