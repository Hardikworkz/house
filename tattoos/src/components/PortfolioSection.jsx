import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PortfolioSection.css';

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = ({ onScrollTo = () => {} }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 76%',
            once: true,
          },
        })
        .from('.portfolio-title', {
          y: 28,
          opacity: 0,
          duration: 0.72,
        })
        .from(
          '.section-one-one > div, .section-one-two > div',
          {
            y: 34,
            opacity: 0,
            duration: 0.82,
            stagger: 0.1,
          },
          '-=0.4'
        )
        .from(
          '.section-two__feature-small, .section-two__copy, .section-two__portrait, .section-two__detail, .section-two__cta-container, .section-two__big-picture',
          {
            y: 36,
            opacity: 0,
            duration: 0.86,
            stagger: 0.1,
          },
          '-=0.34'
        )
        .from(
          '.section-two__plus',
          {
            scale: 0.7,
            opacity: 0,
            duration: 0.46,
            stagger: 0.04,
          },
          '-=0.52'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery-container" id="portfolio" ref={sectionRef}>
      <h1 className="portfolio-title">PORTFOLIO</h1>

      <section className="section-one">
        <section className="section-one-one">
          <div className="col-1">
            <img
              src="https://images.pexels.com/photos/36792083/pexels-photo-36792083.jpeg"
              alt="Back tattoo"
            />
          </div>

          <div className="col-2">
            <div className="copy-container">
              <p>
                Custom pieces
                <br />
                that last a lifetime
              </p>
            </div>
            <div className="skull-container">
              <img
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&q=80&w=800"
                alt="Skull tattoo detail"
              />
            </div>
          </div>
        </section>

        <section className="section-one-two">
          <div className="col-3">
            <div className="portrait-wrap">
              <img
                src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=600"
                alt="Neck portrait"
              />
            </div>
            <p className="plus">+</p>
          </div>

          <div className="col-4">
            <img
              src="https://tattoo-website-new-updates.vercel.app/images/tattoo/butterfly-tattoo-design.jpg"
              alt="Arm tattoo"
            />
          </div>
        </section>
      </section>

      <section className="section-two">
        <div className="section-two__left">
           <div className="section-two-left-upper">
               <figure className="section-two__feature-small">
                  <img
                    src="https://tattoo-website-new-updates.vercel.app/images/tattoo/butterfly-hand-tattoo.jpg"
                    alt="Large front-body tattoo portrait"
                  />
                </figure>
                <div className="section-two__copy">
                  <p>No flash</p>
                  <p>No templates</p>
                  <p>Only your story</p>
                </div>
                <figure className="section-two__portrait">
                  <img
                    src="https://tattoo-website-new-updates.vercel.app/images/tattoo/nature-tattoo-human-earth-bond.jpg"
                    alt="Back tattoo portrait"
                  />
                </figure>
           </div>
            <div className="section-two-left-lower">
                  <div className="section-two__plus-container">
                    <span className="section-two__plus section-two__plus--left">+</span>
                    <span className="section-two__plus section-two__plus--center">+</span>
                    <span className="section-two__plus section-two__plus--bottom">+</span>
                    <span className="section-two__plus section-two__plus--bottom-right">+</span>
                  </div>

                  <figure className="section-two__detail">
                    <img
                      src="https://tattoo-website-new-updates.vercel.app/images/tattoo/wolf-tattoo-realistic-designs.jpg"
                      alt="Hand tattoo close-up"
                    />
                  </figure>
                <div className="section-two__cta-container">
                  <a
                    className="section-two__cta"
                    href="#booking"
                    onClick={(event) => {
                      event.preventDefault();
                      onScrollTo('booking');
                    }}
                  >
                    <span className="section-two__cta-plus">+</span>
                    <span className="section-two__cta-label">Free consultation</span>
                  </a>
                  </div>
            </div>
           </div>
            
        <div className="section-two__right">
          <figure className="section-two__big-picture">
            <img
              src="https://tattoo-website-new-updates.vercel.app/images/tattoo/dragon-koi-japanese-sleeve.jpg"
              alt="Large neck tattoo portrait"
            />
          </figure>
        </div>
      </section>
    </section>
  );
};

export default PortfolioSection;
