import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null // this is for guest orders
    },

    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: false, default: "" },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: false
        }
      }
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },

    paymentMethod: {
      type: String,
      enum: ["PayPal", "Stripe", "Razorpay", "COD"],
      required: true
    },

    paymentResult: {
      gateway: String,
      transactionId: String,
      orderId: String,
      status: String
    },

    itemsPrice: { type: Number, required: true, default: 0 },
    taxPrice: { type: Number, required: true, default: 0 },
    shippingPrice: { type: Number, required: true, default: 0 },
    totalPrice: { type: Number, required: true, default: 0 },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);

