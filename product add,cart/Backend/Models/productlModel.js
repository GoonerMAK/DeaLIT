const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a text value"],
    },
    description: {
      type: String,
      required: [true, "Please add a text value"],
    },
    catagories:{
      type: Array,
    },
    image:{
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Please add a price']
  }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
