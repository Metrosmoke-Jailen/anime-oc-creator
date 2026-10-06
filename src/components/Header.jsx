function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <a
          href="/"
          className="logo"
          aria-label="Anime OC Creator home"
        >
          <span aria-hidden="true">
            🧬
          </span>

          <span>
            Anime OC Creator
          </span>
        </a>

        <nav aria-label="Main navigation">
          <a href="/">
            Home
          </a>

          <a href="/#creator">
            Create
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;