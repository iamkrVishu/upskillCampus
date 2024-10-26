import express from "express";
import User from "../model/user.model.js"; // Adjust the path as necessary

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
    const { fullname = "vishu", email = "r75600761@gmail.com", password = "vishu@12345" } = req.body;

    // Validate input
    if (!fullname || !email || !password ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Create a new user
        const newUser = new User({
            fullname,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.code === 11000) {
            // Handle duplicate email or username
            return res.status(400).json({ error: "Email or username already exists" });
        }
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
