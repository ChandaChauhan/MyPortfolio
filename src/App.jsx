import { useEffect, useRef, useState } from "react";
import { profile, about, experience, projects, skills, education } from "./data.js";
import Illustration from "./Illustration.jsx";

const sections = [
  ["home", "Home"],
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["contact", "Contact"],
];

function Reveal({ children, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return setShown(true);
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}>{children}</Tag>;
}

function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

const Points = ({ items }) => (
  <ul className="points">{items.map((p) => <li key={p}>{p}</li>)}</ul>
);

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["about", "About"], ["experience", "Experience"], ["projects", "Projects"], ["skills", "Skills"]];
  const close = () => setOpen(false);
  return (
    <header className="top">
      <a className="logo" href="#home" aria-label="Home">
        <span className="prompt" aria-hidden="true">&gt;_</span>
        <span>{profile.name.toUpperCase()}</span>
      </a>
      <button className="burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "✕" : "☰"}
      </button>
      <nav className={`menu ${open ? "open" : ""}`} aria-label="Main">
        {links.map(([id, label]) => <a key={id} href={`#${id}`} onClick={close}>{label}</a>)}
        <a className="btn-outline" href="#contact" onClick={close}>Contact</a>
      </nav>
    </header>
  );
}

const Hero = () => (
  <section id="home" className="hero">
    <div className="hero-text">
      <h1>{profile.role}</h1>
      <p>{profile.intro}</p>
      <div className="hero-actions">
        <a className="btn-outline" href={profile.resume} download>Download resume</a>
        <a className="more" href="#about">About me <span aria-hidden="true">›</span></a>
      </div>
    </div>
    <Illustration />
  </section>
);

const About = () => (
  <section id="about">
    <h2>About</h2>
    <Reveal className="about">
      <div>{about.paragraphs.map((t) => <p key={t}>{t}</p>)}</div>
      <ul className="facts">
        {about.facts.map(([k, v]) => <li key={k}><span>{k}</span>{v}</li>)}
      </ul>
    </Reveal>
  </section>
);

const Experience = () => (
  <section id="experience">
    <h2>Experience</h2>
    {experience.map((j) => (
      <Reveal key={j.role + j.company}>
        <div className="row">
          <h3>{j.role}, {j.company}</h3>
          <span className="meta">{j.period}</span>
        </div>
        <Points items={j.points} />
      </Reveal>
    ))}
  </section>
);

const Projects = () => (
  <section id="projects">
    <h2>Projects</h2>
    {projects.map((p) => (
      <Reveal as="article" className="project" key={p.title}>
        <div className="row">
          <h3>{p.title}</h3>
          <span className="stack">{p.stack}</span>
        </div>
        <Points items={p.points} />
      </Reveal>
    ))}
  </section>
);

const Skills = () => (
  <section id="skills">
    <h2>Skills</h2>
    <dl className="skills">
      {skills.map(([k, v]) => (
        <div key={k} style={{ display: "contents" }}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  </section>
);

const Education = () => (
  <section id="education">
    <h2>Education and training</h2>
    <ul className="edu">
      {education.map(([a, b]) => <li key={a}><div>{a}</div><span>{b}</span></li>)}
    </ul>
  </section>
);

const Contact = () => (
  <section id="contact" className="contact">
    <h2>Contact</h2>
    <a className="mail" href={`mailto:${profile.email}`}>{profile.email}</a>
    <div className="links">
      <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a href={profile.resume} download>Resume (PDF)</a>
    </div>
  </section>
);

function SideNav({ active }) {
  return (
    <nav className="side" aria-label="Sections">
      {sections.map(([id, label], i) => (
        <a key={id} href={`#${id}`} className={active === id ? "on" : ""} aria-label={label} title={label}>
          <span className="lbl">{label}</span>{String(i).padStart(2, "0")}
        </a>
      ))}
      <span className="scroll-hint" aria-hidden="true">Scroll down</span>
    </nav>
  );
}

export default function App() {
  const active = useActiveSection();
  return (
    <>
      <div className="wrap">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <footer>© {new Date().getFullYear()} {profile.name}</footer>
      </div>
      <SideNav active={active} />
    </>
  );
}
