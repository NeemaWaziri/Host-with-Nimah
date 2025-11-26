export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface BookingRequest {
  name: string;
  email: string;
  date: string;
  guestCount: number;
  occasion: string;
  allergies: string;
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export interface RecipeData {
  title: string;
  description: string;
  prepInfo: string[];
  ingredients: string[];
  instructions: string[];
  plating: string;
  image?: string;
}
