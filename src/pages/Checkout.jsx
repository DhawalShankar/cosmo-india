import { useState } from 'react';

const Checkout = () => {
  const [darkMode] = useState(false);

  return (
    <div className={`min-h-screen flex items-center justify-center pt-32 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full p-8">
        <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Checkout
        </h1>
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Checkout page coming soon...
        </p>
      </div>
    </div>
  );
};

export default Checkout;