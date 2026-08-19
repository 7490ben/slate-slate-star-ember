import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="mx-auto flex min-h-[70dvh] max-w-md flex-col justify-center px-4 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-subtle">
        Members
      </p>
      <h1 className="mt-3 font-display text-4xl italic tracking-tight">
        Sign in to 7490 Nation
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Collect pages, keep a private shelf of the ones you actually open. Same
        accounts you already follow on X.
      </p>

      <div className="mt-8 space-y-3">
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <Button
              key={p.providerId}
              type="button"
              variant={p.idp === "twitter" ? "primary" : "outline"}
              size="lg"
              className="w-full"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
            >
              Continue with {p.label}
            </Button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
      </div>

      <Link
        to="/"
        className="mt-8 text-center text-sm text-muted hover:text-fg"
      >
        Back to the gallery
      </Link>
    </main>
  );
}
