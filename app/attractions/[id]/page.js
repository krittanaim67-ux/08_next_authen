// app/attractions/[id]/page.js
import Link from "next/link";
import { mysqlPool } from "@/app/utils/db";

export default async function AttractionDetailPage({ params }) {
  const { id } = params;

  const [rows] = await mysqlPool.query(
    "SELECT * FROM attractions WHERE id = ?",
    [id]
  );

  if (rows.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000814",
          color: "#fff",
        }}
      >
        <div>
          <p style={{ marginBottom: 16 }}>ไม่พบข้อมูลสถานที่ท่องเที่ยว</p>
          <Link href="/attractions">
            <button
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                border: "none",
                background: "#00ff95",
                color: "#002010",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              กลับไปหน้า Attractions
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const item = rows[0];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000814",
        padding: "60px 0 80px",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "1100px",
        }}
      >
        {/* ชื่อสถานที่ */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: 800,
            marginBottom: "32px",
            color: "#00ff95",
            textShadow: "0 0 16px rgba(0,255,149,0.8)",
          }}
        >
          {item.name}
        </h1>

        {/* การ์ดใหญ่ */}
        <div
          style={{
            background:
              "linear-gradient(145deg, rgba(5,40,70,0.95), rgba(2,20,45,0.98))",
            borderRadius: "28px",
            padding: "28px 32px 32px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
            border: "1px solid rgba(0,255,149,0.25)",
          }}
        >
          {/* รูปภาพ */}
          {item.image_url && (
            <div
              style={{
                borderRadius: "24px",
                overflow: "hidden",
                marginBottom: "18px",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  width: "100%",
                  maxHeight: "420px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          )}

          {/* รายละเอียด */}
          {item.description && (
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                marginBottom: 16,
                opacity: 0.9,
              }}
            >
              {item.description}
            </p>
          )}

          {/* Lat / Long */}
          <p
            style={{
              marginTop: 8,
              fontSize: 15,
            }}
          >
            <span style={{ fontWeight: 700 }}>Latitude:</span>{" "}
            {typeof item.latitude === "number"
              ? item.latitude.toFixed(6)
              : item.latitude}
            {"  |  "}
            <span style={{ fontWeight: 700 }}>Longitude:</span>{" "}
            {typeof item.longitude === "number"
              ? item.longitude.toFixed(6)
              : item.longitude}
          </p>

          {/* ปุ่มด้านล่าง: Edit + Back (ไม่มี Delete แล้ว) */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 28,
              justifyContent: "flex-start",
            }}
          >
            {/* Edit -> ไปหน้า /attractions/[id]/edit */}
            <Link href={`/attractions/${id}/edit`}>
              <button
                style={{
                  padding: "10px 26px",
                  borderRadius: 999,
                  border: "none",
                  background:
                    "radial-gradient(circle at 10% 10%, #00ff95, #00c86a)",
                  color: "#002010",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  boxShadow: "0 0 18px rgba(0,255,149,0.9)",
                }}
              >
                Edit
              </button>
            </Link>

            {/* Back -> กลับไป /attractions */}
            <Link href="/attractions">
              <button
                type="button"
                style={{
                  padding: "10px 26px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,255,255,0.6)",
                  background: "transparent",
                  color: "#00eaff",
                  fontWeight: 600,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
