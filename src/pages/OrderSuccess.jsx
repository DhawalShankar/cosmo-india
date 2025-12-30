import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const [darkMode] = useState(false);

  return (
    <div className={`min-h-screen flex items-center justify-center pt-32 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full p-8 text-center">
        <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Order Successful!
        </h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Thank you for your purchase.
        </p>
        <a href="/marketplace" className="mt-6 inline-block px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 transition-all">
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default OrderSuccess;