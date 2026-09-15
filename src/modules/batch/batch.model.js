import mongoose from "mongoose";

const batchSchema = new mongoose.Schema(
  {
    batchNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    exportStatus: {
      type: String,
      enum: ["NOT_EXPORTED", "EXPORTED"],
      default: "NOT_EXPORTED",
      index: true,
    },

    exportedAt: {
      type: Date,
      default: null,
    },
    
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "CANCELLED"],
      default: "ACTIVE",
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

batchSchema.index(
  {
    brand: 1,
    batchNumber: 1,
  },
  {
    unique: true,
  },
);

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
