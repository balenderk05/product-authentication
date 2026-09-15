import mongoose from "mongoose";

const productUnitSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
            index: true
        },

        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
            index: true
        },

        batch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Batch",
            required: true,
            index: true
        },

        verificationCode: {
            type: String,
            required: true,
            unique: true,
            index: true,
            uppercase: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["ACTIVE", "REVOKED"],
            default: "ACTIVE",
            index: true
        },

        qrGenerated: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

productUnitSchema.index({
    batch: 1,
    verificationCode: 1
});

const ProductUnit = mongoose.model(
    "ProductUnit",
    productUnitSchema
);

export default ProductUnit;