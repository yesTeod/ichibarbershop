import express from "express";
import asyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import { protect, admin } from "../Middleware/AuthMiddleware.js"
import nodemailer from 'nodemailer';
import moment from 'moment';

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
            
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user:process.env.gmailname,
                    pass:process.env.gmailpass,
                }
            });

            let price; 
            switch(service) {
                case "635ffcd2643f25bfc574f51b":
                    price = 15;
                    break;
                case "635ffcd2643f25bfc574f51c":
                    price = 10;
                    break;
                case "635ffcd2643f25bfc574f51f":
                    price = 5;
                    break; 
                case "635ffcd2643f25bfc574f51d":
                    price = 25;
                    break;  
                case "635ffcd2643f25bfc574f51e":
                    price = 15;
                    break;
                case "635ffcd2643f25bfc574f520":
                    price = 15;
                    break;   
                default:
                    price = 0;
            }
            
            const mailOptions = {
                from: process.env.gmailname,
                to: email,
                subject: 'Приета поръчка',
                
                text: `ICHI BARBERSHOP\nЗдравей, ${name} - Благодаря ти, че запази час през сайта.\n----------------------------------------------------------------------------- \nОчакваме ви на:\n${moment(serviceTime).clone().subtract(2, 'hour').format(`DD/MM/YYYY от H:mm`)}\n\n\nобща стойност: ${price}.00 лв`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

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
