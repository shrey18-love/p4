import { useEffect, useRef, useState } from "react";

const hair1 = new URL("../assets/hairs/hair1.jpg", import.meta.url).href;
const hair2 = new URL("../assets/hairs/hair2.jpg", import.meta.url).href;
const hair3 = new URL("../assets/hairs/hair3.jpg", import.meta.url).href;
const hair4 = new URL("../assets/hairs/hair4.jpg", import.meta.url).href;

interface HairPhoto {
  id: string;
  img: string;
  title: string;
  tagline: string;
  quote: string;
  isFavorite?: boolean;
  rotation: string;
}

const hairPhotos: HairPhoto[] = [
  {
    id: "fav-length",
    img: hair2,
    title: "My Favorite Length 👑",
    tagline: "MY ALL-TIME FAVORITE",
    quote: "This exact length and soft flow has my whole heart.",
    isFavorite: true,
    rotation: "-3deg",
  },
  {
    id: "natural-vibes",
    img: hair1,
    title: "Soft & Natural",
    tagline: "EFFORTLESS BEAUTY",
    quote: "Pure elegance, just naturally you.",
    rotation: "4deg",
  },
  {
    id: "radiant-look",
    img: hair3,
    title: "Sunlit Glow",
    tagline: "GOLDEN HOUR",
    quote: "Glowing in every strand of light.",
    rotation: "-2deg",
  },
  {
    id: "stunning-everyday",
    img: hair4,
    title: "Always Iconic",
    tagline: "EVERYDAY VIBE",
    quote: "Stunning in every single style.",
    rotation: "3deg",
  },
];

interface HeartParticle {
  id: number;
  x: number;
  y: number;
}

