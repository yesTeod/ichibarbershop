import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import { protect, admin } from "../Middleware/AuthMiddleware.js"

const orderRouter = express.Router();

// Create order
orderRouter.post(
    "/",
    asyncHandler(async (req, res) => {
        const {
            name,
            email,
            phone,
            service,
            serviceTime,
            additionalMessage,
        } = req.body;

        if (service === null || service.length === 0) {
            res.status(400);
            throw new Error("No service selected.");
            return;
        } else {
            const order = new Order({
                name,
                email,
                phone,
                service,
                serviceTime,
                additionalMessage,
            })
            const createOrder = await order.save();
            res.status(201).json(createOrder);
        }
    })
);

// Get all orders
orderRouter.get(
    "/all",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const orders = await Order.find({}).sort({ _id: -1 }).populate('service');
        res.json(orders);
    })
);

//update scheduled times periodically
orderRouter.post("/times", asyncHandler(async (req, res) => {
    const query = { isFinished: false };

    const updates = await Order.updateMany(query, [{ $set: { isFinished: { $cond: { if: { $lte: ["$serviceTime", new Date()] }, then: true, else: false } } } }]);

    res.json(updates);
}))

//Get scheduled times
orderRouter.get("/times", asyncHandler(async (req, res) => {
    const query = { isFinished: false };

    const times = await Order.find(query).select('serviceTime service -_id');

    res.json(times);
}))

// Get order by id
orderRouter.get("/:id", asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('service');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
})
);

orderRouter.delete(
    "/:id",
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);

        if (order) {
            await order.remove();
            res.json({ message: "Order deleted" });
        } else {
            res.status(404);
            throw new Error("Order not found");
        }
    })
);

export default orderRouter;