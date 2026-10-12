export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  featured: boolean;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  details: string;
  price: number;
  compareAt: number;
  images: string[];
  collectionIds: string[];
  stock: number;
  featured: boolean;
  bestseller: boolean;
  createdAt: string;
};

export type CartItem = {
  productId: string;
  qty: number;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image: string;
};

export type Order = {
  id: string;
  number: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    notes: string;
  };
  createdAt: string;
};

export type Review = {
  id: string;
  name: string;
  body: string;
  rating: number;
  date: string;
  featured: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  body: string;
  createdAt: string;
  read: boolean;
};

export type Reel = {
  id: string;
  image: string;
  caption: string;
  url: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
};

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export type Settings = {
  storeName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  address: string;
  hours: string;
  shippingFee: number;
  freeShippingAbove: number;
  adminEmail: string;
  passwordHash: string;
};

export type Content = {
  announcement: { enabled: boolean; text: string; link: string };
  announcements: string[];
  heroTitle: string;
  heroImage: string;
  featuredProductId: string;
  story: { eyebrow: string; title: string; body: string; image: string };
  why: { title: string; body: string }[];
  reels: Reel[];
};

export type Database = {
  settings: Settings;
  content: Content;
  collections: Collection[];
  products: Product[];
  orders: Order[];
  reviews: Review[];
  faqs: Faq[];
  messages: Message[];
  users: User[];
};
