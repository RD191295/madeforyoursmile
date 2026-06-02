import { motion } from "framer-motion";
import { MapPin, Calendar, Heart, Music, Coffee, Plane, Camera, Utensils, BookOpen, Film } from "lucide-react";

const BUCKET_ITEMS = [
  {
    icon: Coffee,
    title: "Café hop together",
    place: "Somewhere cozy",
    note: "Find a corner café, talk for hours, and forget the time.",
    tag: "soon",
  },
  {
    icon: Film,
    title: "Movie night",
    place: "Your place or mine",
    note: "Pick something light, share a blanket, and laugh out loud.",
    tag: "anytime",
  },
  {
    icon: Plane,
    title: "A small trip",
    place: "Hill station or beach",
    note: "Just a weekend away — new views, new memories.",
    tag: "one day",
  },
  {
    icon: Utensils,
    title: "Try a new cuisine",
    place: "Local spot we haven’t been",
    note: "Order too much, share everything, and rate it honestly.",
    tag: "soon",
  },
  {
    icon: Music,
    title: "Concert or live music",
    place: "Somewhere with good energy",
    note: "Feel the music together and make it ours.",
    tag: "one day",
  },
  {
    icon: Camera,
    title: "Photo walk",
    place: "Old streets or gardens",
    note: "Capture little moments and each other candidly.",
    tag: "anytime",
  },
  {
    icon: BookOpen,
    title: "Bookstore date",
    place: "Quiet indie bookstore",
    note: "Pick books for each other and read the first chapter aloud.",
    tag: "soon",
  },
  {
    icon: Heart,
    title: "Sunrise or sunset",
    place: "A quiet spot with a view",
    note: "Sit in silence or talk — either way, just be there.",
    tag: "anytime",
  },
];

export function BucketList() {
  return (
    <section className="relative px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-[color:var(--color-lavender)]/25 blur-[100px]" />
        <div className="absolute left-1/4 bottom-1/4 h-[280px] w-[280px] rounded-full bg-[color:var(--color-rose)]/20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-[11px] font-medium uppercase tracking-[0.3em] text-[color:var(--color-mauve)]"
        >
          Looking ahead
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 font-serif text-4xl font-light leading-tight text-balance sm:text-5xl"
        >
          Things I want us to do
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 font-script text-2xl text-[color:var(--color-gold)] sm:text-3xl"
        >
          little dreams, shared
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {BUCKET_ITEMS.map((item, i) => (
          <TicketCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function TicketCard({
  item,
  index,
}: {
  item: (typeof BUCKET_ITEMS)[number];
  index: number;
}) {
  const Icon = item.icon;

  const tagColor =
    item.tag === "soon"
      ? "bg-[color:var(--color-rose)]/20 text-[color:var(--color-ink-soft)]"
      : item.tag === "one day"
        ? "bg-[color:var(--color-lavender)]/30 text-[color:var(--color-ink-soft)]"
        : "bg-[color:var(--color-gold)]/15 text-[color:var(--color-ink-soft)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.06 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      {/* Ticket body */}
      <div className="relative overflow-hidden rounded-2xl glass p-6 sm:p-7">
        {/* Subtle ticket notch decoration */}
        <div className="absolute -left-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-[color:var(--color-border)] bg-[#fdf8f3]" />
        <div className="absolute -right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-[color:var(--color-border)] bg-[#fdf8f3]" />

        {/* Dashed perforation line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] border-l border-dashed border-[color:var(--color-mauve)]/20" />

        <div className="relative pl-3">
          {/* Top row: icon + tag */}
          <div className="flex items-start justify-between">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-[color:var(--color-mauve)] shadow-sm">
              <Icon size={18} />
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-wider ${tagColor}`}
            >
              {item.tag}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-medium text-[color:var(--color-ink)] sm:text-[22px]">
            {item.title}
          </h3>

          {/* Place */}
          <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] text-[color:var(--color-ink-soft)]/80">
            <MapPin size={11} className="text-[color:var(--color-gold)]" />
            <span className="italic">{item.place}</span>
          </p>

          {/* Note */}
          <p className="mt-3 text-[13.5px] leading-relaxed text-[color:var(--color-ink-soft)]">
            {item.note}
          </p>

          {/* Bottom decorative barcode-like line */}
          <div className="mt-5 flex items-center gap-0.5">
            {Array.from({ length: 24 }).map((_, j) => (
              <div
                key={j}
                className="h-3 w-[2px] rounded-full bg-[color:var(--color-mauve)]/10"
                style={{ opacity: j % 3 === 0 ? 0.5 : 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
