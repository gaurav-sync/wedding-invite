import { useState, useEffect, useRef } from 'react';
import './App.css';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronDown, 
  Heart,
  Flower2,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Language type
type Language = 'en' | 'mr';

// Translation object
const translations = {
  en: {
    blessing: 'Together with our families',
    inviteText: 'We are getting married and invite you to celebrate this special moment with us',
    dear: 'Dear',
    invitationMessage: 'Your presence will make our celebration complete',
    eventsTitle: 'Wedding Events',
    haldiTitle: 'Haldi Ceremony',
    haldiDescription: 'The sacred turmeric ceremony',
    weddingTitle: 'Wedding Ceremony',
    weddingDescription: 'The sacred wedding rituals',
    venueTitle: 'Venue',
    venueName: 'Vithai Lawns',
    getDirections: 'Get Directions',
    footerText: 'We look forward to celebrating with you!',
    withLove: 'With love,',
    scrollText: 'Join Us',
    date: 'Date',
    time: 'Time',
    may: 'May',
    pm: 'PM',
    am: 'AM',
    groomName: 'Gaurav',
    brideName: 'Sakshi',
  },
  mr: {
    blessing: 'आमच्या कुटुंबियांसह',
    inviteText: 'आम्ही विवाहबद्ध होत आहोत आणि आमच्या या खास क्षणी आपणास सामील होण्यासाठी आमंत्रित करतो',
    dear: 'प्रिय',
    invitationMessage: 'आपले उपस्थिती आमच्या आनंदात भर घालेल',
    eventsTitle: 'विवाह सोहळे',
    haldiTitle: 'हळदी समारंभ',
    haldiDescription: 'पवित्र हळदी समारंभ',
    weddingTitle: 'विवाह समारंभ',
    weddingDescription: 'पवित्र विवाह विधी',
    venueTitle: 'विवाह स्थळ',
    venueName: 'विठाई लॉन्स',
    getDirections: 'दिशा मिळवा',
    footerText: 'आम्ही आपल्यासोबत साजरा करण्यास उत्सुक आहोत!',
    withLove: 'प्रेमाने,',
    scrollText: 'सामील व्हा',
    date: 'तारीख',
    time: 'वेळ',
    may: 'मे',
    pm: 'सायंकाळी',
    am: 'सकाळी',
    groomName: 'गौरव',
    brideName: 'साक्षी',
  }
};

// Function to convert English name to Marathi (transliteration)
// function convertToMarathiName(name: string): string {
//   const marathiMap: { [key: string]: string } = {
//     'a': 'अ', 'aa': 'आ', 'i': 'इ', 'ee': 'ई', 'u': 'उ', 'oo': 'ऊ',
//     'e': 'ए', 'ai': 'ऐ', 'o': 'ओ', 'au': 'औ', 'am': 'अं', 'ah': 'अः',
//     'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
//     'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
//     't': 'ट', 'th': 'ठ', 'd': 'ड', 'dh': 'ढ', 'n': 'न', 'nn': 'ण',
//     'ta': 'त', 'tha': 'थ', 'da': 'द', 'dha': 'ध', 'na': 'न',
//     'p': 'प', 'ph': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
//     'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
//     'sh': 'श', 'shh': 'ष', 's': 'स', 'h': 'ह', 'ksh': 'क्ष', 'tr': 'त्र', 'gy': 'ज्ञ',
//     ' ': ' '
//   };
  
//   // Common name mappings for better accuracy
//   const commonNames: { [key: string]: string } = {
//     'akshay': 'अक्षय',
//     'rakhunde': 'राखुंडे',
//     'gaurav': 'गौरव',
//     'sakshi': 'साक्षी',
//     'rahul': 'राहुल',
//     'priya': 'प्रिया',
//     'amit': 'अमित',
//     'sneha': 'स्नेहा',
//     'vijay': 'विजय',
//     'pooja': 'पूजा',
//     'sanjay': 'संजय',
//     'anita': 'अनिता',
//     'rajesh': 'राजेश',
//     'meera': 'मीरा',
//     'nilesh': 'निलेश',
//     'swati': 'स्वाती',
//     'pravin': 'प्रवीण',
//     'deepa': 'दीपा',
//     'sunil': 'सुनील',
//     'kavita': 'कविता',
//   };
  
//   const lowerName = name.toLowerCase().trim();
  
