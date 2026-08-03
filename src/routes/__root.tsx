import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-[720px]">
        <h1 className="text-3xl font-medium text-foreground">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="labs-link text-sm">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-[720px]">
        <h1 className="text-xl font-medium text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="labs-link text-sm"
          >
            Try again
          </button>
          <a href="/" className="labs-link text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "21B Labs — Quantitative Trading, Software Development, Applied Research" },
      { name: "description", content: "21B Labs — quantitative trading, software development, and applied research at the edge of crypto, AI, and prediction markets. Founded by Binary Bodhi. Est. 2016." },
      { name: "author", content: "21B Labs" },
      { name: "theme-color", content: "#FFFFFF" },
      { property: "og:title", content: "21B Labs — Quantitative Trading, Software Development, Applied Research" },
      { property: "og:description", content: "21B Labs — quantitative trading, software development, and applied research at the edge of crypto, AI, and prediction markets. Founded by Binary Bodhi. Est. 2016." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "21B Labs" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "21B Labs — Quantitative Trading, Software Development, Applied Research" },
      { name: "twitter:description", content: "21B Labs — quantitative trading, software development, and applied research at the edge of crypto, AI, and prediction markets. Founded by Binary Bodhi. Est. 2016." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.svg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
