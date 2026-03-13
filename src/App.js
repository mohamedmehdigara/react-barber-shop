import React, { useState, useMemo, useEffect } from 'react';

// --- INLINE THEME DEFINITIONS ---
const themes = {
  dark: {
    background: '#0a0a0a',
    cardBackground: '#121212',
    text: '#fafafa',
    muted: '#71717a',
    primary: '#d4af37',
    secondary: '#18181b',
    border: '#27272a',
    success: '#22c55e'
  },
  light: {
    background: '#fafafa',
    cardBackground: '#ffffff',
    text: '#0a0a0a',
    muted: '#a1a1aa',
    primary: '#b8860b',
    secondary: '#f4f4f5',
    border: '#e4e4e7',
    success: '#16a34a'
  }
};

// --- INLINE SVG ICONS ---
const IconCut = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>
);
const IconHeart = ({ filled }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
);
const IconSun = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const IconMoon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

// --- MAIN APPLICATION COMPONENT ---
function App() {
  const [theme, setTheme] = useState('dark');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, service: null });
  const [galleryModalState, setGalleryModalState] = useState({ isOpen: false, haircut: null });
  const [favorites, setFavorites] = useState([]);
  const [schedule, setSchedule] = useState({
    'Jack R.': { '2026-03-14': ['09:00', '11:00', '14:30'] },
    'Sarah G.': { '2026-03-14': ['10:00'] }
  });
  const [bookingData, setBookingData] = useState({ name: '', barber: '', service: '', date: '', selectedTime: '' });

  const currentTheme = themes[theme];

  const services = [
    { name: "Classic Haircut", price: 30, description: "Precision cut with wash and style." },
    { name: "Hot Towel Shave", price: 25, description: "Classic straight-razor shave with steaming towels." },
    { name: "Beard Trim & Shape", price: 20, description: "Sculpting and oil treatment for your beard." },
    { name: "Haircut & Shave Combo", price: 50, description: "The full treatment for a complete refresh." },
  ];

  const barbers = [
    { name: "Jack R.", bio: "Master of fades and sharp lines.", image: "https://placehold.co/150x150/111/fff?text=Jack" },
    { name: "Sarah G.", bio: "Creative styles and modern textures.", image: "https://placehold.co/150x150/111/fff?text=Sarah" },
    { name: "David M.", bio: "Specialist in classic grooming and shaves.", image: "https://placehold.co/150x150/111/fff?text=David" }
  ];

  const haircuts = [
    { id: 1, name: "Classic Fade", image: "https://placehold.co/400x300/111/fff?text=Fade" },
    { id: 2, name: "Pompadour", image: "https://placehold.co/400x300/111/fff?text=Pomp" },
    { id: 3, name: "Buzz Cut", image: "https://placehold.co/400x300/111/fff?text=Buzz" },
  ];

  // Scheduling Logic
  const SHOP_OPEN = 9; 
  const SHOP_CLOSE = 18; 
  const BUFFER_MINUTES = 15;

  const allPossibleSlots = useMemo(() => {
    const slots = [];
    for (let hour = SHOP_OPEN; hour < SHOP_CLOSE; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const isSlotAvailable = (time) => {
    const { barber, date } = bookingData;
    if (!barber || !date || !schedule[barber] || !schedule[barber][date]) return true;
    const takenSlots = schedule[barber][date];
    const [h, m] = time.split(':').map(Number);
    const slotMinutes = h * 60 + m;
    return !takenSlots.some(taken => {
      const [th, tm] = taken.split(':').map(Number);
      const takenMinutes = th * 60 + tm;
      return Math.abs(slotMinutes - takenMinutes) < (30 + BUFFER_MINUTES);
    });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const { name, barber, date, selectedTime } = bookingData;
    if (name && barber && date && selectedTime) {
      const newSchedule = { ...schedule };
      if (!newSchedule[barber]) newSchedule[barber] = {};
      if (!newSchedule[barber][date]) newSchedule[barber][date] = [];
      newSchedule[barber][date] = [...newSchedule[barber][date], selectedTime];
      setSchedule(newSchedule);
      setIsSubmitted(true);
      setBookingData({ name: '', barber: '', service: '', date: '', selectedTime: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  const onToggleFavorite = (id) => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  // Shared Styles
  const sectionStyle = { padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' };
  const cardStyle = { backgroundColor: currentTheme.cardBackground, padding: '2rem', borderRadius: '12px', border: `1px solid ${currentTheme.border}`, textAlign: 'center' };
  const inputStyle = { width: '100%', padding: '0.8rem', borderRadius: '6px', border: `1px solid ${currentTheme.border}`, backgroundColor: currentTheme.secondary, color: currentTheme.text, marginTop: '0.5rem' };

  return (
    <div style={{ backgroundColor: currentTheme.background, color: currentTheme.text, minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1.5rem 2rem', borderBottom: `1px solid ${currentTheme.border}`, position: 'sticky', top: 0, backgroundColor: currentTheme.background, zIndex: 10 }}>
        <h1 style={{ color: currentTheme.primary, margin: 0, letterSpacing: '-1px' }}>GENTS' STANDARD</h1>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: 'none', border: 'none', color: currentTheme.text, cursor: 'pointer' }}>
          {theme === 'dark' ? <IconSun /> : <IconMoon />}
        </button>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: 'center', padding: '8rem 2rem' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '1rem' }}>The Masterclass <span style={{ color: currentTheme.primary }}>Cut.</span></h2>
        <p style={{ color: currentTheme.muted, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Real-time scheduling for the modern professional.</p>
        <a href="#booking" style={{ backgroundColor: currentTheme.primary, color: currentTheme.background, padding: '1rem 2.5rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase' }}>Book Now</a>
      </section>

      {/* BOOKING */}
      <section id="booking" style={sectionStyle}>
        <div style={{ maxWidth: '600px', margin: '0 auto', ...cardStyle }}>
          <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem' }}>Reserve Your Chair</h3>
          {isSubmitted && <div style={{ color: currentTheme.success, marginBottom: '1rem', fontWeight: 'bold' }}>Appointment Confirmed! Buffer added.</div>}
          
          <form onSubmit={handleBookingSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: currentTheme.primary }}>NAME</label>
              <input style={inputStyle} value={bookingData.name} onChange={e => setBookingData({...bookingData, name: e.target.value})} required />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: currentTheme.primary }}>BARBER</label>
                <select style={inputStyle} value={bookingData.barber} onChange={e => setBookingData({...bookingData, barber: e.target.value, selectedTime: ''})}>
                  <option value="">Select Barber</option>
                  {barbers.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: currentTheme.primary }}>DATE</label>
                <input type="date" style={inputStyle} value={bookingData.date} onChange={e => setBookingData({...bookingData, date: e.target.value, selectedTime: ''})} />
              </div>
            </div>

            {bookingData.barber && bookingData.date && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 'bold', color: currentTheme.primary, display: 'block', marginBottom: '0.5rem' }}>AVAILABLE TIMES</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.5rem' }}>
                  {allPossibleSlots.map(slot => {
                    const available = isSlotAvailable(slot);
                    const selected = bookingData.selectedTime === slot;
                    return (
                      <button key={slot} type="button" disabled={!available} onClick={() => setBookingData({...bookingData, selectedTime: slot})}
                        style={{ padding: '0.5rem', borderRadius: '4px', border: `1px solid ${selected ? currentTheme.primary : currentTheme.border}`, backgroundColor: selected ? currentTheme.primary : 'transparent', color: selected ? currentTheme.background : (available ? currentTheme.text : currentTheme.muted), cursor: available ? 'pointer' : 'not-allowed', opacity: available ? 1 : 0.4 }}>
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button type="submit" disabled={!bookingData.selectedTime} style={{ width: '100%', padding: '1rem', backgroundColor: bookingData.selectedTime ? currentTheme.primary : currentTheme.muted, color: currentTheme.background, border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
              CONFIRM BOOKING
            </button>
          </form>
        </div>
      </section>

      {/* SERVICES */}
      <section style={sectionStyle}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {services.map(s => (
            <div key={s.name} style={cardStyle}>
              <IconCut />
              <h4 style={{ margin: '1rem 0 0.5rem' }}>{s.name}</h4>
              <p style={{ color: currentTheme.primary, fontWeight: 'bold' }}>${s.price}</p>
              <button onClick={() => setModalState({ isOpen: true, service: s })} style={{ marginTop: '1rem', background: 'none', border: `1px solid ${currentTheme.primary}`, color: currentTheme.primary, padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>View Details</button>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section style={sectionStyle}>
        <h3 style={{ textAlign: 'center', marginBottom: '3rem' }}>STYLES WE MASTER</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {haircuts.map(h => (
            <div key={h.id} style={{ position: 'relative', ...cardStyle, padding: 0, overflow: 'hidden' }}>
              <img src={h.image} style={{ width: '100%', height: '250px', objectFit: 'cover' }} alt={h.name} />
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>{h.name}</span>
                <button onClick={() => onToggleFavorite(h.id)} style={{ background: 'none', border: 'none', color: favorites.includes(h.id) ? currentTheme.primary : currentTheme.muted, cursor: 'pointer' }}>
                  <IconHeart filled={favorites.includes(h.id)} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '4rem 2rem', borderTop: `1px solid ${currentTheme.border}`, color: currentTheme.muted }}>
        <p>&copy; 2026 GENTS' STANDARD GROOMING CO. | PRECISION IN EVERY CUT.</p>
      </footer>

      {/* MODAL */}
      {modalState.isOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={() => setModalState({ isOpen: false })}>
          <div style={{ ...cardStyle, maxWidth: '400px', width: '90%' }} onClick={e => e.stopPropagation()}>
            <h3>{modalState.service.name}</h3>
            <p style={{ margin: '1.5rem 0', color: currentTheme.muted }}>{modalState.service.description}</p>
            <button onClick={() => setModalState({ isOpen: false })} style={{ backgroundColor: currentTheme.primary, color: currentTheme.background, border: 'none', padding: '0.5rem 2rem', borderRadius: '4px', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;