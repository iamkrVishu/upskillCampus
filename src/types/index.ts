export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'employee';
  avatar?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  publishedDate: string;
  publisher: string;
  pages: number;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalPurchases: number;
  lastPurchase: string;
  membershipLevel: 'bronze' | 'silver' | 'gold';
  createdAt: string;
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  books: {
    bookId: string;
    bookTitle: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  paymentMethod: 'cash' | 'card' | 'online';
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface DashboardStats {
  totalBooks: number;
  totalCustomers: number;
  totalSales: number;
  revenue: number;
  lowStockBooks: number;
  todaysSales: number;
}