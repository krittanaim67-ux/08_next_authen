// app/attractions/[id]/DeleteButton.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("ต้องการลบสถานที่นี้จริง ๆ ใช่ไหม?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/attractions/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("ลบไม่สำเร็จ");
        return;
      }

      // กลับไปหน้า list
      router.push("/attractions");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการลบ");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      style={{
        padding: "10px 26px",
        borderRadius: 999,
        border: "none",
        background: "radial-gradient(circle at 10% 10%, #ff4d4d, #ff1a1a)",
        color: "#fff",
        fontWeight: 700,
        fontSize: 16,
        cursor: "pointer",
        boxShadow: "0 0 18px rgba(255,80,80,0.9)",
      }}
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
