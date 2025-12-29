import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { DarkModeContext } from '../context/DarkModeContext';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  // calculate total
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  // redirect if cart empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/marketplace');
    }
  }, [cart, navigate]);

  const handlePayment = async () => {
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: 'INR',
        name: 'Cosmo India Prakashan',
        description: 'Book Purchase',
        order_id: order.id,
        handler: function () {
          clearCart();
          alert('Payment successful!');
          navigate('/marketplace');
        },
        theme: {
          color: '#dc2626',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment failed. Try again.');
    }
  };

  return (
    <div className={`min-h-screen pt-32 ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="max-w-xl mx-auto p-8">
        <h1 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Checkout
        </h1>

        <div className={`rounded-xl p-6 mb-6 ${
          darkMode ? 'bg-black/50 border border-red-900/30' : 'bg-white border border-gray-200'
        }`}>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
              <span className={darkMode ? 'text-white' : 'text-gray-900'}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total</span>
              <span className="text-2xl font-bold text-red-500">₹{total}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg shadow-green-600/30"
        >
          Pay ₹{total} with Razorpay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
