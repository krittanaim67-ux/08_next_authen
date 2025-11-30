// app/api/attractions/route.js
import { NextResponse } from "next/server";
import { mysqlPool } from "@/app/utils/db"; // ใช้ named import ชัด ๆ

// GET /api/attractions  → ดึงทั้งหมด
export async function GET() {
  try {
    const [rows] = await mysqlPool.query(
      "SELECT * FROM attractions ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/attractions error:", err);
    return NextResponse.json(
      { message: "Error fetching attractions" },
      { status: 500 }
    );
  }
}

// POST /api/attractions → เพิ่มใหม่
export async function POST(request) {
  try {
    const { name, description, image_url, latitude, longitude } =
      await request.json();

    const [result] = await mysqlPool.query(
      "INSERT INTO attractions (name, description, image_url, latitude, longitude) VALUES (?, ?, ?, ?, ?)",
      [name, description, image_url, latitude, longitude]
    );

    return NextResponse.json(
      { message: "Created", id: result.insertId },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/attractions error:", err);
    return NextResponse.json(
      { message: "Error creating attraction" },
      { status: 500 }
    );
  }
}


