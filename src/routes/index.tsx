import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background px-6 py-24 text-foreground md:px-10 md:py-32">
      <div className="mx-auto max-w-[720px]">
        {/* MASTHEAD */}
        <section className="border-b border-border pb-16 md:pb-24">
          <h1 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            21B LABS
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Est. 2016.
          </p>
          <p className="mt-8 max-w-[640px] text-base leading-snug text-foreground">
            A small group. Quantitative trading, software development,
            and applied research at the edge of crypto, AI, and prediction
            markets. The team behind Zibit, The Still Point, SAI Protocol,
            Root Access, and Anasrya Advaita.
          </p>
        </section>

        {/* WHAT WE DO */}
        <section className="border-b border-border py-16 md:py-24">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            WHAT WE DO
          </h2>
          <dl className="mt-10 space-y-10">
            <div>
              <dt className="text-base font-medium text-foreground">
                Quantitative bots & investment strategies
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Systems that trade. Not signals — infrastructure.
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-foreground">
                Software development, built fast
              </dt>
              <dd className="mt-1 max-w-[600px] text-sm leading-relaxed text-muted-foreground">
                Across Polymarket, crypto L1/L2, and prediction markets.
                Open-source where it should be. Proprietary where it must be.
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-foreground">
                Quant research & thesis writing
              </dt>
              <dd className="mt-1 max-w-[600px] text-sm leading-relaxed text-muted-foreground">
                Reports, models, and analysis — written to be acted on,
                not skimmed.
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-foreground">
                Collaboration
              </dt>
              <dd className="mt-1 max-w-[600px] text-sm leading-relaxed text-muted-foreground">
                We work alongside other projects, agencies, and independent
                builders. Embedded, not outsourced.
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-foreground">
                AI x crypto prediction
              </dt>
              <dd className="mt-1 max-w-[600px] text-sm leading-relaxed text-muted-foreground">
                Applied models across prediction markets and on-chain
                signal — research first, product second.
              </dd>
            </div>
          </dl>
        </section>

        {/* CURRENT WORK */}
        <section className="border-b border-border py-16 md:py-24">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            CURRENT WORK
          </h2>
          <dl className="mt-10 space-y-10">
            <div>
              <dt className="text-base font-medium text-foreground">
                The Still Point
              </dt>
              <dd className="mt-1 max-w-[600px] text-sm leading-relaxed text-muted-foreground">
                A recognition vehicle, not an investment one. Non-dual
                teaching — Kashmir Shaivism, Advaita Vedanta — held alongside
                blockchain, AI, and collective attention.
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-foreground">
                SAI Protocol
              </dt>
              <dd className="mt-1 text-sm italic leading-relaxed text-muted-foreground">
                [one-line description — insert once finalized]
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-foreground">
                Root Access
              </dt>
              <dd className="mt-1 text-sm italic leading-relaxed text-muted-foreground">
                [one-line description — insert once finalized]
              </dd>
            </div>
            <div>
              <dt className="text-base font-medium text-foreground">
                Anasrya Advaita
              </dt>
              <dd className="mt-1 text-sm italic leading-relaxed text-muted-foreground">
                [one-line description — philosophy project, insert once finalized]
              </dd>
            </div>
          </dl>
        </section>

        {/* APPROACH */}
        <section className="border-b border-border py-16 md:py-24">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            APPROACH
          </h2>
          <div className="mt-10 max-w-[640px] space-y-6 text-sm leading-relaxed text-foreground">
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

        {/* GET IN TOUCH */}
        <section className="border-b border-border py-16 md:py-24">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            GET IN TOUCH
          </h2>
          <div className="mt-10 grid max-w-[480px] grid-cols-[80px_1fr] gap-y-3 text-sm">
            <span className="text-muted-foreground">Email</span>
            <a
              href="mailto:neohex@pm.me"
              className="labs-link text-foreground"
            >
              neohex@pm.me
            </a>
            <span className="text-muted-foreground">X</span>
            <a
              href="https://x.com/21blabs"
              target="_blank"
              rel="noopener noreferrer"
              className="labs-link text-foreground"
            >
              x.com/21blabs
            </a>
          </div>
          <p className="mt-10 max-w-[640px] text-sm text-muted-foreground">
            No forms. No newsletter. Write to one of the above.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="pt-10">
          <p className="text-xs text-muted-foreground">
            21B Labs — est. 2016.
          </p>
        </footer>
      </div>
    </main>
  );
}
