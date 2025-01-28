import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        service: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Service",
        },
        serviceTime: {
            type: Date,
            required: true,
        },
        additionalMessage: {
            type: String,
            required: false,
        },
        isFinished: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;