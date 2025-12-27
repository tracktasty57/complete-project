import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "../../../../../backend/src/models/user";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Helper: generate token
const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        // Generate JWT token
        const token = generateToken(String(newUser._id));

        return NextResponse.json({
            message: "User registered successfully",
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        }, { status: 201 });
    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json({ message: error.message || "Server Error" }, { status: 500 });
    }
}
