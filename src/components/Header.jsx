import { useEffect, useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] =
    useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0912]/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <a
          href="/"
          className="inline-flex min-h-11 items-center gap-3 text-sm font-bold tracking-tight text-white no-underline transition-opacity hover:opacity-90"
          aria-label="Anime OC Creator home"
          onClick={closeMenu}
        >
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-lg"
            aria-hidden="true"
          >
            🧬
          </span>

          <span>
            Anime OC Creator
          </span>
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-grid size-11 shrink-0 place-items-center rounded-xl border border-violet-400/30 bg-violet-500/10 text-xl text-white transition hover:bg-violet-500/20 md:hidden"
          onClick={() =>
            setIsMenuOpen(
              (open) => !open
            )
          }
          aria-label={
            isMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span aria-hidden="true">
            {isMenuOpen ? "✕" : "☰"}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          <a
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[#b8b2c8] no-underline transition-colors hover:text-white"
          >
            Home
          </a>

          <a
            href="/#creator"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-[#b8b2c8] no-underline transition-colors hover:text-white"
          >
            Create
          </a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#0b0912] px-4 py-2 shadow-2xl shadow-black/20 md:hidden"
          aria-label="Mobile navigation"
        >
          <a
            href="/"
            className="flex min-h-12 items-center rounded-lg px-3 text-sm font-semibold text-[#b8b2c8] no-underline transition-colors hover:bg-violet-500/10 hover:text-white"
            onClick={closeMenu}
          >
            Home
          </a>

          <a
            href="/#creator"
            className="flex min-h-12 items-center rounded-lg px-3 text-sm font-semibold text-[#b8b2c8] no-underline transition-colors hover:bg-violet-500/10 hover:text-white"
            onClick={closeMenu}
          >
            Create
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;