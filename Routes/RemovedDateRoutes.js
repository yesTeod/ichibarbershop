import express from "express";
import asyncHandler from "express-async-handler";
import RemovedDate from "../Models/RemovedDateModel.js";

const removedDateRouter = express.Router();

//Add removed date
removedDateRouter.post(
    "/",
    asyncHandler(async (req, res) => {
        const {
            removedDate,
        } = req.body;

        if (removedDate === null) {
            res.status(400);
            throw new Error("No date selected.");
            return;
        } else {
            const date = new RemovedDate({
                removedDate,
            })
            const createRemovedDate = await date.save();
            res.status(201).json(createRemovedDate);
        }
    })
);

//Get removed dates
removedDateRouter.get("/", asyncHandler(async (req, res) => {
    const dates = await RemovedDate.find({}).select('removedDate -_id');

    res.json(dates);
}))

export default removedDateRouter;