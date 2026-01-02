
export interface Store {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  distance: string;
  deliveryTime: string;
  image: string;
  category: string[];
  isBestPrice?: boolean;
  type?: 'Retail' | 'Pharmacy' | 'HomeSeller';
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  weight: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  storeId: string;
  subscriptionEligible?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  isSubscription?: boolean;
  frequency?: 'Daily' | 'Weekly' | 'Monthly';
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  isVerified: boolean;
}

export type OrderStatus = 'Pending' | 'Accepted' | 'Packed' | 'Out for Delivery' | 'Delivered';

export interface Order {
  id: string;
  storeId: string;
  storeName: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number; // timestamp
  estimatedMinutes: number;
  isSubscription?: boolean;
}

export interface ComparisonResult {
  productName: string;
  stores: {
    storeName: string;
    price: number;
    isBest: boolean;
  }[];
}
