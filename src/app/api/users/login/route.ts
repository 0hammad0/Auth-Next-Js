import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextApiResponse, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;

  const user = await User.findOne({ email });
  const allUser = await User.find();
  if (!user) {
    return NextResponse.json(
      { error: "User does not exit", users: allUser, user: user },
      { status: 400 }
    );
  }

  const validatePassword = await bcryptjs.compare(password, user.password);

  if (!validatePassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const tokenData = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({
    message: "Login Successful",
    success: true,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
  });

  return response;

  try {
  } catch (error: any) {
    return NextRequest.json({ error: error.message }, { status: 500 });
  }
}
