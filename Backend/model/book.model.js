import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: { // Add this field if it's missing
        type: String,
        required: true, // Make it required if you want to enforce it
    },
});

const User = mongoose.model("User", userSchema);
export default User;
