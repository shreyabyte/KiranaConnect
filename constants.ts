
import { Store, Product } from './types';

export const MOCK_STORES: Store[] = [
  {
    id: 's1',
    name: 'Gupta’s Family Kirana',
    rating: 4.8,
    reviewCount: 342,
    distance: '0.3 km',
    deliveryTime: '12 mins',
    image: '/imageasset/gupta.png',
    category: ['Flour', 'Spices', 'Grains', 'Groceries'],
    isBestPrice: true,
    type: 'Retail'
  },
  {
    id: 's2',
    name: 'Mother Dairy',
    rating: 4.4,
    reviewCount: 156,
    distance: '0.8 km',
    deliveryTime: '20 mins',
    image: '/imageasset/diary.png',
    category: ['Dairy', 'Ghee', 'Paneer'],
    type: 'Retail'
  },
  {
    id: 's4',
    name: 'Mishra’s Mithai Vatika',
    rating: 4.7,
    reviewCount: 210,
    distance: '0.5 km',
    deliveryTime: '15 mins',
    image: '/imageasset/sweet.png',
    category: ['Sweets', 'Snacks', 'Ladoos'],
    type: 'Retail'
  },
  {
    id: 's6',
    name: 'Indian Pharmacy',
    rating: 4.8,
    reviewCount: 520,
    distance: '0.6 km',
    deliveryTime: '10 mins',
    image: '/imageasset/pharmacy.png',
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
    image: '/imageasset/pickle.png',
    category: ['Pickles', 'Masala', 'Home Made'],
    type: 'HomeSeller'
  },
  {
    id: 's8',
    name: 'Bombay Bakery',
    rating: 4.7,
    reviewCount: 42,
    distance: '1.1 km',
    deliveryTime: '45 mins',
    image: '/imageasset/bakery.png',
    category: ['Cakes', 'Bread', 'Cookies'],
    type: 'HomeSeller'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Ashirwad Atta',
    brand: 'Gupta’s Family Kirana',
    weight: '5kg',
    price: 340,
    originalPrice: 380,
    category: 'Flour',
    image: 'imageasset/atta.png',
    storeId: 's1'
  },
  {
    id: 'p4',
    name: 'Fresh Malai Paneer',
    brand: 'Mother Dairy',
    weight: '250g',
    price: 95,
    originalPrice: 110,
    category: 'Dairy',
    image: 'imageasset/paneer.png',
    storeId: 's2',
    subscriptionEligible: true
  },
  {
    id: 'p10',
    name: 'Milk',
    brand: 'Mothery Dairy',
    weight: '1L',
    price: 68,
    originalPrice: 72,
    category: 'Dairy',
    image: 'imageasset/milk.png',
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
    image: 'imageasset/tea.png',
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
    image: 'imageasset/mpickle.png',
    storeId: 's7'
  },
  {
    id: 'p14',
    name: 'Fudgy Chocolate Cake',
    brand: 'Bombay Bakery',
    weight: '1kg',
    price: 1200,
    originalPrice: 1400,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
    storeId: 's8'
  },
  {
    id: 'p15',
    name: 'Jalebi',
    brand: 'Mishra’s Mithai Vatika',
    weight: '500g',
    price: 260,
    originalPrice: 300,
    category: 'Sweets',
    image: 'imageasset/jalebi.png',
    storeId: 's4'
  },
  {
    id: 'p16',
    name: 'Motichoor Ladoo',
    brand: 'Mishra’s Mithai Vatika',
    weight: '12 pcs',
    price: 320,
    originalPrice: 360,
    category: 'Sweets',
    image: 'imageasset/laddu.png',
    storeId: 's4'
  },
  {
    id: 'p17',
    name: 'Kaju Barfi',
    brand: 'Mishra’s Mithai Vatika',
    weight: '400g',
    price: 380,
    originalPrice: 420,
    category: 'Sweets',
    image: 'imageasset/barfi.png',
    storeId: 's4'
  },
  {
    id: 'p18',
    name: 'Fresh Cream Pastry Box',
    brand: 'Bombay Bakery',
    weight: '6 pcs',
    price: 420,
    originalPrice: 480,
    category: 'Cakes',
    image: 'imageasset/freshcream.png',
    storeId: 's8'
  },
  {
    id: 'p19',
    name: 'Butter Cookies',
    brand: 'Bombay Bakery',
    weight: '300g',
    price: 180,
    originalPrice: 220,
    category: 'Cookies',
    image: 'imageasset/cookies.png',
    storeId: 's8'
  },
  {
    id: 'p20',
    name: 'Garlic Herb Bread Loaf',
    brand: 'Bombay Bakery',
    weight: '400g',
    price: 90,
    originalPrice: 110,
    category: 'Bread',
    image: 'imageasset/herbbread.png',
    storeId: 's8'
  },
  {
    id: 'p21',
    name: 'Grandma’s Lemon Chilli Pickle',
    brand: 'Aunty’s Homemade',
    weight: '450g',
    price: 220,
    originalPrice: 260,
    category: 'Pickles',
    image: 'imageasset/lemonpickle.png',
    storeId: 's7'
  },
  {
    id: 'p22',
    name: 'Premium Basmati Rice',
    brand: 'Gupta’s Family Kirana',
    weight: '5kg',
    price: 780,
    originalPrice: 840,
    category: 'Grains',
    image: 'imageasset/rice.png',
    storeId: 's1'
  },
  {
    id: 'p23',
    name: 'Cold-Pressed Mustard Oil',
    brand: 'Gupta’s Family Kirana',
    weight: '1L',
    price: 210,
    originalPrice: 250,
    category: 'Oils',
    image: 'imageasset/oil.png',
    storeId: 's1'
  }
];

export const APP_THEME = {
  bg: '#FFFDF9',
  primary: '#C05621',
  secondary: '#2F855A',
  accent: '#FFB300',
  text: '#2D3748'
};
