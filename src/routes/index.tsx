import { createFileRoute } from "@tanstack/react-router";
import { Logo } from "../components/Logo";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

    window.addEventListener("scroll", handleScroll);
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
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
      
      <main id="main-content" className="min-h-screen bg-background px-4 py-16 text-foreground md:px-10 md:py-32">
      <div className="mx-auto max-w-[720px]">
        {/* MASTHEAD */}
        <header 
          id="masthead" 
          className={`border-b border-border pb-12 md:pb-24 section-reveal ${visibleSections.has("masthead") ? "visible" : ""}`}
        >
          <div className="mb-6 md:mb-8">
            <Logo className="h-10 w-auto md:h-16" aria-label="21B Labs logo" />
          </div>
          <p className="text-xs md:text-sm text-muted-foreground">
            Est. 2016.
          </p>
          <p className="mt-6 md:mt-8 max-w-[640px] text-sm md:text-base leading-snug text-foreground">
            A small group. Quantitative trading, software development,
            and applied research at the edge of crypto, AI, and prediction
            markets. Founded by Binary Bodhi. The team behind Zibit, The Still Point, SAI Protocol,
            Root Access, Zigma, Neurolov, and Anāśraya Advaita.
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
            <div>
              <dt className="text-sm md:text-base font-medium text-foreground">
                Quantitative bots & investment strategies
              </dt>
              <dd className="mt-1 text-xs md:text-sm leading-relaxed text-muted-foreground">
                Systems that trade. Not signals — infrastructure.
              </dd>
            </div>
            <div>
              <dt className="text-sm md:text-base font-medium text-foreground">
                Software development, built fast
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                Across Polymarket, crypto L1/L2, and prediction markets.
                Open-source where it should be. Proprietary where it must be.
              </dd>
            </div>
            <div>
              <dt className="text-sm md:text-base font-medium text-foreground">
                Quant research & thesis writing
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                Reports, models, and analysis — written to be acted on,
                not skimmed.
              </dd>
            </div>
            <div>
              <dt className="text-sm md:text-base font-medium text-foreground">
                Collaboration
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                We work alongside other projects, agencies, and independent
                builders. Embedded, not outsourced.
              </dd>
            </div>
            <div>
              <dt className="text-sm md:text-base font-medium text-foreground">
                AI x crypto prediction
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                Applied models across prediction markets and on-chain
                signal — research first, product second.
              </dd>
            </div>
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
            <div className="project-card">
              <dt className="text-sm md:text-base font-medium text-foreground">
                The Still Point — stillpoint.fun
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                A recognition vehicle, not an investment one. Non-dual
                teaching — Kashmir Shaivism, Advaita Vedanta — held alongside
                blockchain, AI, and collective attention.
              </dd>
            </div>
            <div className="project-card">
              <dt className="text-sm md:text-base font-medium text-foreground">
                SAI Protocol — saiprotocol.xyz
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                Agents that own themselves. Infrastructure for sovereign AI economies.
              </dd>
            </div>
            <div className="project-card">
              <dt className="text-sm md:text-base font-medium text-foreground">
                Root Access
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                The tricks and tools to unlock yourself. No gurus, no gatekeeping —
                just the access you already had.
              </dd>
            </div>
            <div className="project-card">
              <dt className="text-sm md:text-base font-medium text-foreground">
                Zigma — zigma.pro
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                A prediction market analytics platform. Signal, not noise, for
                markets that price the future.
              </dd>
            </div>
            <div className="project-card">
              <dt className="text-sm md:text-base font-medium text-foreground">
                Neurolov — neurolov.tech
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                GPU compute and robotics infrastructure, decentralized. Building the
                hardware layer sovereign AI runs on.
              </dd>
            </div>
            <div className="project-card">
              <dt className="text-sm md:text-base font-medium text-foreground">
                Anāśraya Advaita
              </dt>
              <dd className="mt-1 max-w-[600px] text-xs md:text-sm leading-relaxed text-muted-foreground">
                The philosophical spine underneath all of it — non-dual inquiry,
                written down.
              </dd>
            </div>
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
            <p>
              Non-dual in method, not just in name. Consulting, development,
              design, and planning proceed from the same clear seeing — no
              theater, no overclaiming, no noise between the work and the
              result.
            </p>
            <p>
              We are builders first. Cypherpunks by disposition: we trust
              code, math, and direct evidence over authority, and we ship
              accordingly.
            </p>
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
            <p>
              Nirvana is not a future state. It is not the reward at the end of
              a clean build. It is the clear seeing that happens while the code
              is still compiling, while the market is still moving, while the
              self that was supposed to attain it has already been seen through.
            </p>
            <p>
              We call this binary bodhi: a post-utopian practice where
              liberation and engineering are not two things. No separate
              meditation room, no separate deployment pipeline. The same
              attention that debugs a smart contract can notice the one who is
              debugging. The same skepticism that audits an oracle can audit
              the belief in a fixed self.
            </p>
            <p>
              We do not promise enlightenment-as-a-service. We build systems,
              write models, and move capital while the non-dual recognition does
              what it does. Form is not rejected. Emptiness is not romanticized.
              The work continues, and the clinging to its outcome is what is
              gently dismantled.
            </p>
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
            <span className="text-muted-foreground">Email</span>
            <a
              href="mailto:neohex@pm.me"
              className="labs-link text-foreground"
            >
              neohex@pm.me
            </a>
            <span className="text-muted-foreground">X</span>
            <a
              href="https://x.com/binarybodhi"
              target="_blank"
              rel="noopener noreferrer"
              className="labs-link text-foreground"
            >
              x.com/binarybodhi
            </a>
            <span className="text-muted-foreground">GitHub</span>
            <a
              href="https://github.com/21BLABS"
              target="_blank"
              rel="noopener noreferrer"
              className="labs-link text-foreground"
            >
              github.com/21BLABS
            </a>
          </div>
          <p className="mt-6 md:mt-10 max-w-[640px] text-xs md:text-sm text-muted-foreground">
            No forms. No newsletter. Write to one of the above.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="pt-6 md:pt-10">
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
      <div className="fixed left-0 top-0 h-1 bg-border" aria-hidden="true">
        <div
          className="h-full bg-foreground transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </main>
    </>
  );
}
