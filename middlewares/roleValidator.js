import { UserModel } from "../model/userModel.js";

const roleValidator = async (req, res, next) =>{
    const { role } = req.headers;
    // console.log(req.headers);
    if(req.method == "patch" || req.method == "delete") {
        if(role == "admin"){
            next();
        }else{
            res.send({message: "Permision is not granted"});
        }
    }else{
        next();
    }
}

export { roleValidator };