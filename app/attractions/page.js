"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AttractionsPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/attractions");
        let json = null;

        try {
          json = await res.json();
        } catch {
          json = null;
        }

        if (!res.ok || !Array.isArray(json)) {
          console.error("API error:", res.status, json);
          setError("โหลดข้อมูลไม่สำเร็จ");
          setData([]);
          return;
        }

        setError("");
        setData(json);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("โหลดข้อมูลไม่สำเร็จ");
        setData([]);
      }
    }

    load();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >
      {/* Header + Logout */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            color: "#00ff95",
            textShadow: "0 0 12px #00ff9570",
          }}
        >
          Attractions List
        </h1>

        {/* Logout Button */}
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            style={{
              padding: "12px 26px",
              borderRadius: "999px",
              background: "linear-gradient(90deg, #ff4d4d, #ff1a1a)",
              border: "1px solid rgba(255, 0, 0, 0.4)",
              color: "#fff",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 0 12px rgba(255, 50, 50, 0.8)",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "0.2s",
            }}
          >
            Logout
          </button>
        </form>
      </div>

      {/* Add New Button */}
      <Link href="/attractions/new">
        <button
          style={{
            padding: "12px 26px",
            borderRadius: "999px",
            background: "linear-gradient(90deg, #00ff95, #00cc7a)",
            border: "1px solid rgba(0, 255, 149, 0.4)",
            color: "#003326",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 0 12px rgba(0, 255, 149, 0.7)",
            transition: "0.2s",
            marginBottom: "30px",
          }}
        >
          + Add New
        </button>
      </Link>

      {/* error */}
      {error && (
        <p style={{ color: "#ff4d4d", marginBottom: "20px", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {data.map((item) => (
          <div
            key={item.id}
            style={{
              background: "rgba(0, 40, 60, 0.9)",
              borderRadius: "22px",
              border: "1px solid rgba(0,255,255,0.25)",
              padding: "22px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "260px",
            }}
          >
            {/* รูปภาพ */}
            {item.image_url && (
              <div
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  marginBottom: "14px",
                  border: "1px solid rgba(0,0,0,0.4)",
                }}
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            )}

            {/* ชื่อ – เปลี่ยนสีฟอนต์ */}
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                marginBottom: "8px",
                color: "#33ffe6", // << สีชื่อ
              }}
            >
              {item.name}
            </h2>

            {/* รายละเอียดสั้น ๆ */}
            <p
              style={{
                fontSize: "14px",
                opacity: 0.9,
                marginBottom: "10px",
              }}
            >
              {item.description}
            </p>

            {/* lat / long */}
            <p
              style={{
                fontSize: "12px",
                opacity: 0.8,
                marginBottom: "16px",
              }}
            >
              Latitude: {item.latitude} | Longitude: {item.longitude}
            </p>

            {/* ปุ่มด้านล่าง */}
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            >
              <Link href={`/attractions/${item.id}`}>
                <button
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "none",
                    background: "#00c9ff",
                    color: "#002030",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Detail
                </button>
              </Link>

              <Link href={`/attractions/${item.id}/edit`}>
                <button
                  style={{
                    padding: "8px 18px",
                    borderRadius: "999px",
                    border: "none",
                    background: "#ffdd57",
                    color: "#402f00",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              </Link>

              {/* ปุ่ม Delete ใช้ component ข้างล่าง */}
              <DeleteButton id={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------ Delete Button (client) ------------ */

function DeleteButton({ id }) {
  const handleDelete = async () => {
    if (!confirm("ลบสถานที่นี้จริง ๆ ใช่ไหม?")) return;

    try {
      const res = await fetch(`/api/attractions/${id}`, {
        method: "DELETE",
      });

      let json = null;
      try {
        json = await res.json();
      } catch {
        json = null;
      }

      if (!res.ok) {
        console.error("Delete error:", res.status, json);
        alert("ลบไม่สำเร็จ");
        return;
      }

      // ลบเสร็จ reload list
      window.location.reload();
    } catch (err) {
      console.error("Delete fetch error:", err);
      alert("เกิดข้อผิดพลาดขณะลบ");
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: "8px 18px",
        borderRadius: "999px",
        border: "none",
        background: "#ff4d4d",
        color: "#fff",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      Delete
    </button>
  );
}
