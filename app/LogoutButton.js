// app/LogoutButton.js
"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      // ออกจากระบบเสร็จแล้ว ให้กลับไปหน้า login หรือหน้าแรก
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout ไม่สำเร็จ ลองใหม่อีกครั้ง");
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
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
      onMouseOver={(e) => {
        e.currentTarget.style.boxShadow = "0 0 18px rgba(255, 80, 80, 1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.boxShadow = "0 0 12px rgba(255, 50, 50, 0.8)";
      }}
    >
      Logout
    </button>
  );
}
