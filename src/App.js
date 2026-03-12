import React, { useState, useEffect, useRef } from 'react';

// --- STYLES (Standard CSS) ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Playfair+Display:ital,wght@1,900&display=swap');

  :root {
    --gold: #d4af37;
    --black: #0a0a0a;
    --zinc-900: #18181b;
    --zinc-800: #27272a;
    --zinc-500: #71717a;
    --white: #fafafa;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: var(--black);
    color: var(--white);
    overflow-x: hidden;
    transition: background-color 0.5s ease;
  }

  .light-mode {
    --black: #fafafa;
    --white: #0a0a0a;
    --zinc-900: #f4f4f5;
    --zinc-800: #e4e4e7;
  }

  /* Grainy Texture */
  .texture-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    opacity: 0.03;
    z-index: 9999;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  /* Nav */
  nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    padding: 1.5rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.4s ease;
  }

  nav.scrolled {
    padding: 1rem 3rem;
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -1px;
    color: var(--gold);
    font-size: 1.25rem;
  }

  /* Hero */
  .hero {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    padding: 0 1rem;
  }

  .hero-tag {
    font-size: 10px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    border: 1px solid rgba(212, 175, 55, 0.3);
    padding: 6px 16px;
    border-radius: 99px;
    color: var(--gold);
    margin-bottom: 2rem;
  }

  .hero h1 {
    font-size: clamp(3rem, 12vw, 9rem);
    font-weight: 900;
    line-height: 0.85;
    text-transform: uppercase;
    letter-spacing: -4px;
    margin-bottom: 1.5rem;
  }

  .hero h1 span {
    color: var(--gold);
    font-family: 'Playfair Display', serif;
    font-style: italic;
  }

  .hero p {
    max-width: 500px;
    font-size: 1.1rem;
    color: var(--zinc-500);
    line-height: 1.6;
  }

  /* Buttons */
  .btn-primary {
    background: var(--gold);
    color: black;
    border: none;
    padding: 1.25rem 2.5rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 2rem;
  }

  .btn-primary:hover {
    background: white;
    transform: translateY(-2px);
  }

  /* Services Grid */
  .services-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 10rem 2rem;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 4rem;
  }

  @media (max-width: 768px) {
    .services-section { grid-template-columns: 1fr; }
    nav { padding: 1.5rem; }
  }

  .service-card {
    background: rgba(24, 24, 27, 0.3);
    border: 1px solid var(--zinc-900);
    padding: 2rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: 0.3s;
  }

  .service-card:hover {
    background: var(--zinc-900);
    border-color: var(--gold);
  }

  .price {
    font-size: 1.5rem;
    font-weight: 900;
    color: var(--gold);
  }

  /* Large background text */
  .bg-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 30vw;
    font-weight: 900;
    color: var(--gold);
    opacity: 0.03;
    z-index: -1;
    pointer-events: none;
  }
`;

const ScissorsIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><line x1="20" y1="4" x2="8.12" y2="15.88" /><line x1="14.47" y1="14.48" x2="20" y2="20" /><line x1="8.12" y1="8.12" x2="12" y2="12" />
  </svg>
);

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { title: "Signature Cut", price: 45, desc: "Wash, precision cut & style" },
    { title: "Artisan Shave", price: 35, desc: "Hot towel straight-edge shave" },
    { title: "Beard Sculpt", price: 25, desc: "Shape, trim and oil treatment" },
    { title: "Full Groom", price: 90, desc: "The works - Hair, beard and shave" }
  ];

  return (
    <div className={isDark ? 'dark-mode' : 'light-mode'}>
      <style>{styles}</style>
      
      <div className="texture-overlay" />

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="logo">
          <ScissorsIcon />
          <span>Gents' Standard</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <button 
            onClick={() => setIsDark(!isDark)}
            style={{ 
              background: 'none', 
              border: 'none', 
              fontSize: '1.5rem', 
              cursor: 'pointer' 
            }}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
          <span style={{ fontSize: '10px', fontWeight: '900', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Book Now
          </span>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-tag">EST. 1992 — LONDON</div>
        <h1>THE NEW <br/><span>Standard.</span></h1>
        <p>Bespoke barbering for the modern professional. Tradition meets precision in the heart of the city.</p>
        <button className="btn-primary">Reserve Your Chair</button>
        <div className="bg-text">GENTS</div>
      </section>

      <section className="services-section">
        <div>
          <h2 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1 }}>Our<br/>Craft</h2>
          <p style={{ marginTop: '2rem', color: 'var(--zinc-500)' }}>Every service is finished with our signature hot towel and scalp massage.</p>
        </div>
        
        <div>
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div>
                <h3 style={{ textTransform: 'uppercase', fontWeight: 900 }}>{s.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--zinc-500)', marginTop: '4px' }}>{s.desc}</p>
              </div>
              <div className="price">${s.price}</div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '4rem 2rem', borderTop: '1px solid var(--zinc-900)', textAlign: 'center' }}>
        <div className="logo" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Gents' Standard</div>
        <p style={{ fontSize: '10px', opacity: 0.5 }}>&copy; 2024 PRECISION GROOMING GROUP</p>
      </footer>
    </div>
  );
};

export default App;