import React from 'react';
import { Edit, Trash2, Package } from 'lucide-react';
import { Book } from '../../types';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete }) => {
  const stockStatus = book.stock < 10 ? 'low' : book.stock < 25 ? 'medium' : 'high';
  const stockColor = stockStatus === 'low' ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400' :
                     stockStatus === 'medium' ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400' :
                     'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="aspect-w-3 aspect-h-4 bg-gray-200 dark:bg-gray-700">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
            {book.title}
          </h3>
          <div className="flex space-x-1 ml-2">
            <button
              onClick={() => onEdit(book)}
              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{book.author}</p>
        <p className="text-blue-600 dark:text-blue-400 text-xs mb-3">{book.genre}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            ${book.price}
          </span>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${stockColor}`}>
            <div className="flex items-center space-x-1">
              <Package className="h-3 w-3" />
              <span>{book.stock}</span>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <p>ISBN: {book.isbn}</p>
          <p>{book.pages} pages • {book.language}</p>
        </div>
      </div>
    </div>
  );
};

export default BookCard;