//   // Check if it's a common name
//   if (commonNames[lowerName]) {
//     return commonNames[lowerName];
//   }
  
//   // Split by space and convert each part
//   const parts = lowerName.split(' ');
//   const marathiParts = parts.map(part => {
//     if (commonNames[part]) return commonNames[part];
    
//     // Simple character-by-character conversion for unknown names
//     let result = '';
//     let i = 0;
//     while (i < part.length) {
//       // Try two-character match first
//       const twoChar = part.substring(i, i + 2);
//       if (marathiMap[twoChar]) {
//         result += marathiMap[twoChar];
//         i += 2;
//       } else {
//         // Try single character
//         const oneChar = part[i];
//         result += marathiMap[oneChar] || oneChar;
//         i++;
//       }
//     }
//     return result || part;
//   });
  
//   return marathiParts.join(' ');
// }

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [guestName, setGuestName] = useState<string>('');
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const heroRef = useRef<HTMLDivElement>(null);
  
  const t = translations[language];
  
  // Get display name based on language
  // const displayName = language === 'mr' && guestName 
  //   ? convertToMarathiName(guestName)
  //   : guestName;
  
  // Format name for display (capitalize first letter of each word)
  const formattedName = guestName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang') as Language;
    const nameParam = params.get('name');
    
    if (langParam && (langParam === 'en' || langParam === 'mr')) {
      setLanguage(langParam);
    }
    
    if (nameParam) {
      setGuestName(nameParam);
    }
  }, []);

  useEffect(() => {
    // Update URL when language changes
    const params = new URLSearchParams(window.location.search);
    params.set('lang', language);
    if (guestName) {
      params.set('name', guestName);
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [language, guestName]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'mr' : 'en');
  };

  const scrollToContent = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      const top = eventsSection.getBoundingClientRect().top + window.scrollY - 40;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="wedding-invitation">
      {/* Language Toggle */}
      <button 
        className="language-toggle"
        onClick={toggleLanguage}
        aria-label="Toggle language"
      >
        <span className={language === 'en' ? 'active' : ''}>EN</span>
        <span className="divider">/</span>
        <span className={language === 'mr' ? 'active' : ''}>मराठी</span>
      </button>

      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="hero-section">
        {/* Decorative corners */}
        <div className="corner-decoration top-left">
          <img src="/floral-corner.png" alt="" />
        </div>
        <div className="corner-decoration top-right">
          <img src="/floral-corner.png" alt="" style={{ transform: 'scaleX(-1)' }} />
        </div>
        {/* <div className="corner-decoration bottom-left">
          <img src="/floral-corner.png" alt="" style={{ transform: 'scaleY(-1)' }} />
        </div> */}
        {/* <div className="corner-decoration bottom-right">
          <img src="/floral-corner.png" alt="" style={{ transform: 'scale(-1, -1)' }} />
        </div> */}

        {/* Mandala background */}
        <div className="mandala-bg">
          <img src="/mandala.png" alt="" />
        </div>

        {/* Floating petals */}
        <div className="floating-petals">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`petal petal-${i + 1}`}>
              <Flower2 size={20 + i * 4} />
            </div>
          ))}
        </div>

        <div className="hero-content">
          {/* Blessing text */}
          <div className={`blessing-text fade-in ${isVisible['hero'] ? 'visible' : ''}`}>
            <Sparkles className="sparkle-icon" size={16} />
            <span>{t.blessing}</span>
            <Sparkles className="sparkle-icon" size={16} />
          </div>

          {/* Invitation text */}
          <p className={`invite-subtext fade-in-delay-1 ${isVisible['hero'] ? 'visible' : ''}`}>
            {t.inviteText}
          </p>

          {/* Couple Names */}
          <div className={`couple-names fade-in-delay-2 ${isVisible['hero'] ? 'visible' : ''}`}>
            <span className="name groom">{t.groomName}</span>
            <span className="heart-separator">
              <Heart className="heart-icon" fill="#8B1538" />
            </span>
            <span className="name bride">{t.brideName}</span>
          </div>

          {/* Wedding Date */}
          <div className={`wedding-date fade-in-delay-4 ${isVisible['hero'] ? 'visible' : ''}`}>
            <div className="date-box">
              <span className="day">10</span>
              <span className="month">{language === 'en' ? 'May' : 'मे'}</span>
              <span className="year">2026</span>
            </div>
          </div>

          {/* Personalized Greeting */}
          {guestName && (
            <div className={`personalized-greeting fade-in-delay-5 ${isVisible['hero'] ? 'visible' : ''}`}>
              <p className="greeting-text">{t.dear} <span className="guest-name">{formattedName}</span>,</p>
              {/* {language === 'en' ? formattedName : displayName} */}
              <p className="greeting-message">{t.invitationMessage}</p>
            </div>
          )}

          {/* Scroll indicator */}
          <div className="scroll-indicator" onClick={scrollToContent}>
            <span>{t.scrollText}</span>
            <ChevronDown className="bounce" size={24} />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className={`events-section ${isVisible['events'] ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">{t.eventsTitle}</h2>
          <div className="title-decoration">
            <span className="line"></span>
            <Heart size={20} fill="#D4AF37" />
            <span className="line"></span>
          </div>
        </div>

        <div className="events-grid">
          {/* Haldi Ceremony Card */}
          <div className="event-card haldi-card">
            <div className="event-image">
              <img src="/haldi-couple.jpg" alt="Haldi Ceremony" />
              <div className="image-overlay haldi-overlay"></div>
            </div>
            <div className="event-content haldi-content">
              <div className="event-icon haldi-icon">
                <Sparkles size={32} />
              </div>
              <h3 className="event-title haldi-title">{t.haldiTitle}</h3>
              <p className="event-description haldi-description">{t.haldiDescription}</p>
              <div className="event-details haldi-details">
                <div className="detail-item">
                  <Calendar size={18} />
                  <span>9 {t.may} 2026</span>
                </div>
                <div className="detail-item">
                  <Clock size={18} />
                  <span>6:00 {t.pm}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wedding Ceremony Card */}
          <div className="event-card wedding-card">
            <div className="event-image wedding-image">
              <img src="/wedding-couple.jpg" alt="Wedding Ceremony" />
              <div className="image-overlay wedding-overlay"></div>
            </div>
            <div className="event-content wedding-content">
              <div className="event-icon wedding-icon">
                <Heart size={32} />
              </div>
              <h3 className="event-title wedding-title">{t.weddingTitle}</h3>
              <p className="event-description wedding-description">{t.weddingDescription}</p>
              <div className="event-details wedding-details">
                <div className="detail-item">
                  <Calendar size={18} />
                  <span>10 {t.may} 2026</span>
                </div>
                <div className="detail-item">
                  <Clock size={18} />
                  <span>12:35 {t.pm}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className={`location-section ${isVisible['location'] ? 'visible' : ''}`}>
        <div className="section-header">
          <h2 className="section-title">{t.venueTitle}</h2>
          <div className="title-decoration">
            <span className="line"></span>
            <MapPin size={20} fill="#D4AF37" />
            <span className="line"></span>
          </div>
        </div>

        <div className="location-content">
          <div className="location-info">
            <div className="venue-name">
              <h3>{t.venueName}</h3>
            </div>
            <div className="venue-address">
              <MapPin size={24} className="address-icon" />
              <p>
                {language === 'en' 
                  ? 'Karjat Road, Jamkhed, Maharashtra 413201'
                  : 'करजत रोड, जामखेड, महाराष्ट्र ४१३२०१'
                }
              </p>
            </div>
            <a 
              href="https://maps.app.goo.gl/GmaxyebjmHUvA4QH8?g_st=ac" 
              target="_blank" 
              rel="noopener noreferrer"
              className="directions-button"
            >
              <Button className="btn-primary">
                <MapPin size={18} />
                {t.getDirections}
              </Button>
            </a>
          </div>

          <div className="map-container">
            <iframe
              src="https://maps.google.com/maps?q=Vithai+Lawns+Jamkhed+Maharashtra&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vithai Lawns - Wedding Venue"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
        <div className="footer-content">
          <div className="footer-decoration heart">
            <Heart size={16} fill="#D4AF37" />
          </div>
          <p className="footer-text">{t.footerText}</p>
          <div className="footer-couple">
            <span className="footer-label">{t.withLove}</span>
            <span className="footer-names">{t.groomName} & {t.brideName}</span>
          </div>
          <div className="footer-decoration bottom">
            <span className="floral-line"></span>
            <Flower2 size={20} />
            <span className="floral-line"></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
