import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift, ArrowDown, Star, Quote } from "lucide-react";

import { Particles } from "@/components/Particles";
import { MusicToggle } from "@/components/MusicToggle";
import { TypeWriter } from "@/components/TypeWriter";

import mem1 from "@/assets/memory-1.jpg";
import mem2 from "@/assets/memory-2.jpg";
import mem3 from "@/assets/memory-3.jpg";
import mem4 from "@/assets/memory-4.jpg";
import mem5 from "@/assets/memory-5.jpg";
import mem6 from "@/assets/memory-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday — A Little Surprise For You" },
      {
        name: "description",
        content:
          "A heartfelt birthday surprise — a quiet collection of memories, words and wishes made just for you.",
      },
      { property: "og:title", content: "Happy Birthday — A Little Surprise For You" },
      {
        property: "og:description",
        content: "A heartfelt birthday surprise made with care.",
      },
      { name: "theme-color", content: "#fdf8f3" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Dancing+Script:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <main className="relative min-h-screen text-[color:var(--color-ink)]">
      <MusicToggle />
      <Hero />
      <Admire />
      <Journey />
      <Gallery />
      <Letter />
      <Finale />
    </main>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <Particles count={36} />
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]"
        >
          <Sparkles size={14} className="text-[color:var(--color-gold)]" />
          A little surprise
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2 }}
          className="font-serif text-balance text-5xl font-light leading-[1.05] text-[color:var(--color-ink)] sm:text-7xl md:text-8xl"
        >
          Happy Birthday,
          <br />
          <span className="font-script text-gold-gradient text-6xl sm:text-8xl md:text-9xl">
            beautiful soul
          </span>
        </motion.h1>

        <p className="mt-8 min-h-[3.5rem] text-balance text-base text-[color:var(--color-ink-soft)] sm:text-lg">
          <TypeWriter
            text="Today the world feels a little softer, because you exist in it."
            delay={1400}
            speed={42}
          />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 4 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <button
            onClick={() => {
              document
                .getElementById("admire")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[color:var(--color-ink)] px-8 py-4 text-sm font-medium tracking-wide text-[color:var(--color-cream)] shadow-[0_20px_50px_-20px_rgba(58,47,63,0.6)] transition-transform hover:scale-[1.03]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[color:var(--color-mauve)] via-[color:var(--color-rose)] to-[color:var(--color-gold)] opacity-80 transition-transform duration-700 group-hover:translate-x-0" />
            <Gift size={16} className="relative z-10" />
            <span className="relative z-10">Open Your Surprise</span>
          </button>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[color:var(--color-ink-soft)]/60"
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- ADMIRE ---------- */
const ADMIRE = [
  {
    icon: Heart,
    title: "Your kindness",
    text: "The way you speak about people — gentle, patient, always seeing the good first. It tells me everything I need to know.",
  },
  {
    icon: Star,
    title: "Your quiet strength",
    text: "You carry your dreams without noise, and that kind of steadiness is rare and beautiful.",
  },
  {
    icon: Sparkles,
    title: "Your laughter",
    text: "It changes the temperature of a conversation. I notice it every single time.",
  },
  {
    icon: Quote,
    title: "Your thoughtfulness",
    text: "You listen with your whole self. You remember small things. That is its own form of love.",
  },
  {
    icon: Heart,
    title: "Your honesty",
    text: "You say what you mean, kindly. It makes every conversation feel safe.",
  },
  {
    icon: Star,
    title: "Your light",
    text: "There is a softness in how you exist — and it makes the room around you better.",
  },
];

function Admire() {
  return (
    <section id="admire" className="relative px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Things I admire"
        title="A few things about you"
        sub="that I keep close to my heart"
      />

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIRE.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass group relative overflow-hidden rounded-2xl p-7"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[color:var(--color-rose)] to-[color:var(--color-lavender)] opacity-40 blur-2xl transition-opacity group-hover:opacity-70" />
              <div className="relative">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 text-[color:var(--color-mauve)] shadow-sm">
                  <Icon size={18} />
                </div>
                <h3 className="font-serif text-2xl font-medium text-[color:var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {item.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- JOURNEY ---------- */
const JOURNEY = [
  {
    when: "The first message",
    title: "Hello, stranger",
    text: "Two careful introductions and a feeling that this conversation might be different. I remember reading your reply twice.",
  },
  {
    when: "The first long call",
    title: "Hours that felt like minutes",
    text: "We spoke about families, dreams, small fears. You laughed at something silly I said and I knew I wanted to hear it again.",
  },
  {
    when: "Somewhere in between",
    title: "Becoming familiar",
    text: "Good mornings, small updates, photos of ordinary days. Slowly, you became the first thought of my mornings.",
  },
  {
    when: "Today",
    title: "Your birthday",
    text: "I am still getting to know you, gently and respectfully — and already, your day matters to me.",
  },
];

function Journey() {
  return (
    <section className="relative px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="Our little story"
        title="From the first hello"
        sub="to this quiet, lovely today"
      />

      <div className="relative mx-auto mt-16 max-w-3xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[color:var(--color-mauve)]/40 to-transparent sm:left-1/2" />

        {JOURNEY.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className={`relative mb-10 flex sm:mb-14 ${
              i % 2 === 0 ? "sm:justify-start" : "sm:justify-end"
            }`}
          >
            <div className="absolute left-4 top-6 -translate-x-1/2 sm:left-1/2">
              <div className="h-3 w-3 rounded-full bg-[color:var(--color-gold)] shadow-[0_0_0_6px_rgba(212,175,106,0.18)]" />
            </div>
            <div
              className={`glass ml-10 w-full rounded-2xl p-6 sm:ml-0 sm:w-[46%] ${
                i % 2 === 0 ? "sm:mr-auto sm:pr-8" : "sm:ml-auto sm:pl-8"
              }`}
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-mauve)]">
                {item.when}
              </p>
              <h3 className="mt-2 font-serif text-2xl font-medium">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- GALLERY ---------- */
const GALLERY = [
  { src: mem1, span: "row-span-2", alt: "Pink peonies and lavender" },
  { src: mem2, span: "", alt: "Two champagne glasses" },
  { src: mem5, span: "", alt: "Soft pink sky" },
  { src: mem4, span: "row-span-2", alt: "Pink birthday cake" },
  { src: mem6, span: "", alt: "Peony bouquet" },
  { src: mem3, span: "", alt: "Handwritten letter with lavender" },
];

function Gallery() {
  return (
    <section className="relative px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="A small collection"
        title="Little things, soft moments"
        sub="a mood board, just for today"
      />

      <div className="mx-auto mt-16 grid max-w-6xl auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:grid-cols-3 sm:gap-4 md:auto-rows-[260px]">
        {GALLERY.map((g, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className={`group relative overflow-hidden rounded-2xl ${g.span} shadow-[0_20px_50px_-25px_rgba(58,47,63,0.4)]`}
          >
            <img
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--color-ink)]/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- LETTER ---------- */
function Letter() {
  return (
    <section className="relative px-6 py-28 sm:py-36">
      <SectionHeader
        eyebrow="A letter"
        title="Some words, written slowly"
        sub="and meant gently"
      />

      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9 }}
        className="glass relative mx-auto mt-16 max-w-2xl rounded-[28px] p-8 sm:p-14"
      >
        <div className="absolute -top-4 left-8 rounded-full bg-[color:var(--color-cream)] px-4 py-1 text-[10px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-mauve)] shadow-sm">
          For you
        </div>

        <p className="font-script text-3xl text-[color:var(--color-mauve)] sm:text-4xl">
          Dear you,
        </p>

        <div className="mt-6 space-y-5 font-serif text-[17px] leading-[1.85] text-[color:var(--color-ink)] sm:text-lg">
          <p>
            I do not know yet all the small details of your life — the songs you replay, the
            corners of the city you love, the way you hold a cup of tea on a quiet morning. But
            I am learning. And every little thing I learn makes me quietly grateful.
          </p>
          <p>
            We met in a way that asks for honesty and patience, and you have been both. You
            have made these early conversations feel safe, easy, and warm — and that is a gift
            in itself.
          </p>
          <p>
            On your birthday, I do not want to promise the world. I only want to say this: I
            hope today feels soft. I hope you are surrounded by people who love you out loud. I
            hope the year ahead is kind to you, and a little adventurous, and full of the small
            joys you deserve.
          </p>
          <p>
            And quietly, sincerely — I hope I get to keep being a small good thing in your
            story.
          </p>
        </div>

        <p className="mt-8 font-script text-2xl text-[color:var(--color-mauve)] sm:text-3xl">
          Yours, with care.
        </p>
      </motion.article>
    </section>
  );
}

/* ---------- FINALE ---------- */
function Finale() {
  const [fired, setFired] = useState(false);

  const fireConfetti = () => {
    const colors = ["#f5c6d6", "#e9def8", "#d4af6a", "#ffffff", "#c9a7d4"];
    const end = Date.now() + 1500;
    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.7 },
        colors,
        scalar: 0.9,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.7 },
        colors,
        scalar: 0.9,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors,
    });
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-28">
      <Particles count={40} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onViewportEnter={() => {
          if (!fired) {
            setFired(true);
            setTimeout(fireConfetti, 400);
          }
        }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--color-ink-soft)]">
          <Sparkles size={14} className="text-[color:var(--color-gold)]" />
          One more thing
        </div>

        <h2 className="font-serif text-5xl font-light leading-tight text-balance sm:text-7xl">
          Make a wish.
          <br />
          <span className="font-script text-gold-gradient text-6xl sm:text-8xl">
            I'll quietly wish too.
          </span>
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-balance text-[color:var(--color-ink-soft)] sm:text-lg">
          Thank you for being the kind of person worth waiting to know. Whatever this becomes,
          today I just wanted you to feel seen and celebrated.
        </p>

        <button
          onClick={fireConfetti}
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[color:var(--color-ink)] px-8 py-4 text-sm font-medium tracking-wide text-[color:var(--color-cream)] shadow-[0_20px_50px_-20px_rgba(58,47,63,0.6)] transition-transform hover:scale-[1.03]"
        >
          <Sparkles size={16} className="transition-transform group-hover:rotate-12" />
          Celebrate again
        </button>

        <p className="mt-16 font-script text-2xl text-[color:var(--color-mauve)] sm:text-3xl">
          Happy birthday, again. — Always, gently.
        </p>
      </motion.div>
    </section>
  );
}

/* ---------- Shared ---------- */
function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-2xl text-center"
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-mauve)]">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-3 font-script text-2xl text-[color:var(--color-gold)] sm:text-3xl">
          {sub}
        </p>
      )}
    </motion.div>
  );
}
