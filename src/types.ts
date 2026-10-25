export interface Product {
  id: number;
  title: string;
  category: 'tecnologia' | 'hogar' | 'moda' | 'belleza';
  categoryLabel: string;
  price: number;
  oldPrice?: number | null;
  badge?: string;
  image: string;
  rating: number;
  reviewCount: number;
  shortDesc: string;
  fullDesc: string;
  stock: number;
  features: string[];
  specs: Record<string, string>;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productTitle: string;
  verified: boolean;
}

export type OrderStatus =
  | 'por_confirmar'
  | 'empacado'
  | 'guia_generada'
  | 'en_reparto'
  | 'entregado'
  | 'devuelto'
  | 'confirmado'
  | 'en_preparacion'
  | 'en_transito';

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  department: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: 'contraentrega' | 'nequi' | 'pse' | 'tarjeta';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  carrier?: 'Coordinadora' | 'Servientrega' | 'Interrapidísimo';
  trackingNumber?: string;
  labelGeneratedAt?: string;
  statusUpdatedAt?: string;
}

export interface TrackingStep {
  title: string;
  location: string;
  date: string;
  completed: boolean;
  current?: boolean;
}
