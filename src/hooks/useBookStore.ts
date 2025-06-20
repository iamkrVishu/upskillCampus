import { useState, useEffect } from 'react';
import { Book, Customer, Sale, DashboardStats } from '../types';

// Mock data with real book images
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0-7432-7356-5',
    genre: 'Classic Literature',
    price: 15.99,
    stock: 25,
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    publishedDate: '1925-04-10',
    publisher: 'Scribner',
    pages: 180,
    language: 'English',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0-06-112008-4',
    genre: 'Fiction',
    price: 18.50,
    stock: 15,
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    image: 'https://images.pexels.com/photos/1172849/pexels-photo-1172849.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    publishedDate: '1960-07-11',
    publisher: 'J.B. Lippincott',
    pages: 281,
    language: 'English',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0-452-28423-4',
    genre: 'Dystopian Fiction',
    price: 16.75,
    stock: 8,
    description: 'A dystopian social science fiction novel about totalitarian control and surveillance.',
    image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    publishedDate: '1949-06-08',
    publisher: 'Secker & Warburg',
    pages: 328,
    language: 'English',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z'
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0-14-143951-8',
    genre: 'Romance',
    price: 14.25,
    stock: 20,
    description: 'A romantic novel of manners set in Georgian England.',
    image: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    publishedDate: '1813-01-28',
    publisher: 'T. Egerton',
    pages: 432,
    language: 'English',
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z'
  },
  {
    id: '5',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '978-0-316-76948-0',
    genre: 'Fiction',
    price: 17.99,
    stock: 12,
    description: 'A controversial novel about teenage rebellion and alienation.',
    image: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    publishedDate: '1951-07-16',
    publisher: 'Little, Brown',
    pages: 277,
    language: 'English',
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: '6',
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling',
    isbn: '978-0-439-70818-8',
    genre: 'Fantasy',
    price: 12.99,
    stock: 35,
    description: 'The first book in the beloved Harry Potter series about a young wizard.',
    image: 'https://images.pexels.com/photos/1261180/pexels-photo-1261180.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2',
    publishedDate: '1997-06-26',
    publisher: 'Bloomsbury',
    pages: 309,
    language: 'English',
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z'
  }
];

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State 12345',
    totalPurchases: 1250.75,
    lastPurchase: '2024-01-15T10:30:00Z',
    membershipLevel: 'gold',
    createdAt: '2023-06-15T00:00:00Z'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.j@email.com',
    phone: '(555) 987-6543',
    address: '456 Oak Ave, City, State 12345',
    totalPurchases: 675.25,
    lastPurchase: '2024-01-14T14:20:00Z',
    membershipLevel: 'silver',
    createdAt: '2023-08-22T00:00:00Z'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '(555) 456-7890',
    address: '789 Pine St, City, State 12345',
    totalPurchases: 425.50,
    lastPurchase: '2024-01-12T09:15:00Z',
    membershipLevel: 'bronze',
    createdAt: '2023-09-10T00:00:00Z'
  },
  {
    id: '4',
    name: 'Sarah Davis',
    email: 'sarah.davis@email.com',
    phone: '(555) 321-0987',
    address: '321 Elm St, City, State 12345',
    totalPurchases: 890.00,
    lastPurchase: '2024-01-13T16:45:00Z',
    membershipLevel: 'silver',
    createdAt: '2023-07-05T00:00:00Z'
  }
];

const mockSales: Sale[] = [
  {
    id: '1',
    customerId: '1',
    customerName: 'John Smith',
    books: [
      { bookId: '1', bookTitle: 'The Great Gatsby', quantity: 2, price: 15.99 },
      { bookId: '2', bookTitle: 'To Kill a Mockingbird', quantity: 1, price: 18.50 }
    ],
    totalAmount: 50.48,
    paymentMethod: 'card',
    date: '2024-01-15T10:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    customerId: '2',
    customerName: 'Emily Johnson',
    books: [
      { bookId: '3', bookTitle: '1984', quantity: 1, price: 16.75 }
    ],
    totalAmount: 16.75,
    paymentMethod: 'cash',
    date: '2024-01-14T14:20:00Z',
    status: 'completed'
  },
  {
    id: '3',
    customerId: '3',
    customerName: 'Michael Brown',
    books: [
      { bookId: '6', bookTitle: 'Harry Potter and the Sorcerer\'s Stone', quantity: 3, price: 12.99 }
    ],
    totalAmount: 38.97,
    paymentMethod: 'online',
    date: '2024-01-12T09:15:00Z',
    status: 'completed'
  }
];

