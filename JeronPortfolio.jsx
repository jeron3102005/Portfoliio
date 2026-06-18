import { useState, useEffect, useRef } from "react";

const skills = {
  technical: [
    { name: "C Programming", level: 70 },
    { name: "C++", level: 65 },
    { name: "Java", level: 60 },
    { name: "Frontend Dev", level: 72 },
    { name: "Software Testing", level: 55 },
    { name: "MS Office", level: 80 },
  ],
  personal: ["Quick Learner", "Time Management", "Teamwork", "Hardworking", "Communication"],
};

const timeline = [
  {
    year: "2023",
    title: "Higher Secondary",
    org: "Govt. Hr. Sec. School, Kambiliyampatti",
    type: "edu",
  },
  {
    year: "2023–2026",
    title: "B.Sc Computer Science",
    org: "Sacred Heart College of Arts & Science, Dindigul",
    type: "edu",
  },
  {
    year: "2025",
    title: "Frontend Development Intern",
    org: "QYRA Tech",
    type: "work",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function SkillBar({ name, level, delay }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "18px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#e2e8f0", letterSpacing: "0.04em" }}>{name}</span>
        <span style={{ fontSize: "0.75rem", color: "#64ffda", fontFamily: "monospace" }}>{level}%</span>
      </div>
      <div style={{ height: "4px", background: "#1e293b", borderRadius: "2px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: visible ? `${level}%` : "0%",
            background: "linear-gradient(90deg, #64ffda, #7c3aed)",
            borderRadius: "2px",
            transition: `width 1s ease ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        gap: "24px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
        marginBottom: "32px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "40px" }}>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: item.type === "work" ? "#64ffda" : "#7c3aed",
            border: "2px solid",
            borderColor: item.type === "work" ? "#64ffda" : "#7c3aed",
            boxShadow: item.type === "work" ? "0 0 12px #64ffda88" : "0 0 12px #7c3aed88",
            flexShrink: 0,
            marginTop: "4px",
          }}
        />
        {index < timeline.length - 1 && (
          <div style={{ flex: 1, width: "1px", background: "#1e293b", marginTop: "8px" }} />
        )}
      </div>
      <div style={{ paddingBottom: "8px" }}>
        <span
          style={{
            fontSize: "0.7rem",
            fontFamily: "monospace",
            color: item.type === "work" ? "#64ffda" : "#a78bfa",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {item.year}
        </span>
        <h3 style={{ margin: "4px 0 2px", fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>
          {item.title}
        </h3>
        <p style={{ margin: 0, fontSize: "0.82rem", color: "#94a3b8" }}>{item.org}</p>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    const sections = ["home", "about", "skills", "experience", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.5 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const navItems = ["home", "about", "skills", "experience", "contact"];

  return (
    <div
      style={{
        background: "#020c1b",
        color: "#ccd6f6",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* Cursor glow */}
      <div
        style={{
          position: "fixed",
          left: cursorPos.x - 200,
          top: cursorPos.y - 200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(100,255,218,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
          transition: "left 0.1s, top 0.1s",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 100,
          backdropFilter: "blur(12px)",
          background: "rgba(2,12,27,0.85)",
          borderBottom: "1px solid rgba(100,255,218,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "1.1rem",
              color: "#64ffda",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            jeron.dev
          </span>
          {/* Desktop nav */}
          <div style={{ display: "flex", gap: "32px" }} className="desktop-nav">
            {navItems.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontFamily: "monospace",
                  letterSpacing: "0.08em",
                  textTransform: "lowercase",
                  color: activeSection === id ? "#64ffda" : "#8892b0",
                  borderBottom: activeSection === id ? "1px solid #64ffda" : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s",
                }}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px 24px 60px",
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "monospace",
            color: "#64ffda",
            fontSize: "0.9rem",
            marginBottom: "16px",
            letterSpacing: "0.1em",
          }}
        >
          hello, world — I'm
        </p>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 800,
            margin: "0 0 8px",
            color: "#ccd6f6",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Jeron J
        </h1>
        <h2
          style={{
            fontSize: "clamp(1.2rem, 4vw, 2.2rem)",
            fontWeight: 600,
            margin: "0 0 24px",
            color: "#8892b0",
          }}
        >
          Frontend Developer & CS Graduate
        </h2>
        <p
          style={{
            maxWidth: "520px",
            lineHeight: 1.75,
            color: "#8892b0",
            fontSize: "0.97rem",
            marginBottom: "40px",
          }}
        >
          A fresher with a passion for building web experiences and a hunger to
          grow. Based in Dindigul, ready to bring energy and curiosity to your team.
        </p>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              background: "transparent",
              border: "1px solid #64ffda",
              color: "#64ffda",
              padding: "14px 28px",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(100,255,218,0.08)")}
            onMouseLeave={(e) => (e.target.style.background = "transparent")}
          >
            get in touch →
          </button>
          <button
            onClick={() => scrollTo("experience")}
            style={{
              background: "transparent",
              border: "1px solid #1e293b",
              color: "#8892b0",
              padding: "14px 28px",
              borderRadius: "4px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "0.85rem",
              letterSpacing: "0.08em",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#64ffda";
              e.target.style.color = "#64ffda";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#1e293b";
              e.target.style.color = "#8892b0";
            }}
          >
            view journey
          </button>
        </div>

        {/* Floating badge */}
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "40%",
            display: "none",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
          className="floating-badge"
        >
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              border: "1px solid rgba(100,255,218,0.2)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              animation: "spin 20s linear infinite",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>💻</span>
            <span style={{ fontSize: "0.7rem", color: "#64ffda", fontFamily: "monospace", textAlign: "center", padding: "0 16px" }}>
              open to opportunities
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        style={{
          padding: "80px 24px",
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionLabel label="about me" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "48px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          <div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#ccd6f6", marginTop: 0, marginBottom: "16px" }}>
              Building things,<br />learning always.
            </h2>
            <p style={{ lineHeight: 1.8, color: "#8892b0", marginBottom: "16px" }}>
              I'm a B.Sc Computer Science student at Sacred Heart College, Dindigul,
              graduating in 2026. My interest in technology spans from low-level C
              programming to building web interfaces.
            </p>
            <p style={{ lineHeight: 1.8, color: "#8892b0" }}>
              During my internship at QYRA Tech, I got hands-on with frontend
              development — turning designs into real, working pages. I'm now looking
              for a full-time role where I can grow fast and contribute meaningfully.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { label: "Location", value: "Dindigul, Tamil Nadu" },
              { label: "Degree", value: "B.Sc Computer Science (2026)" },
              { label: "Languages", value: "Tamil, English" },
              { label: "Status", value: "Open to opportunities ✓" },
              { label: "Email", value: "jeron31005@gmail.com" },
              { label: "Phone", value: "8610492400" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 0",
                  borderBottom: "1px solid #0f172a",
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#64ffda", letterSpacing: "0.08em" }}>
                  {item.label}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#ccd6f6", textAlign: "right", maxWidth: "200px" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{
          padding: "80px 24px",
          background: "rgba(100,255,218,0.02)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SectionLabel label="skills" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }} className="skills-grid">
            <div>
              <h3 style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#64ffda", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px", marginTop: 0 }}>
                Technical
              </h3>
              {skills.technical.map((s, i) => (
                <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 80} />
              ))}
            </div>
            <div>
              <h3 style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#a78bfa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px", marginTop: 0 }}>
                Personal
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "8px" }}>
                {skills.personal.map((s) => (
                  <span
                    key={s}
                    style={{
                      padding: "8px 16px",
                      border: "1px solid rgba(167,139,250,0.3)",
                      borderRadius: "100px",
                      fontSize: "0.82rem",
                      color: "#a78bfa",
                      background: "rgba(167,139,250,0.05)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div
                style={{
                  marginTop: "40px",
                  padding: "24px",
                  border: "1px solid rgba(100,255,218,0.15)",
                  borderRadius: "8px",
                  background: "rgba(100,255,218,0.03)",
                }}
              >
                <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#64ffda", margin: "0 0 8px", letterSpacing: "0.08em" }}>
                  // currently learning
                </p>
                <p style={{ margin: 0, color: "#8892b0", lineHeight: 1.6, fontSize: "0.88rem" }}>
                  React.js, modern JavaScript (ES6+), and responsive design
                  principles — building toward a full-stack skill set.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE / TIMELINE */}
      <section
        id="experience"
        style={{
          padding: "80px 24px",
          maxWidth: "1000px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <SectionLabel label="journey" />
        <h2 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#ccd6f6", marginBottom: "40px", marginTop: 0 }}>
          Education & Experience
        </h2>
        <div style={{ maxWidth: "560px" }}>
          {timeline.map((item, i) => (
            <TimelineItem key={i} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding: "80px 24px 120px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "monospace", color: "#64ffda", fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "12px" }}>
            what's next?
          </p>
          <h2 style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 800, color: "#ccd6f6", margin: "0 0 20px", lineHeight: 1.1 }}>
            Let's work together.
          </h2>
          <p style={{ color: "#8892b0", lineHeight: 1.75, marginBottom: "40px", fontSize: "0.97rem" }}>
            I'm actively looking for my first full-time opportunity in the IT
            industry. Whether you have a role, a project, or just want to connect
            — my inbox is open.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:jeron31005@gmail.com"
              style={{
                display: "inline-block",
                background: "transparent",
                border: "1px solid #64ffda",
                color: "#64ffda",
                padding: "16px 32px",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "rgba(100,255,218,0.08)")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              say hello →
            </a>
            <a
              href="tel:8610492400"
              style={{
                display: "inline-block",
                background: "transparent",
                border: "1px solid #1e293b",
                color: "#8892b0",
                padding: "16px 32px",
                borderRadius: "4px",
                cursor: "pointer",
                fontFamily: "monospace",
                fontSize: "0.85rem",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              📞 8610492400
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px",
          borderTop: "1px solid rgba(100,255,218,0.08)",
          fontFamily: "monospace",
          fontSize: "0.72rem",
          color: "#4a5568",
          position: "relative",
          zIndex: 1,
        }}
      >
        Designed & built by Jeron J · Dindigul, Tamil Nadu
      </footer>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (min-width: 768px) {
          .floating-badge { display: flex !important; }
        }
        @media (max-width: 700px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
      <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#64ffda", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {label}
      </span>
      <div style={{ flex: 1, maxWidth: "200px", height: "1px", background: "#1e293b" }} />
    </div>
  );
}
