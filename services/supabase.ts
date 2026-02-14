
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, IS_DEMO_MODE } from '../constants';
import { Package, Feedback } from '../types';

// Initialize Supabase only if keys are present
export const supabase = !IS_DEMO_MODE 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

// Mock Data for Demo Mode with Amharic
let MOCK_PACKAGES: Package[] = [
  {
    id: '1',
    title: 'Lake Hora Easy Day Out',
    title_am: 'ሆራ ሐይቅ የቀን ሽርሽር',
    description: 'Relax by the lake, eat good food, and take your time.',
    description_am: 'ሐይቅ ዳር ዘና ይበሉ፣ ምርጥ ምግብ ይመገቡ፣ ጊዜዎን ይውሰዱ።',
    full_description: 'This experience is perfect if you want a calm day near the lake. No rushing. Plenty of time to enjoy the view and good food.',
    full_description_am: 'ይህ ፓኬጅ ከሐይቅ ዳር የተረጋጋ ቀን ለሚፈልጉ ተስማሚ ነው። መጣደፍ የለም። እይታውን እና ምግቡን ለመደሰት በቂ ጊዜ አለ።',
    features: ['Lakeside seating', 'Local lunch included', 'Free time for photos'],
    features_am: ['ሐይቅ ዳር መቀመጫ', 'ምሳ ተካትቷል', 'ለፎቶ የሚሆን በቂ ጊዜ'],
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/be/50/9e.jpg',
    duration: '1 Day',
    duration_am: '1 ቀን',
    date: '2023-11-15',
    price: '1,500 ETB',
    start_time: '09:00',
    end_time: '17:00',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Crater Hike Adventure',
    title_am: 'የእግር ጉዞ ወደ ክሬተር',
    description: 'Explore the volcanic history of Bishoftu with a guided hike.',
    description_am: 'የቢሾፍቱን ታሪክ በእግር ጉዞ ያስሱ።',
    full_description: 'A moderate hike around the rim of the crater lakes. Stunning views and fresh air guaranteed.',
    full_description_am: 'በክሬተር ሐይቆች ዙሪያ የሚደረግ የእግር ጉዞ። አስደናቂ እይታ እና ንጹህ አየር።',
    features: ['Guided hike', 'Water snacks provided', 'Binoculars for bird watching'],
    features_am: ['አስጎብኚ', 'ውሃ እና መክሰስ', 'ወፍ ለመመልከት', 'ካሜራ'],
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/14/be/50/9e.jpg',
    duration: 'Half Day',
    duration_am: 'ግማሽ ቀን',
    date: '2023-11-20',
    price: '800 ETB',
    start_time: '08:00',
    end_time: '12:00',
    is_active: false, // Hidden by default
    created_at: new Date().toISOString()
  }
];

export const PackageService = {
  async getAll(): Promise<Package[]> {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 500)); // Simulate delay
      return MOCK_PACKAGES;
    }
    const { data, error } = await supabase!
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getActive(): Promise<Package[]> {
    if (IS_DEMO_MODE) {
      await new Promise(r => setTimeout(r, 500));
      return MOCK_PACKAGES.filter(p => p.is_active);
    }
    const { data, error } = await supabase!
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async create(pkg: Omit<Package, 'id' | 'created_at'>): Promise<Package | null> {
    if (IS_DEMO_MODE) {
      const newPkg = { ...pkg, id: Math.random().toString(), created_at: new Date().toISOString() };
      MOCK_PACKAGES.unshift(newPkg);
      return newPkg;
    }
    const { data, error } = await supabase!
      .from('packages')
      .insert(pkg)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Package>): Promise<void> {
    if (IS_DEMO_MODE) {
      MOCK_PACKAGES = MOCK_PACKAGES.map(p => p.id === id ? { ...p, ...updates } : p);
      return;
    }
    const { error } = await supabase!
      .from('packages')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
  },

  async delete(id: string): Promise<void> {
    if (IS_DEMO_MODE) {
      MOCK_PACKAGES = MOCK_PACKAGES.filter(p => p.id !== id);
      return;
    }
    
    // We use count: 'exact' to ensure we know if a row was actually deleted.
    // RLS policies often silently fail (return no error but count 0).
    const { error, count } = await supabase!
      .from('packages')
      .delete({ count: 'exact' })
      .eq('id', id);
    
    if (error) throw error;
    
    // If no rows were deleted, it likely means the ID wasn't found OR permission was denied by RLS
    if (count === 0) {
       throw new Error("Deletion failed. This may be due to Row Level Security (RLS) policies blocking deletion, or the item does not exist.");
    }
  }
};

export const FeedbackService = {
  async send(feedback: Omit<Feedback, 'id' | 'created_at'>): Promise<void> {
    if (IS_DEMO_MODE) {
      console.log('Mock Feedback Sent:', feedback);
      await new Promise(r => setTimeout(r, 800));
      return;
    }
    const { error } = await supabase!
      .from('feedback')
      .insert(feedback);
    
    if (error) throw error;
  }
};
