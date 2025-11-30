// middleware.js ที่ ROOT ของโฟลเดอร์ 08_next_authen
import { NextResponse } from "next/server";

const PROTECTED_PATHS = ["/attractions"]; // path ที่ต้องล็อกอิน

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // เช็คว่า path นี้ต้อง protect มั้ย
  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  if (!isProtected) {
    // ถ้าไม่ใช่ /attractions ก็ปล่อยผ่าน
    return NextResponse.next();
  }

  // อ่าน cookie จาก request
  const token = request.cookies.get("token")?.value;
  const loggedIn = request.cookies.get("loggedIn")?.value;
  const isLoggedIn = !!token || !!loggedIn;

  // ยังไม่ล็อกอิน → เด้งไปหน้า /login
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ล็อกอินแล้ว → ให้ผ่าน
  return NextResponse.next();
}

// บอก Next ว่า middleware ตัวนี้ใช้กับ path ไหนบ้าง
export const config = {
  matcher: ["/attractions/:path*"], // ครอบทุกหน้าใต้ /attractions
};
