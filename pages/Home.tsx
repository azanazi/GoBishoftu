
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, Cloud, Wind, Sun, Sparkles } from 'lucide-react';
import Button from '../components/Button.tsx';
import FadeIn from '../components/FadeIn.tsx';
import { PLACEHOLDER_IMAGES } from '../constants.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-stone-800 overflow-x-hidden">

      {/* SECTION 1: HERO - Redesigned (Modern, Fun, Unique) */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-32 md:pt-48 pb-20">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-75 ease-out will-change-transform"
            style={{ 
              backgroundImage: `url(${PLACEHOLDER_IMAGES.hero})`,
              transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.2}px)` // Parallax + Zoom
            }}
          />
          {/* Modern Gradient Overlay - Fades seamlessly into the next section (earth-50) */}
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/10 to-earth-50 z-10"></div>
          
          {/* Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
           <Cloud className="absolute top-24 -left-12 text-white/10 w-64 h-64 animate-float blur-xl" style={{ animationDuration: '20s' }} />
           <Cloud className="absolute top-1/3 -right-20 text-white/5 w-96 h-96 animate-float blur-2xl" style={{ animationDuration: '25s', animationDelay: '5s' }} />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-center">
           
           {/* Top Badge - Glassmorphism Pill */}
           <div className="mb-10 animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>
             <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-xl group hover:bg-white/20 transition-all cursor-default hover:scale-105">
                <Sun size={14} className="text-yellow-300 animate-spin-slow" />
                <span className="text-white text-xs font-bold uppercase tracking-[0.3em]">{t.hero.badge}</span>
             </div>
           </div>

           {/* Main Headline - Fun & Modern Typography */}
           <div className="text-center mb-12 relative w-full perspective-1000">
              <h1 className="flex flex-col items-center leading-none">
                
                {/* Line 1: Clean & Thin */}
                <span className="block text-4xl md:text-6xl lg:text-7xl font-sans font-thin text-white tracking-tighter mb-4 animate-fade-up opacity-0 drop-shadow-md" style={{ animationDelay: '0.2s' }}>
                  {t.hero.line1}
                </span>

                {/* Line 2: The "Hero" Word - REDESIGNED */}
                <span className="relative block animate-fade-up opacity-0 z-10 py-4 md:py-6" style={{ animationDelay: '0.4s' }}>
                    
                    {/* Atmospheric Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[120%] bg-nature-600/20 blur-[90px] rounded-full mix-blend-screen animate-pulse pointer-events-none"></div>

                    <div className="relative transform transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1 cursor-default group">
                        
                        {/* Shadow Layer for Depth - ADDED PR-8 */}
                        <span className="absolute inset-0 text-[6rem] md:text-[10rem] lg:text-[13rem] font-serif font-black italic tracking-tighter text-stone-900/30 blur-sm transform translate-y-4 select-none pr-8">
                            {t.hero.line2}
                        </span>

                        {/* Main Text Layer - Gradient & Stroke - ADDED PR-8 */}
                        <span 
                            className="relative block text-[6rem] md:text-[10rem] lg:text-[13rem] font-serif font-black italic tracking-tighter text-transparent bg-clip-text drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] select-none z-10 pr-8"
                            style={{ 
                                backgroundImage: 'linear-gradient(180deg, #ffffff 10%, #dcfce7 60%, #86efac 100%)',
                                WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            {t.hero.line2}
                        </span>

                        {/* Floating Decor: Sparkles */}
                        <span className="absolute -top-4 right-[12%] text-yellow-300 animate-[bounce_3s_infinite] drop-shadow-lg z-20">
                            <Sparkles size={48} className="fill-yellow-300/50" />
                        </span>
                    </div>
                    
                    {/* Poetic Wavy Underline */}
                    <div className="absolute -bottom-2 md:bottom-2 left-1/2 -translate-x-1/2 w-[65%] h-6 md:h-10 text-nature-400 mix-blend-overlay">
                        <svg viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-wiggle opacity-80">
                            <path d="M2.00025 7C38.5002 18.5 68.5002 -3.5 107.001 5.50002C145.501 14.5001 176.001 0.500062 198.001 4.50006" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                        </svg>
                    </div>

                </span>

                {/* Line 3: Playful Sticker Style */}
                <span className="flex items-center gap-4 text-3xl md:text-5xl font-bold text-white mt-6 animate-fade-up opacity-0" style={{ animationDelay: '0.6s' }}>
                   <span className="drop-shadow-lg opacity-90">{t.hero.line3_1}</span>
                   {t.hero.line3_2 && (
                    <span className="relative inline-block bg-yellow-400 text-stone-900 px-8 py-2 rounded-full transform rotate-3 hover:-rotate-2 transition-transform duration-300 shadow-[6px_6px_0px_rgba(28,25,23,0.8)] border-[3px] border-stone-900 cursor-default group hover:bg-yellow-300">
                        <span className="relative z-10 font-black tracking-wide">{t.hero.line3_2}</span>
                        <span className="absolute -top-5 -right-5 text-4xl animate-wiggle filter drop-shadow-md group-hover:scale-125 transition-transform">😄</span>
                    </span>
                   )}
                </span>

              </h1>
           </div>

           {/* Description */}
            <p className="text-lg md:text-2xl text-stone-100/90 font-medium max-w-xl mx-auto mb-16 text-center leading-relaxed animate-fade-up opacity-0 drop-shadow-lg" style={{ animationDelay: '0.8s' }}>
              {t.hero.desc}
            </p>

            {/* Button Container */}
            <div className="animate-fade-up opacity-0 relative z-30" style={{ animationDelay: '1s' }}>
              <Link to="/packages">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 md:px-14 md:py-6 bg-white rounded-full text-lg md:text-xl font-black text-stone-900 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_-10px_rgba(22,163,74,0.6)] transition-all duration-500 hover:-translate-y-2 hover:scale-110 active:scale-95 overflow-hidden ring-8 ring-white/10 hover:ring-nature-400/40 backdrop-blur-sm">
                  
                  {/* Liquid Background Fill */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-nature-700 via-nature-500 to-nature-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>
                  
                  {/* Confetti Elements */}
                  <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-[bounce_2s_infinite] delay-100"></div>
                  <div className="absolute bottom-2 right-1/4 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping delay-200"></div>

                  <span className="relative z-20 flex flex-col items-center h-[40px] md:h-[48px] overflow-hidden w-full min-w-[200px] md:min-w-[280px]">
                      {/* State 1: Default */}
                      <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3 transition-all duration-500 group-hover:-translate-y-[150%] group-hover:opacity-0 group-hover:scale-50">
                         <span className="text-2xl md:text-3xl transform group-hover:rotate-[360deg] transition-transform duration-700">👀</span>
                         <span className="tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-stone-900 to-stone-600 pb-1">{t.hero.cta}</span>
                      </span>
                      
                      {/* State 2: Hover */}
                      <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-3 translate-y-[150%] transition-all duration-500 group-hover:translate-y-0 scale-150 group-hover:scale-100 text-white drop-shadow-md">
                         <span className="text-2xl md:text-3xl animate-[spin_3s_linear_infinite]">✨</span>
                         <span className="tracking-widest uppercase text-base md:text-lg">{t.hero.ctaHover}</span>
                      </span>
                  </span>

                </button>
              </Link>
            </div>
        </div>

        {/* Floating Review Card */}
        <div className="absolute bottom-10 right-10 hidden md:block animate-float z-20" style={{ animationDelay: '1.5s' }}>
          <div className="bg-white/10 backdrop-blur-2xl p-5 rounded-3xl shadow-2xl border border-white/10 max-w-xs -rotate-2 hover:rotate-0 transition-transform cursor-pointer group hover:bg-white/20">
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <p className="text-sm font-bold text-white group-hover:text-white transition-colors leading-relaxed">"{t.hero.review}"</p>
            <div className="flex items-center gap-3 mt-4 border-t border-white/10 pt-3">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 ring-2 ring-white/20"></div>
               <div>
                  <p className="text-[10px] text-white/90 font-black uppercase tracking-widest">Random Visitor</p>
                  <p className="text-[9px] text-white/50 font-medium">{t.hero.verified}</p>
               </div>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 2: REALITY CHECK - Tilted Card Style */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-nature-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-block p-10 md:p-16 bg-white rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 transform rotate-1 hover:rotate-0 transition-transform duration-500 cursor-default hover:shadow-2xl">
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 leading-tight">
                {t.reality.title} <br/><span className="italic text-stone-400 decoration-nature-400 decoration-wavy underline">{t.reality.boring}</span> {t.reality.titleEnd} <br/>
              </h2>
              <div className="mt-8 space-y-2 text-xl md:text-2xl font-medium text-stone-600">
                 <p>{t.reality.sub1}</p>
                 <p className="text-nature-600 font-bold bg-nature-50 inline-block px-3 py-1 rounded-lg">{t.reality.sub2}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3: WHAT PEOPLE ACTUALLY DO - Bento Grid */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-800">
              {t.bento.title} <br/> {t.bento.title2}
            </h2>
          </div>
        </FadeIn>
        
        <FadeIn delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
             {/* Card 1 - Large */}
             <div className="md:col-span-2 bg-earth-100 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between hover:bg-earth-200 transition-all duration-300 group relative overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
               <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
               <h3 className="text-3xl md:text-4xl font-bold text-stone-800 z-10 leading-tight">{t.bento.card1} <br/> {t.bento.card1_2}</h3>
               <div className="text-8xl md:text-9xl self-end transform group-hover:-rotate-12 transition-transform duration-300 drop-shadow-lg">🌊</div>
             </div>

             {/* Card 2 - Tall */}
             <div className="bg-nature-100 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:bg-nature-200 transition-all duration-300 group cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:rotate-1">
               <div className="text-7xl mb-4 transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-300 drop-shadow-md">🍽</div>
               <h3 className="text-2xl font-bold text-nature-900 leading-tight">{t.bento.card2}</h3>
             </div>

             {/* Card 3 - Regular */}
             <div className="bg-white border border-stone-100 shadow-lg rounded-[2rem] p-8 md:p-10 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-2 hover:border-nature-200">
               <h3 className="text-2xl font-bold text-stone-800 leading-tight">{t.bento.card3}</h3>
               <div className="text-7xl self-end transform group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">📸</div>
             </div>

             {/* Card 4 - Wide */}
             <div className="md:col-span-2 bg-stone-800 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between hover:bg-stone-900 transition-all duration-300 group cursor-pointer hover:shadow-2xl hover:scale-[1.01] hover:shadow-stone-900/50">
               <div className="max-w-md">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">{t.bento.card4}</h3>
                  <p className="text-stone-400">{t.bento.card4_desc}</p>
               </div>
               <div className="text-8xl md:text-9xl mt-6 md:mt-0 transform group-hover:scale-125 transition-transform duration-500 animate-wiggle drop-shadow-2xl text-white">🌿</div>
             </div>
          </div>
        </FadeIn>
      </section>

      {/* SECTION 4: FRIEND INTRO - Overlapping Modern Layout */}
      <section className="py-32 px-6">
        <FadeIn>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 md:order-1">
               <div className="absolute inset-0 bg-nature-200 rounded-[2.5rem] transform rotate-3 scale-100 translate-y-4"></div>
               <img 
                 src={PLACEHOLDER_IMAGES.resort} 
                 alt="Bishoftu Locals" 
                 className="relative rounded-[2.5rem] shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700 w-full h-[500px] object-cover z-10 grayscale hover:grayscale-0"
               />
               <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl z-20 max-w-xs border border-stone-100 hidden lg:block animate-float">
                  <p className="font-serif text-xl italic text-stone-800">"{t.team.quote}"</p>
               </div>
            </div>
            
            <div className="order-1 md:order-2 md:pl-10">
              <span className="text-nature-600 font-bold tracking-wider text-sm uppercase mb-4 block">{t.team.label}</span>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-stone-800 mb-8">{t.team.title}</h2>
              <div className="space-y-6 text-xl text-stone-600 leading-relaxed font-medium">
                <p>{t.team.p1} <span className="bg-nature-100 px-2 rounded-md text-nature-800 font-bold">GoBishoftu</span>.</p>
                <p>{t.team.p2}</p>
                <p>{t.team.p3}</p>
              </div>
              <div className="pt-10">
                 <Link to="/about">
                   <Button variant="fun" className="rounded-2xl text-lg hover:rotate-2">
                     {t.team.cta}
                   </Button>
                 </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* SECTION 5: CTA - Big & Fun - REDESIGNED */}
      <section className="py-20 px-4 mb-10">
        <FadeIn delay={200}>
          <div className="max-w-6xl mx-auto bg-nature-600 rounded-[3rem] p-10 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-nature-600/20 transform rotate-1 hover:rotate-0 transition-transform duration-500 group">
             
             {/* Abstract Shapes */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -right-24 w-80 h-80 bg-nature-500 rounded-full blur-3xl opacity-60 group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-30 group-hover:scale-150 transition-transform duration-1000"></div>
                {/* Pattern dots */}
                <div className="absolute top-10 left-10 opacity-20">
                   {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex gap-2 mb-2">
                         {[...Array(3)].map((_, j) => <div key={j} className="w-2 h-2 bg-white rounded-full"></div>)}
                      </div>
                   ))}
                </div>
             </div>

             <div className="relative z-10 space-y-8">
               <h2 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tight leading-none drop-shadow-sm">
                 {t.homeCta.title}
               </h2>
               <p className="text-xl md:text-2xl text-nature-100 font-medium max-w-2xl mx-auto">
                 {t.homeCta.desc}
               </p>
               
               <div className="pt-8 flex justify-center">
                  <Link to="/packages" className="relative inline-block group/btn">
                     
                     {/* Funny Badge */}
                     <div className="absolute -top-6 -right-6 z-20 transform scale-0 group-hover/btn:scale-100 transition-transform duration-300 delay-100 origin-bottom-left pointer-events-none">
                         <div className="bg-yellow-400 text-stone-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 border-stone-900 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-12 animate-wiggle">
                             {t.homeCta.badge}
                         </div>
                     </div>

                     <button className="relative overflow-hidden rounded-[2.5rem] bg-white border-4 border-transparent px-8 py-4 md:px-14 md:py-6 text-lg md:text-xl font-black text-stone-900 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 active:scale-95 active:translate-y-1 ring-4 ring-white/30 hover:ring-white/50">
                        
                        {/* Background Fill Animation */}
                        <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
                        
                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col items-center justify-center h-[28px] md:h-[32px] overflow-hidden min-w-[200px] md:min-w-[260px]">
                            
                            {/* Idle Text */}
                            <span className="absolute flex items-center gap-3 transition-all duration-500 group-hover/btn:-translate-y-[150%] group-hover/btn:opacity-0 group-hover/btn:rotate-3">
                                <span className="text-2xl md:text-3xl">📦</span>
                                <span>{t.homeCta.btn}</span>
                            </span>

                            {/* Hover Text */}
                            <span className="absolute flex items-center gap-3 translate-y-[150%] opacity-0 transition-all duration-500 group-hover/btn:translate-y-0 group-hover/btn:opacity-100 text-white">
                                <span className="text-2xl md:text-3xl animate-[spin_1.5s_linear_infinite]">⭐</span>
                                <span className="uppercase tracking-wider text-base md:text-lg">{t.homeCta.btnHover}</span>
                            </span>

                        </div>
                     </button>
                  </Link>
               </div>
             </div>
          </div>
        </FadeIn>
      </section>

    </div>
  );
};

export default Home;
