
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
// Added ArrowRight to imports from lucide-react
import { 
  Menu, X, Leaf, Send, Sun, ChevronUp, Construction, MapPin, 
  Instagram, Mail, Coffee, Lock, ArrowUpRight, ArrowRight, Globe, AlertTriangle
} from 'lucide-react';
import { TELEGRAM_LINK, INSTAGRAM_LINK, LOGO_URL } from '../constants.ts';
import { PackageService } from '../services/supabase.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();

  const taglines = [
    "Escape Addis",
    "Touch Grass",
    "Eat Fish",
    "No Traffic",
    "Just Chill",
    "Bird Watch",
    "Be Happy"
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Rotate tagline
    const taglineInterval = setInterval(() => {
        setTaglineIndex(prev => (prev + 1) % taglines.length);
    }, 3000);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        clearInterval(taglineInterval);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    closeMenu();
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.city, path: '/the-city' },
    { name: t.nav.packages, path: '/packages' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <>
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ${scrolled ? 'pt-4' : 'pt-6'}`}>
      <nav 
        className={`
            relative transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${scrolled || isOpen ? 'w-[92%] max-w-6xl' : 'w-[95%] max-w-7xl'}
            bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]
            rounded-[2rem] px-4 py-3
        `}
      >
        <div className="flex justify-between items-center relative z-20">
            
            {/* --- LOGO START (MODERN & FUN) --- */}
            <div 
              className="group relative flex items-center gap-3 cursor-pointer select-none pl-1" 
              onClick={handleLogoClick}
            >
                {/* 1. Animated Image Container */}
                <div className="relative">
                   {/* Fun Background Blob that appears on hover */}
                   <div className="absolute inset-0 bg-nature-200 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 scale-150"></div>
                   
                   {/* Main Image Box */}
                   <div className="relative w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden bg-white border-2 border-stone-100 shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 group-hover:border-nature-200 group-hover:shadow-nature-100/50 animate-float">
                        {!logoError ? (
                          <img 
                            src={LOGO_URL} 
                            alt="GoBishoftu" 
                            className="w-full h-full object-cover"
                            onError={() => setLogoError(true)}
                          />
                        ) : (
                          <Leaf className="text-nature-600" size={24} />
                        )}
                   </div>

                   {/* Pop-up Element: Sun Icon */}
                   <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1 opacity-0 transform scale-0 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-500 delay-100 shadow-sm z-10">
                      <Sun size={10} className="animate-spin-slow" />
                   </div>
                </div>

                {/* 2. Text & Dynamic Badge */}
                <div className="flex flex-col justify-center h-full">
                    
                    {/* Main Title */}
                    <span className="font-serif text-2xl font-black tracking-tight leading-none text-stone-900 transition-colors relative">
                       <span className="group-hover:text-nature-600 transition-colors duration-300 inline-block group-hover:translate-x-0.5">Go</span>
                       <span className="group-hover:text-stone-700 transition-colors duration-300">Bishoftu</span>
                    </span>

                    {/* Dynamic Tagline Area */}
                    <div className="h-5 relative w-36 overflow-hidden mt-0.5">
                        
                        {/* State A: Rotating Taglines (Idle) */}
                        <div className="absolute top-0 left-0 transition-all duration-500 transform group-hover:-translate-y-full group-hover:opacity-0 flex items-center gap-1.5">
                             <span className="w-1.5 h-1.5 rounded-full bg-nature-400 animate-pulse"></span>
                             <div 
                               key={taglineIndex}
                               className="text-[10px] font-bold uppercase tracking-widest text-stone-400 animate-fade-up whitespace-nowrap"
                             >
                                {taglines[taglineIndex]}
                             </div>
                        </div>

                        {/* State B: Fun Message (Hover) */}
                        <div className="absolute top-0 left-0 transition-all duration-500 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex items-center gap-1.5">
                             <span className="text-[10px] ">🚀</span>
                             <div className="text-[10px] font-black uppercase tracking-widest text-nature-600 whitespace-nowrap bg-nature-50 px-2 rounded-full border border-nature-100">
                                Let's leave.
                             </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* --- LOGO END --- */}

            {/* Desktop Menu - Magnetic Pills - Hidden on Tablet (lg breakpoint) */}
            <div className="hidden lg:flex items-center bg-stone-100/50 p-1.5 rounded-full border border-stone-200/50">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={({ isActive }) =>
                    `relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 z-10 ${
                      isActive 
                        ? 'text-stone-900 bg-white shadow-sm ring-1 ring-stone-100' 
                        : 'text-stone-500 hover:text-stone-900 hover:bg-white/50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Combined Right Actions & Mobile Toggle */}
            <div className="flex items-center gap-3">
                
                {/* Desktop/Tablet Actions (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-3">
                  {/* Language Switcher */}
                  <button 
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase transition-all"
                  >
                      <Globe size={16} />
                      {language === 'en' ? 'አማ' : 'EN'}
                  </button>

                  {/* Fun Header CTA Button - Updated */}
                  <a 
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-[42px] min-w-[160px] items-center justify-center overflow-hidden rounded-2xl bg-stone-900 px-6 text-white shadow-xl transition-all duration-300 hover:bg-[#0088cc] hover:shadow-2xl hover:shadow-[#0088cc]/30 hover:-translate-y-1 hover:rotate-1 active:scale-95"
                  >
                      {/* State 1: Default Text */}
                      <div className="absolute flex items-center gap-2 transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] group-hover:-translate-y-[200%] group-hover:skew-x-12">
                          <span className="font-bold text-xs uppercase tracking-wide">{t.nav.join}</span>
                          <Send size={14} className="text-stone-400" />
                      </div>

                      {/* State 2: Funny/Modern Text */}
                      <div className="absolute flex items-center gap-2 translate-y-[200%] skew-x-12 transition-all duration-300 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] group-hover:translate-y-0 group-hover:skew-x-0">
                          <span className="text-base animate-[wiggle_1s_ease-in-out_infinite]">👻</span>
                          <span className="font-black text-[10px] uppercase tracking-widest whitespace-nowrap">We Reply Fast!</span>
                      </div>
                  </a>
                </div>

                {/* Mobile Menu Button + Language (Visible on Mobile & Tablet) */}
                <div className="flex items-center gap-2 lg:hidden">
                  {/* Language Button - Hidden on Tablet because it's in the Right Actions block */}
                  <button 
                      onClick={toggleLanguage}
                      className="p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs uppercase transition-all md:hidden"
                    >
                      {language === 'en' ? 'አማ' : 'EN'}
                  </button>
                  <button
                    onClick={toggleMenu}
                    className={`p-3 rounded-2xl transition-all duration-300 border ${
                        isOpen ? 'bg-stone-900 text-white border-stone-900 rotate-90' : 'bg-stone-100 text-stone-800 border-stone-200 hover:bg-stone-200'
                    }`}
                  >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
            </div>

        </div>

        {/* Mobile Menu Dropdown - Expands from the island */}
        <div 
            className={`
                overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]
                ${isOpen ? 'max-h-[500px] opacity-100 mt-4 pb-2' : 'max-h-0 opacity-0'}
            `}
        >
            <div className="flex flex-col gap-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-400 pl-4 py-2 border-b border-stone-100 mb-2">
                    {t.nav.menu}
                </div>
                {navLinks.map((link, idx) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        onClick={handleLinkClick}
                        style={{ transitionDelay: `${idx * 50}ms` }}
                        className={({ isActive }) => `
                            flex items-center justify-between px-6 py-4 rounded-2xl text-lg font-bold transition-all transform
                            ${isOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}
                            ${isActive 
                                ? 'bg-nature-50 text-nature-700 shadow-sm border border-nature-100' 
                                : 'text-stone-600 hover:bg-stone-50 hover:pl-8'
                            }
                        `}
                    >
                        <span>{link.name}</span>
                        {/* Dynamic Icon per link */}
                        <span className="opacity-50">
                             {link.name === t.nav.home && <Leaf size={16} />}
                             {link.name === t.nav.packages && <Construction size={16} />}
                             {link.name === t.nav.contact && <Send size={16} />}
                             {link.name === t.nav.city && <MapPin size={16} />}
                             {link.name === t.nav.about && <Sun size={16} />}
                        </span>
                    </NavLink>
                ))}
                
                <div className="pt-4 mt-2">
                    <a 
                        href={TELEGRAM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-stone-900 text-white font-bold shadow-xl active:scale-95 transition-transform"
                    >
                        <span>{t.nav.joinMobile}</span>
                        <Send size={18} />
                    </a>
                </div>
            </div>
        </div>
      </nav>
    </div>
    
    {/* Overlay for mobile menu focus */}
    {isOpen && (
        <div 
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40 animate-fade-in"
            onClick={closeMenu}
        />
    )}
    </>
  );
};

