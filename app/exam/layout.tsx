import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Exam Center | NetPath Academy",
  description: "ศูนย์ทดสอบความรู้ด้าน Networking — จำลองข้อสอบ CCNA, Security, BGP พร้อม Certificate",
};

export default function ExamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
