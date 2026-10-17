import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "../components/Logo";
import { useEffect, useState, useRef } from "react";
import React from "react";

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed right-6 top-6 p-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 z-50 rounded-full hover:scale-110 active:scale-95"
      aria-label="Toggle dark mode"
      style={{
        transform: isHovered ? "scale(1.1) rotate(180deg)" : "scale(1) rotate(0deg)",
      }}
    >
      <span className="text-xl transition-transform duration-300" style={{
        transform: isDark ? "rotate(180deg)" : "rotate(0deg)"
      }}>
        {isDark ? "☀" : "☾"}
      </span>
    </button>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id");

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId || "");
        }
      });

      const progress = Math.min(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
        100
      );
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("id");
            if (sectionId) {
              setVisibleSections((prev) => new Set(prev).add(sectionId));
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "-50px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:outline-none"
      >
        Skip to main content
      </a>

      <ThemeToggle />

      {/* Cursor glow effect */}
      <div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      <main id="main-content" className="min-h-screen bg-background px-4 py-16 text-foreground md:px-10 md:py-32 relative z-10">
      <div className="mx-auto max-w-[720px]">
        {/* MASTHEAD */}
        <header
          id="masthead"
          className={`border-b border-border pb-12 md:pb-24 section-reveal ${visibleSections.has("masthead") ? "visible" : ""}`}
        >
          <div className={`mb-6 md:mb-8 ${isLoaded ? "fade-in" : "opacity-0"}`}>
            <Logo className="h-10 w-auto md:h-16" aria-label="21B Labs logo" />
          </div>
          <p className={`text-xs md:text-sm text-muted-foreground ${isLoaded ? "fade-in stagger-1" : "opacity-0"}`}>
            Est. 2016.
          </p>
          <p className={`mt-6 md:mt-8 max-w-[640px] text-sm md:text-base leading-relaxed text-foreground ${isLoaded ? "fade-in stagger-2" : "opacity-0"}`}>
            A small group. Quantitative trading, software development,
            and applied research at the edge of crypto, AI, and prediction
            markets. Founded by Binary Bodhi. The team behind Zibit, The Still Point, SAI Protocol,
            Root Access, Zigma, racana.pro, jennydoko.fun, and Anāśraya Advaita.
          </p>
        </header>

        {/* WHAT WE DO */}
        <section
          id="what-we-do"
          aria-labelledby="what-we-do-heading"
          className={`border-b border-border py-12 md:py-24 section-reveal ${visibleSections.has("what-we-do") ? "visible" : ""}`}
        >
          <h2 id="what-we-do-heading" className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted-foreground">
            WHAT WE DO
          </h2>
          <dl className="mt-6 md:mt-10 space-y-6 md:space-y-10">
            {[
              {
                title: "Quantitative bots & investment strategies",
                desc: "Systems that trade. Not signals — infrastructure.",
                delay: "stagger-1"
              },
              {
                title: "Software development, built fast",
                desc: "Across Polymarket, crypto L1/L2, and prediction markets. Open-source where it should be. Proprietary where it must be.",
                delay: "stagger-2"
              },
              {
                title: "Quant research & thesis writing",
                desc: "Reports, models, and analysis — written to be acted on, not skimmed.",
                delay: "stagger-3"
              },
              {
                title: "Collaboration",
                desc: "We work alongside other projects, agencies, and independent builders. Embedded, not outsourced.",
                delay: "stagger-4"
              },
              {
                title: "AI x crypto prediction",
                desc: "Applied models across prediction markets and on-chain signal — research first, product second.",
                delay: "stagger-5"
              }
            ].map((item, index) => (
              <div key={index} className={`fade-in ${visibleSections.has("what-we-do") ? item.delay : "opacity-0"}`}>
                <dt className="text-sm md:text-base font-medium text-foreground">
                  {item.title}
                </dt>
                <dd className="mt-1 text-xs md:text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CURRENT WORK */}
        <section
          id="current-work"
          aria-labelledby="current-work-heading"
          className={`border-b border-border py-12 md:py-24 section-reveal ${visibleSections.has("current-work") ? "visible" : ""}`}
        >
          <h2 id="current-work-heading" className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted-foreground">
            CURRENT WORK
          </h2>
          <dl className="mt-6 md:mt-10 space-y-6 md:space-y-10">
            {[
              {
                title: "The Still Point — stillpoint.fun",
                desc: "A recognition vehicle, not an investment one. Non-dual teaching — Kashmir Shaivism, Advaita Vedanta — held alongside blockchain, AI, and collective attention.",
                delay: "stagger-1"
              },
              {
                title: "SAI Protocol — saiprotocol.xyz",
                desc: "Agents that own themselves. Infrastructure for sovereign AI economies.",
                delay: "stagger-2"
              },
              {
                title: "Root Access",
                desc: "The tricks and tools to unlock yourself. No gurus, no gatekeeping — just the access you already had.",
                delay: "stagger-3"
              },
              {
                title: "Zigma — zigma.pro",
                desc: "A prediction market analytics platform. Signal, not noise, for markets that price the future.",
                delay: "stagger-4"
              },
              {
                title: "racana.pro",
                desc: "Android game development and interactive experiences.",
                delay: "stagger-5"
              },
              {
                title: "jennydoko.fun",
                desc: "Android game.",
                delay: "stagger-6"
              },
              {
                title: "Anāśraya Advaita",
                desc: "The philosophical spine underneath all of it — non-dual inquiry, written down.",
                delay: "stagger-1"
              }
            ].map((item, index) => (
              <div key={index} className={`project-card pl-4 fade-in ${visibleSections.has("current-work") ? item.delay : "opacity-0"}`}>
                <dt className="text-sm md:text-base font-medium text-foreground">
                  {item.title}
                </dt>
                <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* APPROACH */}
        <section
          id="approach"
          aria-labelledby="approach-heading"
          className={`border-b border-border py-12 md:py-24 section-reveal ${visibleSections.has("approach") ? "visible" : ""}`}
        >
          <h2 id="approach-heading" className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted-foreground">
            APPROACH
          </h2>
          <div className="mt-6 md:mt-10 max-w-[640px] space-y-4 md:space-y-6 text-xs md:text-sm leading-relaxed text-foreground">
            {[
              "Non-dual in method, not just in name. Consulting, development, design, and planning proceed from the same clear seeing — no theater, no overclaiming, no noise between the work and the result.",
              "We are builders first. Cypherpunks by disposition: we trust code, math, and direct evidence over authority, and we ship accordingly."
            ].map((text, index) => (
              <p key={index} className={`fade-in ${visibleSections.has("approach") ? `stagger-${index + 1}` : "opacity-0"}`}>
                {text}
              </p>
            ))}
          </div>
        </section>

        {/* THESIS */}
        <section
          id="thesis"
          aria-labelledby="thesis-heading"
          className={`border-b border-border py-12 md:py-24 section-reveal ${visibleSections.has("thesis") ? "visible" : ""}`}
        >
          <h2 id="thesis-heading" className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted-foreground">
            THESIS
          </h2>
          <div className="mt-6 md:mt-10 max-w-[640px] space-y-4 md:space-y-6 text-xs md:text-sm leading-relaxed text-foreground">
            {[
              "Nirvana is not a future state. It is not the reward at the end of a clean build. It is the clear seeing that happens while the code is still compiling, while the market is still moving, while the self that was supposed to attain it has already been seen through.",
              "We call this binary bodhi: a post-utopian practice where liberation and engineering are not two things. No separate meditation room, no separate deployment pipeline. The same attention that debugs a smart contract can notice the one who is debugging. The same skepticism that audits an oracle can audit the belief in a fixed self.",
              "We do not promise enlightenment-as-a-service. We build systems, write models, and move capital while the non-dual recognition does what it does. Form is not rejected. Emptiness is not romanticized. The work continues, and the clinging to its outcome is what is gently dismantled."
            ].map((text, index) => (
              <p key={index} className={`fade-in ${visibleSections.has("thesis") ? `stagger-${index + 1}` : "opacity-0"}`}>
                {text}
              </p>
            ))}
          </div>
        </section>

        {/* GET IN TOUCH */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className={`border-b border-border py-12 md:py-24 section-reveal ${visibleSections.has("contact") ? "visible" : ""}`}
        >
          <h2 id="contact-heading" className="text-xs md:text-sm font-medium uppercase tracking-wide text-muted-foreground">
            GET IN TOUCH
          </h2>
          <div className="mt-6 md:mt-10 grid max-w-[480px] grid-cols-[80px_1fr] gap-y-3 text-xs md:text-sm">
            {[
              { label: "Email", value: "neohex@pm.me", href: "mailto:neohex@pm.me", delay: "stagger-1" },
              { label: "X", value: "x.com/binarybodhi", href: "https://x.com/binarybodhi", external: true, delay: "stagger-2" },
              { label: "GitHub", value: "github.com/21BLABS", href: "https://github.com/21BLABS", external: true, delay: "stagger-3" }
            ].map((item) => (
              <React.Fragment key={item.label}>
                <span className={`text-muted-foreground fade-in ${visibleSections.has("contact") ? item.delay : "opacity-0"}`}>
                  {item.label}
                </span>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`labs-link text-foreground fade-in ${visibleSections.has("contact") ? item.delay : "opacity-0"}`}
                >
                  {item.value}
                </a>
              </React.Fragment>
            ))}
          </div>
          <p className={`mt-6 md:mt-10 max-w-[640px] text-xs md:text-sm text-muted-foreground fade-in ${visibleSections.has("contact") ? "stagger-4" : "opacity-0"}`}>
            No forms. No newsletter. Write to one of the above.
          </p>
        </section>

        {/* FOOTER */}
        <footer className={`pt-6 md:pt-10 fade-in ${visibleSections.has("contact") ? "stagger-5" : "opacity-0"}`}>
          <p className="text-[10px] md:text-xs text-muted-foreground">
            21B Labs — est. 2016.
          </p>
        </footer>
      </div>

      {/* Navigation */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:block" aria-label="Table of contents">
        <div className="flex flex-col gap-4">
          {[
            { id: "masthead", label: "Top" },
            { id: "what-we-do", label: "What We Do" },
            { id: "current-work", label: "Current Work" },
            { id: "approach", label: "Approach" },
            { id: "thesis", label: "Thesis" },
            { id: "contact", label: "Contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-item text-xs ${
                activeSection === item.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={`Navigate to ${item.label}`}
              aria-current={activeSection === item.id ? "true" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="fixed left-0 top-0 h-1 bg-border z-50" aria-hidden="true">
        <div
          className="h-full bg-foreground transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </main>
    </>
  );
}
