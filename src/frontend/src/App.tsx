import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const PHOTO_SRC =
  "/assets/whatsapp_image_2026-03-30_at_2.12.47_pm-019d3dea-01d7-721b-b172-fc20ac5bdfaf.jpeg";

const HEARTS = ["🍂", "💖", "🌹", "💗", "🍁", "💝", "🌸", "🤎", "💌", "🍂"];

interface FloatingHeart {
  id: number;
  left: string;
  delay: string;
  duration: string;
  emoji: string;
  size: string;
}

function generateHearts(): FloatingHeart[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${4 + i * 8}%`,
    delay: `${(i * 0.8).toFixed(1)}s`,
    duration: `${5 + (i % 4)}s`,
    emoji: HEARTS[i % HEARTS.length],
    size: i % 3 === 0 ? "1.9rem" : i % 3 === 1 ? "1.3rem" : "1.1rem",
  }));
}

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [noPosition, setNoPosition] = useState<{
    top: string;
    left: string;
  } | null>(null);
  const [hearts] = useState<FloatingHeart[]>(generateHearts);

  const moveNoButton = useCallback(() => {
    if (noAttempts >= 3) return;
    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);
    if (newAttempts < 3) {
      const top = `${10 + Math.random() * 75}%`;
      const left = `${5 + Math.random() * 80}%`;
      setNoPosition({ top, left });
    }
  }, [noAttempts]);

  useEffect(() => {
    if (noAttempts === 0) {
      setNoPosition(null);
    }
  }, [noAttempts]);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-12"
      style={{
        background:
          "linear-gradient(135deg, #F5ECD7 0%, #EDD9BC 50%, #E6CFA8 100%)",
      }}
    >
      {/* Floating hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart select-none"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* Background decorative blobs */}
      <div
        className="pointer-events-none fixed top-[-80px] left-[-80px] w-80 h-80 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #D4A96A 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed bottom-[-60px] right-[-60px] w-96 h-96 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #C89060 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none fixed top-[40%] right-[-100px] w-64 h-64 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #A0603A 0%, transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="invitation"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.94 }}
            transition={{ duration: 0.7, ease: [0.34, 1.1, 0.64, 1] }}
            className="relative z-10 w-full max-w-[620px] rounded-3xl px-10 py-16 text-center"
            style={{
              background: "rgba(255, 248, 235, 0.93)",
              boxShadow:
                "0 8px 56px 0 rgba(107, 58, 42, 0.18), 0 2px 16px 0 rgba(160, 96, 58, 0.12)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(200, 144, 96, 0.25)",
            }}
          >
            {/* Corner decorations */}
            <span
              className="absolute top-4 left-5 text-3xl select-none"
              style={{ opacity: 0.8 }}
            >
              🌹
            </span>
            <span
              className="absolute top-4 right-5 text-3xl select-none"
              style={{ opacity: 0.8 }}
            >
              🍂
            </span>
            <span
              className="absolute bottom-4 left-5 text-2xl select-none"
              style={{ opacity: 0.7 }}
            >
              🌻
            </span>
            <span
              className="absolute bottom-4 right-5 text-2xl select-none"
              style={{ opacity: 0.7 }}
            >
              🍁
            </span>
            <span
              className="absolute top-[45%] left-3 text-xl select-none"
              style={{ opacity: 0.45 }}
            >
              🌿
            </span>
            <span
              className="absolute top-[45%] right-3 text-xl select-none"
              style={{ opacity: 0.45 }}
            >
              🌿
            </span>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-script text-5xl mb-2"
              style={{ color: "#A0603A", fontFamily: "Parisienne, cursive" }}
            >
              Hi Mahi,
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="text-sm italic mb-4 mx-auto max-w-[340px]"
              style={{
                color: "#8B6240",
                fontWeight: 300,
                letterSpacing: "0.01em",
              }}
            >
              "You are my sunshine on a cloudy day..."
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.55 }}
              className="mx-auto mb-6 h-px w-36"
              style={{
                background:
                  "linear-gradient(to right, transparent, #C89060, transparent)",
              }}
            />

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.58, duration: 0.6 }}
              className="font-display font-semibold leading-tight mb-7"
              style={{
                fontSize: "clamp(2rem, 5.5vw, 2.8rem)",
                color: "#5C2E0A",
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "-0.01em",
              }}
            >
              Will you go on a date
              <br />
              with me?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="text-base leading-relaxed mb-4 mx-auto max-w-[440px]"
              style={{ color: "#3D2B1A", fontWeight: 300 }}
            >
              You are the most charming and beautiful girl I have met, and since
              you walked into my life it has become more beautiful… Every moment
              feels like a dream, and I would love nothing more than to share a
              special evening with you. 🌸
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.88, duration: 0.6 }}
              className="text-base leading-relaxed mb-8 mx-auto max-w-[440px]"
              style={{ color: "#3D2B1A", fontWeight: 300 }}
            >
              I think about all the little things — the way you smile, the way
              you make everything feel lighter. I'd love to take you somewhere
              special, just the two of us, to make a memory we'll always
              cherish. 🌹
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="text-lg mb-7 tracking-widest select-none"
              style={{ color: "#C89060" }}
            >
              ✦ ✦ ✦
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="flex items-center justify-center gap-5 flex-wrap"
            >
              <button
                type="button"
                data-ocid="date.primary_button"
                onClick={() => setAccepted(true)}
                className="px-10 py-3.5 rounded-full font-semibold text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #A0603A, #8B4C3C)",
                  boxShadow: "0 4px 24px rgba(139, 76, 60, 0.45)",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.02em",
                }}
              >
                Yes! ♥
              </button>

              {noAttempts < 3 ? (
                <button
                  type="button"
                  data-ocid="date.secondary_button"
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  className="px-8 py-3.5 rounded-full font-medium text-lg transition-all duration-200"
                  style={{
                    background: "rgba(230, 207, 168, 0.8)",
                    color: "#7A5234",
                    border: "1.5px solid rgba(200, 160, 110, 0.5)",
                    cursor: "pointer",
                    position: noPosition ? "fixed" : "relative",
                    top: noPosition?.top,
                    left: noPosition?.left,
                    zIndex: 50,
                    transform: noPosition ? "translate(-50%, -50%)" : undefined,
                  }}
                >
                  No
                </button>
              ) : (
                <motion.span
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.3 }}
                  transition={{ delay: 0.3, duration: 1.2, ease: "easeInOut" }}
                  className="text-sm"
                  style={{ color: "#A0603A" }}
                >
                  Are you sure? 🥺
                </motion.span>
              )}
            </motion.div>
          </motion.div>
        ) : (
          /* ── CELEBRATION SCREEN ── */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative z-10 flex flex-col items-center"
            style={{ maxWidth: 420, width: "100%" }}
          >
            {/* Floating hearts above */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-4xl mb-3 tracking-widest select-none"
            >
              🌹 <span className="heart-beat">💖</span> 🌹
            </motion.div>

            {/* "Yay!!" heading */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                color: "#A0603A",
                fontFamily: "Parisienne, cursive",
                fontSize: "3rem",
                lineHeight: 1.1,
              }}
              className="mb-4"
            >
              Yay!!
            </motion.p>

            {/* Photo card — portrait, aesthetic */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.45,
                duration: 0.8,
                ease: [0.34, 1.1, 0.64, 1],
              }}
              className="relative w-full rounded-3xl overflow-hidden"
              style={{
                aspectRatio: "3/4",
                boxShadow:
                  "0 16px 60px rgba(92, 46, 10, 0.35), 0 4px 20px rgba(160, 96, 58, 0.2)",
                border: "3px solid rgba(200, 144, 96, 0.5)",
              }}
            >
              {/* Photo */}
              <img
                src={PHOTO_SRC}
                alt="Us"
                className="w-full h-full"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />

              {/* Warm gradient overlay — bottom heavy for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(92,46,10,0.08) 0%, rgba(92,46,10,0.10) 50%, rgba(60,20,5,0.72) 100%)",
                }}
              />

              {/* Overlay text */}
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-8 text-center">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  style={{
                    fontFamily: "Parisienne, cursive",
                    fontSize: "2.4rem",
                    color: "#FFE8CC",
                    textShadow: "0 2px 12px rgba(0,0,0,0.55)",
                    lineHeight: 1.2,
                  }}
                >
                  love you babyyy
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  style={{
                    color: "rgba(255,232,200,0.85)",
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                    marginTop: "0.4rem",
                  }}
                >
                  you make me the happiest person
                </motion.p>
              </div>
            </motion.div>

            {/* Bottom message */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="mt-5 text-center text-base leading-relaxed max-w-[360px]"
              style={{ color: "#5C2E0A", fontWeight: 300 }}
            >
              Since this is our first official date, I'm really glad it's with
              you. I'll make it as special as you are.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.85, duration: 0.6 }}
              className="mt-3 text-center text-base leading-relaxed max-w-[360px]"
              style={{ color: "#5C2E0A", fontWeight: 300 }}
            >
              Okii baby girl, see you soon Love... 🌹
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
