export interface Beer {
  id: string;
  name: string;
  type: string;
  description: string | null;
  alcohol: number;
  price: number;
  stock: number;
  ibu: number | null;
  temperature: number | null;
  volume: number | null;
  brewery: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at?: string;
}
