
import React, { useState } from 'react';
import { Send, Instagram, CheckCircle, MessageSquare, Heart, Sparkles } from 'lucide-react';
import Button from '../components/Button.tsx';
import FadeIn from '../components/FadeIn.tsx';
import { FeedbackService } from '../services/supabase.ts';
import { TELEGRAM_LINK, INSTAGRAM_LINK } from '../constants.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setStatus('submitting');
    try {
      await FeedbackService.send(formData);
      setStatus('success');
      setFormData({ name: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-10 font-sans text-stone-800 overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="px-6 text-center max-w-3xl mx-auto mb-16">
        <FadeIn>
          <div className="inline-block bg-earth-200 p-3 rounded-2xl mb-6 transform rotate-3 hover:rotate-6 transition-transform">
             <MessageSquare size={32} className="text-stone-700" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-800 mb-6">
            {t.contact.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 font-medium leading-relaxed">
            {t.contact.heroDesc}
          </p>
        </FadeIn>
      </section>

      {/* SECTION 2: QUICK CONTACT OPTIONS */}
      <section className="px-6 max-w-5xl mx-auto mb-24">
         <FadeIn delay={200}>
           <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-stone-400 uppercase tracking-widest text-sm">{t.contact.fastest}</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Telegram Card */}
              <a 
                href={TELEGRAM_LINK}
                target="_blank" 
                rel="noreferrer"
                className="group bg-blue-50 hover:bg-blue-100 border-2 border-blue-100 hover:border-blue-200 rounded-[2.5rem] p-6 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:rotate-1 relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-bl-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                 <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                    <Send size={32} />
                 </div>
                 <h3 className="text-3xl font-serif font-bold text-stone-800 mb-2">Telegram</h3>
                 <p className="text-stone-600 font-medium text-lg">{t.contact.telegramDesc}</p>
                 <div className="mt-6 font-bold text-blue-600 flex items-center gap-2">
                    {t.contact.sayHi} <span className="group-hover:translate-x-1 transition-transform">→</span>
                 </div>
              </a>

              {/* Instagram Card */}
              <a 
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="group bg-pink-50 hover:bg-pink-100 border-2 border-pink-100 hover:border-pink-200 rounded-[2.5rem] p-6 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:-rotate-1 relative overflow-hidden cursor-pointer block"
              >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-bl-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                 <div className="w-16 h-16 bg-pink-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30 group-hover:scale-110 transition-transform">
                    <Instagram size={32} />
                 </div>
                 <h3 className="text-3xl font-serif font-bold text-stone-800 mb-2">Instagram</h3>
                 <p className="text-stone-600 font-medium text-lg">{t.contact.instaDesc}</p>
                 <div className="mt-6 font-bold text-pink-600 flex items-center gap-2">
                    {t.contact.checkPhotos} <span className="group-hover:translate-x-1 transition-transform">→</span>
                 </div>
              </a>
           </div>
         </FadeIn>
      </section>

      {/* SECTION 3: FEEDBACK FORM */}
      <section className="px-4 max-w-2xl mx-auto mb-24">
         <FadeIn delay={400}>
           <div className="bg-white rounded-[3rem] shadow-xl border border-stone-100 p-8 md:p-12 relative">
              {/* Cute decor */}
              <div className="absolute -top-6 -left-6 bg-yellow-200 text-yellow-800 p-4 rounded-2xl transform -rotate-6 animate-wiggle hidden md:block shadow-lg">
                 <Sparkles size={24} />
              </div>

              <div className="text-center mb-10">
                 <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-3">{t.contact.formTitle}</h2>
                 <p className="text-stone-500 font-medium">{t.contact.formDesc}</p>
              </div>

              {status === 'success' ? (
                <div className="text-center py-10 animate-fade-up">
                   <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                      <CheckCircle size={48} />
                   </div>
                   <h3 className="text-3xl font-serif font-bold text-stone-800 mb-4">{t.contact.formSuccess}</h3>
                   <p className="text-stone-500 font-medium mb-8">{t.contact.formSuccessDesc}</p>
                   <Button variant="fun" onClick={() => setStatus('idle')} className="rounded-xl">
                      {t.contact.sendAnother}
                   </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2 ml-2">{t.contact.labelName}</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contact.placeholderName}
                        className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-nature-400 focus:ring-4 focus:ring-nature-100 outline-none transition-all font-medium text-lg placeholder:text-stone-400"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2 ml-2">{t.contact.labelMsg} <span className="text-red-400">*</span></label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder={t.contact.placeholderMsg}
                        className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-nature-400 focus:ring-4 focus:ring-nature-100 outline-none transition-all font-medium text-lg resize-none placeholder:text-stone-400"
                      />
                   </div>
                   <Button 
                     type="submit" 
                     fullWidth 
                     size="lg" 
                     variant="primary"
                     disabled={status === 'submitting'}
                     className="mt-4 py-3 md:py-4 text-lg md:text-xl rounded-2xl shadow-lg hover:shadow-nature-500/20 hover:rotate-1"
                   >
                      {status === 'submitting' ? t.contact.sending : t.contact.sendBtn}
                   </Button>
                </form>
              )}
           </div>
         </FadeIn>
      </section>

      {/* SECTION 4: SOCIAL PROOF / TRUST */}
      <section className="bg-nature-50 py-16 px-6 mb-20 transform -skew-y-1">
         <FadeIn>
           <div className="max-w-4xl mx-auto text-center transform skew-y-1">
              <div className="flex justify-center mb-6">
                 <Heart className="text-nature-500 fill-nature-500 animate-pulse" size={40} />
              </div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-nature-900 leading-tight">
                 {t.contact.trustTitle}
              </h3>
           </div>
         </FadeIn>
      </section>

      {/* SECTION 5: STAY CONNECTED */}
      <section className="px-6 text-center max-w-3xl mx-auto pb-10">
         <FadeIn>
           <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-8">
              {t.contact.updatesTitle}
           </h2>
           <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer">
             <Button size="lg" className="px-6 py-3 md:px-10 md:py-5 text-lg md:text-xl rounded-2xl shadow-xl bg-stone-900 text-white hover:bg-stone-800 border-4 border-stone-100 hover:scale-105 transition-transform hover:rotate-2">
                {t.contact.joinBtn}
             </Button>
           </a>
         </FadeIn>
      </section>

    </div>
  );
};

export default Contact;
