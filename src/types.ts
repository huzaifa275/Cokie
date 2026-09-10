export type CategoryId = 
  | 'all'
  | 'cookies'
  | 'brownies'
  | 'cakes'
  | 'traditional'
  | 'savory'
  | 'beverages';

export interface BakeryItem {
  id: string;
  name: string;
  urduName?: string;
  category: CategoryId;
  price: number; // in PKR
  originalPrice?: number;
  description: string;
  image: string;
  badge?: 'Best Seller' | 'Fresh Batch' | "Chef's Special" | 'Eggless' | 'Signature' | 'Must Try';
  rating: number;
  reviewsCount: number;
  isEggless?: boolean;
  isGlutenFree?: boolean;
  containsNuts?: boolean;
  prepTime?: string;
  calories?: string;
  servingSize?: string;
  ingredients?: string[];
  options?: {
    name: string;
    choices: { label: string; extraPrice?: number }[];
  }[];
}

export interface CartItem {
  cartItemId: string;
  item: BakeryItem;
  quantity: number;
  selectedOption?: string;
  customNote?: string;
  serveWarm?: boolean;
  giftBox?: boolean;
}

export type OrderType = 'delivery' | 'takeaway';

export interface Branch {
  id: string;
  name: string;
  city: 'Karachi' | 'Lahore' | 'Islamabad';
  address: string;
  area: string;
  timing: string;
  phone: string;
  whatsapp: string;
  hasDineIn: boolean;
  pickupTime: string;
  mapEmbedUrl: string;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  email: string;
  city: 'Karachi' | 'Lahore' | 'Islamabad';
  area: string;
  streetAddress: string;
  landmark?: string;
  instructions?: string;
  deliveryTime: 'asap' | 'scheduled';
  scheduledTime?: string;
}

export interface TakeawayDetails {
  fullName: string;
  phone: string;
  branchId: string;
  pickupTime: 'asap' | 'scheduled';
  scheduledTime?: string;
}

export type PaymentMethod = 'cod' | 'jazzcash' | 'easypaisa' | 'nayapay' | 'card';

export interface Order {
  id: string;
  orderNumber: string;
  orderType: OrderType;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  appliedPromo?: string;
  total: number;
  deliveryDetails?: DeliveryDetails;
  takeawayDetails?: TakeawayDetails;
  paymentMethod: PaymentMethod;
  status: 'placed' | 'baking' | 'quality_check' | 'on_the_way' | 'ready_for_pickup' | 'delivered';
  placedAt: string;
  estimatedTime: string;
  riderName?: string;
  riderPhone?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  itemOrdered: string;
  verified: boolean;
}
