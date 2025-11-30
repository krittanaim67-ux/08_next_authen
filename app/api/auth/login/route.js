import bcrypt from "bcryptjs";
import { mysqlPool } from "@/app/utils/db";
import { signToken } from "@/app/utils/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // 🔍 หา user จากฐานข้อมูล
    const [rows] = await mysqlPool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    const user = rows[0];

    // 🔐 เช็ค password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 }
      );
    }

    // 🟢 สร้าง token (JWT ของนายเอง)
    const token = signToken({ id: user.id, email: user.email });

    // ใช้ NextResponse เพื่อจะได้ set cookies ได้
    const res = NextResponse.json(
      {
        message: "Login success",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // 💾 เซ็ต cookie สำหรับ auth
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      // secure: true, // เปิดอันนี้ถ้า deploy แล้วใช้ https
    });

    // cookie ง่าย ๆ ไว้ให้ middleware เช็กก็ได้
    res.cookies.set("loggedIn", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      // secure: true,
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
