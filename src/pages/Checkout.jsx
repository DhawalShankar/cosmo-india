import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProceed = () => {
    // for now just validation
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    // NEXT STEP: payment
    navigate("/payment"); // placeholder
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* LEFT: ADDRESS */}
        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>

          <div className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <input
              name="email"
              placeholder="Email (optional)"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border p-3 rounded"
            />
            <textarea
              name="address"
              placeholder="Full Address"
              onChange={handleChange}
              className="w-full border p-3 rounded"
              rows={3}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="border p-3 rounded"
              />
              <input
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                className="border p-3 rounded"
              />
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-white rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {/* Example static item – later cart se aayega */}
          <div className="flex justify-between mb-4">
            <span>Book × 1</span>
            <span>₹299</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg mb-6">
            <span>Total</span>
            <span>₹299</span>
          </div>

          <button
            onClick={handleProceed}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700"
          >
            Proceed to Pay
          </button>

          <p className="text-xs text-gray-500 mt-4">
            By continuing, you agree to our Terms, Privacy Policy, and Refund Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
