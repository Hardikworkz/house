import { useState } from 'react';
import './faqSection.css';

export default function FaqSection({ faqs }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="faq-section section-shell" id="faq">
      <div className="faq-layout">
        <div className="faq-side reveal-left">
          <h2 className="display-title">FAQ</h2>
          <p>Everything you need to know before booking.</p>
        </div>

        <div className="faq-list reveal-right">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <button
                className={`faq-item${isOpen ? ' open' : ''}`}
                key={faq.q}
                type="button"
                onClick={() => setOpenFaq(isOpen ? -1 : index)}
              >
                <span className="faq-question">{faq.q}</span>
                <span className="faq-toggle">{isOpen ? '-' : '+'}</span>
                <span className="faq-answer">{faq.a}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
