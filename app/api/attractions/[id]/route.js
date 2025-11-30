// app/api/attractions/[id]/route.js
import { NextResponse } from "next/server";
import { mysqlPool } from "@/app/utils/db";

// GET /api/attractions/[id]  -> ดึงข้อมูลของที่เดียว
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const [rows] = await mysqlPool.query(
      "SELECT * FROM attractions WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("GET /api/attractions/[id] error:", err);
    return NextResponse.json(
      { message: "Error fetching attraction" },
      { status: 500 }
    );
  }
}

// PUT /api/attractions/[id]  -> แก้ไขข้อมูล (รวม latitude / longitude)
export async function PUT(request, { params }) {
  const { id } = params;

  try {
    const body = await request.json();
    const { name, description, image_url, latitude, longitude } = body;

    await mysqlPool.query(
      `
      UPDATE attractions
      SET name = ?, description = ?, image_url = ?, latitude = ?, longitude = ?
      WHERE id = ?
      `,
      [name, description, image_url, latitude, longitude, id]
    );

    return NextResponse.json({ message: "Updated" });
  } catch (err) {
    console.error("PUT /api/attractions/[id] error:", err);
    return NextResponse.json(
      { message: "Error updating attraction" },
      { status: 500 }
    );
  }
}

// DELETE /api/attractions/[id]  -> ใช้กับปุ่ม Delete ในหน้า List
export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await mysqlPool.query("DELETE FROM attractions WHERE id = ?", [id]);
    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /api/attractions/[id] error:", err);
    return NextResponse.json(
      { message: "Error deleting attraction" },
      { status: 500 }
    );
  }
}
