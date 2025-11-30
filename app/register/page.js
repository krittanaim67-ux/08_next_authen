"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Register failed");
      } else {
        setSuccess("Register success! Redirecting to login...");
        setTimeout(() => {
          router.push("/login"); // เดี๋ยวเราจะทำหน้า login ต่อ
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #032b3a 0, #020712 60%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background:
            "linear-gradient(145deg, rgba(0,255,135,0.1), rgba(0,132,255,0.08))",
          borderRadius: "24px",
          padding: "32px 28px 28px",
          boxShadow:
            "0 18px 45px rgba(0, 0, 0, 0.75), 0 0 35px rgba(0, 255, 135, 0.25)",
          border: "1px solid rgba(0, 255, 135, 0.25)",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            marginBottom: "4px",
            background:
              "linear-gradient(120deg, #00ff95, #00e4ff, #00ff95)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Create Account
        </h1>
        <p
          style={{
            color: "#b4becb",
            fontSize: "14px",
            marginBottom: "20px",
          }}
        >
          ลงทะเบียนเพื่อจัดการข้อมูลสถานที่ท่องเที่ยวของคุณ
        </p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px" }}>
          <div>
            <label
              style={{
                display: "block",
                color: "#dfe7f2",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            >
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "12px",
                border: "1px solid rgba(0, 255, 135, 0.3)",
                backgroundColor: "rgba(3, 13, 24, 0.9)",
                color: "#f9feff",
                outline: "none",
              }}
              required
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#dfe7f2",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "12px",
                border: "1px solid rgba(0, 255, 135, 0.3)",
                backgroundColor: "rgba(3, 13, 24, 0.9)",
                color: "#f9feff",
                outline: "none",
              }}
              required
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                color: "#dfe7f2",
                fontSize: "13px",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "12px",
                border: "1px solid rgba(0, 255, 135, 0.3)",
                backgroundColor: "rgba(3, 13, 24, 0.9)",
                color: "#f9feff",
                outline: "none",
              }}
              required
            />
          </div>

          {error && (
            <div
              style={{
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "10px",
                backgroundColor: "rgba(255, 70, 70, 0.12)",
                border: "1px solid rgba(255, 70, 70, 0.4)",
                color: "#ffb3b3",
                fontSize: "12px",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              style={{
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 255, 135, 0.12)",
                border: "1px solid rgba(0, 255, 135, 0.4)",
                color: "#b6ffe0",
                fontSize: "12px",
              }}
            >
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "999px",
              border: "none",
              background:
                "radial-gradient(circle at 20% 0%, #00ff95 0, #00c96e 40%, #00a055 80%)",
              boxShadow:
                "0 0 22px rgba(0, 255, 135, 0.55), 0 14px 32px rgba(0, 0, 0, 0.8)",
              color: "#021015",
              fontWeight: 600,
              fontSize: "15px",
              cursor: "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Registering..." : "Create account"}
          </button>

          <p
            style={{
              marginTop: "8px",
              textAlign: "center",
              fontSize: "13px",
              color: "#9da7b9",
            }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#00ff95",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
