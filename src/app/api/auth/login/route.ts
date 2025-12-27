import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "../../../../../../backend/src/models/user";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// Helper: generate token
const generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, password } = await req.json();

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        // Generate token
        const token = generateToken(String(user._id));

        return NextResponse.json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error: any) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
