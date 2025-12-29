import { useState } from 'react';
import { User } from 'lucide-react';

const Profile = () => {
  const [darkMode] = useState(false);

  return (
    <div className={`min-h-screen pt-32 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          My Profile
        </h1>
        
        <div className="text-center py-20">
          <User className={`w-20 h-20 mx-auto mb-6 ${darkMode ? 'text-gray-700' : 'text-gray-300'}`} />
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Profile page coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;