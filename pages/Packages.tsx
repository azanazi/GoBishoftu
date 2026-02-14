
import React, { useEffect, useState } from 'react';
import { PackageService } from '../services/supabase';
import { Package, ViewState } from '../types';
import Button from '../components/Button';
import FadeIn from '../components/FadeIn';
import { 
  X, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Heart, 
  GraduationCap, 
  PartyPopper, 
  Coffee, 
  Compass,
  Clock,
  MessageSquare,
  DollarSign,
  Camera,
  Sun,
  Send,
  Wrench,
  Star
} from 'lucide-react';
import { TELEGRAM_LINK, PLACEHOLDER_IMAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const { language, t } = useLanguage();

  useEffect(() => {
    fetchPackages();
    
    // Lock body scroll when modal is open
    if (selectedPackage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPackage]);

  const fetchPackages = async () => {
    try {
      setViewState('loading');
      const data = await PackageService.getActive();
      setPackages(data);
      setViewState(data.length > 0 ? 'success' : 'empty');
    } catch (err) {
      console.error(err);
      setViewState('error');
    }
  };

  const handleTelegramRedirect = (packageName: string) => {
    const message = `Hi GoBishoftu 👋 I’m interested in the ${packageName} package.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`${TELEGRAM_LINK}?text=${encodedMessage}`, '_blank');
  };

  const handleCustomTelegramRedirect = () => {
    const message = "Hi GoBishoftu 👋 I want a custom package for...";
    const encodedMessage = encodeURIComponent(message);
    window.open(`${TELEGRAM_LINK}?text=${encodedMessage}`, '_blank');
  };

  const getPackageData = (pkg: Package) => {
    return {
      title: language === 'am' && pkg.title_am ? pkg.title_am : pkg.title,
      description: language === 'am' && pkg.description_am ? pkg.description_am : pkg.description,
      full_description: language === 'am' && pkg.full_description_am ? pkg.full_description_am : (pkg.full_description || pkg.description),
      features: language === 'am' && pkg.features_am ? pkg.features_am : pkg.features,
      duration: language === 'am' && pkg.duration_am ? pkg.duration_am : pkg.duration
    };
  };

  if (viewState === 'loading') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-earth-50">
        <div className="flex flex-col items-center gap-4">
           <div className="w-12 h-12 border-4 border-nature-200 border-t-nature-600 rounded-full animate-spin"></div>
           <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">{t.packages.loading}</p>
        </div>
      </div>
    );
  }

  // Funny tags generator based on package content
  const getFunnyTag = (title: string) => {
      const t = title.toLowerCase();
      if (t.includes('lake')) return "Water Therapy 💧";
      if (t.includes('hike')) return "Leg Day (Optional) 🦵";
      if (t.includes('coffee')) return "Caffeine & Chill ☕";
      if (t.includes('food') || t.includes('lunch')) return "Food Coma Incoming 🥘";
      return "100% Worth It ✨";
  };

  return (
    <div className="font-sans text-stone-800 bg-earth-50 min-h-screen">
      
      {/* SECTION 1 — HERO (LIGHT, FUN, INVITING) */}
      <section className="pt-44 pb-20 px-6 text-center">
        <FadeIn>
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-stone-800 mb-6 leading-tight">
            {t.packages.heroTitle} <br className="hidden md:block" /> <span className="text-nature-600 italic">{t.packages.heroTitleSpan}</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            {t.packages.heroDesc}
          </p>
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-sm border border-stone-100 text-stone-400 font-bold text-xs uppercase tracking-widest">
            <CheckCircle2 size={14} className="text-nature-500" />
            {t.packages.heroBadge}
          </div>
        </FadeIn>
      </section>

      {/* SECTION 2 — PACKAGES GRID / COMING SOON */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        {viewState === 'empty' || viewState === 'error' ? (
          /* SECTION 3 — COMING SOON */
          <FadeIn>
            <div className="bg-white rounded-[3.5rem] p-16 md:p-24 text-center border-2 border-stone-100 shadow-xl max-w-4xl mx-auto relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-50 rounded-bl-[4rem]"></div>
               <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 mb-6">{t.packages.emptyTitle}</h2>
               <p className="text-xl md:text-2xl text-stone-500 font-medium mb-12">
                 {t.packages.emptyDesc}
               </p>
               <div className="w-12 h-1 bg-stone-200 mx-auto rounded-full mb-8"></div>
               <p className="text-stone-400 font-bold uppercase tracking-widest text-sm">
                 {t.packages.emptyLink}
               </p>
            </div>
          </FadeIn>
        ) : (
          /* PACKAGES GRID - Centered Flex Layout */
          <div className="flex flex-wrap justify-center gap-10">
            {packages.map((pkg, idx) => {
              const displayPkg = getPackageData(pkg);
              return (
              <FadeIn key={pkg.id} delay={idx * 100} className="w-full max-w-[400px] flex-shrink-0">
                <div 
                  className="group relative w-full bg-white rounded-[3rem] p-3 shadow-xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 border border-stone-100 cursor-pointer overflow-visible"
                  onClick={() => setSelectedPackage(pkg)}
                >
                  
                  {/* 1. IMAGE CONTAINER (TOP) */}
                  <div className="relative h-[340px] rounded-[2.5rem] overflow-hidden mb-4 isolate">
                     <img 
                       src={pkg.image || PLACEHOLDER_IMAGES.lake} 
                       alt={displayPkg.title}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                     
                     {/* Gradient Overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                     
                     {/* Top Floating Badge */}
                     <div className="absolute top-4 left-4 z-10">
                        <div className="bg-white/90 backdrop-blur-md text-stone-800 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 transform transition-transform group-hover:scale-105">
                           <Clock size={12} className="text-nature-600" />
                           {displayPkg.duration || t.packages.modalTime}
                        </div>
                     </div>

                     {/* Funny Hover Sticker */}
                     <div className="absolute top-4 right-4 z-10 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 origin-top-right">
                        <div className="bg-yellow-400 text-stone-900 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase rotate-12 shadow-lg border-2 border-stone-900 border-dashed">
                           {getFunnyTag(pkg.title)}
                        </div>
                     </div>

                     {/* Price Tag (Bottom Right of Image) */}
                     {pkg.price && (
                        <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg border border-white/10 group-hover:bg-nature-600 group-hover:scale-110 transition-all duration-300">
                           {pkg.price}
                        </div>
                     )}
                  </div>

                  {/* 2. CONTENT (BOTTOM) */}
                  <div className="px-4 pb-4">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-serif font-bold text-stone-800 leading-tight pr-4 group-hover:text-nature-700 transition-colors">
                           {displayPkg.title}
                        </h3>
                     </div>
                     
                     <p className="text-stone-500 font-medium text-sm line-clamp-2 mb-6 group-hover:text-stone-600">
                        {displayPkg.description}
                     </p>

                     {/* 3. ACTION BUTTON (Transforms on Hover) */}
                     <div className="relative h-14 w-full rounded-2xl overflow-hidden">
                        
                        {/* State A: Idle (Ghost) */}
                        <div className="absolute inset-0 bg-stone-50 border-2 border-stone-100 rounded-2xl flex items-center justify-between px-6 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                           <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{t.packages.modalView}</span>
                           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-stone-300 shadow-sm">
                              <ArrowRight size={14} />
                           </div>
                        </div>

                        {/* State B: Hover (Active) */}
                        <div className="absolute inset-0 bg-stone-900 rounded-2xl flex items-center justify-center gap-3 text-white transition-all duration-300 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                           <span className="font-bold uppercase tracking-wide text-sm">{t.packages.modalPlan}</span>
                           <Sparkles size={16} className="text-yellow-400 animate-pulse" />
                        </div>

                     </div>
                  </div>

                  {/* Decorative Emoji (Absolute Positioned outside/on edge) */}
                  <div className="absolute -bottom-2 -right-2 text-4xl opacity-0 group-hover:opacity-100 group-hover:translate-y-[-10px] group-hover:rotate-12 transition-all duration-500 delay-75 pointer-events-none">
                     ✨
                  </div>

                </div>
              </FadeIn>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 4 — CUSTOM PACKAGE (ALWAYS VISIBLE) */}
      <section className="px-6 py-28 bg-[#fdfaf6] border-y border-stone-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-nature-100 rounded-full blur-[100px] opacity-40 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-30 translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <FadeIn>
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-stone-800 mb-6">
                {t.packages.customTitle} <span className="text-nature-600">{t.packages.customTitleSpan}</span>
              </h2>
              <p className="text-xl md:text-2xl text-stone-500 font-medium">
                {t.packages.customDesc}
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16">
            {[
              { icon: <GraduationCap size={32} />, label: t.packages.customGrid[0].label, color: "bg-blue-50 text-blue-600" },
              { icon: <Heart size={32} />, label: t.packages.customGrid[1].label, color: "bg-pink-50 text-pink-600" },
              { icon: <PartyPopper size={32} />, label: t.packages.customGrid[2].label, color: "bg-yellow-50 text-yellow-600" },
              { icon: <Compass size={32} />, label: t.packages.customGrid[3].label, color: "bg-nature-50 text-nature-600" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-stone-100 flex flex-col items-center text-center group hover:shadow-xl transition-all h-full">
                  <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    {item.icon}
                  </div>
                  <span className="font-bold text-stone-800 leading-tight">{item.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={400}>
            <div className="bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border border-stone-100 max-w-3xl mx-auto relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">{t.packages.tellUsTitle}</h3>
                <p className="text-xl text-stone-500 font-medium mb-10">{t.packages.tellUsDesc}</p>
                
                <button 
                  onClick={handleCustomTelegramRedirect}
                  className="relative group/custom-btn w-full md:w-auto min-w-full md:min-w-[300px] px-6 py-4 md:px-10 md:py-6 bg-stone-900 text-white rounded-[2.5rem] text-lg md:text-xl font-black shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_-12px_rgba(22,163,74,0.5)] transition-all duration-300 hover:-translate-y-1 active:scale-95 overflow-hidden ring-4 ring-stone-900/10"
                >
                  {/* Hover Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-nature-600 via-nature-500 to-yellow-500 opacity-0 group-hover/custom-btn:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Content Layer */}
                  <div className="relative z-10 flex items-center justify-center gap-3 group-hover/custom-btn:gap-4 transition-all duration-300">
                    <span className="text-2xl md:text-3xl group-hover/custom-btn:rotate-12 transition-transform duration-300">✨</span>
                    <span className="uppercase tracking-wider">{t.packages.customBtn}</span>
                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover/custom-btn:opacity-100 group-hover/custom-btn:translate-x-0 transition-all duration-300" strokeWidth={3} />
                  </div>

                  {/* Funny "We love weird ideas" Badge sticking out */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-stone-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg transform translate-y-full opacity-0 group-hover/custom-btn:-translate-y-2 group-hover/custom-btn:opacity-100 transition-all duration-300 delay-100 whitespace-nowrap">
                    {t.packages.weirdBadge}
                  </div>
                </button>
                
                <div className="mt-8 flex flex-col items-center gap-2">
                   <p className="text-stone-400 font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                      <Clock size={14} className="animate-pulse" /> {t.packages.replyFast}
                   </p>
                   <p className="text-nature-500 font-bold text-xs uppercase tracking-widest italic">{t.packages.replyFastSub}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 5 — MICRO HUMOR */}
      <section className="py-20 px-6 text-center">
        <FadeIn>
           <div className="space-y-3 opacity-30 hover:opacity-100 transition-opacity">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.3em]">{t.packages.micro1}</p>
              <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.3em]">{t.packages.micro2}</p>
              <p className="text-xs font-bold text-stone-600 uppercase tracking-[0.3em]">{t.packages.micro3}</p>
           </div>
        </FadeIn>
      </section>

      {/* MODAL / POPUP: PACKAGE DETAILS (REDESIGNED) */}
      {selectedPackage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPackage(null)}
        >
          <div 
            className="bg-white w-full max-w-4xl max-h-[90vh] md:max-h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row relative overflow-hidden animate-[popIn_0.3s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPackage(null)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/50 backdrop-blur hover:bg-white rounded-full flex items-center justify-center text-stone-500 hover:text-red-500 transition-all shadow-sm"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {/* LEFT SIDE: Visuals (40%) */}
            <div className="w-full md:w-[40%] bg-stone-100 relative h-48 md:h-auto overflow-hidden group">
               <img 
                 src={selectedPackage.image} 
                 alt={getPackageData(selectedPackage).title} 
                 className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-transparent to-transparent"></div>
               
               {/* Overlay Content */}
               <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="inline-block px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest mb-2">
                     {t.packages.modalVibe}
                  </div>
                  <h3 className="text-white font-serif text-2xl italic leading-none opacity-90">
                     "{selectedPackage.title.includes('Lake') ? 'Water is cheaper than therapy.' : 'Touch grass, not screens.'}"
                  </h3>
               </div>
            </div>

            {/* RIGHT SIDE: Information (60%) */}
            <div className="w-full md:w-[60%] p-6 md:p-10 flex flex-col bg-white relative">
               {/* Background Decor */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-nature-50 rounded-full blur-[60px] -z-10"></div>

               {/* Header */}
               <div className="mb-6">
                  <div className="flex items-start justify-between">
                     <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 leading-tight">
                        {getPackageData(selectedPackage).title}
                     </h2>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                     <span className="text-2xl font-black text-nature-600 tracking-tight">
                        {selectedPackage.price || 'Free'}
                     </span>
                     <span className="h-1 w-1 bg-stone-300 rounded-full"></span>
                     <span className="text-sm font-bold text-stone-500 uppercase tracking-wide">
                        {getPackageData(selectedPackage).duration || t.packages.modalTime}
                     </span>
                  </div>
               </div>

               {/* Description - Concise */}
               <p className="text-stone-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {getPackageData(selectedPackage).full_description || getPackageData(selectedPackage).description}
                  <span className="block mt-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
                     * Happiness highly probable.
                  </span>
               </p>

               {/* Features Grid - Compact */}
               <div className="grid grid-cols-2 gap-3 mb-auto overflow-y-auto max-h-[120px] custom-scrollbar">
                  {getPackageData(selectedPackage).features?.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 bg-stone-50 p-3 rounded-xl border border-stone-100">
                         <CheckCircle2 size={16} className="text-nature-500 flex-shrink-0" />
                         <span className="text-xs font-bold text-stone-700 leading-tight">{feat}</span>
                      </div>
                  ))}
               </div>

               {/* Footer / CTA */}
               <div className="mt-8 pt-6 border-t border-stone-100">
                  <button 
                     onClick={() => handleTelegramRedirect(getPackageData(selectedPackage).title)}
                     className="group w-full relative flex items-center justify-center gap-3 bg-stone-900 text-white rounded-2xl py-4 text-lg font-bold shadow-xl shadow-stone-900/20 overflow-hidden hover:scale-[1.02] active:scale-95 transition-all"
                  >
                     {/* Hover Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-r from-nature-600 to-nature-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                     
                     {/* Content */}
                     <div className="relative z-10 flex items-center gap-2">
                        <span>{t.packages.modalBtn}</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </div>
                  </button>
                  <p className="text-center mt-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                     {t.packages.modalNoCard}
                  </p>
               </div>

            </div>
          </div>
          
          {/* Internal Style for animation keyframes */}
          <style>{`
            @keyframes popIn {
              0% { opacity: 0; transform: scale(0.95) translateY(30px); }
              100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #e5e7eb;
              border-radius: 20px;
            }
          `}</style>
        </div>
      )}

    </div>
  );
};

export default Packages;
