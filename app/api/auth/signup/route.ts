import EnvConfig from "@/config/EnvConfig";
import dbConnect from "@/backend/lib/dbConnect";
import User from "@/backend/model/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/backend/logger";

export async function POST(req: NextRequest) {
  try {
    // Get request body data
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Log user creation details (sensitive info should be excluded)
    logger.info(`User created with ID: ${savedUser._id}`);

    // Generate JWT token
    const token = jwt.sign({ userId: savedUser._id }, EnvConfig.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Create response with JWT token and set cookie
    const response = NextResponse.json({ token, userId: savedUser._id });
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 3600, // Token expires in 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    logger.error("Error during signup: ", error);
    return NextResponse.json(
      { message: "An error occurred during signup" },
      { status: 500 }
    );
  }
}
