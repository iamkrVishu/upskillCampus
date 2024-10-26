import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js"; // Assuming this exists
import userRoute from "./route/user.route.js"; // Your user route

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 5000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
try {
    mongoose.connect(URI);
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}


// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute); // This should match your route setup

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
