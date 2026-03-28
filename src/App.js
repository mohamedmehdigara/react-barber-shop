import React, { useState, useMemo, useEffect, useCallback, useReducer } from 'react';
import { 
  Scissors, 
  Calendar, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Trash2,
  Moon,
  Sun
} from 'lucide-react';

// --- 1. SETTINGS & BUSINESS RULES ---
const APP_KEY = "enterprise_barber_v3";
const SERVICES = [
  { id: 's1', name: 'Master Haircut', price: 45, duration: 45, icon: <Scissors size={18}/> },
  { id: 's2', name: 'Signature Shave', price: 35, duration: 30, icon: <Clock size={18}/> },
  { id: 's3', name: 'The Collective Combo', price: 70, duration: 75, icon: <CheckCircle2 size={18}/> },
  { id: 's4', name: 'Beard Sculpting', price: 25, duration: 30, icon: <Scissors size={18}/> }
];

const BARBERS = [
  { id: 'b1', name: 'Marcus Aurelius', rank: 'Master', bio: 'Specialist in classic silhouettes.' },
  { id: 'b2', name: 'Elena Fisher', rank: 'Senior', bio: 'Expert in modern texture and fades.' },
  { id: 'b3', name: 'Julian Vane', rank: 'Artisan', bio: 'The region\'s premier beard architect.' }
];

// --- 2. THEME DEFINITIONS ---
const THEMES = {
  dark: { bg: '#050505', card: '#111111', accent: '#d4af37', text: '#ffffff', secondary: '#888888', border: '#222222' },
  light: { bg: '#f9f9f9', card: '#ffffff', accent: '#a16207', text: '#0a0a0a', secondary: '#666666', border: '#e5e5e5' }
};

// --- 3. STATE MANAGEMENT (REDUCER) ---
const initialState = {
  bookings: JSON.parse(localStorage.getItem(APP_KEY)) || {},
  view: 'client',
  step: 1,
  theme: 'dark'
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_VIEW':
      return { ...state, view: action.payload, step: 1 };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'ADD_BOOKING': {
      const { barberId, date, time, serviceId, name } = action.payload;
      const updated = { ...state.bookings };
      if (!updated[barberId]) updated[barberId] = {};
      if (!updated[barberId][date]) updated[barberId][date] = [];
      
      updated[barberId][date].push({ id: crypto.randomUUID(), time, serviceId, name, timestamp: Date.now() });
      localStorage.setItem(APP_KEY, JSON.stringify(updated));
      return { ...state, bookings: updated, step: 4 };
    }
    case 'CANCEL_BOOKING': {
      const { barberId, date, id } = action.payload;
      const updated = { ...state.bookings };
      updated[barberId][date] = updated[barberId][date].filter(b => b.id !== id);
      localStorage.setItem(APP_KEY, JSON.stringify(updated));
      return { ...state, bookings: { ...updated } };
    }
    default: return state;
  }
}

