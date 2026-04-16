import React from 'react';
import './ReviewSection.css';

const reviews = [
  { id: 1, type: 'img', src: 'https://tattoo-website-new-updates.vercel.app/images/tattoo/butterfly-hand-tattoo.jpg' },
  { id: 2, type: 'text', name: 'Anna Kowalska', text: 'The whole process was so calm and professional. No pain at all, and the design is exactly what I dreamed of.', date: '10.08.25' },
  { id: 3, type: 'img', src: 'https://tattoo-website-new-updates.vercel.app/images/tattoo/mandala-tattoo-design-ideas.jpg', span: 'col-22' },
  { id: 4, type: 'text', name: 'Sofia Rossi', text: 'I was nervous about a big piece, but the numbing was perfect and he listened to every detail.', date: '13.01.26' },
  { id: 5, type: 'img', src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&q=80&w=800' },
  { id: 6, type: 'text', name: 'James Carter', text: 'Clean lines, zero issues, and the sketch session was fun. Worth every euro.', date: '24.12.25' },
  { id: 7, type: 'text', name: 'Elena Petrova', text: 'Super clean and delicate work. No pain, quick session, and it\'s my favorite thing on my body.', date: '17.10.24' },
  { id: 8, type: 'decor', content: '+' },
  { id: 9, type: 'text', name: 'Michael Thompson', text: 'Cover-up was flawless. He understood my story and made it better than I imagined.', date: '10.01.26' },
  { id: 10, type: 'cta', label: 'View all' },
  { id: 11, type: 'img', src: 'https://tattoo-website-new-updates.vercel.app/images/tattoo/nature-tattoo-human-earth-bond.jpg' },
];

const ReviewSection = () => {
  return (
    <section className="review-section">
      <div className="review-header">
        <h2 className="header-title">CLIENT<br />REVIEWS</h2>
        <p className="header-sub">Real stories from<br />real people</p>
      </div>

      <div className="review-grid">
        {reviews.map((item) => (
          <div key={item.id} className={`grid-box ${item.span || ''} ${item.type}`}>
            {item.type === 'img' && <img src={item.src} alt="Client" />}
            
            {item.type === 'text' && (
              <div className="text-content">
                <h3 className="client-name">{item.name}</h3>
                <p className="client-text">{item.text}</p>
                <span className="client-date">{item.date}</span>
              </div>
            )}

            {item.type === 'decor' && (
              <div className="decor-box">
                <span className="plus tl">+</span>
                <span className="plus tr">+</span>
                <span className="plus center">+</span>
                <span className="plus bl">+</span>
                <span className="plus br">+</span>
              </div>
            )}

            {item.type === 'cta' && (
              <div className="cta-circle">
                <span className="plus-small">+</span>
                <span className="cta-text">{item.label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReviewSection;