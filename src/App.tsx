import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Heart, Calendar, MapPin, Phone, 
  Instagram, MessageCircle, Info, Send, User,
  ChevronDown, Check, Copy, ExternalLink, AlertCircle,
  LogOut, Sparkles, CheckCircle2, ShieldCheck, Loader2
} from 'lucide-react';

export interface GuestBookEntry {
  id: string;
  name: string;
  relation?: string;
  avatarUrl?: string;
  message: string;
  createdAt: string;
}

// --- Components ---

const Navbar = ({ 
  onOpenGuestBook, 
  lang, 
  setLang,
}: { 
  onOpenGuestBook: () => void; 
  lang: 'en' | 'hi'; 
  setLang: (l: 'en' | 'hi') => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: lang === 'en' ? 'Home' : 'होम', href: '#home' },
    { name: lang === 'en' ? 'Events' : 'कार्यक्रम', href: '#events' },
    { name: lang === 'en' ? 'Venue' : 'स्थान', href: '#venue' },
    { name: lang === 'en' ? 'Contact' : 'संपर्क', href: '#contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-wedding-red text-wedding-cream shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-3 font-serif text-xl md:text-2xl font-bold tracking-wider">
              <img 
                src="https://lh3.googleusercontent.com/d/1YqrB3fokOc1baaywTmZp8sRG-bcYDCLq" 
                alt="Lord Ganesha" 
                className="h-10 w-10 md:h-12 md:w-12 drop-shadow-lg"
                referrerPolicy="no-referrer"
              />
              <span>{lang === 'en' ? 'Shiv & Shwati' : 'शिव और श्वाति'}</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} className="hover:text-wedding-saffron transition-colors uppercase text-xs tracking-widest font-medium">
                  {item.name}
                </a>
              ))}
              <button 
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="border border-wedding-gold px-3 py-1 rounded-md text-xs font-bold hover:bg-wedding-gold hover:text-wedding-red transition-all cursor-pointer"
              >
                {lang === 'en' ? 'HINDI' : 'ENGLISH'}
              </button>

              <button 
                onClick={onOpenGuestBook}
                className="bg-wedding-gold text-wedding-red px-5 py-2 rounded-full font-bold hover:bg-wedding-saffron transition-all text-sm cursor-pointer shadow-md flex items-center gap-2"
              >
                <Heart size={15} className="fill-wedding-red" />
                <span>{lang === 'en' ? 'Guest Book' : 'अतिथि पुस्तिका'}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button 
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="text-xs font-bold border border-wedding-gold px-2 py-1 rounded"
              >
                {lang === 'en' ? 'HI' : 'EN'}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-wedding-red border-t border-wedding-gold/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 text-base font-medium hover:bg-wedding-gold/10 text-center border-b border-wedding-gold/10"
                  >
                    {item.name}
                  </a>
                ))}

                <button 
                  onClick={() => { onOpenGuestBook(); setIsOpen(false); }}
                  className="w-full py-3 text-wedding-saffron font-bold text-center border-b border-wedding-gold/10 flex items-center justify-center gap-2"
                >
                  <Heart size={16} className="fill-wedding-saffron" />
                  <span>{lang === 'en' ? 'Guest Book' : 'अतिथि पुस्तिका'}</span>
                </button>
                <a 
                  href="https://wa.me/917665607016?text=Congratulations%20Shiv%20and%20Shwati!%20🎉"
                  className="block w-full py-3 text-green-400 font-bold text-center"
                >
                  {lang === 'en' ? 'Send Congratulations 🎉' : 'बधाई भेजें 🎉'}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Fixed Mantra Box */}
      <div className="mantra-box">
        <div className="animate-marquee">
          <span className="px-4">|| श्री गणेशाय नमः || &nbsp;&nbsp;&nbsp;&nbsp; || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ, निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वद: || &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="px-4">|| श्री गणेशाय नमः || &nbsp;&nbsp;&nbsp;&nbsp; || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ, निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वद: || &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="px-4">|| श्री गणेशाय नमः || &nbsp;&nbsp;&nbsp;&nbsp; || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ, निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वद: || &nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span className="px-4">|| श्री गणेशाय नमः || &nbsp;&nbsp;&nbsp;&nbsp; || वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ, निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वद: || &nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>
    </>
  );
};

