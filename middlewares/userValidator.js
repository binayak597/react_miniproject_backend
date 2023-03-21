import mongoose from "mongoose";
import { UserModel } from "../model/userModel.js";

const userValidator = async(req, res, next) => {

    if (req.path == "/user/register") {
        const { email } = req.body;
        // const data = await UserModel.find({$or: [{"name" : req.body.name}, {"email" : req.body.email}]});
        // const data = await UserModel.find({email: email});
        
        // if (data.length > 0) {
        //     res.send({ message: "User is already exist" });
        // } else {
        //     next();
        // }
        await UserModel.findOne({email: email})
        .then((foundUser) => {
            if(foundUser){
                res.send({message: "User is already exist"});
            }else{
                next();
            }
        })
        .catch((err) => console.log(err));
    } else {
        next();
    }

}

export { userValidator };