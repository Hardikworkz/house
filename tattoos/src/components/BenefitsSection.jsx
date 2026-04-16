import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BenefitSection.css';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const BenefitSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Desktop Animation
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
        defaults: { ease: 'power3.out' }
      })
      .from('.benefit-header .main-title', { y: 28, opacity: 0, duration: 0.7 })
      .from('.benefit-header .sub-description', { x: 28, opacity: 0, duration: 0.72 }, '-=0.42')
      .from('.benefit-grid .grid-item', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.26')
      .from('.floating-card', { y: 30, rotate: -7, opacity: 0, duration: 0.92 }, '-=0.48');
    });

    mm.add("(max-width: 1023px)", () => {
      // Mobile Animation (No rotation)
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
        defaults: { ease: 'power3.out' }
      })
      .from('.benefit-header .main-title', { y: 20, opacity: 0, duration: 0.6 })
      .from('.benefit-header .sub-description', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.benefit-grid .grid-item', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.3')
      .from('.floating-card', { y: 20, opacity: 0, duration: 0.7 }, '-=0.3');
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="benefit-section" ref={sectionRef} id="benefits">
      <div className="benefit-container">
        
        {/* Top Header Row */}
        <div className="benefit-header">
          <h2 className="main-title">
            WHAT<br />YOU GET
          </h2>
          <p className="sub-description">
            Every session is built around comfort and precision, 
            modern numbing, medical-grade sterility, and a design 
            process that starts and ends with your vision.
          </p>
        </div>

        {/* Main Grid & Floating Card Wrapper */}
        <div className="benefit-content-wrapper">
          
          {/* 3-Column Grid */}
          <div className="benefit-grid">
            
            {/* Card 1 */}
            <div className="grid-item">
              <div className="icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12,3 22,20 2,20" />
                </svg>
              </div>
              <h3 className="item-title">RELAXED SESSIONS</h3>
              <p className="item-desc">
                Advanced numbing and calm studio vibe, most clients say it's easier than a dentist visit.
              </p>
            </div>

            {/* Card 2 */}
            <div className="grid-item">
              <div className="icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="4" y="4" width="16" height="16" />
                </svg>
              </div>
              <h3 className="item-title">COMPLETELY SAFE</h3>
              <p className="item-desc">
                Single-use equipment, UV sterilization, full disposable setup. Your health comes first, always.
              </p>
            </div>

            {/* Card 3 */}
            <div className="grid-item">
              <div className="icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="8" />
                </svg>
              </div>
              <h3 className="item-title">BESPOKE DESIGN</h3>
              <p className="item-desc">
                Every line drawn exclusively for you. We refine until it's perfect, no ready-made flashes.
              </p>
            </div>

          </div>

          {/* Floating / Tilted Card */}
          <div className="floating-card">
            <div className="icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </div>
            <h3 className="item-title">BUILT TO LAST</h3>
            <p className="item-desc">
              Free lifetime touch-ups included. Your tattoo stays crisp and meaningful for decades.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BenefitSection;