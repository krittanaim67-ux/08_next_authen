// app/attractions/[id]/edit/page.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditAttractionPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // /attractions/[id]

  const [form, setForm] = useState({
    name: "",
    description: "",
    image_url: "",
    latitude: "",
    longitude: "",
  });

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // โหลดข้อมูลเดิมมาใส่ฟอร์ม
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/attractions/${id}`);
        if (!res.ok) {
          alert("โหลดข้อมูลไม่สำเร็จ");
          router.push("/attractions");
          return;
        }
        const data = await res.json();
        setForm({
          name: data.name ?? "",
          description: data.description ?? "",
          image_url: data.image_url ?? "",
          latitude: data.latitude?.toString() ?? "",
          longitude: data.longitude?.toString() ?? "",
        });
      } catch (err) {
        console.error(err);
        alert("เกิดข้อผิดพลาดในการโหลดข้อมูล");
        router.push("/attractions");
      }
    }
    if (id) load();
  }, [id, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/attractions/${id}`, {
        method: "PUT",
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
        alert("บันทึกไม่สำเร็จ");
        return;
      }

      router.push(`/attractions/${id}`);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/attractions/${id}`);
  };

  const handleDelete = async () => {
    if (!confirm("ต้องการลบสถานที่นี้จริง ๆ ไหม?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/attractions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("ลบไม่สำเร็จ");
        return;
      }

      // ลบเสร็จกลับไปหน้ารายการ
      router.push("/attractions");
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการลบ");
    } finally {
      setDeleting(false);
    }
  };

  // UI card แบบสวยของนาย
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
          Edit Attraction
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
              Name
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
              Detail
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
              Cover Image URL{" "}
              <span style={{ fontSize: 12, opacity: 0.7 }}>
                (วางลิงก์รูปภาพจากเว็บ เช่น https://…)
              </span>
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
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
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

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              style={{
                marginLeft: "auto",
                padding: "12px 32px",
                borderRadius: 999,
                border: "none",
                background: "linear-gradient(90deg, #ff4d4d, #ff1a1a)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: "0 0 16px rgba(255,70,70,0.9)",
              }}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
