import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ArtistSection.css';
import founder from '../assets/founder.png';

gsap.registerPlugin(ScrollTrigger);

const ArtistSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          '.title-block',
          '.portrait-col',
          '.note-col',
          '.statement-block',
          '.stats-wrapper',
          '.small-image-container',
          '.social-links-footer',
        ],
        { transformOrigin: 'top center' }
      );

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        })
        .from('.title-block', {
          y: 28,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          '.portrait-col',
          {
            y: 36,
            opacity: 0,
            duration: 0.85,
          },
          '-=0.45'
        )
        .from(
          '.note-col',
          {
            x: 24,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.55'
        )
        .from(
          '.statement-block, .stats-wrapper',
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          '-=0.45'
        )
        .from(
          '.small-image-container, .social-links-footer a',
          {
            y: 20,
            opacity: 0,
            duration: 0.55,
            stagger: 0.07,
          },
          '-=0.35'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="artist-section" ref={sectionRef}>
      <div className="main-container">
        
        {/* LEFT SECTION: Identity, Main Image, and Description */}
        <div className="left-side">
          <div className="title-block">
            <span className="label-top">Tattoo artist</span>
            <h2 className="main-name">PRASHANT</h2>
          </div>
          
          <div className="left-content-row">
            <div className="portrait-col">
              <img 
                src={founder}
                alt="Artist" 
                className="main-image"
              />
            </div>
            <div className="note-col">
              <p className="floating-note">
                I focus on balance longevity and clarity, so your tattoo doesn't just look strong today it stays powerful years from now.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION: Statement, Stats, Session Image, and Socials */}
        <div className="right-side">
          <div className="statement-block">
            <p className="statement-text">
              Tattooing is permanent that's why I treat it like 
              <strong> architecture, not art for the moment.</strong> 
              <span className="text-muted"> Each piece is designed to work with your anatomy, your movement, and time itself.</span>
            </p>
          </div>

          <div className="stats-col">
            <div className="stats-wrapper">
              <span className="label-small text-muted">Built over years</span>
              <div className="stat-item">
                <span>Custom pieces</span>
                <span>(700+)</span>
              </div>
              <div className="stat-item">
                <span>Successful cover-ups</span>
                <span>(100+)</span>
              </div>
              <div className="stat-item">
                <span>Years</span>
                <span>(8)</span>
              </div>
            </div>

            <div className="secondary-visual-block">
              <div className="small-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=900&q=80" 
                  alt="Tattooing" 
                />
                <span className="red-plus">+</span>
              </div>
              
              <div className="social-links-footer">
                <a href="https://wa.me/919009148003" target="_blank" rel="noopener noreferrer">
                  Whatsapp
                </a>
                <a href="https://www.facebook.com/profile.php?id=61567062790342" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                <a href="https://www.instagram.com/thehouseoftattoos_?igsh=MWV1cjBzMzBhOW42cg==https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ArtistSection;
