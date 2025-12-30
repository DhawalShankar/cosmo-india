import { useState, useContext, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Lock, Edit2, Save, X } from 'lucide-react';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { user, loading: authLoading, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Only redirect after auth finishes loading and we confirm no user
  useEffect(() => {
    console.log('Profile - authLoading:', authLoading, 'user:', user);
    
    if (!authLoading && !user) {
      console.log('Redirecting to login - no user found');
      navigate('/login', { replace: true });
      return;
    }
    
    if (user) {
      console.log('User found, setting edit data');
      setEditData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [authLoading, user, navigate]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user?action=update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: editData.name,
          phone: editData.phone,
          address: editData.address
        })
      });

      const data = await res.json();

      if (res.ok) {
        await checkAuth();
        setIsEditing(false);
        showMessage('success', 'Profile updated successfully!');
      } else {
        showMessage('error', data.message || 'Failed to update profile');
      }
    } catch (error) {
      showMessage('error', 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'Passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/user?action=change-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        showMessage('success', 'Password changed successfully!');
      } else {
        showMessage('error', data.message || 'Failed to change password');
      }
    } catch (error) {
      showMessage('error', 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Show loading while auth is checking
  if (authLoading) {
    return (
      <div className={`min-h-screen pt-32 pb-16 flex items-center justify-center ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If still no user after loading, show redirect message
  if (!user) {
    return (
      <div className={`min-h-screen pt-32 pb-16 flex items-center justify-center ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-32 pb-16 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {message.text && (
        <div className={`fixed top-24 right-4 z-50 px-6 py-3 rounded-xl shadow-lg ${
          message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {message.text}
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="bg-linear-to-r from-red-600 to-red-400 bg-clip-text text-transparent">Profile</span>
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your account information</p>
        </div>

        <div className={`rounded-2xl shadow-lg p-8 ${darkMode ? 'bg-linear-to-br from-red-950/20 to-black border border-red-900/20' : 'bg-white border border-gray-200'}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)} 
                className="flex items-center space-x-2 px-4 py-2 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800"
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : null}
          </div>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none ${
                    isEditing 
                      ? (darkMode ? 'bg-black/50 border border-red-900/30 text-white' : 'bg-gray-50 border border-gray-300') 
                      : (darkMode ? 'bg-black/30 border border-red-900/20 text-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-600')
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={editData.email}
                  disabled
                  className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none ${darkMode ? 'bg-black/30 border border-red-900/20 text-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-600'}`}
                />
              </div>
              <p className="text-xs mt-1 text-gray-500">Email cannot be changed</p>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Enter phone number"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none ${
                    isEditing 
                      ? (darkMode ? 'bg-black/50 border border-red-900/30 text-white' : 'bg-gray-50 border border-gray-300') 
                      : (darkMode ? 'bg-black/30 border border-red-900/20 text-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-600')
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
              <div className="relative">
                <MapPin className={`absolute left-3 top-3 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <textarea
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  disabled={!isEditing}
                  rows="3"
                  placeholder="Enter your address"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none resize-none ${
                    isEditing 
                      ? (darkMode ? 'bg-black/50 border border-red-900/30 text-white' : 'bg-gray-50 border border-gray-300') 
                      : (darkMode ? 'bg-black/30 border border-red-900/20 text-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-600')
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="password"
                  value="••••••••"
                  disabled
                  className={`w-full pl-11 pr-4 py-3 rounded-xl outline-none ${darkMode ? 'bg-black/30 border border-red-900/20 text-gray-400' : 'bg-gray-100 border border-gray-200 text-gray-600'}`}
                />
              </div>
              {!isEditing && (
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Change Password
                </button>
              )}
            </div>

            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={handleSave} 
                  disabled={loading}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      name: user.name || '',
                      email: user.email || '',
                      phone: user.phone || '',
                      address: user.address || ''
                    });
                  }} 
                  className={`px-6 py-3 rounded-xl ${darkMode ? 'bg-red-950/30 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`max-w-md w-full rounded-2xl shadow-2xl ${darkMode ? 'bg-linear-to-br from-red-950/30 to-black border border-red-900/30' : 'bg-white'}`}>
            <div className="p-6 border-b border-red-900/30">
              <div className="flex justify-between items-center">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Change Password</h3>
                <button 
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                  }}
                  className={`p-2 rounded-lg ${darkMode ? 'hover:bg-red-950/30' : 'hover:bg-gray-100'}`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl outline-none ${darkMode ? 'bg-black/50 border border-red-900/30 text-white' : 'bg-gray-50 border border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl outline-none ${darkMode ? 'bg-black/50 border border-red-900/30 text-white' : 'bg-gray-50 border border-gray-300'}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl outline-none ${darkMode ? 'bg-black/50 border border-red-900/30 text-white' : 'bg-gray-50 border border-gray-300'}`}
                />
              </div>
              <button 
                onClick={handlePasswordChange}
                disabled={loading}
                className="w-full px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 disabled:opacity-50"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;