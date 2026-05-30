import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift, ArrowDown, Star, Quote, MapPin, Clock, Calendar, MessageCircle, Phone, Coffee, Cake, Moon } from "lucide-react";

import { Particles } from "@/components/Particles";
import { MusicToggle } from "@/components/MusicToggle";
import { TypeWriter } from "@/components/TypeWriter";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ScrollProgress } from "@/components/ScrollProgress";
import { DynamicBackground } from "@/components/DynamicBackground";
import { StarField } from "@/components/StarField";
import { VoiceMessage } from "@/components/VoiceMessage";

import mem1 from "@/assets/IMG_1700.jpeg";
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
      <LoadingScreen />
      <DynamicBackground />
      <ScrollProgress />
      <MusicToggle />
      <Hero />
      <SectionFade />
      <Admire />
      <SectionFade />
      <Journey />
      <SectionFade />
      <VoiceMessage />
      <SectionFade />
      <Gallery />
      <SectionFade />
      <Letter />
      <SectionFade />
      <StarField />
      <SectionFade />
      <Finale />
    </main>
  );
}

/* Cinematic divider — soft fade between sections */
function SectionFade() {
  return (
    <div aria-hidden className="relative h-px w-full">
      <div className="absolute inset-x-0 -top-12 h-24 bg-gradient-to-b from-transparent via-[color:var(--color-cream)]/30 to-transparent" />
      <div className="mx-auto h-px w-40 bg-gradient-to-r from-transparent via-[color:var(--color-gold)]/40 to-transparent" />
    </div>
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
          <span
            onClick={() => {
              const sft = (confetti as unknown as { shapeFromText?: (o: { text: string; scalar?: number }) => unknown }).shapeFromText;
              const heart = sft ? (sft({ text: "♥", scalar: 2 }) as never) : undefined;
              confetti({
                particleCount: 24,
                spread: 70,
                startVelocity: 28,
                ticks: 120,
                origin: { y: 0.35 },
                colors: ["#f5c6d6", "#c9a7d4", "#d4af6a", "#ffffff"],
                ...(heart ? { shapes: [heart], scalar: 1.6 } : {}),
              } as Parameters<typeof confetti>[0]);
            }}
            className="font-script text-gold-gradient text-6xl sm:text-8xl md:text-9xl cursor-pointer select-none transition-transform hover:scale-[1.03] inline-block"
            title="(a tiny secret — tap me)"
          >
            Urvi
          </span>
        </motion.h1>

        <p className="mt-8 min-h-[3.5rem] text-balance text-base text-[color:var(--color-ink-soft)] sm:text-lg">
          <TypeWriter
            text="Some birthdays deserve more than a message.
            So I made something small,
            just to bring a smile to your day."
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
    icon: Coffee,
    title: "Our conversations",
    text: "What often starts as a simple chat somehow turns into an hour before either of us notices. That's something I genuinely enjoy.",
  },
  {
    icon: Star,
    title: "Your Pleasuant nature",
    text: "You have a way of making people feel comfortable without even trying. Every conversation with you feels natural, easy, and filled with positive energy.",
  },
  {
    icon: Sparkles,
    title: "The way you see life",
    text: "I always enjoy hearing your thoughts, whether it's about family, travel, work, or the little things that matter.",
  },
  {
    icon: Quote,
    title: "Your thoughtfulness",
    text: "You listen with your whole self. You remember small things. That is its own form of love.",
  },
  {
    icon: Heart,
    title: "Your honesty",
    text: "You say what you mean, kindly. It makes every conversation feel safe. How naturally conversations flow with you",
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
    icon: Heart,
    date: "17 May 2026",
    time: "11:30 AM",
    place: "Sarthi Savvy, Hinjawadi, Pune",
    title: "First Conversation",
    text: "Our first time meeting. The beginning of something unexpectedly beautiful.",
  },
  {
    icon: MessageCircle,
    date: "20 May 2026",
    time: null,
    place: "WhatsApp",
    title: "First Chat",
    text: "Our small chat — the beginning of knowing each other.",
  },
  {
    icon: Sparkles,
    date: "20 May 2026",
    time: null,
    place: "Daily Chats",
    title: "Getting Comfortable",
    text: "Conversations slowly became part of everyday life.",
  },
  {
    icon: Phone,
    date: "21 May 2026",
    time: "10:59 PM",
    place: "Over the call",
    title: "Our First Call",
    text: "A small 31-minute conversation that felt quietly special. There was a comfort in that night I didn't expect.",
  },
  {
    icon: Coffee,
    date: "23 May 2026",
    time: "2:00 PM",
    place: "Café Coffee Day, Navi Mumbai",
    title: "Second Meeting",
    text: "Almost two hours together — so many thoughts shared, so many things spoken. Time moved so quietly it didn't feel like two hours at all.",
  },
  {
    icon: Moon,
    date: "28 May 2026",
    time: "12:27 AM",
    place: "Over the call",
    title: "A Late-Night Conversation",
    text: "Almost an hour late at night, talking about everything and nothing. Little conversations like this slowly make the bond feel stronger.",
  },
  {
    icon: Cake,
    date: "28 May 2026",
    time: "Today",
    place: "Your Special Day",
    title: "Birthday Surprise",
    text: "A small effort to make you smile today, on your special day.",
  },
];

