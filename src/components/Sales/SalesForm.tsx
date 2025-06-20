import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { Book, Customer, Sale } from '../../types';

interface SalesFormProps {
  books: Book[];
  customers: Customer[];
  onSave: (sale: Omit<Sale, 'id'>) => void;
  onClose: () => void;
}

interface BookItem {
  bookId: string;
  bookTitle: string;
  quantity: number;
  price: number;
}

const SalesForm: React.FC<SalesFormProps> = ({ books, customers, onSave, onClose }) => {
  const [customerId, setCustomerId] = useState('');
  const [selectedBooks, setSelectedBooks] = useState<BookItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'online'>('cash');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addBook = () => {
    setSelectedBooks([...selectedBooks, { bookId: '', bookTitle: '', quantity: 1, price: 0 }]);
  };

  const removeBook = (index: number) => {
    setSelectedBooks(selectedBooks.filter((_, i) => i !== index));
  };

  const updateBook = (index: number, field: keyof BookItem, value: string | number) => {
    const updated = [...selectedBooks];
    if (field === 'bookId') {
      const book = books.find(b => b.id === value);
      if (book) {
        updated[index] = {
          ...updated[index],
          bookId: book.id,
          bookTitle: book.title,
          price: book.price
        };
      }
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setSelectedBooks(updated);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!customerId) newErrors.customer = 'Please select a customer';
    if (selectedBooks.length === 0) newErrors.books = 'Please add at least one book';
    
    selectedBooks.forEach((book, index) => {
      if (!book.bookId) newErrors[`book_${index}`] = 'Please select a book';
      if (book.quantity <= 0) newErrors[`quantity_${index}`] = 'Quantity must be greater than 0';
      
      const availableBook = books.find(b => b.id === book.bookId);
      if (availableBook && book.quantity > availableBook.stock) {
        newErrors[`quantity_${index}`] = `Only ${availableBook.stock} items available`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const customer = customers.find(c => c.id === customerId);
    if (!customer) return;

    const totalAmount = selectedBooks.reduce((sum, book) => sum + (book.price * book.quantity), 0);

    const sale: Omit<Sale, 'id'> = {
      customerId,
      customerName: customer.name,
      books: selectedBooks,
      totalAmount,
      paymentMethod,
      date: new Date().toISOString(),
      status: 'completed'
    };

    onSave(sale);
    onClose();
  };

  const totalAmount = selectedBooks.reduce((sum, book) => sum + (book.price * book.quantity), 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">New Sale</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Customer *
              </label>
              <select
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                  errors.customer ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                <option value="">Select Customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.email}
                  </option>
                ))}
              </select>
              {errors.customer && <p className="text-red-500 text-xs mt-1">{errors.customer}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Method *
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'online')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Books</h3>
              <button
                type="button"
                onClick={addBook}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </button>
            </div>

            {errors.books && <p className="text-red-500 text-sm mb-4">{errors.books}</p>}

            <div className="space-y-4">
              {selectedBooks.map((book, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Book
                    </label>
                    <select
                      value={book.bookId}
                      onChange={(e) => updateBook(index, 'bookId', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                        errors[`book_${index}`] ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      <option value="">Select Book</option>
                      {books.filter(b => b.stock > 0).map(availableBook => (
                        <option key={availableBook.id} value={availableBook.id}>
                          {availableBook.title} (Stock: {availableBook.stock})
                        </option>
                      ))}
                    </select>
                    {errors[`book_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`book_${index}`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={book.quantity}
                      onChange={(e) => updateBook(index, 'quantity', parseInt(e.target.value) || 1)}
                      className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                        errors[`quantity_${index}`] ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors[`quantity_${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`quantity_${index}`]}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Price
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={book.price}
                      onChange={(e) => updateBook(index, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeBook(index)}
                      className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4 mx-auto" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900 dark:text-white">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Complete Sale
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalesForm;