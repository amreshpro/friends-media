import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '@/backend/model/User';


import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/backend/lib/dbConnect';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

 const response =  NextResponse.json({ token, userId: user._id });
 response.cookies.set("token", token, {
  httpOnly: true,
  sameSite: "strict",
  maxAge: 3600,
  path: "/",
});

 return response
}