function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[color:var(--color-rose)]/25 blur-[120px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[320px] w-[320px] rounded-full bg-[color:var(--color-lavender)]/30 blur-[120px]" />
      </div>

      <SectionHeader
        eyebrow="Our little story"
        title="From the first hello"
        sub="to this quiet, lovely today"
      />

      <div ref={ref} className="relative mx-auto mt-20 max-w-5xl">
        {/* Base line */}
        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[color:var(--color-mauve)]/20 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
        {/* Animated glowing progress line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-5 top-0 w-[2px] bg-gradient-to-b from-[color:var(--color-rose)] via-[color:var(--color-gold)] to-[color:var(--color-mauve)] shadow-[0_0_18px_rgba(212,175,106,0.55)] sm:left-1/2 sm:-translate-x-1/2"
        />

        {JOURNEY.map((item, i) => {
          const Icon = item.icon;
          const leftSide = i % 2 === 0;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`relative mb-14 flex sm:mb-20 ${
                leftSide ? "sm:justify-start" : "sm:justify-end"
              }`}
            >
              {/* Node */}
              <div className="absolute left-5 top-7 -translate-x-1/2 sm:left-1/2">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                  className="relative"
                >
                  <span className="absolute inset-0 -m-3 rounded-full bg-[color:var(--color-gold)]/30 blur-md animate-pulse" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[color:var(--color-cream)] to-white text-[color:var(--color-mauve)] shadow-[0_0_0_4px_rgba(212,175,106,0.18),0_10px_30px_-10px_rgba(58,47,63,0.4)] ring-1 ring-[color:var(--color-gold)]/40">
                    <Icon size={16} />
                  </span>
                </motion.div>
              </div>

              {/* Card */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`glass group relative ml-16 w-full overflow-hidden rounded-2xl p-6 sm:ml-0 sm:w-[44%] sm:p-7 ${
                  leftSide ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"
                }`}
              >
                <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[color:var(--color-rose)]/0 via-[color:var(--color-gold)]/0 to-[color:var(--color-lavender)]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:from-[color:var(--color-rose)]/15 group-hover:via-[color:var(--color-gold)]/15 group-hover:to-[color:var(--color-lavender)]/15" />
                <div
                  className={`relative flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] ${
                    leftSide ? "sm:justify-end" : "sm:justify-start"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5 text-[color:var(--color-mauve)]">
                    <Calendar size={12} /> {item.date}
                  </span>
                  {item.time && (
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={12} /> {item.time}
                    </span>
                  )}
                </div>

                <h3 className="relative mt-3 font-serif text-2xl font-medium leading-snug text-[color:var(--color-ink)] sm:text-[26px]">
                  {item.title}
                </h3>

                <p
                  className={`relative mt-2 inline-flex items-start gap-1.5 text-[12.5px] text-[color:var(--color-ink-soft)]/85 ${
                    leftSide ? "sm:justify-end" : ""
                  }`}
                >
                  <MapPin size={12} className="mt-[3px] shrink-0 text-[color:var(--color-gold)]" />
                  <span className="italic">{item.place}</span>
                </p>

                <p className="relative mt-4 text-[15px] leading-relaxed text-[color:var(--color-ink-soft)]">
                  {item.text}
                </p>
              </motion.div>
            </motion.div>
          );
        })}
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
          For Urvi
        </div>

        <p className="font-script text-3xl text-[color:var(--color-mauve)] sm:text-4xl">
          Dear Urvi,
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
          With warm wishes,
          Raj ✨
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

      {/* Emotional fade-out closing */}
      <FinalWhisper />
    </section>
  );
}

function FinalWhisper() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const veil = useTransform(scrollYProgress, [0.4, 1], [0, 0.55]);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ opacity: veil }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="h-full w-full bg-gradient-to-b from-transparent via-[color:var(--color-cream)]/40 to-[color:var(--color-cream)]" />
      </motion.div>
      <motion.div
        ref={ref}
        style={{ opacity, y }}
        className="pointer-events-none absolute inset-x-0 bottom-10 z-10 mx-auto max-w-xl px-6 text-center"
      >
        <p className="font-script text-xl text-[color:var(--color-mauve)] sm:text-2xl">
          — fin.
        </p>
        <p className="mt-2 text-[11px] uppercase tracking-[0.35em] text-[color:var(--color-ink-soft)]/70">
          made quietly, for urvi
        </p>
      </motion.div>
    </>
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
