// app/attractions/layout.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function AttractionsLayout({ children }) {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  // ถ้าไม่มี cookie แปลว่ายังไม่ login -> เด้งกลับหน้า login
  if (!userId) {
    redirect("/login");
  }

  return <>{children}</>;
}