export const useBookStore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalCustomers: 0,
    totalSales: 0,
    revenue: 0,
    lowStockBooks: 0,
    todaysSales: 0
  });

  useEffect(() => {
    // Load data from localStorage or use mock data
    try {
      const savedBooks = localStorage.getItem('bookstore_books');
      const savedCustomers = localStorage.getItem('bookstore_customers');
      const savedSales = localStorage.getItem('bookstore_sales');

      setBooks(savedBooks ? JSON.parse(savedBooks) : mockBooks);
      setCustomers(savedCustomers ? JSON.parse(savedCustomers) : mockCustomers);
      setSales(savedSales ? JSON.parse(savedSales) : mockSales);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      setBooks(mockBooks);
      setCustomers(mockCustomers);
      setSales(mockSales);
    }
  }, []);

  useEffect(() => {
    // Calculate stats
    const lowStockBooks = books.filter(book => book.stock < 10).length;
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const today = new Date().toISOString().split('T')[0];
    const todaysSales = sales.filter(sale => sale.date.startsWith(today)).length;

    setStats({
      totalBooks: books.length,
      totalCustomers: customers.length,
      totalSales: sales.length,
      revenue: totalRevenue,
      lowStockBooks,
      todaysSales
    });
  }, [books, customers, sales]);

  const addBook = (book: Omit<Book, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBook: Book = {
      ...book,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem('bookstore_books', JSON.stringify(updatedBooks));
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    const updatedBooks = books.map(book =>
      book.id === id ? { ...book, ...updates, updatedAt: new Date().toISOString() } : book
    );
    setBooks(updatedBooks);
    localStorage.setItem('bookstore_books', JSON.stringify(updatedBooks));
  };

  const deleteBook = (id: string) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem('bookstore_books', JSON.stringify(updatedBooks));
  };

  const addCustomer = (customer: Omit<Customer, 'id' | 'createdAt'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    localStorage.setItem('bookstore_customers', JSON.stringify(updatedCustomers));
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    const updatedCustomers = customers.map(customer =>
      customer.id === id ? { ...customer, ...updates } : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem('bookstore_customers', JSON.stringify(updatedCustomers));
  };

  const deleteCustomer = (id: string) => {
    const updatedCustomers = customers.filter(customer => customer.id !== id);
    setCustomers(updatedCustomers);
    localStorage.setItem('bookstore_customers', JSON.stringify(updatedCustomers));
  };

  const addSale = (sale: Omit<Sale, 'id'>) => {
    const newSale: Sale = {
      ...sale,
      id: Math.random().toString(36).substr(2, 9)
    };
    const updatedSales = [...sales, newSale];
    setSales(updatedSales);
    localStorage.setItem('bookstore_sales', JSON.stringify(updatedSales));

    // Update book stock
    sale.books.forEach(bookSale => {
      const book = books.find(b => b.id === bookSale.bookId);
      if (book) {
        updateBook(book.id, { stock: book.stock - bookSale.quantity });
      }
    });

    // Update customer total purchases
    const customer = customers.find(c => c.id === sale.customerId);
    if (customer) {
      updateCustomer(customer.id, {
        totalPurchases: customer.totalPurchases + sale.totalAmount,
        lastPurchase: sale.date
      });
    }
  };

  return {
    books,
    customers,
    sales,
    stats,
    addBook,
    updateBook,
    deleteBook,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    addSale
  };
};