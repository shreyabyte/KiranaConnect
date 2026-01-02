
import { Store, Product } from './types';

export const MOCK_STORES: Store[] = [
  {
    id: 's1',
    name: 'Gupta’s Family Kirana',
    rating: 4.8,
    reviewCount: 342,
    distance: '0.3 km',
    deliveryTime: '12 mins',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000',
    category: ['Flour', 'Spices', 'Grains'],
    isBestPrice: true,
    type: 'Retail'
  },
  {
    id: 's2',
    name: 'The Village Dairy',
    rating: 4.4,
    reviewCount: 156,
    distance: '0.8 km',
    deliveryTime: '20 mins',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1000',
    category: ['Dairy', 'Ghee', 'Paneer'],
    type: 'Retail'
  },
  {
    id: 's3',
    name: 'Green Earth Organics',
    rating: 4.9,
    reviewCount: 89,
    distance: '1.5 km',
    deliveryTime: '30 mins',
    image: 'https://images.unsplash.com/photo-1488459711635-de74eaa1da61?auto=format&fit=crop&q=80&w=1000',
    category: ['Organic', 'Honey', 'Oils'],
    type: 'Retail'
  },
  {
    id: 's4',
    name: 'Mishra’s Mithai Vatika',
    rating: 4.7,
    reviewCount: 210,
    distance: '0.5 km',
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=1000',
    category: ['Sweets', 'Snacks', 'Ladoos'],
    type: 'Retail'
  },
  {
    id: 's6',
    name: 'Apollo Neighborhood Pharmacy',
    rating: 4.8,
    reviewCount: 520,
    distance: '0.6 km',
    deliveryTime: '10 mins',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=1000',
    category: ['Medicine', 'Healthcare', 'Wellness'],
    type: 'Pharmacy'
  },
  {
    id: 's7',
    name: 'Aunty’s Homemade Pickles',
    rating: 4.9,
    reviewCount: 75,
    distance: '0.2 km',
    deliveryTime: '15 mins',
    image: 'https://images.unsplash.com/photo-1589135398302-388cd65e1d11?auto=format&fit=crop&q=80&w=1000',
    category: ['Pickles', 'Masala', 'Home Made'],
    type: 'HomeSeller'
  },
  {
    id: 's8',
    name: 'Fresh Bake Home Studio',
    rating: 4.7,
    reviewCount: 42,
    distance: '1.1 km',
    deliveryTime: '45 mins',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1000',
    category: ['Cakes', 'Bread', 'Cookies'],
    type: 'HomeSeller'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Stone-Ground Wheat Flour',
    brand: 'Neighborhood Original',
    weight: '5kg',
    price: 340,
    originalPrice: 380,
    category: 'Flour',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    storeId: 's1'
  },
  {
    id: 'p4',
    name: 'Fresh Malai Paneer',
    brand: 'Village Dairy',
    weight: '250g',
    price: 95,
    originalPrice: 110,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=400',
    storeId: 's2',
    subscriptionEligible: true
  },
  {
    id: 'p10',
    name: 'Farm Fresh A2 Milk',
    brand: 'Village Dairy',
    weight: '1L',
    price: 68,
    originalPrice: 72,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1550583724-1255d1426453?auto=format&fit=crop&q=80&w=400',
    storeId: 's2',
    subscriptionEligible: true
  },
  {
    id: 'p11',
    name: 'Vitamin C 500mg',
    brand: 'HealthGuard',
    weight: '30 Tablets',
    price: 180,
    originalPrice: 200,
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
    storeId: 's6'
  },
  {
    id: 'p12',
    name: 'Organic Tulsi Tea',
    brand: 'Wellness Co',
    weight: '100g',
    price: 150,
    originalPrice: 175,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544787210-2211d7c929c7?auto=format&fit=crop&q=80&w=400',
    storeId: 's6'
  },
  {
    id: 'p13',
    name: 'Grandma’s Mango Pickle',
    brand: 'Aunty’s Homemade',
    weight: '500g',
    price: 240,
    originalPrice: 280,
    category: 'Pickles',
    image: 'https://images.unsplash.com/photo-1589135398302-388cd65e1d11?auto=format&fit=crop&q=80&w=400',
    storeId: 's7'
  },
  {
    id: 'p14',
    name: 'Fudgy Chocolate Cake',
    brand: 'Fresh Bake Studio',
    weight: '1kg',
    price: 1200,
    originalPrice: 1400,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
    storeId: 's8'
  }
];

export const APP_THEME = {
  bg: '#FFFDF9',
  primary: '#C05621',
  secondary: '#2F855A',
  accent: '#FFB300',
  text: '#2D3748'
};