const Hero = ({ lang }: { lang: 'en' | 'hi' }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="home" className="relative w-full h-auto aspect-video md:h-screen flex items-center justify-center overflow-hidden bg-black mt-24 md:mt-0">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {!isLoaded && (
          <div className="absolute inset-0 bg-stone-950 flex flex-col items-center justify-center text-wedding-gold gap-3 z-0">
            <div className="w-10 h-10 border-4 border-wedding-gold/20 border-t-wedding-gold rounded-full animate-spin"></div>
            <span className="text-xs font-serif tracking-widest text-wedding-gold/80">|| शुभ विवाह ||</span>
          </div>
        )}
        <img 
          src="https://lh3.googleusercontent.com/d/1O11J1s6tV7OGcbwh5lpPSDop0YhkGyuJ" 
          alt="Wedding Background" 
          className={`w-full h-full object-contain md:object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          loading="eager"
          onLoad={() => setIsLoaded(true)}
        />
        {/* Red Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-wedding-red via-wedding-red/40 to-transparent opacity-30 pointer-events-none z-10"></div>
      </div>

      {/* Animated Scroll Icon */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 10 }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-10 text-wedding-gold flex flex-col items-center gap-1 pointer-events-none"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Scroll</span>
        <ChevronDown size={24} className="drop-shadow-lg" />
      </motion.div>
    </section>
  );
};

const Events = ({ lang }: { lang: 'en' | 'hi' }) => {
  const events = [
    {
      title: lang === 'en' ? "Tilak Ceremony" : "शुभ तिलक",
      date: lang === 'en' ? "21 November 2026" : "21 नवंबर 2026",
      time: lang === 'en' ? "Evening" : "शाम",
      icon: <Heart className="text-wedding-red" />,
      description: lang === 'en' 
        ? "The auspicious Tilak ceremony marking the beginning of our journey."
        : "हमारी यात्रा की शुरुआत का प्रतीक शुभ तिलक समारोह।"
    },
    {
      title: lang === 'en' ? "Haldi Kalash" : "शुभ हल्दी कलश",
      date: lang === 'en' ? "24 November 2026" : "24 नवंबर 2026",
      time: lang === 'en' ? "Morning" : "सुबह",
      icon: <Send className="text-wedding-red" />,
      description: lang === 'en'
        ? "A vibrant celebration filled with turmeric, love, and laughter."
        : "हल्दी, प्यार और हंसी से भरा एक जीवंत उत्सव।"
    },
    {
      title: lang === 'en' ? "Wedding Ceremony" : "शुभ विवाह महोत्सव",
      date: lang === 'en' ? "25 November 2026" : "25 नवंबर 2026",
      time: lang === 'en' ? "Auspicious Muhurat" : "शुभ मुहूर्त",
      icon: <Heart className="text-wedding-red" fill="currentColor" />,
      description: lang === 'en'
        ? "The grand wedding ceremony where we unite as one forever."
        : "भव्य विवाह समारोह जहाँ हम हमेशा के लिए एक हो जाते हैं।"
    }
  ];

  return (
    <section id="events" className="py-20 bg-wedding-cream relative">
      <div className="mandala-bg absolute inset-0"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-wedding-red mb-4">
            {lang === 'en' ? 'Wedding Ceremonies' : 'शादी के कार्यक्रम'}
          </h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-wedding-gold text-center"
            >
              <div className="w-16 h-16 bg-wedding-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                {event.icon}
              </div>
              <h3 className="text-2xl font-bold text-wedding-red mb-2">{event.title}</h3>
              <p className="text-wedding-gold font-bold mb-4">{event.date}</p>
              <p className="text-stone-600 mb-4">{event.time}</p>
              <p className="text-stone-500 italic">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Venue = ({ lang }: { lang: 'en' | 'hi' }) => {
  return (
    <section id="venue" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000" 
              alt="Venue" 
              className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-wedding-red mb-6">
              {lang === 'en' ? 'Venue Details' : 'स्थान का विवरण'}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 justify-center md:justify-start">
                <MapPin className="text-wedding-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl">{lang === 'en' ? 'Address' : 'पता'}</h4>
                  <p className="text-stone-600">
                    Vishnupuri Colony, Near Bengali Ashram<br />
                    Gaya, Bihar - 823001
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 justify-center md:justify-start">
                <Calendar className="text-wedding-gold shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-xl">{lang === 'en' ? 'Dates' : 'तारीखें'}</h4>
                  <p className="text-stone-600">
                    {lang === 'en' ? '21st, 24th & 25th November 2026' : '21, 24 और 25 नवंबर 2026'}
                  </p>
                </div>
              </div>
              <a 
                href="https://www.google.com/maps/search/Vishnupuri+Colony+Near+Bengali+Ashram+Gaya"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-wedding-red text-wedding-cream px-8 py-3 rounded-full font-bold hover:bg-wedding-gold hover:text-wedding-red transition-all shadow-lg"
              >
                {lang === 'en' ? 'Get Directions' : 'रास्ता देखें'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ lang }: { lang: 'en' | 'hi' }) => {
  const [showRaviInfo, setShowRaviInfo] = useState(false);

  const contacts = [
    {
      name: lang === 'en' ? "Dr. Shiv Shankar" : "डॉ. शिव शंकर",
      role: lang === 'en' ? "The Groom" : "दूल्हा",
      image: "https://lh3.googleusercontent.com/d/1cONvY3X18lMvXytC11B3mCMUv04jFkRQ",
      phone: "7665607016",
      wa: "7665607016",
      insta: "https://www.instagram.com/doc_shiv_shankar?igsh=YW8zbzlqczUzN29m",
      special: true
    },
    {
      name: lang === 'en' ? "Dr. Ravi Shankar" : "डॉ. रवि शंकर",
      role: lang === 'en' ? "Dulhe Ka Bhai 😎" : "दूल्हे का भाई 😎",
      image: "https://lh3.googleusercontent.com/d/19rCFSE5AQt_Y2rqJgAktlZOgeA6vFBpG",
      phone: "8271890090",
      wa: "8271890090",
      moreInfo: true
    },
    {
      name: lang === 'en' ? "Shri Shatrughan Sharma" : "श्री शत्रुघ्न शर्मा",
      role: lang === 'en' ? "Grandfather (बाबा)" : "बाबा (दादाजी)",
      image: "https://lh3.googleusercontent.com/d/1VP97x2XWrUNCGWn6MwU646uFNc4KA3ka",
      phone: "6207256504",
      wa: "6207256504"
    },
    {
      name: lang === 'en' ? "Er. Manish Kumar" : "इंजी. मनीष कुमार",
      role: lang === 'en' ? "Uncle (चाचा)" : "चाचा (अंकल)",
      image: "https://lh3.googleusercontent.com/d/14eF9K2b_lAjj46O-7MfDLmZxIlAhH0lg",
      phone: "7301120825",
      wa: "7301120825"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-wedding-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-wedding-red mb-4">
            {lang === 'en' ? 'Contact Us' : 'संपर्क करें'}
          </h2>
          <div className="w-24 h-1 bg-wedding-gold mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {contacts.map((contact, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-lg border border-wedding-gold/20 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-wedding-gold/20 flex items-center justify-center overflow-hidden shrink-0 border-2 border-wedding-gold/30">
                  {contact.image ? (
                    <img src={contact.image} alt={contact.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    <User size={28} className="text-wedding-red" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-wedding-red leading-tight">{contact.name}</h3>
                  <p className="text-xs text-stone-500 italic">{contact.role}</p>
                </div>
              </div>
              <div className="space-y-3 flex-grow">
                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-stone-700 hover:text-wedding-red transition-colors">
                  <Phone size={16} className="text-wedding-gold" />
                  <span>{contact.phone}</span>
                </a>
                <a href={`https://wa.me/91${contact.wa}`} className="flex items-center gap-3 text-sm text-stone-700 hover:text-green-600 transition-colors">
                  <MessageCircle size={16} className="text-green-500" />
                  <span>WhatsApp</span>
                </a>
                {contact.insta && (
                  <a href={contact.insta} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-stone-700 hover:text-pink-600 transition-colors">
                    <Instagram size={16} className="text-pink-500" />
                    <span>Instagram</span>
                  </a>
                )}
              </div>

              {contact.moreInfo && (
                <div className="mt-4">
                  <button 
                    onClick={() => setShowRaviInfo(!showRaviInfo)}
                    className="flex items-center gap-2 text-wedding-red font-bold text-xs hover:underline"
                  >
                    <Info size={14} />
                    {lang === 'en' ? 'Want to know more?' : 'मेरे बारे में जानें?'}
                  </button>

                  <AnimatePresence>
                    {showRaviInfo && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-wedding-gold/10 rounded-xl border-l-2 border-wedding-gold text-[10px]"
                      >
                        <p className="font-bold text-wedding-red mb-1">
                          {lang === 'en' ? 'Dr. Ravi Shankar Kumar' : 'डॉ. रवि शंकर कुमार'}
                        </p>
                        <ul className="space-y-1 text-stone-700">
                          <li>
                            <span className="font-bold">{lang === 'en' ? 'Role:' : 'भूमिका:'}</span> 
                            {lang === 'en' ? ' The Crisis Manager' : ' संकट प्रबंधक (भाई का यार, सबका मददगार)'}
                          </li>
                          <li>
                            <span className="font-bold">{lang === 'en' ? 'Specialty:' : 'विशेषता:'}</span> 
                            {lang === 'en' ? " Groom's Guardian! 🏃‍♂️" : ' यह सुनिश्चित करना कि दूल्हा भाग न जाए! 🏃‍♂️'}
                          </li>
                          <li>
                            <span className="font-bold">{lang === 'en' ? 'Status:' : 'स्थिति:'}</span> 
                            {lang === 'en' ? ' Solution Expert.' : ' सेल्फी या समाधान के लिए हमेशा उपलब्ध।'}
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GuestBookModal = ({ 
  isOpen, 
  onClose, 
  lang,
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  lang: 'en' | 'hi';
}) => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [message, setMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [relation, setRelation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchEntries = async () => {
    try {
      setLoadingEntries(true);
      const res = await fetch('/api/guestbook');
      if (res.ok) {
        const data = await res.json();
        setEntries(data.entries || []);
      }
    } catch (e) {
      console.error('Failed to load guestbook:', e);
    } finally {
      setLoadingEntries(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchEntries();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message.trim(),
          name: guestName.trim() || undefined,
          relation: relation.trim() || undefined
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.entry) {
          setEntries(prev => [data.entry, ...prev]);
        }
        setMessage('');
        setGuestName('');
        setRelation('');
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 4000);
      }
    } catch (err) {
      console.error('Failed to post blessing:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return (name.trim()[0] || 'W').toUpperCase();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative bg-wedding-cream w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border-2 border-wedding-gold"
          >
            {/* Header */}
            <div className="bg-wedding-red px-6 py-4 text-wedding-cream flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <Heart className="text-wedding-gold fill-wedding-gold" size={24} />
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold">
                    {lang === 'en' ? 'Wedding Guest Book' : 'शुभ विवाह अतिथि पुस्तिका'}
                  </h3>
                  <p className="text-xs text-wedding-cream/80">
                    {lang === 'en' ? 'Dr. Shiv Shankar & Dr. Shwati' : 'डॉ. शिव शंकर और डॉ. श्वाति'}
                  </p>
                </div>
              </div>
              <button 
                onClick={onClose} 
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={22} />
              </button>
            </div>

            {/* Content Container */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              
              {/* Introduction Banner */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-wedding-gold/40 shadow-sm text-center space-y-1.5">
                <p className="text-xs uppercase font-serif tracking-widest text-wedding-gold font-bold">
                  || ॐ श्री गणेशाय नमः ||
                </p>
                <h4 className="font-bold text-wedding-red text-base sm:text-lg font-serif">
                  {lang === 'en' ? 'Bless the Newlyweds' : 'वर-वधू को अपना आशीर्वाद दें'}
                </h4>
                <p className="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed">
                  {lang === 'en'
                    ? 'Write your warm wishes, prayers and blessings directly into our wedding guestbook. Your words will remain cherished with us forever.'
                    : 'हमारे विवाह के पावन अवसर पर अपने मंगल वचनों और शुभकामनाओं से हमें अनुगृहीत करें।'}
                </p>
              </div>

              {/* Write Blessing Form */}
              <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-wedding-gold/30 shadow-md space-y-3.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-wedding-red flex items-center gap-1.5">
                    <Sparkles size={14} className="text-wedding-gold" />
                    <span>{lang === 'en' ? 'Write Your Blessing' : 'शुभकामनाएं व मंगल संदेश लिखें'}</span>
                  </label>
                  {submitSuccess && (
                    <span className="text-xs text-green-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      <span>{lang === 'en' ? 'Blessing published with love!' : 'आपका संदेश सफलतापूर्वक जुड़ गया!'}</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      {lang === 'en' ? 'Your Name' : 'आपका नाम'} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'en' ? 'e.g., Rajesh Sharma' : 'उदा. राजेश शर्मा'}
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">
                      {lang === 'en' ? 'Relation or City' : 'संबंध या शहर (वैकल्पिक)'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'en' ? 'e.g., College Friend, Patna' : 'उदा. कॉलेज मित्र, पटना'}
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-stone-600 mb-1">
                    {lang === 'en' ? 'Your Message & Blessings' : 'आपका शुभकामना संदेश'} *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder={
                      lang === 'en'
                        ? 'Dear Shiv & Shwati, wishing you a lifetime of love, laughter, and eternal togetherness!...'
                        : 'प्रिय शिव और श्वाति, आपको वैवाहिक जीवन की हार्दिक बधाई और असीम मंगलकामनाएं!...'
                    }
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3.5 text-xs sm:text-sm border border-stone-200 rounded-xl focus:outline-none focus:border-wedding-gold focus:ring-1 focus:ring-wedding-gold resize-none leading-relaxed bg-stone-50/50"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <a
                    href="https://wa.me/917665607016?text=Dear%20Shiv%20and%20Shwati,%20here%20is%20my%20wedding%20blessing:%20"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-1.5 order-2 sm:order-1"
                  >
                    <MessageCircle size={15} />
                    <span>{lang === 'en' ? 'Or send directly via WhatsApp' : 'या सीधे व्हाट्सएप पर भेजें'}</span>
                  </a>

                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim() || !guestName.trim()}
                    className="w-full sm:w-auto order-1 sm:order-2 flex items-center justify-center gap-2 bg-wedding-red text-wedding-cream px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-wedding-red/90 transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 size={14} className="animate-spin text-wedding-gold" />
                    ) : (
                      <Send size={14} />
                    )}
                    <span>{lang === 'en' ? 'Send Blessings' : 'आशीर्वाद प्रेषित करें'}</span>
                  </button>
                </div>
              </form>

              {/* List of Blessings */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {lang === 'en' ? `Guest Blessings (${entries.length})` : `अतिथियों के आशीर्वाद संदेश (${entries.length})`}
                  </h4>
                  <span className="text-[11px] text-wedding-gold font-serif">|| सदा सुहागन रहो ||</span>
                </div>

                {loadingEntries ? (
                  <div className="text-center py-8">
                    <Loader2 size={24} className="animate-spin text-wedding-gold mx-auto" />
                  </div>
                ) : entries.length === 0 ? (
                  <div className="text-center py-8 text-stone-400 text-xs italic bg-white/50 rounded-2xl border border-dashed border-stone-200">
                    {lang === 'en' ? 'Be the first to leave a blessing!' : 'सबसे पहले अपना आशीर्वाद दें!'}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {entries.map((entry) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-4 rounded-2xl border border-wedding-gold/25 shadow-sm space-y-2 hover:border-wedding-gold/50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            {entry.avatarUrl ? (
                              <img
                                src={entry.avatarUrl}
                                alt={entry.name}
                                className="w-9 h-9 rounded-full object-cover border border-wedding-gold/40 shadow-sm"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-wedding-red text-wedding-cream flex items-center justify-center font-bold text-xs border border-wedding-gold/40 shadow-sm">
                                {getInitials(entry.name)}
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs sm:text-sm text-stone-800">{entry.name}</span>
                                {entry.relation && (
                                  <span className="text-[10px] text-wedding-red font-medium bg-wedding-red/10 px-2 py-0.5 rounded-full border border-wedding-gold/20">
                                    {entry.relation}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] text-stone-400">
                            {new Date(entry.createdAt).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pl-11">
                          {entry.message}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('hi'); // Default to Hindi as per theme
  const [showLangPopup, setShowLangPopup] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-20 right-4 z-[250] max-w-sm p-4 rounded-2xl shadow-2xl border text-xs font-medium flex items-center gap-3 ${
              toast.type === 'success' 
                ? 'bg-stone-900 text-white border-green-500/50' 
                : toast.type === 'error'
                ? 'bg-stone-900 text-white border-red-500/50'
                : 'bg-stone-900 text-white border-wedding-gold/50'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-wedding-gold shrink-0" />}
            <span className="flex-1">{toast.message}</span>
            <button onClick={() => setToast(null)} className="text-stone-400 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLangPopup && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLangPopup(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-wedding-cream w-full max-w-md rounded-3xl shadow-2xl overflow-hidden p-8 text-center border-2 border-wedding-gold"
            >
              <button 
                onClick={() => setShowLangPopup(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-wedding-red p-2 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <img 
                src="https://lh3.googleusercontent.com/d/1YqrB3fokOc1baaywTmZp8sRG-bcYDCLq" 
                alt="Lord Ganesha" 
                className="h-24 w-24 mx-auto mb-6 drop-shadow-xl"
                referrerPolicy="no-referrer"
              />
              <h3 className="text-3xl font-serif font-bold text-wedding-red mb-2">
                भाषा चयन करें
              </h3>
              <p className="text-stone-600 mb-8">Select Your Preferred Language</p>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => { setLang('hi'); setShowLangPopup(false); }}
                  className="bg-wedding-red text-wedding-cream py-4 rounded-2xl font-bold text-xl hover:bg-wedding-gold hover:text-wedding-red transition-all shadow-lg cursor-pointer"
                >
                  हिन्दी
                </button>
                <button 
                  onClick={() => { setLang('en'); setShowLangPopup(false); }}
                  className="bg-wedding-gold text-wedding-red py-4 rounded-2xl font-bold text-xl hover:bg-wedding-red hover:text-wedding-cream transition-all shadow-lg cursor-pointer"
                >
                  English
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Navbar 
        onOpenGuestBook={() => setIsGuestBookOpen(true)} 
        lang={lang} 
        setLang={setLang}
      />
      
      <main>
        <Hero lang={lang} />
        
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Heart className="mx-auto text-wedding-red" size={40} />
              <h2 className="text-3xl md:text-5xl font-serif italic text-wedding-red">
                {lang === 'en' 
                  ? '"Two souls with but a single thought, two hearts that beat as one."'
                  : '"दो आत्माएं एक ही विचार के साथ, दो दिल जो एक होकर धड़कते हैं।"'}
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                {lang === 'en'
                  ? 'We, Dr. Shiv Shankar and Dr. Shwati, cordially invite you to join us as we celebrate our love and begin our new life together. Your presence and blessings mean the world to us.'
                  : 'हम, डॉ. शिव शंकर और डॉ. श्वाति, आपको हमारे प्यार का जश्न मनाने और हमारे नए जीवन की शुरुआत करने के लिए आमंत्रित करते हैं। आपकी उपस्थिति और आशीर्वाद हमारे लिए बहुत मायने रखते हैं।'}
              </p>
            </motion.div>
          </div>
        </section>

        <Events lang={lang} />
        
        <section className="py-20 bg-wedding-red text-wedding-cream">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-serif mb-12">
              {lang === 'en' ? 'Our Journey in Pictures' : 'तस्वीरों में हमारा सफर'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=500",
                "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&q=80&w=500"
              ].map((url, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square rounded-2xl overflow-hidden shadow-xl"
                >
                  <img src={url} alt={`Wedding ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Venue lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-serif text-2xl text-wedding-gold mb-4">
            {lang === 'en' ? 'Shiv & Shwati' : 'शिव और श्वाति'}
          </p>
          <p className="mb-6">
            {lang === 'en' 
              ? 'Vishnupuri Colony, Near Bengali Ashram, Gaya (823001)'
              : 'विष्णुपूरी कॉलोनी, बंगाली आश्रम के पास, गया (823001)'}
          </p>
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://www.instagram.com/doc_shiv_shankar?igsh=YW8zbzlqczUzN29m" className="hover:text-wedding-gold transition-colors">
              <Instagram size={24} />
            </a>
            <a href="https://wa.me/917665607016" className="hover:text-wedding-gold transition-colors">
              <MessageCircle size={24} />
            </a>
          </div>
          <p className="text-sm opacity-50">© 2026 Wedding Invitation. Made with Love.</p>
        </div>
      </footer>

      <GuestBookModal 
        isOpen={isGuestBookOpen} 
        onClose={() => setIsGuestBookOpen(false)} 
        lang={lang} 
      />
    </div>
  );
}


