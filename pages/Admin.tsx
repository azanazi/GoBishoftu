
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PackageService } from '../services/supabase.ts';
import { Package } from '../types.ts';
import Button from '../components/Button.tsx';
import { ADMIN_ACCESS_CODE, IS_DEMO_MODE } from '../constants.ts';
import { Trash2, Edit2, Plus, Lock, LogOut, X, Calendar, Clock, Upload, CheckCircle, Circle, ArrowLeft, Tag, Loader2, AlertTriangle } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  
  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Initial empty state for new package
  const initialPackageState: Partial<Package> = {
    title: '', 
    description: '', 
    full_description: '',
    image: '', 
    duration: '', 
    date: '',
    price: '',
    features: [],
    is_active: false
  };

  const [currentPkg, setCurrentPkg] = useState<Partial<Package>>(initialPackageState);

  // Clear confirmation state when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = () => setConfirmDeleteId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Auth Check
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === ADMIN_ACCESS_CODE) {
      setIsAuthenticated(true);
      fetchPackages();
    } else {
      alert('Wrong code. Try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccessCode('');
  };

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const data = await PackageService.getAll();
      setPackages(data);
    } catch (err) {
      console.error(err);
      alert('Failed to load packages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPkg.title || !currentPkg.description || !currentPkg.image) {
      alert("Title, Short Description and Image are required.");
      return;
    }

    try {
      if (currentPkg.id) {
        // Edit
        await PackageService.update(currentPkg.id, currentPkg);
      } else {
        // Create
        await PackageService.create(currentPkg as any);
      }
      setIsEditing(false);
      resetForm();
      fetchPackages();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    }
  };

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent document click listener from firing immediately
    
    if (confirmDeleteId === id) {
      // User confirmed
      handleDelete(id);
      setConfirmDeleteId(null);
    } else {
      // First click
      setConfirmDeleteId(id);
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistic Update: Remove from UI immediately for responsiveness
    const previousPackages = [...packages];
    setPackages(prev => prev.filter(p => p.id !== id));
    setDeletingId(id);

    try {
      await PackageService.delete(id);
    } catch (err: any) {
      console.error("Delete failed:", err);
      // Revert UI if backend fails
      setPackages(previousPackages);
      
      const isRLSError = err.message?.includes('Row Level Security') || err.message?.includes('Policy');
      const errorMsg = isRLSError 
        ? "Deletion Blocked: You need to enable the 'DELETE' policy in your Supabase Dashboard." 
        : `Error: ${err.message || 'Unknown error'}`;
        
      alert(errorMsg);
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setCurrentPkg(initialPackageState);
  };

  // Feature List Handlers
  const addFeature = () => {
    const currentFeatures = currentPkg.features || [];
    setCurrentPkg({ ...currentPkg, features: [...currentFeatures, ''] });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(currentPkg.features || [])];
    newFeatures[index] = value;
    setCurrentPkg({ ...currentPkg, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(currentPkg.features || [])];
    newFeatures.splice(index, 1);
    setCurrentPkg({ ...currentPkg, features: newFeatures });
  };

  // Image Upload Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const processFile = (file?: File) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPkg({ ...currentPkg, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-earth-50 px-4">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-stone-100 w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-stone-600 animate-float">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-6 font-serif">Admin Access</h2>
          <input
            type="password"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full px-6 py-4 rounded-xl border-2 border-stone-100 focus:border-stone-400 focus:ring-4 focus:ring-stone-100 outline-none transition-all mb-6 text-center text-xl tracking-widest bg-stone-50"
            placeholder="••••"
          />
          <Button type="submit" fullWidth size="lg">Unlock</Button>
          {IS_DEMO_MODE && <p className="mt-6 text-xs text-stone-400 font-bold uppercase tracking-widest">Demo Code: {ADMIN_ACCESS_CODE}</p>}
        </form>
        <Link to="/" className="mt-8 text-stone-400 font-bold text-sm hover:text-stone-600 flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 font-sans">
      
      {/* TOP BAR */}
      <div className="bg-white border-b border-stone-100 fixed top-0 w-full z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-nature-700 text-white p-2 rounded-lg font-bold font-serif">GB</div>
             <div>
               <h1 className="text-lg font-bold text-stone-800 leading-none">GoBishoftu Admin</h1>
               <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">Packages</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <Link to="/packages" className="hidden sm:flex items-center gap-2 text-stone-500 hover:text-nature-700 transition-colors text-sm font-bold bg-stone-50 px-4 py-2 rounded-xl hover:bg-stone-100">
                <ArrowLeft size={16} /> Back to Site
             </Link>
             <button 
               onClick={handleLogout}
               type="button"
               className="flex items-center gap-2 text-stone-400 hover:text-red-500 transition-colors text-sm font-bold bg-white border border-stone-100 px-4 py-2 rounded-xl hover:bg-red-50 hover:border-red-100"
             >
               <LogOut size={16} /> Log Out
             </button>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        
        {/* MAIN ACTION */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
           <div>
              <h2 className="text-3xl font-serif font-bold text-stone-800">Your Packages</h2>
              <p className="text-stone-500">Manage what visitors see on the site.</p>
           </div>
           <Button onClick={() => { setIsEditing(true); resetForm(); }} size="lg" className="rounded-xl shadow-lg flex items-center gap-2">
             <Plus size={20} /> Add New Package
           </Button>
        </div>

        {/* PACKAGE LIST */}
        {isLoading ? (
          <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-nature-600 animate-spin" />
            <p className="text-stone-400 font-bold uppercase tracking-widest text-xs">Fetching Packages...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {packages.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-shadow relative">
                 {/* Thumbnail */}
                 <img src={pkg.image} alt="" className="w-full md:w-24 h-24 rounded-xl object-cover bg-stone-100" />
                 
                 {/* Info */}
                 <div className="flex-grow text-center md:text-left">
                    <h3 className="text-xl font-bold text-stone-800 font-serif">{pkg.title}</h3>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-stone-500 font-medium">
                       {pkg.date && <span className="flex items-center gap-1"><Calendar size={14}/> {pkg.date}</span>}
                       {pkg.duration && <span className="flex items-center gap-1"><Clock size={14}/> {pkg.duration}</span>}
                       {pkg.price && <span className="flex items-center gap-1 text-nature-600"><Tag size={14}/> {pkg.price}</span>}
                    </div>
                 </div>

                 {/* Status Badge */}
                 <div className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide flex items-center gap-2 ${pkg.is_active ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-400'}`}>
                    {pkg.is_active ? <CheckCircle size={16} /> : <Circle size={16} />}
                    {pkg.is_active ? 'Active' : 'Inactive'}
                 </div>

                 {/* Actions */}
                 <div className="flex gap-2 relative">
                    <button 
                      type="button"
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        setCurrentPkg(pkg); 
                        setIsEditing(true); 
                      }}
                      className="p-3 hover:bg-stone-100 rounded-xl text-stone-400 hover:text-blue-600 transition-colors z-10"
                      title="Edit"
                    >
                      <Edit2 size={20} />
                    </button>
                    
                    <button 
                      type="button"
                      onClick={(e) => handleDeleteClick(e, pkg.id)}
                      disabled={!!deletingId && deletingId !== pkg.id}
                      className={`p-3 rounded-xl transition-all duration-200 z-10 flex items-center justify-center relative ${
                        confirmDeleteId === pkg.id 
                          ? 'bg-red-500 text-white shadow-lg scale-110 rotate-3' 
                          : 'hover:bg-stone-100 text-stone-400 hover:text-red-600'
                      }`}
                      title={confirmDeleteId === pkg.id ? "Click again to confirm" : "Delete"}
                    >
                      {confirmDeleteId === pkg.id ? (
                        <Trash2 size={20} className="animate-bounce" strokeWidth={3} />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </button>
                    
                    {/* Confirmation Tooltip */}
                    {confirmDeleteId === pkg.id && (
                        <div className="absolute top-full right-0 mt-2 bg-stone-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl z-30 animate-fade-up whitespace-nowrap">
                           Click again to delete
                           <div className="absolute -top-1 right-4 w-2 h-2 bg-stone-800 transform rotate-45"></div>
                        </div>
                    )}
                 </div>
              </div>
            ))}
            
            {packages.length === 0 && (
              <div className="text-center py-16 bg-white rounded-[2rem] border-2 border-dashed border-stone-200">
                <p className="text-stone-400 font-bold text-lg mb-4">No packages yet.</p>
                <Button variant="outline" onClick={() => { setIsEditing(true); resetForm(); }}>Create the first one</Button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* EDIT/ADD MODAL */}
      {isEditing && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-50 flex justify-center overflow-y-auto pt-10 pb-10 px-4">
           <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl relative flex flex-col h-fit animate-fade-up">
              
              {/* Modal Header */}
              <div className="px-8 py-6 border-b border-stone-100 flex justify-between items-center sticky top-0 bg-white z-10 rounded-t-[2rem]">
                 <h2 className="text-2xl font-serif font-bold text-stone-800">
                   {currentPkg.id ? 'Edit Package' : 'New Package'}
                 </h2>
                 <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">
                   <X size={24} />
                 </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-8 space-y-10">
                 
                 {/* 1. BASIC INFO */}
                 <section className="space-y-4">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
                       <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">1</span> Basic Info
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Package Title</label>
                      <input 
                        className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl p-4 focus:border-nature-500 focus:bg-white outline-none transition-all font-bold text-lg" 
                        value={currentPkg.title || ''} 
                        onChange={e => setCurrentPkg({...currentPkg, title: e.target.value})} 
                        placeholder="e.g. Lake Hora Easy Day Out"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Short Description <span className="text-stone-400 font-normal">(Shown on card)</span></label>
                      <input 
                        className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl p-4 focus:border-nature-500 focus:bg-white outline-none transition-all" 
                        value={currentPkg.description || ''} 
                        onChange={e => setCurrentPkg({...currentPkg, description: e.target.value})} 
                        placeholder="1-2 lines summary..."
                        required
                      />
                    </div>
                 </section>

                 {/* 2. FULL DESCRIPTION */}
                 <section className="space-y-4">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
                       <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">2</span> Details
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Full Description</label>
                      <textarea 
                        className="w-full bg-stone-50 border-2 border-stone-100 rounded-xl p-4 focus:border-nature-500 focus:bg-white outline-none transition-all resize-none min-h-[120px]" 
                        value={currentPkg.full_description || ''} 
                        onChange={e => setCurrentPkg({...currentPkg, full_description: e.target.value})} 
                        placeholder="Explain the experience..."
                        rows={5}
                      />
                    </div>
                 </section>

                 {/* 3. FEATURES */}
                 <section className="space-y-4">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
                       <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">3</span> Features
                    </div>
                    <div className="space-y-3">
                       {currentPkg.features?.map((feature, idx) => (
                          <div key={idx} className="flex gap-2">
                             <input 
                                className="flex-grow bg-stone-50 border border-stone-200 rounded-lg p-3 focus:border-nature-500 outline-none text-sm font-medium"
                                value={feature}
                                onChange={(e) => updateFeature(idx, e.target.value)}
                                placeholder="e.g. Local lunch included"
                             />
                             <button type="button" onClick={() => removeFeature(idx)} className="text-stone-400 hover:text-red-500 p-2"><Trash2 size={18}/></button>
                          </div>
                       ))}
                       <button type="button" onClick={addFeature} className="text-sm font-bold text-nature-600 hover:text-nature-700 flex items-center gap-1 mt-2">
                          <Plus size={16} /> Add Feature
                       </button>
                    </div>
                 </section>

                 {/* 4. DATE & TIME & PRICE */}
                 <section className="space-y-4">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
                       <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">4</span> Logistics
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-bold text-stone-700 mb-2">Date</label>
                          <input 
                             type="date"
                             className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 focus:border-nature-500 outline-none"
                             value={currentPkg.date || ''}
                             onChange={e => setCurrentPkg({...currentPkg, date: e.target.value})}
                          />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-stone-700 mb-2">Duration (Optional)</label>
                          <input 
                             className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 focus:border-nature-500 outline-none"
                             value={currentPkg.duration || ''}
                             onChange={e => setCurrentPkg({...currentPkg, duration: e.target.value})}
                             placeholder="e.g. Full Day"
                          />
                       </div>
                       <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-stone-700 mb-2">Price (Optional)</label>
                          <input 
                             className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 focus:border-nature-500 outline-none"
                             value={currentPkg.price || ''}
                             onChange={e => setCurrentPkg({...currentPkg, price: e.target.value})}
                             placeholder="e.g. 1,500 ETB"
                          />
                       </div>
                    </div>
                 </section>

                 {/* 5. IMAGE */}
                 <section className="space-y-4">
                    <div className="flex items-center gap-2 text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">
                       <span className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center">5</span> Visuals
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Package Image</label>
                      
                      <div 
                        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer relative ${isDragging ? 'border-nature-500 bg-nature-50' : 'border-stone-200 hover:border-nature-400 hover:bg-stone-50'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input 
                          type="file" 
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                        {currentPkg.image ? (
                          <div className="relative group">
                             <img src={currentPkg.image} alt="Preview" className="w-full h-48 object-cover rounded-lg shadow-sm" />
                             <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                <p className="text-white font-bold flex items-center gap-2"><Upload size={20}/> Change Image</p>
                             </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3 py-4 text-stone-500">
                             <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center">
                                <Upload size={28} className="text-stone-400" />
                             </div>
                             <div>
                               <p className="font-bold text-stone-700 text-lg">Click to upload</p>
                               <p className="text-sm">or drag and drop</p>
                             </div>
                          </div>
                        )}
                      </div>
                    </div>
                 </section>

                 {/* 6. STATUS */}
                 <section className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="flex items-center justify-between cursor-pointer group">
                       <div>
                          <span className="block text-lg font-bold text-stone-800">Package Status</span>
                          <span className="text-sm text-stone-500">Visible on the website?</span>
                       </div>
                       <div className="relative">
                          <input 
                            type="checkbox" 
                            checked={!!currentPkg.is_active} 
                            onChange={e => setCurrentPkg({...currentPkg, is_active: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-14 h-8 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-nature-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-nature-600"></div>
                       </div>
                    </label>
                 </section>

                 {/* 7. ACTIONS */}
                 <div className="pt-6 flex gap-4">
                    <Button type="submit" fullWidth size="lg" className="rounded-xl shadow-xl">
                       💾 Save Package
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="px-6 rounded-xl">
                       Cancel
                    </Button>
                 </div>

              </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
