import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 88%',
          once: true,
        },
      });

      timeline
        .from('.footer-meta__item', {
          y: 28,
          opacity: 0,
          duration: 0.72,
          stagger: 0.1,
        })
        .from(
          '.footer-wordmark__line',
          {
            yPercent: 100,
            opacity: 0,
            duration: 1.05,
            stagger: 0.12,
          },
          '-=0.32'
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer-section" ref={footerRef}>
      <div className="footer-shell">
        <div className="footer-meta">
          <div className="footer-meta__item">
            <p className="footer-copy">© The House of Tattoos</p>
          </div>

          <div className="footer-meta__item">
            <a className="footer-link" href="mailto:tretyakbor@gmail.com">
              tretyakbor@gmail.com
            </a>
            <a className="footer-link footer-link--muted" href="tel:+380935336589">
              +38 093 533 65 89
            </a>
          </div>

          <div className="footer-meta__item">
            <p className="footer-copy">Website Development:</p>
            <a className="footer-link footer-link--underlined" href="mailto:workzhardik@gmail.com">
              HARDIK LALWANI
            </a>
          </div>

          <div className="footer-meta__item footer-meta__item--right">
            <a className="footer-link footer-link " href="#">
              Privacy Policy
            </a>
            <a className="footer-link footer-link " href="#">
              Terms of Use
            </a>
          </div>
        </div>

        <div className="footer-wordmark">
          <div className="footer-wordmark__mask">
            <h2 className="footer-wordmark__line">MADE IN 2026</h2>
          </div>
        </div>
      </div>
    </footer>
  );
}
