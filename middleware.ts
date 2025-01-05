import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies?.get("token")?.value;

  // Redirect to login if no token is found
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.next(); // Proceed if token is valid
  } catch (err:unknown) {
    console.log(err)
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

// Apply middleware to protect dashboard routes
export const config = {
  matcher: ["/dashboard/:path"],
};
