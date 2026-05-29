import { motion, useScroll, useTransform } from "framer-motion";

/**
 * A subtle fixed gradient wash that shifts hue with scroll position.
 * Sits behind all content. Pointer-events disabled.
 */
export function DynamicBackground() {
  const { scrollYProgress } = useScroll();

  const a = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(245, 198, 214, 0.45)", // rose
      "rgba(233, 222, 248, 0.55)", // lavender
      "rgba(252, 231, 240, 0.55)", // blush
      "rgba(201, 167, 212, 0.45)", // mauve
      "rgba(212, 175, 106, 0.35)", // gold
    ],
  );
  const b = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "rgba(233, 222, 248, 0.55)",
      "rgba(245, 198, 214, 0.45)",
      "rgba(212, 175, 106, 0.28)",
      "rgba(252, 231, 240, 0.55)",
      "rgba(201, 167, 212, 0.5)",
    ],
  );

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: useTransform(
          [a, b],
          ([av, bv]) =>
            `radial-gradient(55% 45% at 80% 10%, ${av} 0%, transparent 70%), radial-gradient(55% 50% at 10% 80%, ${bv} 0%, transparent 70%), #fdf8f3`,
        ),
      }}
    />
  );
}
