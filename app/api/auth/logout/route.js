// app/api/auth/logout/route.js
import { NextResponse } from "next/server";

function doLogout(request) {
  // ให้ redirect ไปหน้า /login
  const response = NextResponse.redirect(new URL("/login", request.url));

  // เคลียร์ cookie (ถ้ามีไว้เก็บสถานะล็อกอิน)
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("loggedIn", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}

// รองรับ GET (ถ้าเปิด URL ตรง ๆ)
export async function GET(request) {
  return doLogout(request);
}

// รองรับ POST (จากปุ่ม logout ในฟอร์ม)
export async function POST(request) {
  return doLogout(request);
}
