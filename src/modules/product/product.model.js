import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    category: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    image: {
      type: String,
      trim: true,
      default: null,
    },

    manufacturer: {
      type: String,
      trim: true,
      maxlength: 200,
      default: null,
    },

    manufacturingCountry: {
      type: String,
      trim: true,
      maxlength: 100,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