const Footer = () => {
  const [hasPackages, setHasPackages] = useState(false);
  const [activeTagline, setActiveTagline] = useState(0);
  const { t } = useLanguage();

  const footerTaglines = [
    "“Bishoftu, but planned.”",
    "“Lakes. Coffee. No stress.”",
    "“Weekend problems, solved.”"
  ];

  useEffect(() => {
    const checkPackages = async () => {
      try {
        const pkgs = await PackageService.getActive();
        setHasPackages(pkgs.length > 0);
      } catch (e) {
        setHasPackages(false);
      }
    };
    checkPackages();

    const interval = setInterval(() => {
      setActiveTagline(prev => (prev + 1) % footerTaglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Helper to render marquee items
  const renderMarqueeContent = () => (
    <div className="animate-marquee flex gap-12 text-[9px] font-black uppercase tracking-[0.2em] items-center whitespace-nowrap text-stone-600">
      {[...Array(6)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="hover:text-nature-500 transition-colors cursor-default">{t.footer.marquee1}</span>
          <span className="opacity-20">/</span>
          <span className="hover:text-white transition-colors cursor-default">{t.footer.marquee2}</span>
          <span className="opacity-20">/</span>
          <span className="hover:text-yellow-500 transition-colors cursor-default">{t.footer.marquee3}</span>
          <span className="opacity-20">/</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <footer className="relative mt-20 bg-[#050505] text-stone-400 rounded-t-[3rem] overflow-hidden isolate">
       
       {/* Background Effects */}
       <div className="absolute top-0 left-0 w-full h-full bg-nature-950/10 pointer-events-none"></div>

       {/* SLIM MARQUEE - SEAMLESS LOOP FIX */}
       <div className="bg-stone-900/40 border-b border-stone-800/50 py-2 relative z-20 overflow-hidden flex">
           {renderMarqueeContent()}
           {renderMarqueeContent()}
       </div>

       <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 relative z-10">
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
               
               {/* COLUMN 1: BRAND + MINI WARNING */}
               <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between">
                   <div className="group cursor-default relative inline-block">
                       <h3 className="font-serif text-5xl font-black text-white tracking-tighter group-hover:skew-x-2 transition-transform duration-500 select-none">
                           GoBishoftu
                       </h3>
                       {/* Floating hover surprise sticker - Compacted */}
                       <div className="absolute -top-6 left-28 bg-nature-500 text-stone-900 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded rotate-12 opacity-0 group-hover:opacity-100 transition-all shadow-lg border-2 border-white">
                           Boo! 👻
                       </div>
                       <p className="mt-4 font-bold text-stone-500 text-xs leading-relaxed max-w-[240px] border-l border-stone-800 pl-4 group-hover:text-stone-300 transition-colors">
                           {t.footer.brandDesc}
                       </p>
                   </div>
                   
                   {/* Compact Mini Warning (Integrated Sticker) */}
                   <div className="mt-6 inline-flex items-center gap-3 bg-yellow-400 text-stone-900 px-4 py-2 rounded-xl border-2 border-stone-900 rotate-1 hover:rotate-0 transition-all cursor-help shadow-lg max-w-xs group">
                        <AlertTriangle size={16} className="flex-shrink-0" />
                        <div className="text-[9px] font-black leading-tight uppercase">
                            {t.footer.warnMsg.slice(0, 45)}...
                        </div>
                   </div>
               </div>

               {/* COLUMN 2: EXPLORE (GRID STYLE) */}
               <div className="md:col-span-6 lg:col-span-3">
                   <h4 className="font-black text-stone-700 uppercase tracking-widest text-[9px] mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-stone-700 rounded-full"></span> {t.footer.explore}
                   </h4>
                   <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                       {[
                         { name: t.nav.home, path: '/' },
                         { name: t.nav.city, path: '/the-city' },
                         { name: t.nav.packages, path: '/packages' },
                         { name: t.nav.about, path: '/about' },
                         { name: t.nav.contact, path: '/contact' }
                       ].map((item) => (
                           <Link 
                             key={item.name}
                             to={item.path} 
                             onClick={scrollToTop}
                             className="text-xs font-bold text-stone-500 hover:text-white transition-colors flex items-center gap-1 group/l"
                           >
                               <span className="group-hover/l:translate-x-1 transition-transform">{item.name}</span>
                               <ArrowUpRight size={10} className="opacity-0 group-hover/l:opacity-100 text-nature-500" />
                           </Link>
                       ))}
                   </div>
                   <p className="mt-6 text-[9px] text-stone-700 font-mono opacity-50">
                       {t.footer.exploreNote}
                   </p>
               </div>

               {/* COLUMN 3: STATUS + TELEGRAM (COMPACT) */}
               <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-4">
                    
                    {/* Status Pill */}
                    <div className="px-4 py-3 rounded-2xl bg-[#0A0A0A] border border-stone-800/50 flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${hasPackages ? 'bg-nature-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-yellow-500'}`}></div>
                            <span className="text-[10px] font-bold text-stone-400">
                                {hasPackages ? t.footer.statusOnlineTitle : t.footer.statusPendingTitle}
                            </span>
                        </div>
                        <span className="text-[8px] font-mono text-stone-700 group-hover:text-stone-500 uppercase">LVL 100</span>
                    </div>

                    {/* Telegram Quick Action - MATCHES NAVBAR STYLE BUT INVERTED */}
                    <a 
                        href={TELEGRAM_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative group block bg-white rounded-2xl p-4 transition-all hover:-translate-y-1 shadow-xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="bg-stone-900 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform">
                                   <Send size={14} />
                                </div>
                                <div>
                                    <h5 className="text-xs font-black text-stone-900 leading-none">Telegram</h5>
                                    <p className="text-[9px] font-bold text-stone-400 mt-1 uppercase tracking-tighter">Fast Replies</p>
                                </div>
                            </div>
                            <ArrowRight size={14} className="text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1 transition-all" />
                        </div>
                    </a>

                    {/* Social Mini Bar */}
                    <div className="flex gap-4 px-2">
                        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-[9px] font-bold text-stone-600 hover:text-white transition-colors flex items-center gap-1.5 group">
                           <Instagram size={12} className="group-hover:text-pink-500" /> Insta
                        </a>
                        <div className="text-[9px] font-bold text-stone-600 hover:text-white cursor-pointer transition-colors flex items-center gap-1.5 group">
                           <Mail size={12} className="group-hover:text-yellow-500" /> {t.footer.email}
                        </div>
                    </div>
               </div>
           </div>

           {/* COMPACT BOTTOM BAR */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] font-bold text-stone-700 uppercase tracking-[0.2em] pt-8 mt-10 border-t border-stone-900">
               <div className="flex flex-col md:flex-row items-center gap-4">
                   <p className="flex items-center gap-1.5 group cursor-default">
                       {t.footer.builtWith} <Coffee size={10} className="text-nature-600" /> {t.footer.builtEnd}
                   </p>
                   <span className="hidden md:block opacity-20">|</span>
                   <p>© {new Date().getFullYear()} GoBishoftu</p>
               </div>

               <div className="flex items-center gap-4">
                   <Link to="/admin" onClick={scrollToTop} className="opacity-10 hover:opacity-100 hover:text-white transition-all"><Lock size={10} /></Link>
                   <button 
                     onClick={scrollToTop}
                     className="w-10 h-10 rounded-full bg-stone-900 hover:bg-nature-600 hover:text-white flex items-center justify-center text-stone-600 transition-all shadow-lg group"
                   >
                       <ChevronUp size={16} className="group-hover:animate-bounce" />
                   </button>
               </div>
           </div>
       </div>

       {/* NOISE OVERLAY */}
       <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </footer>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-earth-50">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
