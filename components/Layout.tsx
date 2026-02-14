
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Leaf, Send, Sun, ChevronUp, Construction, MapPin, 
  Instagram, Mail, Coffee, Lock, ArrowUpRight, Globe, AlertTriangle
} from 'lucide-react';
import { TELEGRAM_LINK, INSTAGRAM_LINK, LOGO_URL } from '../constants';
import { PackageService } from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';

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

                  {/* Fun Header CTA Button */}
                  <a 
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-2xl bg-stone-900 px-6 py-3 text-white shadow-xl transition-all duration-300 hover:bg-stone-800 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0"
                  >
                      {/* Plane Animation */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                          <Send size={18} className="animate-[float_1s_ease-in-out_infinite] text-nature-400" />
                      </div>

                      <div className="flex items-center gap-2 group-hover:opacity-0 transition-opacity duration-200">
                          <span className="font-bold text-xs uppercase tracking-wide">{t.nav.join}</span>
                          <Send size={14} className="text-stone-400" />
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

  return (
    <footer className="relative mt-32 bg-[#050505] text-stone-400 rounded-t-[3rem] md:rounded-t-[5rem] overflow-hidden isolate">
       
       {/* Background Effects */}
       <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-nature-900/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-stone-800/30 rounded-full blur-[100px] pointer-events-none"></div>

       {/* MARQUEE - Tech/Dark Style */}
       <div className="bg-stone-900/50 backdrop-blur-sm border-y border-stone-800 py-3 relative z-20 overflow-hidden transform -rotate-1 scale-[1.01]">
           <div className="animate-marquee flex gap-12 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] items-center whitespace-nowrap text-stone-500 select-none">
               {[...Array(8)].map((_, i) => (
                   <React.Fragment key={i}>
                       <span className="flex items-center gap-2 text-stone-600 hover:text-nature-500 transition-colors cursor-default">{t.footer.marquee1}</span>
                       <span className="text-stone-800 text-[8px]">●</span>
                       <span className="text-stone-600 hover:text-white transition-colors cursor-default">{t.footer.marquee2}</span>
                       <span className="text-stone-800 text-[8px]">●</span>
                       <span className="text-stone-600 hover:text-yellow-500 transition-colors cursor-default">{t.footer.marquee3}</span>
                       <span className="text-stone-800 text-[8px]">●</span>
                   </React.Fragment>
               ))}
           </div>
       </div>

       <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-12 relative z-10">
           
           <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
               
               {/* BRAND IDENTITY - Massive & Fun */}
               <div className="md:col-span-12 lg:col-span-5 flex flex-col justify-between">
                   <div className="group cursor-default relative">
                       <h3 className="font-serif text-5xl md:text-7xl font-black text-white tracking-tighter group-hover:skew-x-3 transition-transform duration-500 origin-bottom-left select-none mix-blend-difference">
                           GoBishoftu
                       </h3>
                       
                       {/* Hidden hover surprise sticker */}
                       <div className="absolute -top-8 left-32 bg-nature-500 text-stone-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border-2 border-white">
                           Boo! 👻
                       </div>

                       <div className="mt-8 pl-6 border-l-2 border-stone-800 group-hover:border-nature-500 transition-colors duration-500">
                          <p className="font-bold text-stone-500 text-sm leading-relaxed max-w-xs group-hover:text-stone-300 transition-colors duration-300">
                              {t.footer.brandDesc}
                          </p>
                       </div>
                   </div>
                   
                   {/* Tagline Console */}
                   <div className="mt-12 inline-flex items-center gap-4 px-5 py-4 rounded-2xl bg-[#0A0A0A] border border-stone-800/50 hover:border-stone-700 transition-colors w-fit">
                       <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-stone-700 group-hover:bg-red-500 transition-colors duration-500"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-stone-700 group-hover:bg-yellow-500 transition-colors duration-500 delay-75"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-stone-700 group-hover:bg-green-500 transition-colors duration-500 delay-150"></div>
                       </div>
                       <p key={activeTagline} className="text-xs font-mono font-bold text-stone-400 animate-fade-up whitespace-nowrap">
                           {`> ${footerTaglines[activeTagline]}`}
                       </p>
                   </div>
               </div>

               {/* NAVIGATION - List Style */}
               <div className="md:col-span-6 lg:col-span-3 pt-4">
                   <h4 className="font-black text-stone-700 uppercase tracking-widest text-[10px] mb-8 flex items-center gap-2">
                      <span className="w-2 h-2 bg-stone-700 rounded-full animate-pulse"></span> {t.footer.explore}
                   </h4>
                   <ul className="space-y-4">
                       {[
                         { name: t.nav.home, path: '/' },
                         { name: t.nav.city, path: '/the-city' },
                         { name: t.nav.packages, path: '/packages' },
                         { name: t.nav.about, path: '/about' },
                         { name: t.nav.contact, path: '/contact' }
                       ].map((item) => (
                           <li key={item.name} className="relative group/link">
                               <Link 
                                 to={item.path} 
                                 onClick={scrollToTop}
                                 className="flex items-center justify-between text-lg font-bold text-stone-500 hover:text-white transition-colors"
                               >
                                   <span className="group-hover/link:translate-x-2 transition-transform duration-300">{item.name}</span>
                                   <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover/link:translate-x-0 group-hover/link:opacity-100 text-nature-500 transition-all duration-300" />
                               </Link>
                           </li>
                       ))}
                   </ul>
                   <div className="mt-8 pt-4 border-t border-stone-900/50">
                       <p className="text-[10px] text-stone-600 font-mono flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
                           <span className="text-nature-600 font-bold">root@bishoftu:~$</span> {t.footer.exploreNote}
                       </p>
                   </div>
               </div>

               {/* WIDGETS - Tech / Inverted */}
               <div className="md:col-span-6 lg:col-span-4 flex flex-col gap-6">
                    
                    {/* Status Widget - Dark Tech Look */}
                    <div className="p-6 rounded-[2rem] bg-[#0A0A0A] border border-stone-800/50 hover:border-nature-900/50 transition-colors group relative overflow-hidden">
                        {/* Scanline effect */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent bg-[length:100%_4px] pointer-events-none"></div>
                        
                        <div className="flex justify-between items-start mb-6">
                            <span className="font-black text-stone-700 uppercase tracking-widest text-[10px]">{t.footer.status}</span>
                            <div className={`w-2 h-2 rounded-full ${hasPackages ? 'bg-nature-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'} animate-pulse`}></div>
                        </div>
                        {hasPackages ? (
                             <div>
                                <p className="font-bold text-white text-lg mb-1">{t.footer.statusOnlineTitle}</p>
                                <p className="text-[10px] text-stone-500 font-mono">{t.footer.statusOnlineDesc}</p>
                             </div>
                        ) : (
                             <div>
                                <p className="font-bold text-white text-lg mb-1">{t.footer.statusPendingTitle}</p>
                                <p className="text-[10px] text-stone-500 font-mono">{t.footer.statusPendingDesc}</p>
                             </div>
                        )}
                    </div>

                    {/* Telegram - The "Star" - Inverted White Style */}
                    <div className="relative group cursor-pointer">
                        {/* Shadow/Stack effect */}
                        <div className="absolute inset-0 bg-stone-800 rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-300 border border-stone-700"></div>
                        
                        <a 
                            href={TELEGRAM_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative block bg-white rounded-[2.5rem] p-7 transition-transform duration-300 group-hover:-translate-y-1 overflow-hidden"
                        >
                            {/* Inner shine */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className="bg-stone-100 p-3 rounded-2xl group-hover:bg-stone-900 group-hover:text-white transition-colors duration-300">
                                   <Send size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                                </div>
                                <span className="bg-stone-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                    Open
                                </span>
                            </div>
                            
                            <h3 className="text-3xl font-black text-stone-900 mb-1 relative z-10">Telegram</h3>
                            <p className="text-xs font-bold text-stone-400 relative z-10 group-hover:text-stone-500 transition-colors">{t.footer.talkDesc}</p>
                        </a>
                    </div>
                    
                    <div className="flex gap-6 px-4 pt-2">
                        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-stone-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                           <Instagram size={14} className="group-hover:text-pink-500 transition-colors" /> Instagram
                        </a>
                        <div className="text-[10px] font-bold text-stone-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2 group">
                           <Mail size={14} className="group-hover:text-yellow-500 transition-colors" /> {t.footer.email}
                        </div>
                    </div>

               </div>
           </div>

           {/* WARNING STICKER - Physical Look */}
           <div className="flex justify-center mb-20">
               <div className="bg-yellow-400 text-stone-900 px-8 py-5 rounded-2xl rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-300 shadow-[0_20px_40px_-10px_rgba(250,204,21,0.2)] cursor-help max-w-sm text-center border-4 border-stone-900 group relative">
                   {/* Tape effect */}
                   <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 backdrop-blur-sm rotate-1"></div>

                   <div className="flex items-center justify-center gap-3 mb-2">
                       <AlertTriangle size={24} className="stroke-[3px] animate-bounce" />
                       <span className="font-black uppercase tracking-widest text-sm">{t.footer.warnLabel}</span>
                   </div>
                   <p className="text-xs font-bold leading-tight opacity-90">{t.footer.warnMsg}</p>
               </div>
           </div>

           {/* BOTTOM BAR */}
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold text-stone-600 uppercase tracking-widest pt-8 border-t border-stone-900">
               
               <div className="text-center md:text-left space-y-2">
                   <p className="flex items-center gap-2 justify-center md:justify-start group cursor-default hover:text-stone-500 transition-colors">
                       {t.footer.builtWith} <Coffee size={12} className="text-nature-600 group-hover:scale-125 transition-transform" />{t.footer.builtEnd}
                   </p>
                   <p>© {new Date().getFullYear()} GoBishoftu {t.footer.copyright}</p>
               </div>

               <div className="flex items-center gap-6">
                   <Link 
                     to="/admin" 
                     onClick={scrollToTop}
                     className="flex items-center gap-1.5 opacity-10 hover:opacity-100 hover:text-white transition-all p-2"
                     title="Admin Access"
                   >
                       <Lock size={12} />
                   </Link>
                   
                   <button 
                     onClick={scrollToTop}
                     className="w-12 h-12 rounded-full bg-stone-900 hover:bg-nature-600 hover:text-white flex items-center justify-center text-stone-500 transition-all shadow-lg hover:-translate-y-2 group"
                   >
                       <ChevronUp size={20} className="group-hover:animate-bounce" />
                   </button>
               </div>
           </div>
       </div>

       {/* NOISE OVERLAY */}
       <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
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
