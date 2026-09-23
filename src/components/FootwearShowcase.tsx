import { useEffect, useRef, useState } from "react";

const shoes = [
  {
    id: "scrolls",
    category: "SLIDES",
    name: "Scoll Slippers",
    tagline: "Born to Lounge, Made to Slay",
    description: "The effortless kind of beautiful — slipping in and out of these feels like stepping into a soft dream.",
    image: new URL("../assets/shoes/scoll2.jpeg", import.meta.url).href,
    accent: "#c9a96e",
    glow: "rgba(201,169,110,0.3)",
    emoji: "🩴",
  },
  {
    id: "mojdi",
    category: "TRADITIONAL",
    name: "Mojdi",
    tagline: "Rooted in Grace, Blooming in Style",
    description: "Where heritage meets her heart — every stitch is a story, every step a celebration.",
    image: new URL("../assets/shoes/mojdi.jpeg", import.meta.url).href,
    accent: "#e07b8a",
    glow: "rgba(224,123,138,0.3)",
    emoji: "✨",
  },
  {
    id: "heels1",
    category: "HEELS",
    name: "Statement Heels",
    tagline: "Elevate Everything",
    description: "Because some days you don't just walk into a room — you arrive.",
    image: new URL("../assets/shoes/heels1.png", import.meta.url).href,
    accent: "#b39ddb",
    glow: "rgba(179,157,219,0.3)",
    emoji: "👠",
  },
  {
    id: "heels2",
    category: "HEELS",
    name: "Classic Heels",
    tagline: "Timeless. Unstoppable. Hers.",
    description: "The kind of heels that make her taller in every way that matters.",
    image: new URL("../assets/shoes/heels2.png", import.meta.url).href,
    accent: "#f48fb1",
    glow: "rgba(244,143,177,0.3)",
    emoji: "💕",
  },
];

export default function FootwearShowcase() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shoe = shoes[active];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const goTo = (idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setImgLoaded(false);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 420);
  };

  return (
    <section
      id="shoes"
      ref={containerRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem 4rem",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#07070a",
        color: "#ffffff",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Ambient glow blob */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: shoe.glow,
          filter: "blur(120px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "background 0.8s ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3rem", position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.35em",
          color: shoe.accent,
          marginBottom: "0.75rem",
          transition: "color 0.6s ease",
          textTransform: "uppercase",
        }}>
          FOOTWEAR COLLECTION ✦ HER FAVOURITES
        </p>
        <h2 style={{
          fontFamily: "Instrument Serif, serif",
          fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
          fontWeight: 400,
          color: shoe.accent,
          lineHeight: 1.1,
          margin: 0,
          fontStyle: "italic",
          transition: "color 0.6s ease",
        }}>
          Footwear {shoe.emoji}
        </h2>
      </div>

      {/* Main showcase */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "3rem",
        maxWidth: "1000px",
        width: "100%",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
      }}
      className="footwear-grid"
      >
        {/* Image card */}
        <div style={{
          position: "relative",
          borderRadius: "28px",
          overflow: "hidden",
          aspectRatio: "4/5",
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${shoe.accent}40`,
          boxShadow: `0 0 60px ${shoe.glow}, 0 0 0 1px ${shoe.accent}20`,
          transition: "border-color 0.6s ease, box-shadow 0.6s ease",
        }}>
          {/* Category badge */}
          <div style={{
            position: "absolute",
            top: "1.2rem",
            left: "1.2rem",
            zIndex: 3,
            background: `${shoe.accent}22`,
            border: `1px solid ${shoe.accent}55`,
            backdropFilter: "blur(12px)",
            borderRadius: "100px",
            padding: "0.35rem 0.9rem",
            fontFamily: "DM Mono, monospace",
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            color: shoe.accent,
            transition: "all 0.5s ease",
          }}>
            {shoe.category}
          </div>

          <img
            key={shoe.id}
            src={shoe.image}
            alt={shoe.name}
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: animating || !imgLoaded ? 0 : 1,
              transform: animating ? "scale(1.04)" : "scale(1)",
              transition: "opacity 0.42s ease, transform 0.42s ease",
            }}
          />

          {/* Overlay gradient */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,4,20,0.6) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Text panel */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1.5rem",
        }}>
          <div style={{
            opacity: animating ? 0 : 1,
            transform: animating ? "translateY(12px)" : "translateY(0)",
            transition: "opacity 0.42s ease, transform 0.42s ease",
          }}>
            <p style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.3em",
              color: shoe.accent,
              marginBottom: "0.6rem",
              textTransform: "uppercase",
              transition: "color 0.6s ease",
            }}>
              {shoe.category} · {String(active + 1).padStart(2, "0")} / {String(shoes.length).padStart(2, "0")}
            </p>

            <h3 style={{
              fontFamily: "Instrument Serif, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "#fff",
              margin: "0 0 0.4rem",
              lineHeight: 1.1,
            }}>
              {shoe.name}
            </h3>

            <p style={{
              fontFamily: "Instrument Serif, serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: shoe.accent,
              margin: "0 0 1.2rem",
              transition: "color 0.6s ease",
            }}>
              "{shoe.tagline}"
            </p>

            <p style={{
              fontFamily: "DM Mono, monospace",
              fontSize: "0.8rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
            }}>
              {shoe.description}
            </p>
          </div>

          {/* Dot nav */}
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginTop: "0.5rem" }}>
            {shoes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                style={{
                  width: i === active ? "2.2rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "100px",
                  background: i === active ? shoe.accent : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.4s ease",
                  outline: "none",
                }}
              />
            ))}
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
            {shoes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                style={{
                  width: "64px",
                  height: "80px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `2px solid ${i === active ? shoe.accent : "transparent"}`,
                  opacity: i === active ? 1 : 0.45,
                  cursor: "pointer",
                  padding: 0,
                  background: "rgba(255,255,255,0.05)",
                  transition: "all 0.35s ease",
                  transform: i === active ? "scale(1.08)" : "scale(1)",
                  flexShrink: 0,
                  outline: "none",
                }}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </button>
            ))}
          </div>

          {/* Prev / Next */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
            {[
              { label: "←", dir: -1 },
              { label: "→", dir: 1 },
            ].map(({ label, dir }) => (
              <button
                key={label}
                onClick={() => goTo((active + dir + shoes.length) % shoes.length)}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  border: `1px solid ${shoe.accent}55`,
                  background: `${shoe.accent}14`,
                  color: shoe.accent,
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  outline: "none",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${shoe.accent}33`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = `${shoe.accent}14`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 680px) {
          .footwear-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
