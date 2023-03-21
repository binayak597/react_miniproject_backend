import mongoose from "mongoose";
import { UserModel } from "../model/userModel.js";

const authenticator = async (req, res, next) => {
    if (req.path == "/user/login") {
        const { email, password } = req.body;
        await UserModel.findOne({ email: email })
            .then((foundUser) => {
                if (foundUser) {
                    if (password === foundUser.password) {
                        next();
                    } else {
                        res.send({ message: "Invalid Password" });
                    }
                } else {
                    res.send({ message: "User is not exist." });
                }
            })
            .catch((err) => console.log(err));
    } else {
        next();
    }
}

export { authenticator };