// app/attractions/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewAttractionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    latitude: "",
    longitude: "",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/attractions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          image_url: form.image_url,
          latitude: parseFloat(form.latitude),
          longitude: parseFloat(form.longitude),
        }),
      });

      if (!res.ok) {
        alert("เพิ่มข้อมูลไม่สำเร็จ");
        return;
      }

      const data = await res.json();
      router.push(`/attractions/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push("/attractions");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "radial-gradient(circle at top, #001a26 0, #000814 55%, #000)",
        color: "#fff",
      }}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "900px",
          background:
            "linear-gradient(145deg, rgba(5,40,70,0.95), rgba(2,20,45,0.98))",
          borderRadius: "28px",
          padding: "32px 40px 40px",
          boxShadow: "0 28px 90px rgba(0,0,0,0.8)",
          border: "1px solid rgba(0,255,149,0.25)",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            fontWeight: "800",
            marginBottom: "28px",
            color: "#00ff95",
            textShadow: "0 0 16px rgba(0,255,149,0.8)",
          }}
        >
          Add New Attraction
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              ชื่อสถานที่
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,10,25,0.9)",
                color: "#fff",
                fontSize: 15,
                outline: "none",
              }}
            />
          </div>

          {/* Detail */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              รายละเอียด
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,10,25,0.9)",
                color: "#fff",
                fontSize: 15,
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* Image URL */}
          <div style={{ marginBottom: 22 }}>
            <label
              style={{
                display: "block",
                marginBottom: 6,
                fontSize: 16,
                fontWeight: 600,
              }}
            >
              รูปภาพ (URL)
            </label>
            <input
              name="image_url"
              value={form.image_url}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(0,10,25,0.9)",
                color: "#fff",
                fontSize: 15,
                outline: "none",
              }}
            />
          </div>

          {/* Lat / Long */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 26,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Latitude
              </label>
              <input
                name="latitude"
                value={form.latitude}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,10,25,0.9)",
                  color: "#fff",
                  fontSize: 15,
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: 6,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                Longitude
              </label>
              <input
                name="longitude"
                value={form.longitude}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(0,10,25,0.9)",
                  color: "#fff",
                  fontSize: 15,
                  outline: "none",
                }}
              />
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 16 }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "12px 32px",
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
              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "12px 32px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(10,10,25,0.95)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
