import { useState } from "react";

const nail1 = new URL("../assets/nails/nail1.jpg", import.meta.url).href;
const nail2 = new URL("../assets/nails/nail2.jpg", import.meta.url).href;
const nail3 = new URL("../assets/nails/nail3.jpg", import.meta.url).href;
const nail4 = new URL("../assets/nails/nail4.jpg", import.meta.url).href;

interface NailPhoto {
  id: string;
  img: string;
  title: string;
  subtitle: string;
}

const nailPhotos: NailPhoto[] = [
  {
    id: "photo-1",
    img: nail1,
    title: "Natural Minimal",
    subtitle: "Clean & Simple",
  },
  {
    id: "photo-2",
    img: nail2,
    title: "Subtle Elegance",
    subtitle: "Soft Glaze",
  },
  {
    id: "photo-3",
    img: nail3,
    title: "Delicate Gloss",
    subtitle: "Timeless Tone",
  },
  {
    id: "photo-4",
    img: nail4,
    title: "Minimal Detail",
    subtitle: "Pure & Refined",
  },
];

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
}

export default function NailShowcase() {
  const [activePhoto, setActivePhoto] = useState<NailPhoto | null>(null);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  const handleSparkle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparkles = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
    }));

    setSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.includes(s)));
    }, 1000);
  };

  return (
    <section
      id="nail-paint"
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
      {/* Background Lighting */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "450px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244, 114, 182, 0.1) 0%, rgba(168, 85, 247, 0.04) 50%, rgba(0,0,0,0) 80%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1240px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <header
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 14px",
              borderRadius: "100px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#d4a8c7",
              marginBottom: "0.75rem",
              fontWeight: 600,
            }}
          >
            <span>💅 NAIL GALLERY</span>
          </div>

          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              margin: 0,
              color: "#ffffff",
            }}
          >
            Simple & Aesthetic ✨
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#a1a1aa",
              marginTop: "0.6rem",
              fontWeight: 300,
            }}
          >
            Clean, minimal, and timelessly beautiful nail designs.
          </p>
        </header>

        {/* Bento Grid Displaying All 4 Exact Photos from nails/ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.75rem",
          }}
        >
          {nailPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={(e) => {
                handleSparkle(e);
                setActivePhoto(photo);
              }}
              style={{
                position: "relative",
                backgroundColor: "rgba(18, 18, 24, 0.75)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "1rem",
                backdropFilter: "blur(16px)",
                cursor: "pointer",
                transition: "transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(244, 114, 182, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              {/* Photo Container - UNCROPPED */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  borderRadius: "14px",
                  overflow: "hidden",
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "6px",
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
                    display: "block",
                    borderRadius: "10px",
                  }}
                />
              </div>

              {/* Photo Caption */}
              <div
                style={{
                  marginTop: "0.85rem",
                  textAlign: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.2rem",
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    color: "#ffffff",
                  }}
                >
                  {photo.title}
                </h3>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: "0.78rem",
                    color: "#a1a1aa",
                  }}
                >
                  {photo.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Sparkles Emitter */}
        {sparkles.map((s) => (
          <span
            key={s.id}
            style={{
              position: "fixed",
              left: `${s.x}px`,
              top: `${s.y}px`,
              fontSize: "1rem",
              pointerEvents: "none",
              zIndex: 999,
              animation: "floatSparkle 1s ease-out forwards",
            }}
          >
            ✨
          </span>
        ))}
      </div>

      {/* Lightbox Preview Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
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
              onClick={() => setActivePhoto(null)}
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
              src={activePhoto.img}
              alt={activePhoto.title}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                objectFit: "contain",
                borderRadius: "14px",
              }}
            />

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <h4
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "1.6rem",
                  margin: 0,
                  fontWeight: 400,
                  color: "#fff",
                }}
              >
                {activePhoto.title}
              </h4>
              <p style={{ color: "#a1a1aa", fontSize: "0.85rem", margin: "2px 0 0" }}>
                {activePhoto.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes floatSparkle {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.7);
          }
          100% {
            opacity: 0;
            transform: translateY(-50px) scale(1.4);
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
