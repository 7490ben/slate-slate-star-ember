import { Link } from "@tanstack/react-router";
import { RgbMark } from "@/components/rgb-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link to="/" className="text-fg no-underline">
          <RgbMark size="nav" />
        </Link>

        <nav className="flex items-center gap-4 text-sm text-muted sm:gap-6">
          <a href="/#network" className="transition-colors duration-150 hover:text-fg">
            Nation
          </a>
          <a href="/#team" className="transition-colors duration-150 hover:text-fg">
            Team
          </a>
          <a href="/#about" className="transition-colors duration-150 hover:text-fg">
            About
          </a>
          <a href="/#wire" className="transition-colors duration-150 hover:text-fg">
            Bangers
          </a>
        </nav>
      </div>
    </header>
  );
}
