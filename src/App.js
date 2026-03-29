import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Calendar, 
  User, 
  ChevronLeft, 
  CheckCircle2, 
  Clock, 
  TrendingUp,
  Trash2,
  Sun,
  Moon,
  ShieldCheck,
  Plus,
  ArrowRight,
  Zap
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const SERVICES = [
  { id: 's1', name: 'Executive Cut', price: 55, duration: 45, category: 'Hair', icon: '✂️', desc: 'Hand-tailored precision for the modern leader.' },
  { id: 's2', name: 'The Heirloom Shave', price: 40, duration: 30, category: 'Shave', icon: '🪒', desc: 'Traditional straight-razor technique with essential oils.' },
  { id: 's3', name: 'Royal Treatment', price: 95, duration: 90, category: 'Combo', icon: '👑', desc: 'The full ensemble: Cut, Shave, Scalp, and Facial.' },
  { id: 's4', name: 'Beard Sculpt', price: 30, duration: 30, category: 'Beard', icon: '🧔', desc: 'Architectural line-work and volume management.' }
];

const ADDONS = [
  { id: 'a1', name: 'Charcoal Mask', price: 15, duration: 15 },
  { id: 'a2', name: 'Steam Treatment', price: 10, duration: 10 },
  { id: 'a3', name: 'Grey Blending', price: 25, duration: 20 }
];

const BARBERS = [
  { id: 'b1', name: 'Dominic Vane', rank: 'Master Artisan', specialty: 'Fades & Textures', image: 'DV' },
  { id: 'b2', name: 'Sarah Sterling', rank: 'Creative Director', specialty: 'Classic Scissor Work', image: 'SS' },
  { id: 'b3', name: 'Marcus Thorne', rank: 'Beard Architect', specialty: 'Facial Sculpting', image: 'MT' }
];

