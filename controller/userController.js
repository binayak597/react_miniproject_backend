import * as dotenv from "dotenv";
dotenv.config();
import { UserModel } from "../model/userModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const getUser = async(req, res) => {
    const { id } = req.params;
    await UserModel.findOne({_id: id})
    .then((foundUser) => res.send({message: "User exist",
                                   userDetails: foundUser
    }))
    .catch((err) => console.log(err));
}


const registerUser = async (req, res) => {
    const data = req.body;
    UserModel.create(data)
        .then(() => res.send({ message: "User is successfully registered" }))
        .catch((err) => console.log(err));
}

const loginUser = async (req, res) => {
    const { email } = req.body;
    const option = {
        expiresIn: 120000
    };

    await UserModel.findOne({ email: email })
        .then((foundUser) => {
            let token = jwt.sign(req.body, process.env.SECRET_MSG);
            res.send({
                message: "Login is successfull",
                token: token,
                userDetails: {
                    userId: foundUser._id,
                    userName: foundUser.name,
                    role: foundUser.role
                }
            });
        })
        .catch((err) => console.log(err));

}

const updateUser = async (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndUpdate({_id: id}, req.body)
    .then(() => res.send({message: "Data updated Successfully"}))
    .catch((err) => console.log(err));
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    UserModel.findByIdAndDelete({_id: id})
    .then(() => res.send({message: "Data deleted Successfully"}))
    .catch((err) => console.log(err));
}

export { getUser, registerUser, loginUser, updateUser, deleteUser };