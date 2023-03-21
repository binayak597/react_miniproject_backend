import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    dob: {type: String, require: true},
    role: {type: String, require: true},
    location: {type: String, require: true},
    password: {type: String, require: true}
},
{
    versionKey: false
});

const UserModel = mongoose.model("User", userSchema);

export { UserModel };