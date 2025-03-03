const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    coins: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Order", // Reference to an Order model if you have one
        },
        orderDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["Pending", "Shipped", "Delivered", "Canceled"],
          default: "Pending",
        },
      },
    ],
    coupons: [
      {
        couponCode: {
          type: String,
          required: true,
        },
        discount: {
          type: Number,
          required: true,
        },
        expirationDate: {
          type: Date,
        },
      },
    ],
    giftCards: [
      {
        cardNumber: {
          type: String,
          required: true,
        },
        balance: {
          type: Number,
          required: true,
        },
        expirationDate: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
