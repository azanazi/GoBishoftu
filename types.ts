
export interface Package {
  id: string;
  title: string;
  title_am?: string; // Amharic Title
  description: string; // Short description for cards
  description_am?: string; // Amharic Short description
  full_description?: string; // Detailed description for deep dive
  full_description_am?: string; // Amharic Full description
  features?: string[]; // Array of bullet points
  features_am?: string[]; // Amharic Features
  image: string;
  duration?: string; // Manual override or derived
  duration_am?: string; // Amharic duration
  date?: string; // YYYY-MM-DD
  price?: string; // Cost of the package
  start_time?: string; // HH:MM
  end_time?: string; // HH:MM
  is_active: boolean;
  created_at?: string;
}

export interface Feedback {
  id: string;
  name?: string;
  message: string;
  created_at?: string;
}

export type ViewState = 'loading' | 'error' | 'success' | 'empty';
