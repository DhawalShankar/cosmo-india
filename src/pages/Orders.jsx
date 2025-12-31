import { useState } from 'react';
import { Package } from 'lucide-react';

const Orders = () => {
  const [darkMode] = useState(false);

  return (
    <div className={`min-h-screen pt-32 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          My Orders
        </h1>
        
        <div className="text-center py-20">
          <Package className={`w-20 h-20 mx-auto mb-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No orders yet. Start shopping!
          </p>
          <a href="/marketplace" className="mt-6 inline-block px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all">
            Browse Books
          </a>
        </div>
      </div>
    </div>
  );
};

export default Orders;