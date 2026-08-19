import { Link } from "@tanstack/react-router";
import { RgbMark } from "@/components/rgb-mark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p>
            <RgbMark size="nav" />
          </p>
          <p className="mt-2 max-w-sm text-sm text-muted">
            A gallery of the pages Ben runs. Media is posted for credit or
            removal — nothing here is claimed as original.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <a href="https://7490.org" className="hover:text-fg">
            7490.org
          </a>
          <a
            href="https://x.com/7490"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg"
          >
            @7490
          </a>
          <Link to="/" className="hover:text-fg">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
