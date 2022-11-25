import mongoose from "mongoose";

const removedDateSchema = mongoose.Schema(
    {
        removedDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const RemovedDate = mongoose.model("RemovedDate", removedDateSchema);

export default RemovedDate;