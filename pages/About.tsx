
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import FadeIn from '../components/FadeIn';
import { PLACEHOLDER_IMAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="font-sans text-stone-800 overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-32 pb-20 px-6 text-center">
         {/* Background elements / blobs */}
         <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float"></div>
         <div className="absolute top-40 right-10 w-40 h-40 bg-nature-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-float" style={{animationDelay: '1s'}}></div>

         <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-800 mb-8 leading-tight">
                {t.about.heroTitle}
              </h1>
              <div className="inline-block bg-white border border-stone-200 shadow-xl rounded-[2rem] px-8 py-6 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                 <p className="text-xl md:text-2xl font-bold text-stone-600">
                   {t.about.shortAnswer} <span className="text-nature-600">{t.about.shortAnswerText}</span> {t.about.shortAnswerEnd}
                 </p>
                 <p className="text-stone-400 mt-2 font-medium">{t.about.longAnswer}</p>
              </div>
            </FadeIn>
         </div>
         
         {/* Hero Image - Candid style */}
         <FadeIn delay={200}>
           <div className="mt-16 max-w-3xl mx-auto relative">
               <div className="absolute inset-0 bg-stone-900 rounded-[2.5rem] transform rotate-2"></div>
               <img 
                 src={PLACEHOLDER_IMAGES.resort} 
                 alt="Us in Bishoftu" 
                 className="relative w-full h-96 object-cover rounded-[2.5rem] transform -rotate-2 hover:rotate-0 transition-transform duration-700 shadow-2xl grayscale hover:grayscale-0"
               />
           </div>
         </FadeIn>
      </section>

      {/* SECTION 2: THE REAL STORY */}
      <section className="py-24 px-6 bg-white relative">
         <FadeIn>
           <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800">
                {t.about.storyTitle} <br/> {t.about.storyTitle2}
              </h2>
              <div className="text-lg md:text-xl text-stone-600 leading-relaxed font-medium space-y-8 bg-stone-50 p-8 md:p-12 rounded-[2.5rem] border border-stone-100 shadow-lg text-left transform hover:rotate-1 transition-transform">
                 <p>
                   {t.about.storyP1} <span className="bg-yellow-100 px-2 rounded-md font-bold text-stone-800">{t.about.storyQuote}</span> {t.about.storyP1End}
                 </p>
                 <p>
                   {t.about.storyP2}
                 </p>
                 <p className="text-stone-800 font-bold text-2xl">
                   {t.about.storyBold}
                 </p>
              </div>
           </div>
         </FadeIn>
      </section>

      {/* SECTION 3: WHAT WE ARE (AND ARE NOT) */}
      <section className="py-24 px-6 bg-nature-50 rounded-[3rem] mx-4 md:mx-8 relative overflow-hidden">
         {/* Decorative */}
         <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/40 rounded-full blur-3xl"></div>

         <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn>
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-800">
                   {t.about.clearTitle}
                 </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* WE ARE */}
               <FadeIn delay={200}>
                 <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-2 border-nature-100 hover:border-nature-300 transition-colors group h-full hover:-translate-y-2 hover:rotate-1 duration-300">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-nature-100 rounded-full flex items-center justify-center text-nature-600 text-3xl font-bold group-hover:scale-110 transition-transform group-hover:rotate-12">✅</div>
                       <h3 className="text-3xl font-bold text-stone-800">{t.about.weAre}</h3>
                    </div>
                    <ul className="space-y-6">
                       {t.about.weAreList.map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-xl font-medium text-stone-700">
                             <span className="flex-shrink-0 w-8 h-8 rounded-full bg-nature-50 flex items-center justify-center text-nature-600"><Check size={18} strokeWidth={3} /></span>
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
               </FadeIn>

               {/* WE ARE NOT */}
               <FadeIn delay={400}>
                 <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border-2 border-red-50 hover:border-red-200 transition-colors group h-full hover:-translate-y-2 hover:-rotate-1 duration-300">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-500 text-3xl font-bold group-hover:scale-110 transition-transform group-hover:-rotate-12">❌</div>
                       <h3 className="text-3xl font-bold text-stone-800">{t.about.weAreNot}</h3>
                    </div>
                    <ul className="space-y-6">
                       {t.about.weAreNotList.map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-xl font-medium text-stone-700">
                             <span className="flex-shrink-0 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500"><X size={18} strokeWidth={3} /></span>
                             {item}
                          </li>
                       ))}
                    </ul>
                 </div>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* SECTION 4: WHY WE DO THIS */}
      <section className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
             <FadeIn>
               <div className="inline-block bg-stone-900 text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-8 animate-pulse">{t.about.missionLabel}</div>
               <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-800 mb-12">{t.about.missionTitle}</h2>
               
               <div className="space-y-6 text-xl md:text-3xl font-serif leading-tight text-stone-600">
                  <p>{t.about.missionP1}</p>
                  <p>{t.about.missionP2}</p>
                  <p>{t.about.missionP3} <br className="hidden md:block"/> <span className="text-red-500 line-through decoration-4 decoration-stone-800">{t.about.missionBad1}</span> {t.about.missionP3.includes('And') ? 'and' : 'እና'} <span className="text-red-500 line-through decoration-4 decoration-stone-800">{t.about.missionBad2}</span>.</p>
               </div>
               
               <div className="mt-16 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <span className="bg-yellow-200 text-stone-900 px-8 py-4 rounded-2xl font-bold text-xl md:text-2xl shadow-xl border-4 border-stone-900 inline-block hover:scale-105 cursor-default transition-transform hover:rotate-2">
                     {t.about.missionFinal}
                  </span>
               </div>
             </FadeIn>
          </div>
      </section>

      {/* SECTION 5: INVITATION - "Funner" Edition */}
      <section className="py-32 px-6 bg-earth-100 rounded-t-[4rem] text-center relative overflow-visible">
         {/* Background */}
         <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none overflow-hidden rounded-t-[4rem]">
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-nature-300 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
         </div>

         <div className="max-w-3xl mx-auto relative z-10">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-800 mb-8 leading-tight">
                 {t.about.inviteTitle}
              </h2>
              <p className="text-xl text-stone-600 font-medium mb-20">
                 {t.about.inviteDesc}
              </p>
              
              <div className="relative inline-block group z-20 w-full md:w-auto">
                 {/* Funny Bouncing Badge */}
                 <div className="absolute -top-12 -right-4 z-30 pointer-events-none">
                    <div className="bg-red-500 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl transform rotate-12 shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] border-2 border-white group-hover:animate-[wiggle_0.5s_infinite] group-hover:scale-110 transition-transform">
                       {t.about.inviteBadge}
                    </div>
                 </div>

                 <Link to="/packages">
                    <button className="relative w-full md:w-auto md:min-w-[340px] h-20 md:h-[100px] rounded-[3rem] perspective-1000 group cursor-pointer focus:outline-none">
                        
                        {/* Shadow Layer */}
                        <div className="absolute inset-0 bg-stone-900 rounded-[3rem] translate-y-3 translate-x-0 group-hover:translate-y-4 group-hover:translate-x-0 transition-transform duration-200"></div>
                        
                        {/* Main Button Layer */}
                        <div className="absolute inset-0 bg-stone-800 rounded-[3rem] border-4 border-stone-900 flex items-center justify-center overflow-hidden transition-transform duration-100 group-hover:-translate-y-1 group-active:translate-y-2 group-active:translate-x-0">
                           
                           {/* Fun Gradient Background on Hover */}
                           <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-yellow-300 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[shimmer_2s_infinite]"></div>
                           
                           {/* Content Container */}
                           <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                              
                              {/* State 1: Boring */}
                              <div className="absolute transition-all duration-300 group-hover:-translate-y-20 group-hover:opacity-0 flex items-center gap-3">
                                  <span className="text-2xl md:text-4xl filter grayscale group-hover:grayscale-0">🥱</span>
                                  <span className="text-lg md:text-xl font-black text-white uppercase tracking-wider">{t.about.inviteBtn}</span>
                              </div>

                              {/* State 2: PARTY */}
                              <div className="absolute translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-3">
                                  <span className="text-2xl md:text-4xl animate-bounce">🚀</span>
                                  <span className="text-xl md:text-2xl font-black text-stone-900 uppercase tracking-widest drop-shadow-md">{t.about.inviteBtnHover}</span>
                              </div>

                           </div>
                        </div>

                        {/* Floating Emojis that pop out on hover */}
                        <div className="absolute -top-10 left-10 text-4xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-500 delay-75 pointer-events-none transform -rotate-12 hidden md:block">🍻</div>
                        <div className="absolute -top-4 right-20 text-4xl opacity-0 group-hover:opacity-100 group-hover:-translate-y-8 transition-all duration-500 delay-150 pointer-events-none transform rotate-12 hidden md:block">🌲</div>
                        <div className="absolute bottom-0 -right-8 text-4xl opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-500 delay-100 pointer-events-none hidden md:block">✨</div>

                    </button>
                 </Link>
              </div>

            </FadeIn>
         </div>
      </section>

    </div>
  );
};

export default About;
