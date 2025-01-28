import express from "express";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../Models/UserModel.js";

const userRouter = express.Router();

//LOGIN
userRouter.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { name, password } = req.body;
        const user = await User.findOne({ name });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            })
        } else {
            res.status(401)
            throw new Error("Invalid Name or Password")
        }
    })
)

export default userRouter;