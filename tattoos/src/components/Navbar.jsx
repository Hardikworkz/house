import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';
import { HiMiniArrowUturnRight } from "react-icons/hi2";  
import founder from '../assets/founder.png';
const defaultNavItems = [
  { label: 'About me', id: 'about' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Results', id: 'results' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Faq', id: 'faq' },
];

export default function Hero({
  navItems = defaultNavItems,
  onScrollTo = () => {},
}) {
  const heroRef = useRef(null);
  const [showStickyNav, setShowStickyNav] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastY;
      const nearTop = currentY < 24;

      setShowStickyNav(nearTop || scrollingUp);
      lastY = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

      timeline
        .from('.noir-hero__image img', {
          scale: 1.08,
          opacity: 0,
          duration: 1.1,
        })
        .from(
          '.noir-hero__panel',
          {
            x: (index) => (index === 0 ? -40 : 40),
            opacity: 0,
            duration: 0.8,
            stagger: 0.08,
          },
          '-=0.85'
        )
        .from(
          '.noir-hero__brand, .noir-hero__links a, .noir-hero__book',
          {
            y: -18,
            opacity: 0,
            duration: 0.55,
            stagger: 0.05,
          },
          '-=0.55'
        )
        .from(
          '.noir-hero__meta, .noir-hero__note, .noir-hero__cta',
          {
            y: 26,
            opacity: 0,
            duration: 0.75,
            stagger: 0.08,
          },
          '-=0.35'
        )
        .from(
          '.noir-hero__headline span',
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.85,
            stagger: 0.09,
          },
          '-=0.5'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="noir-hero" id="about" ref={heroRef}>
      <div className="noir-hero__stage">
        <div className="noir-hero__image" aria-hidden="true">
          <img
            src={founder}
            alt=""
          />
        </div>

        <header className={`noir-hero__nav${showStickyNav ? ' is-visible' : ''}`}>
          <button className="noir-hero__brand" type="button" onClick={() => onScrollTo('about')}>
            <span className='span1'>THE HOUSE</span>
            <span className='span2'>OF TATTOOS</span>
          </button>

          <nav className="noir-hero__links" aria-label="Hero navigation">
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
            className="noir-hero__book"
            href="#booking"
            onClick={(event) => {
              event.preventDefault();
              onScrollTo('booking');
            }}
          >
            <span>BOOK</span>
            <span className="noir-hero__book-arrow"> <HiMiniArrowUturnRight /></span>
          </a>
        </header>

        <div className="noir-hero__panels" aria-hidden="true">
          <div className="noir-hero__panel noir-hero__panel--left" />
          <div className="noir-hero__panel noir-hero__panel--right" />
        </div>

        <div className="noir-hero__content">
          <div className="noir-hero__meta">
            <div className="noir-hero__meta-line" />
            <p>
              I specialize in tattoos that age with you, not against you. Modern numbing, perfect
              sterility, and sketches drawn from scratch for your story only.
            </p>
          </div>
        <div className="noir-hero__meta-line"></div>
          <p className="noir-hero__note">
            The kind of work that gets compliments ten-year compliments, not cover-ups.
          </p>

          <div className="noir-hero__headline-wrap">
            <h1 className="noir-hero__headline">
              <span>TATTOOS</span>
              <span>YOU&apos;LL LOVE</span>
              <span>FOREVER</span>
            </h1>

            <a
              className="noir-hero__cta"
              href="#booking"
              onClick={(event) => {
                event.preventDefault();
                onScrollTo('booking');
              }}
            >
              <span className="noir-hero__cta-plus">+</span>
              <span>Free consultation</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
