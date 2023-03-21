import { UserModel } from "../model/userModel.js";
import fs from "fs";

const userLogger = async (req, res, next) => {
    if(req.path == "/user/login"){
        const {email} = req.body;
        await UserModel.findOne({email: email})
        .then((foundUser) => {
            const logData = `UserName: ${foundUser.name} | Role: ${foundUser.role}\n`;
            fs.appendFile("log.txt", logData, (err) => {
                if (err) throw err;
                next();
            });
        })
        .catch((err) => console.log(err));
    }else{
        next();
    }
}

export { userLogger };