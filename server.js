import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { notFound, errorHandler } from "./Middleware/Errors.js";
import orderRouter from "./Routes/OrderRoutes.js"
import userRouter from "./Routes/UserRoutes.js"
import serviceRouter from "./Routes/ServiceRoutes.js";
import axios from "axios";
import removedDateRouter from "./Routes/RemovedDateRoutes.js";

dotenv.config();
connectDatabase();
const app = express();

app.use(express.json());
app.use(express.static('build'));

//API
app.use("/api/services", serviceRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/removedDates", removedDateRouter);

app.post('/verify', (req, res) => {
    const key = process.env.reCaptchaSecret;
    const userKey = req.body.token;

    axios.post('https://www.google.com/recaptcha/api/siteverify?secret=' + key + '&response' + userKey).then(response => {
        if (response.data.success) {
            return res.status(200).json({
                response: response
            });
        }
        return res.status(401).json({
            error: "verification failed"
        });

    }).catch(error => {
        res.status(500).json({ error: "server not responding" });
    });
});

//Error Handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server running in port ${PORT}...`));
