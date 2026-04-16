export default function HeroSection({ navItems, onScrollTo }) {
  return (
    <section className="hero-section section-shell" id="about">
      <div className="hero-artboard reveal">
        <div className="hero-artboard-header">
          <small>Layout Structure</small>
          <span>1920 PX</span>
          <span>1080</span>
        </div>

        <div className="hero-frame">
          <div className="hero-grid-lines" aria-hidden="true">
            <span className="grid-line grid-line-1" />
            <span className="grid-line grid-line-2" />
            <span className="grid-line grid-line-3" />
            <span className="grid-line grid-line-4" />
            <span className="grid-line grid-line-bottom" />
            <span className="grid-mark grid-mark-1">+</span>
            <span className="grid-mark grid-mark-2">+</span>
            <span className="grid-mark grid-mark-3">+</span>
            <span className="grid-mark grid-mark-4">+</span>
          </div>

          <div className="hero-layout">
            <button className="hero-brand" type="button" onClick={() => onScrollTo('about')}>
              <span>Noir</span>
              <span>Tattoo</span>
            </button>

            <nav className="hero-nav-links" aria-label="Main navigation">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onScrollTo(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              className="hero-book"
              href="#booking"
              onClick={(event) => {
                event.preventDefault();
                onScrollTo('booking');
              }}
            >
              <span>-&gt;</span>
              Book
            </a>

            <div className="hero-copy-top">
              <div className="hero-copy-line" />
              <p>
                I specialize in tattoos that age with you, not against you. Modern numbing,
                perfect sterility, and sketches drawn from scratch for your story only.
              </p>
            </div>

            <p className="hero-side-note">
              The kind of work that gets compliments ten years from now, not cover-ups.
            </p>

            <div className="hero-title-block">
              <span >Tattoos</span>
              <span>You&apos;ll Love</span>
              <span>Forever</span>
              
              <a
                className="hero-consult"
                href="#booking"
                onClick={(event) => {
                  event.preventDefault();
                  onScrollTo('booking');
                }}
              >
                <span className="hero-consult-plus">+</span>
                <span>Free consultation</span>
              </a>
            </div>
          </div>
        </div>

        <div className="hero-dimension-row" aria-hidden="true">
          <span>62 PX</span>
          <span>412 PX</span>
          <span>716 PX</span>
          <span>1162 PX</span>
          <span>62 PX</span>
        </div>
      </div>
    </section>
  );
}
