import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BookingSection.css';  

gsap.registerPlugin(ScrollTrigger);

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  dateTime: '',
  tattooIdea: '',
  consent: false,
};

const BookingSection = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState(initialFormState);
  const [submitState, setSubmitState] = useState({
    isSubmitting: false,
    type: '',
    message: '',
  });

  const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const apiBaseUrl = rawApiBaseUrl ? rawApiBaseUrl.replace(/\/$/, '') : 'http://localhost:5000';

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
            once: true,
          },
        })
        .from('.booking-title', {
          y: 34,
          opacity: 0,
          duration: 0.82,
        })
        .from(
          '.social-grid .social-box, .text-details',
          {
            y: 28,
            opacity: 0,
            duration: 0.72,
            stagger: 0.08,
          },
          '-=0.42'
        )
        .from(
          '.booking-right',
          {
            x: 34,
            opacity: 0,
            duration: 0.85,
          },
          '-=0.48'
        )
        .from(
          '.consultation-form .form-input, .agreement-wrapper, .submit-btn',
          {
            y: 18,
            opacity: 0,
            duration: 0.56,
            stagger: 0.06,
          },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (submitState.message) {
      setSubmitState({
        isSubmitting: false,
        type: '',
        message: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.consent) {
      setSubmitState({
        isSubmitting: false,
        type: 'error',
        message: 'Please accept the privacy policy before booking.',
      });
      return;
    }

    setSubmitState({
      isSubmitting: true,
      type: '',
      message: '',
    });

    try {
      const response = await fetch(`${apiBaseUrl}/api/book-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          dateTime: formData.dateTime.trim(),
          tattooIdea: formData.tattooIdea.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Booking request failed.');
      }

      setSubmitState({
        isSubmitting: false,
        type: 'success',
        message: data.message || 'Booking request sent successfully!',
      });
      setFormData(initialFormState);
    } catch (error) {
      setSubmitState({
        isSubmitting: false,
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'We could not send your booking request right now. Please try again.',
      });
    }
  };

  return (
    <section className="booking-section" id="booking" ref={sectionRef}>
      <div className="booking-container">
        
        {/* Left Column: Typography & Info */}
        <div className="booking-left">
          <h1 className="booking-title">Book Your<br />Free<br />Consultation</h1>

          <div className="booking-details">
            {/* 2x2 Social Media Grid */}
            <div className="social-grid">
              <a href="https://www.instagram.com/thehouseoftattoos_?igsh=MWV1cjBzMzBhOW42cg==https://www.instagram.com" className="social-box box-ig">
                <a className="social-name " style={{textDecoration: 'none', color:'black' }} href="https://www.instagram.com/thehouseoftattoos_?igsh=MWV1cjBzMzBhOW42cg==https://www.instagram.com">
                  Instagram
                </a>
                <span className="red-plus">+</span>
              </a>
              <a href="https://wa.me/919009148003" className="social-box box-yt">
                <span className="social-name" href="https://wa.me/919009148003">
                  Whatsapp
                </span>
                <span className="red-plus">+</span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61567062790342" className="social-box box-fb">
                <span className="social-name" href="https://www.facebook.com/profile.php?id=61567062790342">
                  Facebook
                </span>
                <span className="red-plus">+</span>
              </a>
            </div>

            {/* Contact & Text Area */}
            <div className="text-details">
              <div className="contact-group">
                <span className="grey-plus">+</span>
                <div className="contact-links">
                  <a href="mailto:prashanttheophil65@gmail.com">prashanttheophil65@gmail.com</a>
                  <a href="tel:+919009148003">+91 90091 48003</a>
                </div>
              </div>

              <p className="motivation-text">
                Don't wait, book your consultation<br />
                slots are still available.<br />
                Your transformation<br />
                starts here!
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Consultation Form */}
        <div className="booking-right">
          <p className="intro-text">
            After you submit the form, I'll contact you personally to discuss your idea, answer your questions, and guide you through the process.
          </p>

          <form className="consultation-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              className="form-input"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Email address*"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder="Phone number*"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="dateTime"
              className="form-input"
              placeholder="Preferred Date & Time*"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
            <textarea
              name="tattooIdea"
              className="form-input form-textarea"
              placeholder="Tattoo idea*"
              value={formData.tattooIdea}
              onChange={handleChange}
              required
            />

            <div className="agreement-wrapper">
              <label className="agreement-label">
                <input
                  type="checkbox"
                  name="consent"
                  className="agreement-checkbox"
                  checked={formData.consent}
                  onChange={handleChange}
                  required
                />
                <span className="custom-checkbox" aria-hidden="true"></span>
                <span className="agreement-text">
                  By submitting this form, you agree to the <a href="#privacy" className="privacy-link">Privacy Policy</a>.
                </span>
              </label>
            </div>

            {submitState.message ? (
              <p className={`form-status ${submitState.type}`} aria-live="polite">
                {submitState.message}
              </p>
            ) : null}

            <button type="submit" className="submit-btn" disabled={submitState.isSubmitting}>
              <span>{submitState.isSubmitting ? 'Sending...' : 'Book Now'}</span>
              {/* Inline SVG matching the distinct blocky arrow */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default BookingSection;