// --- 4. CORE APPLICATION ---
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form, setForm] = useState({ name: '', serviceId: 's1', barberId: '', date: '', time: '' });
  const theme = THEMES[state.theme];

  // Calculated Time Slots (9 AM - 7 PM)
  const availableSlots = useMemo(() => {
    const slots = [];
    for (let h = 9; h < 19; h++) {
      slots.push(`${String(h).padStart(2, '0')}:00`, `${String(h).padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  const isSlotTaken = useCallback((barberId, date, time) => {
    return state.bookings[barberId]?.[date]?.some(b => b.time === time);
  }, [state.bookings]);

  // Analytics Helpers
  const stats = useMemo(() => {
    let total = 0;
    let revenue = 0;
    Object.values(state.bookings).forEach(barber => {
      Object.values(barber).forEach(day => {
        total += day.length;
        day.forEach(b => {
          const s = SERVICES.find(srv => srv.id === b.serviceId);
          revenue += (s?.price || 0);
        });
      });
    });
    return { total, revenue };
  }, [state.bookings]);

  // UI Components
  const Card = ({ children, active, onClick, style }) => (
    <div 
      onClick={onClick}
      style={{ 
        background: theme.card, border: `1px solid ${active ? theme.accent : theme.border}`,
        padding: '1.5rem', borderRadius: '16px', cursor: 'pointer', transition: '0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative', overflow: 'hidden', ...style
      }}
    >
      {active && <div style={{ position: 'absolute', top: 0, right: 0, width: '40px', height: '40px', background: theme.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottomLeftRadius: '12px' }}><CheckCircle2 size={16} color={theme.bg}/></div>}
      {children}
    </div>
  );

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100vh', transition: '0.5s', fontFamily: 'Inter, sans-serif' }}>
      
      {/* HEADER */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 5%', borderBottom: `1px solid ${theme.border}`, position: 'sticky', top: 0, background: theme.bg + 'ee', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: theme.accent, width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Scissors size={18} color={theme.bg}/>
          </div>
          <h1 style={{ fontWeight: 900, letterSpacing: '-1px', margin: 0 }}>COLLECTIVE <span style={{ color: theme.accent }}>PRO</span></h1>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', background: theme.border, padding: '4px', borderRadius: '12px' }}>
          <button 
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'client' })}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: state.view === 'client' ? theme.card : 'transparent', color: theme.text, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Calendar size={16}/> Booking
          </button>
          <button 
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'admin' })}
            style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: state.view === 'admin' ? theme.card : 'transparent', color: theme.text, cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <LayoutDashboard size={16}/> Dashboard
          </button>
          <button 
            onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
            style={{ width: '40px', borderRadius: '8px', border: 'none', background: 'transparent', color: theme.text, cursor: 'pointer' }}
          >
            {state.theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem' }}>
        
        {state.view === 'client' ? (
          <div style={{ animation: 'fadeIn 0.6s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <span style={{ color: theme.accent, fontWeight: 800, fontSize: '0.75rem', letterSpacing: '2px' }}>STEP 0{state.step} OF 03</span>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, margin: '0.5rem 0' }}>{
                  state.step === 1 ? "Start your journey." : 
                  state.step === 2 ? "Select your artisan." : 
                  "Secure your window."
                }</h2>
              </div>
              {state.step > 1 && state.step < 4 && (
                <button 
                  onClick={() => dispatch({ type: 'SET_STEP', payload: state.step - 1 })}
                  style={{ background: 'none', border: `1px solid ${theme.border}`, color: theme.text, padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <ChevronLeft size={18}/> Back
                </button>
              )}
            </div>

            {/* STEP 1: IDENTITY & SERVICE */}
            {state.step === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <label style={{ fontWeight: 800, fontSize: '0.8rem', color: theme.secondary }}>FULL LEGAL NAME</label>
                  <input 
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="e.g. Alexander Hamilton"
                    style={{ background: theme.card, border: `1px solid ${theme.border}`, padding: '1.5rem', borderRadius: '16px', color: theme.text, fontSize: '1.2rem', outline: 'none' }}
                  />
                  <div style={{ marginTop: '1rem' }}>
                    <p style={{ opacity: 0.5, fontSize: '0.9rem', lineHeight: 1.6 }}>Your data is stored locally in your browser. We prioritize your privacy and performance.</p>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  {SERVICES.map(s => (
                    <Card key={s.id} active={form.serviceId === s.id} onClick={() => setForm({...form, serviceId: s.id})}>
                      <div style={{ color: theme.accent, marginBottom: '0.5rem' }}>{s.icon}</div>
                      <div style={{ fontWeight: 800 }}>{s.name}</div>
                      <div style={{ fontSize: '0.8rem', color: theme.secondary }}>{s.duration} mins • ${s.price}</div>
                    </Card>
                  ))}
                  <button 
                    disabled={!form.name || !form.serviceId}
                    onClick={() => dispatch({ type: 'SET_STEP', payload: 2 })}
                    style={{ gridColumn: 'span 2', padding: '1.2rem', borderRadius: '12px', background: theme.accent, color: theme.bg, fontWeight: 900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: form.name ? 1 : 0.3 }}
                  >
                    CONTINUE <ChevronRight size={18}/>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: BARBER SELECTION */}
            {state.step === 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {BARBERS.map(b => (
                  <Card key={b.id} active={form.barberId === b.id} onClick={() => setForm({...form, barberId: b.id})}>
                    <div style={{ width: '60px', height: '60px', background: theme.border, borderRadius: '50%', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={30} color={theme.secondary}/></div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{b.name}</div>
                    <div style={{ color: theme.accent, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{b.rank} Artisan</div>
                    <p style={{ fontSize: '0.85rem', color: theme.secondary, margin: 0 }}>{b.bio}</p>
                    {form.barberId === b.id && (
                      <button 
                        onClick={() => dispatch({ type: 'SET_STEP', payload: 3 })}
                        style={{ width: '100%', marginTop: '1.5rem', background: theme.accent, color: theme.bg, border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                      >
                        SELECT
                      </button>
                    )}
                  </Card>
                ))}
              </div>
            )}

            {/* STEP 3: SCHEDULING */}
            {state.step === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem' }}>
                <div>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                    style={{ width: '100%', background: theme.card, border: `1px solid ${theme.border}`, padding: '1.2rem', borderRadius: '12px', color: theme.text, marginBottom: '2rem' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    {availableSlots.map(slot => {
                      const taken = isSlotTaken(form.barberId, form.date, slot);
                      return (
                        <button 
                          key={slot}
                          disabled={taken || !form.date}
                          onClick={() => setForm({...form, time: slot})}
                          style={{ 
                            padding: '12px 5px', borderRadius: '8px', border: `1px solid ${form.time === slot ? theme.accent : theme.border}`,
                            background: form.time === slot ? theme.accent : 'transparent',
                            color: form.time === slot ? theme.bg : (taken ? theme.border : theme.text),
                            cursor: taken ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: '0.8rem'
                          }}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div style={{ background: theme.card, padding: '2rem', borderRadius: '24px', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <h3 style={{ margin: 0 }}>Review Details</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: theme.secondary }}>Client</span>
                    <span style={{ fontWeight: 700 }}>{form.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: theme.secondary }}>Professional</span>
                    <span style={{ fontWeight: 700 }}>{BARBERS.find(b => b.id === form.barberId)?.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: theme.secondary }}>Service</span>
                    <span style={{ fontWeight: 700 }}>{SERVICES.find(s => s.id === form.serviceId)?.name}</span>
                  </div>
                  <div style={{ height: '1px', background: theme.border }}/>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                    <span style={{ fontWeight: 800 }}>Total</span>
                    <span style={{ color: theme.accent, fontWeight: 800 }}>${SERVICES.find(s => s.id === form.serviceId)?.price}</span>
                  </div>
                  <button 
                    disabled={!form.time}
                    onClick={() => dispatch({ type: 'ADD_BOOKING', payload: form })}
                    style={{ width: '100%', padding: '1.2rem', borderRadius: '12px', background: theme.accent, color: theme.bg, fontWeight: 900, border: 'none', cursor: 'pointer', marginTop: '1rem', opacity: form.time ? 1 : 0.3 }}
                  >
                    FINALIZE APPOINTMENT
                  </button>
                </div>
              </div>
            )}

            {state.step === 4 && (
              <div style={{ textAlign: 'center', padding: '5rem 0', animation: 'fadeIn 0.8s ease' }}>
                <div style={{ width: '80px', height: '80px', background: theme.accent, borderRadius: '50%', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={40} color={theme.bg}/>
                </div>
                <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Awaiting your arrival.</h2>
                <p style={{ color: theme.secondary, maxWidth: '400px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>Your reservation has been logged into the collective ledger. We recommend arriving 5 minutes early.</p>
                <button 
                  onClick={() => dispatch({ type: 'SET_STEP', payload: 1 })}
                  style={{ background: theme.border, color: theme.text, border: 'none', padding: '15px 30px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Book Another Session
                </button>
              </div>
            )}
          </div>
        ) : (
          /* DASHBOARD VIEW */
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: theme.card, padding: '2rem', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                <TrendingUp color={theme.accent} style={{ marginBottom: '1rem' }}/>
                <div style={{ fontSize: '2rem', fontWeight: 900 }}>${stats.revenue}</div>
                <div style={{ color: theme.secondary, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Gross Revenue</div>
              </div>
              <div style={{ background: theme.card, padding: '2rem', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                <Calendar color={theme.accent} style={{ marginBottom: '1rem' }}/>
                <div style={{ fontSize: '2rem', fontWeight: 900 }}>{stats.total}</div>
                <div style={{ color: theme.secondary, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Active Bookings</div>
              </div>
              <div style={{ background: theme.card, padding: '2rem', borderRadius: '20px', border: `1px solid ${theme.border}` }}>
                <Clock color={theme.accent} style={{ marginBottom: '1rem' }}/>
                <div style={{ fontSize: '2rem', fontWeight: 900 }}>96%</div>
                <div style={{ color: theme.secondary, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Capacity Efficiency</div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '2rem' }}>
              {BARBERS.map(barber => (
                <div key={barber.id} style={{ background: theme.card, borderRadius: '24px', border: `1px solid ${theme.border}`, padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{barber.name}</h3>
                    <span style={{ background: theme.bg, padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800, border: `1px solid ${theme.border}` }}>{barber.rank.toUpperCase()}</span>
                  </div>
                  
                  {Object.entries(state.bookings[barber.id] || {}).length === 0 ? (
                    <div style={{ opacity: 0.3, padding: '2rem', textAlign: 'center', border: `2px dashed ${theme.border}`, borderRadius: '16px' }}>No upcoming sessions.</div>
                  ) : (
                    Object.entries(state.bookings[barber.id]).map(([date, items]) => (
                      <div key={date} style={{ marginBottom: '1.5rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 900, color: theme.secondary, textTransform: 'uppercase', marginBottom: '0.8rem', borderBottom: `1px solid ${theme.border}`, paddingBottom: '4px' }}>{date}</div>
                        <div style={{ display: 'grid', gap: '8px' }}>
                          {items.map(item => (
                            <div key={item.id} style={{ background: theme.bg, padding: '1rem', borderRadius: '12px', border: `1px solid ${theme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ fontWeight: 800, width: '60px' }}>{item.time}</div>
                                <div>
                                  <div style={{ fontWeight: 700 }}>{item.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: theme.accent }}>{SERVICES.find(s => s.id === item.serviceId)?.name}</div>
                                </div>
                              </div>
                              <button 
                                onClick={() => dispatch({ type: 'CANCEL_BOOKING', payload: { barberId: barber.id, date, id: item.id } })}
                                style={{ background: 'none', border: 'none', color: '#ff4b4b', cursor: 'pointer', padding: '8px' }}
                              >
                                <Trash2 size={18}/>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: ${state.theme === 'dark' ? 'invert(1)' : 'none'};
        }
      `}</style>
    </div>
  );
}