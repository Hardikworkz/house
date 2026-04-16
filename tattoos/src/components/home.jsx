import { useEffect } from 'react';
import ArtistSection from './ArtistSection';
import Navbar from './Navbar';
import PortfolioSection from './PortfolioSection';
import BenefitsSection from './BenefitsSection';
import ReviewsSection from './ReviewsSection';
import FaqSection from './FaqSection';
import BookingSection from './BookingSection';
import FooterSection from './FooterSection';
import './home.css';

const navItems = [
  { label: 'About me', id: 'about' },
  { label: 'Portfolio', id: 'portfolio' },
  { label: 'Results', id: 'results' },
  { label: 'Reviews', id: 'reviews' },
  { label: 'Faq', id: 'faq' },
];

const artistStats = [
  { label: 'Custom pieces', value: '(700+)' },
  { label: 'Successful cover-ups', value: '(100+)' },
  { label: 'Years', value: '(8)' },
];

const benefits = [
  {
    icon: 'triangle',
    title: 'Relaxed sessions',
    text: 'Advanced numbing and calm studio flow make most sessions feel easier than clients expect.',
  },
  {
    icon: 'square',
    title: 'Completely safe',
    text: 'Single-use equipment, UV sterilization, and full disposable setup keep every appointment clean.',
  },
  {
    icon: 'circle',
    title: 'Bespoke design',
    text: 'Every line is drawn for you, then refined until the piece fits your body and story exactly.',
  },
];

const faqs = [
  {
    q: 'DOES IT HURT?',
    a: 'It depends on placement and your pain tolerance, but most sessions are comfortable with modern numbing support. We keep the process calm, paced, and collaborative.',
  },
  {
    q: 'HOW SAFE IS THE PROCESS?',
    a: 'Safety is built into every step with sterile setup, single-use needles, fresh disposables, and strict hygiene standards throughout the session.',
  },
  {
    q: "WHAT'S THE PRICE RANGE?",
    a: 'Small tattoos start lower, while larger custom work is quoted after consultation. We price around design complexity, placement, and time.',
  },
  {
    q: 'HOW LONG DOES IT TAKE TO HEAL?',
    a: 'Most tattoos settle on the surface in two to three weeks, with deeper healing continuing after that. We give full aftercare guidance after every appointment.',
  },
  {
    q: 'DO YOU DO CUSTOM DESIGNS?',
    a: 'Yes. Custom work is the core of the studio. Every concept is developed around your idea, anatomy, and the way the tattoo should age over time.',
  },
  {
    q: "WHAT IF I DON'T LIKE THE DESIGN?",
    a: 'We refine it before the tattoo starts. Nothing moves forward until the design feels right and you are fully confident in the direction.',
  },
];

const reviewCards = [
  {
    type: 'image',
    className: 'review-card image review-image-left',
    src: 'https://images.unsplash.com/photo-1590246814883-57c511e82023?auto=format&fit=crop&w=900&q=80',
    alt: 'Tattooed client covering face',
  },
  {
    type: 'text',
    className: 'review-card text review-card-wide',
    name: 'Anna Kowalska',
    text: 'The whole process was so calm and thoughtful. The design feels like it was made for me because it actually was.',
    date: '10.08.25',
  },
  {
    type: 'image',
    className: 'review-card image review-image-right',
    src: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?auto=format&fit=crop&w=900&q=80',
    alt: 'Tattoo sleeve portrait',
  },
  {
    type: 'text',
    className: 'review-card text',
    name: 'Sofia Rossi',
    text: 'I was nervous about a big piece, but the numbing support and pacing made it feel completely manageable.',
    date: '13.01.26',
  },
  {
    type: 'image',
    className: 'review-card image',
    src: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=700&q=80',
    alt: 'Profile tattoo portrait',
  },
  {
    type: 'text',
    className: 'review-card text',
    name: 'James Carter',
    text: 'Clean lines, smart placement, and great communication from the first consultation to the healed result.',
    date: '24.03.25',
  },
  {
    type: 'text',
    className: 'review-card text',
    name: 'Elena Petrova',
    text: 'Super calm studio. No panic, no pressure, just solid guidance and a tattoo I still love every day.',
    date: '17.02.26',
  },
  {
    type: 'plus',
    className: 'review-card plus',
  },
  {
    type: 'text',
    className: 'review-card text review-card-large-text',
    name: 'Michael Thompson',
    text: 'Cover-up work was flawless. They understood exactly what needed to disappear and what needed to remain powerful.',
    date: '10.01.26',
  },
  {
    type: 'cta',
    className: 'review-card cta',
  },
  {
    type: 'image',
    className: 'review-card image',
    src: 'https://images.unsplash.com/photo-1562962230-16f9df5a3e5c?auto=format&fit=crop&w=700&q=80',
    alt: 'Tattoo portrait detail',
  },
];

const socialLinks = ['Instagram', 'YouTube', 'Facebook'];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.14 }
    );

    document
      .querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="hot-site">
      <main>
        <Navbar navItems={navItems} onScrollTo={scrollToId} />
        <ArtistSection artistStats={artistStats} socialLinks={socialLinks} />
        <PortfolioSection onScrollTo={scrollToId} />
        <BenefitsSection benefits={benefits} onScrollTo={scrollToId} />
        <ReviewsSection reviewCards={reviewCards} onScrollTo={scrollToId} />
        <FaqSection faqs={faqs} />
        <BookingSection />
        <FooterSection />
      </main>
    </div>
  );
}
