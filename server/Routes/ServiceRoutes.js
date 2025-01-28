import express from "express";
import asyncHandler from "express-async-handler";
import Service from "./../Models/ServiceModel.js";

const serviceRouter = express.Router();

//GET ALL SERVICES
serviceRouter.get("/",
    asyncHandler(async (req, res) => {
        const services = await Service.find({});
        res.json(services);
    })
);

//GET SINGLE SERVICE
serviceRouter.get("/:id",
    asyncHandler(async (req, res) => {
        const service = await Service.findById(req.params.id);
        if (service) {
            res.json(service)
        } else {
            res.status(404);
            throw new Error("Service not found.");
        }
    })
);

export default serviceRouter;