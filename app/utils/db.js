// app/utils/db.js
import mysql from "mysql2/promise";

// สร้าง connection pool ไว้ใช้ทั้งแอป
const mysqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // ถ้าตั้งรหัส root ให้ใส่ตรงนี้
  database: "u6706888_dit205_final", // ต้องตรงกับชื่อ DB ใน phpMyAdmin
});

// export แบบ named และ default (กันพลาดทั้งสองแบบ)
export { mysqlPool };
export default mysqlPool;
