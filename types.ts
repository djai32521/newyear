
export type CardTheme = 'traditional' | 'modern' | 'minimalist' | 'horse' | 'elegant' | 'warm' | 'cartoon';

export interface CardData {
  recipient: string;
  message: string;
  sender: string;
  theme: CardTheme;
  backgroundImageUrl: string | null;
}

export interface ThemeOption {
  id: CardTheme;
  label: string;
  description: string;
  color: string;
}

export interface CardPreset {
  id: number;
  title: string;
  recipient: string;
  sender: string;
  message: string;
  theme: CardTheme;
}
