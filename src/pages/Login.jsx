import { useState } from 'react';

const Login = () => {
  const [darkMode] = useState(false);

  return (
    <div className={`min-h-screen flex items-center justify-center pt-32 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full p-8">
        <h1 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Login / Register
        </h1>
        <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Login page coming soon...
        </p>
      </div>
    </div>
  );
};

export default Login;