export default function HairShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedPhoto = hairPhotos[selectedIdx];

  // Mouse tilt effect for hero image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 12, y: -y * 12 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Trigger floating heart particles
  const spawnHearts = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newHearts: HeartParticle[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 40,
    }));
    setHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.includes(h)));
    }, 1200);
  };

  return (
    <section
      id="hairstyle"
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#07070a",
        color: "#f3f3f6",
        padding: "8rem 2rem 5rem",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "20%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: selectedPhoto.isFavorite
            ? "radial-gradient(circle, rgba(244,114,182,0.15) 0%, rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
          transition: "all 0.8s ease",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Minimal Header */}
        <header
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 14px",
              borderRadius: "100px",
              border: "1px solid rgba(244, 114, 182, 0.3)",
              backgroundColor: "rgba(244, 114, 182, 0.08)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#f472b6",
              marginBottom: "0.75rem",
              fontWeight: 600,
            }}
          >
            <span>💖 HER HAIR</span>
          </div>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.02em",
              color: "#ffffff",
            }}
          >
            The Way You Wear Your Hair ✨
          </h2>
        </header>

        {/* Exhibition Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Hero Featured Photo */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: "relative",
              perspective: "1000px",
            }}
          >
            <div
              style={{
                transform: `rotateY(${mousePos.x}deg) rotateX(${mousePos.y}deg)`,
                transition: mousePos.x === 0 ? "transform 0.6s ease" : "transform 0.1s ease-out",
                transformStyle: "preserve-3d",
                backgroundColor: "rgba(18, 18, 24, 0.75)",
                border: selectedPhoto.isFavorite
                  ? "1px solid rgba(244, 114, 182, 0.4)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "1rem",
                backdropFilter: "blur(20px)",
                boxShadow: selectedPhoto.isFavorite
                  ? "0 20px 45px -10px rgba(244, 114, 182, 0.2)"
                  : "0 20px 45px -10px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Badge Overlay */}
              {selectedPhoto.isFavorite && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    right: "20px",
                    zIndex: 10,
                    backgroundColor: "#f472b6",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: "0.68rem",
                    letterSpacing: "0.12em",
                    padding: "5px 12px",
                    borderRadius: "100px",
                    boxShadow: "0 6px 16px rgba(244, 114, 182, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <span>👑</span> MY FAVORITE
                </div>
              )}

              {/* Photo Frame */}
              <div
                onClick={() => setLightboxOpen(true)}
                style={{
                  position: "relative",
                  width: "100%",
                  maxHeight: "70vh",
                  borderRadius: "14px",
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
                }}
              >
                <img
                  src={selectedPhoto.img}
                  alt={selectedPhoto.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "65vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                    display: "block",
                    borderRadius: "10px",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              {/* Minimal Caption */}
              <div style={{ marginTop: "1rem", padding: "0 0.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.12em",
                        color: selectedPhoto.isFavorite ? "#f472b6" : "#a1a1aa",
                        fontWeight: 600,
                        textTransform: "uppercase",
                      }}
                    >
                      {selectedPhoto.tagline}
                    </span>
                    <h3
                      style={{
                        margin: "2px 0 0",
                        fontSize: "1.4rem",
                        fontFamily: "'Instrument Serif', serif",
                        fontWeight: 400,
                      }}
                    >
                      {selectedPhoto.title}
                    </h3>
                  </div>

                  {/* Heart button */}
                  <button
                    onClick={spawnHearts}
                    title="Send Love"
                    style={{
                      position: "relative",
                      background: selectedPhoto.isFavorite
                        ? "rgba(244, 114, 182, 0.15)"
                        : "rgba(255, 255, 255, 0.08)",
                      border: selectedPhoto.isFavorite
                        ? "1px solid rgba(244, 114, 182, 0.4)"
                        : "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                    }}
                  >
                    ❤️
                    {hearts.map((h) => (
                      <span
                        key={h.id}
                        style={{
                          position: "absolute",
                          left: `calc(50% + ${h.x}px)`,
                          top: `calc(50% + ${h.y}px)`,
                          fontSize: "1rem",
                          pointerEvents: "none",
                          animation: "floatHeart 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards",
                        }}
                      >
                        💖
                      </span>
                    ))}
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.4,
                    color: "#d1d1d6",
                    margin: "0.5rem 0 0",
                    fontStyle: "italic",
                  }}
                >
                  "{selectedPhoto.quote}"
                </p>
              </div>
            </div>
          </div>

          {/* Polaroid Cards Grid */}
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
              }}
            >
              {hairPhotos.map((photo, idx) => {
                const isSelected = idx === selectedIdx;
                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedIdx(idx)}
                    style={{
                      position: "relative",
                      transform: `rotate(${photo.rotation}) ${isSelected ? "scale(1.02)" : "scale(1)"}`,
                      transition: "transform 0.3s ease, border-color 0.3s ease",
                      cursor: "pointer",
                      backgroundColor: "#181820",
                      padding: "8px 8px 12px 8px",
                      borderRadius: "10px",
                      border: photo.isFavorite
                        ? isSelected
                          ? "2px solid #f472b6"
                          : "1.5px solid rgba(244, 114, 182, 0.5)"
                        : isSelected
                        ? "2px solid #a855f7"
                        : "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: isSelected
                        ? "0 8px 24px rgba(0,0,0,0.5)"
                        : "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                  >
                    {/* Washi Tape */}
                    <div
                      style={{
                        position: "absolute",
                        top: "-6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "36px",
                        height: "10px",
                        backgroundColor: photo.isFavorite ? "rgba(244, 114, 182, 0.4)" : "rgba(255, 255, 255, 0.2)",
                        borderRadius: "2px",
                        zIndex: 3,
                      }}
                    />

                    {/* Image */}
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "3/4",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "#0b0b10",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={photo.img}
                        alt={photo.title}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          width: "auto",
                          height: "auto",
                          objectFit: "contain",
                          filter: isSelected ? "brightness(1.05)" : "brightness(0.85)",
                        }}
                      />
                    </div>

                    {/* Title */}
                    <div style={{ marginTop: "6px", textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: photo.isFavorite ? "#f472b6" : isSelected ? "#fff" : "#a1a1aa",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {photo.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(5, 5, 8, 0.92)",
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "600px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <img
              src={selectedPhoto.img}
              alt={selectedPhoto.title}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "14px",
              }}
            />
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes floatHeart {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.6);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-40px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) scale(1.5);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
