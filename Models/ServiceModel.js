import mongoose from "mongoose";

const serviceSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
            default: 0,
        },
        namebg: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model("Service", serviceSchema);

export default Service;