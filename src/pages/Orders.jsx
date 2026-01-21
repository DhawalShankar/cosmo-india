import { useEffect, useState } from "react";
import { Package, Truck, CheckCircle } from "lucide-react";

const Orders = () => {
  const [darkMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order?action=my", {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to load orders");
        }

        setOrders(data.orders);
      } catch (err) {
        if (err.message.includes("401")) {
          setError("Please log in to view your orders.");
        } else if (err.message.includes("Failed to fetch")) {
          setError("Network error. Please check your connection.");
        } else {
          setError("Something went wrong while loading your orders.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);


  const statusStyle = status => {
    if (darkMode) {
      switch (status) {
        case "Delivered":
          return "bg-green-900/40 text-green-300 ring-1 ring-green-700/40";
        case "Shipped":
          return "bg-blue-900/40 text-blue-300 ring-1 ring-blue-700/40";
        case "Processing":
          return "bg-yellow-900/40 text-yellow-300 ring-1 ring-yellow-700/40";
        default:
          return "bg-gray-800 text-gray-300 ring-1 ring-gray-700";
      }
    }

    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700 ring-green-200";
      case "Shipped":
        return "bg-blue-100 text-blue-700 ring-blue-200";
      case "Processing":
        return "bg-yellow-100 text-yellow-700 ring-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 ring-gray-200";
    }
  };

  return (
    <div className={`min-h-screen pt-28 ${
      darkMode
        ? "bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100"
        : "bg-gradient-to-b from-gray-50 to-white text-gray-900"
    }`}>
      <div className="max-w-6xl mx-auto px-4 pb-20">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight">
            My Orders
          </h1>
          <p className={`mt-2 text-sm ${
            darkMode ? "text-zinc-400" : "text-gray-500"
          }`}>
            Review your purchases and delivery status
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid place-items-center py-32 text-zinc-400">
            Loading your orders…
          </div>
        )}
        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
            <p className="font-semibold mb-1">Unable to load orders</p>
            <p className="text-sm">{error}</p>
          </div>
        )}



        {/* Empty State */}
        {!loading && orders.length === 0 && (
          <div className={`rounded-3xl border p-16 text-center ${
            darkMode
              ? "border-zinc-800 bg-zinc-900"
              : "border-gray-300 bg-white"
          }`}>
            <Package className="w-16 h-16 mx-auto mb-6 opacity-50" />
            <h2 className="text-xl font-semibold mb-1">No orders yet</h2>
            <p className="text-sm opacity-70">
              Your purchases will appear here once completed.
            </p>
          </div>
        )}

        {/* Orders */}
        {!loading && orders.length > 0 && (
          <div className="space-y-8">
            {orders.map(order => (
              <div
                key={order._id}
                className={`rounded-3xl border shadow-sm transition ${
                  darkMode
                    ? "border-zinc-800 bg-zinc-900/70 hover:bg-zinc-900"
                    : "border-gray-200 bg-white hover:shadow-md"
                }`}
              >

                {/* Order Header */}
                <div className={`flex flex-wrap items-center justify-between gap-6 px-6 py-5 border-b ${
                  darkMode ? "border-zinc-800" : "border-gray-200"
                }`}>
                  <div>
                    <p className="text-xs uppercase tracking-wide opacity-60">
                      Order ID
                    </p>
                    <p className="font-mono text-sm">{order._id}</p>
                    <p className="text-xs opacity-60 mt-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(order.status)}`}
                    >
                      {order.status === "Delivered" && <CheckCircle size={14} />}
                      {order.status === "Shipped" && <Truck size={14} />}
                      {order.status}
                    </span>

                    <p className="text-lg font-bold">
                      ₹{order.totalPrice}
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 py-5">
                  <h3 className={`text-sm font-semibold mb-3 ${
                    darkMode ? "text-zinc-300" : "text-gray-700"
                  }`}>
                    Items
                  </h3>

                  <div className="space-y-2">
                    {order.orderItems.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                          darkMode
                            ? "bg-zinc-800/70 border border-zinc-700"
                            : "bg-gray-50"
                        }`}
                      >
                        <span className={`text-sm font-medium ${
                          darkMode ? "text-zinc-100" : "text-gray-800"
                        }`}>
                          {item.name}
                        </span>
                        <span className={`text-sm ${
                          darkMode ? "text-zinc-400" : "text-gray-500"
                        }`}>
                          × {item.qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className={`flex flex-wrap justify-between gap-6 px-6 py-5 border-t rounded-b-3xl text-sm ${
                  darkMode
                    ? "border-zinc-800 bg-zinc-900 text-zinc-400"
                    : "border-gray-200 bg-gray-50 text-gray-600"
                }`}>
                  <p>
                    <strong className={darkMode ? "text-zinc-200" : ""}>
                      Payment:
                    </strong>{" "}
                    {order.paymentMethod}
                  </p>
                  <p className="max-w-md truncate">
                    <strong className={darkMode ? "text-zinc-200" : ""}>
                      Address:
                    </strong>{" "}
                    {order.shippingAddress?.address && order.shippingAddress.address !== "N/A"
                      ? `${order.shippingAddress.address}, ${order.shippingAddress.city}`
                      : "Address not available"}

                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Orders;