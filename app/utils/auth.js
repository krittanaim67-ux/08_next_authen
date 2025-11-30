import jwt from "jsonwebtoken";

// สร้าง Token
export function signToken(payload) {
  return jwt.sign(payload, "mysecretkey", { expiresIn: "7d" });
}

// ตรวจสอบ Token
export function verifyToken(token) {
  try {
    return jwt.verify(token, "mysecretkey");
  } catch (err) {
    return null;
  }
}
