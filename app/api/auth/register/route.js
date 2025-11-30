import bcrypt from "bcryptjs";
import { mysqlPool } from "@/app/utils/db";
import { signToken } from "@/app/utils/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // เช็คว่ากรอกครบไหม
    if (!name || !email || !password) {
      return Response.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }

    // เช็คว่า email ซ้ำไหม
    const [user] = await mysqlPool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length > 0) {
      return Response.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // เข้ารหัส password
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึก user ลง database
    const result = await mysqlPool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const userId = result[0].insertId;

    // สร้าง token
    const token = signToken({
      id: userId,
      name,
      email,
    });

    return Response.json({
      message: "Register successful",
      token,
    });
  } catch (err) {
    console.error("Register API error:", err);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
