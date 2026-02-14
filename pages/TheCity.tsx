
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Coffee, Wind, Users, Waves, Sun, Utensils, Car, Heart, BatteryCharging, CloudFog, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import FadeIn from '../components/FadeIn';
import { PLACEHOLDER_IMAGES, CITY_HERO_IMAGES, WEEKEND_VIBES_IMAGE, LAKE_IMAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const TheCity = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  // Slideshow Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CITY_HERO_IMAGES.length);
    }, 5000); // Rotate every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans text-stone-800 overflow-x-hidden">

      {/* SECTION 1: HERO (FIRST IMPRESSION) */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 md:pt-48 overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
           {/* Overlays for readability */}
           <div className="absolute inset-0 bg-nature-900/30 mix-blend-multiply z-20"></div>
           <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-earth-50 z-20"></div>
           
           {/* Images */}
           {CITY_HERO_IMAGES.map((img, index) => (
             <img 
               key={index}
               src={img} 
               alt={`Bishoftu Scene ${index + 1}`} 
               className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                 index === currentSlide ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
               }`}
               style={{ transitionProperty: 'opacity, transform' }}
             />
           ))}
        </div>

        <div className="relative z-30 max-w-5xl mx-auto text-center">
           <FadeIn>
              <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 drop-shadow-lg leading-none">
                {t.city.heroTitle} <br/> {t.city.heroTitle2}
              </h1>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-8 rounded-[2rem] inline-block max-w-2xl mx-auto transform -rotate-1 hover:rotate-0 transition-transform duration-500 shadow-2xl">
                 <p className="text-xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-md">
                   {t.city.heroDesc} <br/>
                   <span className="font-bold text-nature-200">{t.city.heroDescBold}</span>
                 </p>
              </div>
           </FadeIn>
        </div>
      </section>

      {/* SECTION 2: WHERE IT IS (KEEP IT REAL) */}
      <section className="py-24 px-6 max-w-5xl mx-auto relative">
         <div className="absolute top-10 right-10 text-9xl opacity-5 pointer-events-none select-none">📍</div>
         <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-12">
               <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-stone-100 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest text-stone-500">
                     <MapPin size={16} /> {t.city.locationTag}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 leading-tight">
                     {t.city.locationTitle} <br/> <span className="italic text-nature-600">{t.city.locationTitleItalic}</span> {t.city.locationTitleEnd}
                  </h2>
                  <div className="text-lg md:text-xl text-stone-600 font-medium space-y-4 leading-relaxed">
                     <p>
                        {t.city.locationP1} <span className="bg-yellow-100 px-2 rounded-md font-bold text-stone-800">{t.city.locationTime}</span> {t.city.locationP1End}
                     </p>
                     <p className="text-2xl font-serif text-stone-800 pt-4">
                        {t.city.locationP2}
                     </p>
                  </div>
               </div>
               <div className="flex-1 relative">
                  <div className="bg-nature-100 rounded-[3rem] p-8 md:p-12 transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl border-4 border-white">
                      <div className="flex items-center justify-between mb-8 border-b border-nature-200 pb-4">
                         <div className="text-center">
                            <span className="block text-3xl font-bold text-stone-800">Addis</span>
                            <span className="text-xs font-bold uppercase text-stone-400">{t.city.driveChaos}</span>
                         </div>
                         <div className="flex-grow mx-4 relative h-1 bg-stone-300 rounded-full">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border-2 border-stone-300 p-1 rounded-full">
                               <Car size={16} className="text-stone-400" />
                            </div>
                         </div>
                         <div className="text-center">
                            <span className="block text-3xl font-bold text-nature-700">Bishoftu</span>
                            <span className="text-xs font-bold uppercase text-nature-500">{t.city.drivePeace}</span>
                         </div>
                      </div>
                      <p className="text-center text-stone-500 font-bold italic">{t.city.driveQuote}</p>
                  </div>
               </div>
            </div>
         </FadeIn>
      </section>

      {/* SECTION 3: THE LAKES (THE REAL STAR) - REDESIGNED */}
      <section className="py-24 px-4 bg-earth-100 rounded-[3rem] mx-2 md:mx-6 overflow-hidden relative">
         {/* Background Decor remains similar for continuity */}
         <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-nature-200 rounded-full blur-[80px]"></div>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">
            <FadeIn>
               <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 mb-6">
                     {t.city.lakesTitle}
                  </h2>
                  <p className="text-stone-500 font-bold uppercase tracking-widest text-sm bg-white/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                     {t.city.lakesBadge}
                  </p>
               </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
               
               {/* Lake Hora - Large Card */}
               <FadeIn delay={100} className="md:col-span-8 relative group overflow-hidden rounded-[2.5rem] shadow-xl h-[400px]">
                  <img 
                    src={LAKE_IMAGES.hora} 
                    alt="Lake Hora" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent transition-opacity duration-500"></div>
                  
                  <div className="absolute bottom-0 left-0 p-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 w-full">
                     <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Waves size={12} /> Classic Choice
                     </div>
                     <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">{t.city.lake1}</h3>
                     <p className="text-stone-300 text-lg font-medium max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                        {t.city.lake1Desc}
                     </p>
                  </div>
               </FadeIn>

               {/* Lake Babogaya - Tall/Narrow Card */}
               <FadeIn delay={200} className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] shadow-xl h-[400px]">
                  <img 
                    src={LAKE_IMAGES.babogaya} 
                    alt="Lake Babogaya" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                     <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Sun size={12} /> Sunset Spot
                     </div>
                     <h3 className="text-3xl font-serif font-bold text-white mb-3">{t.city.lake2}</h3>
                     <p className="text-stone-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                        {t.city.lake2Desc}
                     </p>
                  </div>
               </FadeIn>

               {/* Lake Kuriftu - Tall/Narrow Card */}
               <FadeIn delay={300} className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] shadow-xl h-[400px]">
                  <img 
                    src={LAKE_IMAGES.kuriftu} 
                    alt="Lake Kuriftu" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                     <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-white/90 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Coffee size={12} /> Premium Vibes
                     </div>
                     <h3 className="text-3xl font-serif font-bold text-white mb-3">{t.city.lake3}</h3>
                     <p className="text-stone-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-4 group-hover:translate-y-0">
                        {t.city.lake3Desc}
                     </p>
                  </div>
               </FadeIn>

               {/* And More - Large Card (Different Style) */}
               <FadeIn delay={400} className="md:col-span-8 relative group overflow-hidden rounded-[2.5rem] shadow-xl bg-stone-900 h-[400px]">
                  {/* Abstract shapes or a different image */}
                   <img 
                    src={CITY_HERO_IMAGES[4]} 
                    alt="More Lakes" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-stone-900/60 transition-colors duration-500 group-hover:bg-nature-900/60"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 z-10">
                     <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 border border-white/20">
                        <span className="text-4xl">✨</span>
                     </div>
                     <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{t.city.moreLakes}</h3>
                     <p className="text-stone-300 text-xl font-medium max-w-lg">
                        {t.city.moreLakesDesc}
                     </p>
                     
                     <div className="mt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
                        <Link to="/packages">
                            <button className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-nature-400 hover:text-white transition-colors shadow-lg">
                                {t.city.exploreBtn}
                            </button>
                        </Link>
                     </div>
                  </div>
               </FadeIn>

            </div>
         </div>
      </section>

      {/* SECTION 4: FOOD & WEEKENDS */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
         <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="order-2 md:order-1 relative">
                  <div className="absolute inset-0 bg-yellow-200 rounded-[3rem] transform -rotate-3"></div>
                  <img 
                     src={WEEKEND_VIBES_IMAGE} 
                     alt="Weekend Vibes" 
                     className="relative rounded-[3rem] transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-xl object-cover h-[400px] w-full"
                  />
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-stone-100 animate-float">
                     <div className="flex gap-1">
                        <Utensils size={20} className="text-stone-800" />
                        <span className="font-bold text-stone-800">Fresh fish = Mandatory</span>
                     </div>
                  </div>
               </div>

               <div className="order-1 md:order-2 space-y-8">
                  <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 leading-tight">
                     {t.city.weekendTitle} <br/> {t.city.weekendTitle2}
                  </h2>
                  <div className="text-lg md:text-xl text-stone-600 font-medium space-y-6 leading-relaxed">
                     <p>
                        {t.city.weekendP1} <br/>
                        <span className="font-bold text-stone-800">{t.city.weekendP1Bold}</span>
                     </p>
                     <p>
                        {t.city.weekendP2}
                     </p>
                     <p className="italic text-stone-500 border-l-4 border-yellow-400 pl-4">
                        {t.city.weekendQuote}
                     </p>
                  </div>
               </div>
            </div>
         </FadeIn>
      </section>

      {/* SECTION 5: THE VIBE (Redesigned - Fun/Advanced Bento Grid) */}
      <section className="py-24 px-4 bg-stone-100/50">
        <div className="max-w-6xl mx-auto">
            <FadeIn>
                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* 1. TITLE CARD (Big, Dark, Immersive) */}
                    <div className="md:col-span-8 bg-stone-900 rounded-[2.5rem] p-10 md:p-14 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl group cursor-default">
                        {/* Abstract animated glow */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-nature-600 rounded-full blur-[100px] opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-[0.9]">
                                {t.city.vibeTitle} <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-nature-400 to-blue-400">{t.city.vibeTitleColor}</span>
                            </h2>
                        </div>
                        {/* Decorative Battery Icon */}
                        <div className="absolute top-8 right-8 text-nature-400 opacity-50 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                           <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Recharging</span>
                           <BatteryCharging size={32} className="animate-pulse" />
                        </div>
                    </div>

                    {/* 2. SLOWER MORNINGS (Yellow, Cheerful) */}
                    <div className="md:col-span-4 bg-yellow-300 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_rgba(28,25,23,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-4 border-white group relative overflow-hidden">
                        <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2.5rem]"></div>
                        <div className="relative z-10">
                            <Sun size={56} className="text-stone-900 mb-6 mx-auto animate-[spin_12s_linear_infinite]" strokeWidth={2.5} />
                            <span className="text-3xl font-black text-stone-900 tracking-tight block">{t.city.vibeMorning}</span>
                            <span className="text-sm font-bold uppercase tracking-widest mt-2 block opacity-70">{t.city.vibeMorningSub}</span>
                        </div>
                    </div>

                    {/* 3. CLEANER AIR (Green, Fresh) */}
                    <div className="md:col-span-4 bg-nature-200 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-[8px_8px_0px_0px_rgba(28,25,23,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-4 border-white group relative overflow-hidden">
                         <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full blur-2xl opacity-40 group-hover:animate-float"></div>
                         <div className="relative z-10">
                            <Wind size={56} className="text-nature-900 mb-6 mx-auto group-hover:scale-110 transition-transform duration-500" strokeWidth={2.5} />
                            <span className="text-3xl font-black text-nature-900 tracking-tight block leading-none mb-1">{t.city.vibeAir}</span>
                            <span className="text-lg font-medium text-nature-800">{t.city.vibeAirSub}</span>
                         </div>
                    </div>

                     {/* 4. PERFECT FOR (Wide, Interactive Tag Cloud) */}
                    <div className="md:col-span-8 bg-white rounded-[2.5rem] p-10 border-4 border-stone-100 hover:border-stone-900 transition-colors duration-300 flex flex-col justify-center shadow-lg group">
                        <div className="flex items-center justify-between mb-6">
                           <span className="block text-stone-400 font-black uppercase tracking-widest text-sm">{t.city.perfectFor}</span>
                           <span className="bg-stone-900 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{t.city.approved}</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {t.city.tags.map((item, i) => (
                               <span 
                                 key={i} 
                                 className="px-6 py-3 rounded-2xl bg-stone-50 border-2 border-stone-100 text-stone-700 font-bold text-lg hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all cursor-default transform hover:-rotate-1"
                                 style={{ transitionDelay: `${i * 50}ms` }}
                               >
                                  {item}
                               </span>
                            ))}
                        </div>
                    </div>

                    {/* 5. FRIENDLY PEOPLE (Colorful, Social) */}
                    <div className="md:col-span-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-8 flex items-center justify-between gap-4 shadow-xl text-white transform rotate-1 hover:rotate-0 transition-transform group">
                         <div>
                            <span className="text-3xl font-black block mb-1">{t.city.people}</span>
                            <span className="opacity-80 font-medium">{t.city.peopleSub}</span>
                         </div>
                         <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">🤝</div>
                    </div>

                     {/* 6. QUOTE (Simple & Clean) */}
                    <div className="md:col-span-7 bg-stone-50 rounded-[2.5rem] border-2 border-dashed border-stone-300 flex items-center justify-center p-6 text-center hover:bg-white hover:border-solid hover:border-stone-200 transition-all">
                        <p className="text-xl md:text-2xl font-serif italic text-stone-500">
                           {t.city.quoteFinal}
                        </p>
                    </div>

                 </div>
            </FadeIn>
        </div>
      </section>

      {/* SECTION 6: WHY GoBishoftu EXISTS (SOFT TRANSITION) */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
         <FadeIn>
            <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center mx-auto mb-8 text-nature-600">
               <Wind size={32} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6">
               {t.city.whyTitle}
            </h2>
            <p className="text-xl text-stone-600 font-medium leading-relaxed mb-10">
               {t.city.whyDesc}
            </p>
            
            <Link to="/packages" className="group relative inline-flex justify-center w-full md:w-auto cursor-pointer">
               {/* Background Blob for Glow */}
               <div className="absolute inset-0 bg-nature-400 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
               
               {/* Button Container */}
               <div className="relative bg-white text-stone-900 border-4 border-stone-100 rounded-[2.5rem] px-6 py-4 md:px-10 md:py-6 text-lg md:text-xl font-bold shadow-xl flex items-center justify-center gap-4 overflow-hidden transition-all duration-300 group-hover:border-nature-300 group-hover:shadow-2xl group-hover:-translate-y-1 active:scale-95 w-full md:w-auto md:min-w-[320px]">
                  
                  {/* Hover Fill Effect */}
                  <div className="absolute inset-0 bg-stone-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"></div>

                  {/* Content Wrapper */}
                  <div className="relative z-10 flex flex-col items-center justify-center h-[40px] md:h-[48px] overflow-hidden w-full min-w-[200px]">
                      
                      {/* Default State */}
                      <div className="absolute flex items-center gap-3 transition-all duration-500 group-hover:-translate-y-[150%] group-hover:opacity-0 group-hover:rotate-12">
                          <span className="text-xl md:text-2xl">📦</span>
                          <span>{t.city.whyBtn}</span>
                      </div>

                      {/* Hover State - Funny */}
                      <div className="absolute flex items-center gap-3 translate-y-[150%] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:text-white">
                          <span className="text-xl md:text-2xl animate-spin-slow">✨</span>
                          <span>{t.hero.ctaHover}</span>
                          <ArrowRight className="ml-1 animate-bounce" />
                      </div>
                  </div>

               </div>

               {/* Sticker Badge */}
               <div className="absolute -top-4 -right-2 bg-yellow-400 text-stone-900 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border-2 border-stone-900 transform rotate-12 scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   {t.city.sticker}
               </div>
            </Link>

         </FadeIn>
      </section>

    </div>
  );
};

export default TheCity;