const TIME_SLOTS = (() => {
  const slots = [];
  for (let h = 9; h <= 18; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`, `${String(h).padStart(2, '0')}:30`);
  }
  return slots;
})();

const StatCard = ({ icon: Icon, label, value, sub }) => (
  <div className="p-6 rounded-3xl bg-white dark:bg-neutral-900 border-2 border-neutral-200 dark:border-neutral-800 flex flex-col justify-between h-full shadow-sm">
    <Icon className="text-amber-600 dark:text-amber-400 mb-6" size={24} />
    <div>
      <div className="text-3xl font-black text-neutral-900 dark:text-white">{value}</div>
      <div className="text-[11px] font-black uppercase tracking-widest text-neutral-600 dark:text-neutral-400">{label}</div>
      {sub && <div className="text-[11px] text-amber-700 dark:text-amber-500 font-bold mt-1">{sub}</div>}
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState('client');
  const [step, setStep] = useState(1);
  const [theme, setTheme] = useState('dark');
  const [bookings, setBookings] = useState([]);
  
  const [form, setForm] = useState({
    name: '',
    serviceId: '',
    addons: [],
    barberId: '',
    date: new Date().toISOString().split('T')[0],
    time: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('egc_bookings_v2');
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('egc_bookings_v2', JSON.stringify(bookings));
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [bookings, theme]);

  const currentService = SERVICES.find(s => s.id === form.serviceId);
  const totalCost = (currentService?.price || 0) + 
    form.addons.reduce((acc, id) => acc + (ADDONS.find(a => a.id === id)?.price || 0), 0);

  const isSlotBooked = (barberId, date, time) => 
    bookings.some(b => b.barberId === barberId && b.date === date && b.time === time);

  const handleServiceSelect = (id) => {
    setForm(f => ({ ...f, serviceId: id }));
    if (form.name.trim()) {
       setTimeout(() => setStep(2), 300);
    }
  };

  const handleBarberSelect = (id) => {
    setForm(f => ({ ...f, barberId: id }));
    setTimeout(() => setStep(3), 300);
  };

  const confirmBooking = () => {
    const newEntry = { ...form, id: Date.now(), total: totalCost, createdAt: new Date().toISOString() };
    setBookings([newEntry, ...bookings]);
    setStep(4);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl border-b-2 border-neutral-100 dark:border-neutral-900 bg-white/90 dark:bg-black/90 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setView('client'); setStep(1); }}>
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <Scissors size={20} className="text-black" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter uppercase italic leading-none text-black dark:text-white">Elite Grooming</h1>
              <p className="text-[10px] font-black tracking-[0.3em] text-amber-600 dark:text-amber-500 uppercase">Artisan Collective</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl flex">
              <button 
                onClick={() => setView('client')}
                className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${view === 'client' ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-md' : 'text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white'}`}
              >
                Booking
              </button>
              <button 
                onClick={() => setView('admin')}
                className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${view === 'admin' ? 'bg-white dark:bg-neutral-800 text-black dark:text-white shadow-md' : 'text-neutral-500 dark:text-neutral-500 hover:text-black dark:hover:text-white'}`}
              >
                Portal
              </button>
            </div>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-amber-600 dark:text-amber-500 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === 'client' ? (
          <div className="max-w-5xl mx-auto">
            
            {step < 4 && (
              <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="animate-in fade-in slide-in-from-left-4">
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-amber-500' : 'w-4 bg-neutral-200 dark:bg-neutral-800'}`} />
                    ))}
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none text-neutral-900 dark:text-white">
                    {step === 1 && "The Selection"}
                    {step === 2 && "The Artisan"}
                    {step === 3 && "The Schedule"}
                  </h2>
                </div>
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] text-neutral-900 dark:text-neutral-400 hover:text-amber-600 dark:hover:text-amber-500 transition-colors">
                    <ChevronLeft size={16} /> Back
                  </button>
                )}
              </header>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-6">
                <div className="lg:col-span-8 space-y-12">
                  <section className="relative">
                    <label className="text-[12px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500 block mb-6">
                      01. Identification <span className="text-neutral-400 dark:text-neutral-600 ml-2">(Required)</span>
                    </label>
                    <div className="relative group">
                      <input 
                        autoFocus
                        autoComplete="off"
                        className={`w-full bg-neutral-50 dark:bg-neutral-900/80 border-2 rounded-3xl px-8 py-6 text-3xl md:text-5xl font-black outline-none transition-all uppercase shadow-sm
                          ${form.name ? 'border-amber-500 text-neutral-900 dark:text-white ring-4 ring-amber-500/10' : 'border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white focus:border-amber-500'}
                          placeholder:text-neutral-300 dark:placeholder:text-neutral-700
                        `}
                        placeholder="ENTER FULL NAME"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                      />
                      <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        {form.name.length > 2 ? (
                          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center animate-in zoom-in">
                             <CheckCircle2 size={24} />
                          </div>
                        ) : (
                          <User size={24} className="text-neutral-300 dark:text-neutral-700" />
                        )}
                      </div>
                    </div>
                  </section>

                  <section className={form.name.length < 2 ? 'opacity-30 pointer-events-none transition-opacity' : 'transition-opacity'}>
                    <label className="text-[12px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500 block mb-6">02. Primary Service</label>
                    <div className="grid gap-4">
                      {SERVICES.map(s => (
                        <button 
                          key={s.id}
                          disabled={form.name.length < 2}
                          onClick={() => handleServiceSelect(s.id)}
                          className={`group relative p-8 rounded-[2rem] border-2 text-left transition-all ${form.serviceId === s.id ? 'border-amber-500 bg-amber-500 text-black' : 'border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50 hover:border-neutral-300 dark:hover:border-neutral-700'}`}
                        >
                          <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-6">
                              <span className="text-4xl">{s.icon}</span>
                              <div>
                                <h4 className={`font-black text-xl uppercase tracking-tight ${form.serviceId === s.id ? 'text-black' : 'text-neutral-900 dark:text-white'}`}>{s.name}</h4>
                                <p className={`text-[12px] font-bold ${form.serviceId === s.id ? 'text-black/70' : 'text-neutral-500 dark:text-neutral-400'}`}>{s.desc}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-2xl font-black ${form.serviceId === s.id ? 'text-black' : 'text-amber-600 dark:text-amber-500'}`}>${s.price}</div>
                              <div className={`text-[10px] uppercase font-black ${form.serviceId === s.id ? 'text-black/50' : 'text-neutral-400 dark:text-neutral-600'}`}>{s.duration} MINS</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-4">
                  <div className="sticky top-32 p-8 rounded-[2.5rem] border-2 border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50">
                    <h3 className="text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-8 flex items-center gap-2">
                      <Plus size={14} /> Enhancements
                    </h3>
                    <div className="space-y-3">
                      {ADDONS.map(a => (
                        <button 
                          key={a.id}
                          disabled={form.name.length < 2}
                          onClick={() => setForm(f => ({ ...f, addons: f.addons.includes(a.id) ? f.addons.filter(x => x !== a.id) : [...f.addons, a.id] }))}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${form.addons.includes(a.id) ? 'border-amber-500 bg-amber-500 text-black' : 'border-neutral-100 dark:border-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
                        >
                          <span className="text-[11px] font-black uppercase tracking-widest">{a.name}</span>
                          <span className={`text-[11px] font-black ${form.addons.includes(a.id) ? 'text-black' : 'text-amber-600 dark:text-amber-500'}`}>+${a.price}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t-2 border-neutral-200 dark:border-neutral-800 flex justify-between items-end">
                      <div className="text-[11px] font-black uppercase tracking-widest text-neutral-500">Subtotal</div>
                      <div className="text-4xl font-black text-neutral-900 dark:text-white">${totalCost}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in">
                {BARBERS.map(b => (
                  <button 
                    key={b.id}
                    onClick={() => handleBarberSelect(b.id)}
                    className={`group relative h-[450px] rounded-[3rem] border-4 transition-all overflow-hidden p-10 flex flex-col justify-between text-left ${form.barberId === b.id ? 'border-amber-500 bg-amber-500 text-black' : 'border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/40 hover:border-neutral-300 dark:hover:border-neutral-700'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-2xl transition-all ${form.barberId === b.id ? 'bg-black text-amber-500' : 'bg-amber-500 text-black'}`}>
                        {b.image}
                      </div>
                      <Zap size={24} className={form.barberId === b.id ? 'text-black' : 'text-amber-500'} />
                    </div>
                    <div>
                      <h4 className={`text-4xl font-black uppercase tracking-tighter leading-none mb-2 ${form.barberId === b.id ? 'text-black' : 'text-neutral-900 dark:text-white'}`}>{b.name}</h4>
                      <p className={`text-[11px] font-black uppercase tracking-[0.3em] mb-6 ${form.barberId === b.id ? 'text-black/70' : 'text-amber-600 dark:text-amber-500'}`}>{b.rank}</p>
                      <p className={`text-sm font-bold leading-relaxed italic border-t-2 pt-6 ${form.barberId === b.id ? 'border-black/20 text-black' : 'border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400'}`}>"{b.specialty} specialist."</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in">
                <div className="lg:col-span-8 space-y-12">
                  <section>
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500 block mb-6">01. Calendar Date</label>
                    <div className="p-8 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800">
                      <input 
                        type="date" 
                        className="w-full bg-transparent border-none text-4xl font-black uppercase tracking-tighter outline-none cursor-pointer [color-scheme:dark] text-neutral-900 dark:text-white"
                        value={form.date}
                        onChange={e => setForm({...form, date: e.target.value, time: ''})}
                      />
                    </div>
                  </section>

                  <section>
                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500 block mb-6">02. Windows</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {TIME_SLOTS.map(t => {
                        const booked = isSlotBooked(form.barberId, form.date, t);
                        const selected = form.time === t;
                        return (
                          <button
                            key={t}
                            disabled={booked}
                            onClick={() => setForm({...form, time: t})}
                            className={`py-5 rounded-2xl font-black text-sm transition-all border-2 ${
                              selected ? 'bg-amber-500 text-black border-amber-500 shadow-xl' :
                              booked ? 'opacity-20 bg-neutral-100 dark:bg-neutral-900 text-neutral-400 cursor-not-allowed border-transparent' :
                              'bg-neutral-50 dark:bg-neutral-900/50 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white hover:border-amber-500'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>

                <div className="lg:col-span-4">
                  <div className={`p-10 rounded-[3rem] border-4 transition-all sticky top-32 ${form.time ? 'border-amber-500 bg-amber-500/10' : 'border-neutral-100 dark:border-neutral-900'}`}>
                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic text-neutral-900 dark:text-white">Summary</h3>
                    <div className="space-y-8">
                      {[
                        { icon: User, label: 'Client', value: form.name || 'REQUIRED' },
                        { icon: Scissors, label: 'Service', value: currentService?.name || 'REQUIRED' },
                        { icon: Clock, label: 'Schedule', value: form.time ? `${form.date} @ ${form.time}` : 'PICK TIME' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shadow-lg">
                            <item.icon size={20} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">0{i+1}. {item.label}</p>
                            <p className="text-md font-black uppercase text-neutral-900 dark:text-white">{item.value}</p>
                          </div>
                        </div>
                      ))}

                      <div className="pt-8 border-t-2 border-neutral-200 dark:border-neutral-800">
                        <div className="flex justify-between items-center mb-10">
                          <span className="text-[11px] font-black uppercase tracking-widest text-neutral-500">Final Total</span>
                          <span className="text-4xl font-black text-neutral-900 dark:text-white">${totalCost}</span>
                        </div>
                        <button 
                          disabled={!form.time || !form.name}
                          onClick={confirmBooking}
                          className="w-full py-6 rounded-2xl bg-amber-500 text-black font-black text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-amber-500/30 disabled:opacity-30 uppercase tracking-[0.2em]"
                        >
                          Confirm Session
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-20 animate-in fade-in zoom-in">
                <div className="w-32 h-32 bg-amber-500 rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-2xl rotate-12">
                   <CheckCircle2 size={64} className="text-black -rotate-12" />
                </div>
                <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic mb-6 text-neutral-900 dark:text-white">Confirmed</h2>
                <p className="text-xl font-bold text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto mb-16 leading-relaxed">
                  Your artisan session is secured. A digital receipt has been logged.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={() => setView('admin')} className="px-12 py-5 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-black font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-transform">Registry Access</button>
                  <button onClick={() => { setStep(1); setForm({ ...form, time: '', addons: [], name: '' }); }} className="px-12 py-5 rounded-2xl bg-amber-500 text-black font-black text-[11px] uppercase tracking-widest shadow-xl hover:scale-105 transition-transform">Book Again</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* PORTAL VIEW */
          <div className="space-y-12 animate-in fade-in">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
              <div>
                <h2 className="text-7xl font-black tracking-tighter uppercase italic text-neutral-900 dark:text-white">Registry</h2>
                <p className="text-amber-600 dark:text-amber-500 font-black uppercase tracking-[0.4em] text-[12px] mt-2">Executive Overview</p>
              </div>
              <button 
                onClick={() => setBookings([])}
                className="px-8 py-4 rounded-xl bg-red-600 text-white font-black text-[11px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg"
              >
                <Trash2 size={16} /> Wipe Database
              </button>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard icon={TrendingUp} label="Gross Revenue" value={`$${bookings.reduce((a, b) => a + b.total, 0)}`} sub="Direct Deposit" />
              <StatCard icon={Calendar} label="Appointments" value={bookings.length} sub="Scheduled" />
              <StatCard icon={Clock} label="Waitlist" value="0" sub="Zero Latency" />
              <StatCard icon={ShieldCheck} label="System Status" value="Secure" sub="v4.0.2 Active" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-6">
                <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-neutral-900 dark:text-neutral-500">Live Queue</h3>
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <div className="py-40 text-center border-4 border-dashed border-neutral-100 dark:border-neutral-900 rounded-[3rem]">
                      <p className="text-neutral-300 dark:text-neutral-700 font-black uppercase tracking-widest text-[12px]">Registry is empty</p>
                    </div>
                  ) : (
                    bookings.map(b => (
                      <div key={b.id} className="group p-8 rounded-[2.5rem] bg-neutral-50 dark:bg-neutral-900/60 border-2 border-neutral-100 dark:border-neutral-800 hover:border-amber-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-amber-500 text-black rounded-2xl flex items-center justify-center font-black text-sm shadow-inner">
                            {b.time}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-black text-xl uppercase tracking-tight text-neutral-900 dark:text-white">{b.name}</h4>
                              <span className="px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-lg text-[9px] font-black uppercase tracking-widest">
                                {BARBERS.find(br => br.id === b.barberId)?.name}
                              </span>
                            </div>
                            <p className="text-[11px] font-black uppercase tracking-widest text-neutral-500">
                              {SERVICES.find(s => s.id === b.serviceId)?.name} • {b.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8 justify-between md:justify-end">
                          <div className="text-right">
                            <div className="text-3xl font-black text-neutral-900 dark:text-white">${b.total}</div>
                            <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Paid In Full</div>
                          </div>
                          <button 
                            onClick={() => setBookings(bookings.filter(bk => bk.id !== b.id))}
                            className="p-4 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="lg:col-span-4 space-y-10">
                <section>
                  <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-neutral-900 dark:text-neutral-500 mb-6">Staff Load</h3>
                  <div className="space-y-4">
                    {BARBERS.map(b => {
                      const count = bookings.filter(bk => bk.barberId === b.id).length;
                      const percentage = Math.min((count / 10) * 100, 100);
                      return (
                        <div key={b.id} className="p-8 rounded-[2rem] bg-neutral-50 dark:bg-neutral-900 border-2 border-neutral-100 dark:border-neutral-800">
                          <div className="flex justify-between items-center mb-5">
                            <div>
                              <h4 className="font-black uppercase tracking-tight text-neutral-900 dark:text-white">{b.name}</h4>
                              <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">{b.rank}</p>
                            </div>
                            <div className="text-neutral-900 dark:text-white font-black text-lg">{count}</div>
                          </div>
                          <div className="h-2 w-full bg-neutral-200 dark:bg-black rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 transition-all duration-1000" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="py-20 border-t-2 border-neutral-100 dark:border-neutral-900 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex items-center gap-2">
            <Scissors size={14} className="text-neutral-900 dark:text-white" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-neutral-900 dark:text-white">Elite Collective</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-900 dark:text-white">Proprietary Grooming Infrastructure</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .animate-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          background-color: #f59e0b;
          padding: 8px;
          cursor: pointer;
          border-radius: 8px;
        }

        /* Input caret color for better visibility */
        input {
          caret-color: #f59e0b;
        }
      `}</style>
    </div>
  );
}