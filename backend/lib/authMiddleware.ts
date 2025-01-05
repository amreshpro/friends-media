import { NextRequest, NextResponse } from 'next/server';
import jwt, { JsonWebTokenError, JwtPayload, NotBeforeError, TokenExpiredError } from 'jsonwebtoken';
 
interface CustomJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
}
declare module 'next/server' {
    interface NextRequest {
      user?: JwtPayload; 
    }
  }
  

export function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization')?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;
    req.user = decoded; // Add the user to the request
  }catch (err) {
    if (err instanceof TokenExpiredError) {
      return NextResponse.json({ message: 'Token has expired' }, { status: 403 });
    } else if (err instanceof NotBeforeError) {
      return NextResponse.json({ message: 'Token not active yet' }, { status: 403 });
    } else if (err instanceof JsonWebTokenError) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    } else {
      return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }

  return NextResponse.next();
}
