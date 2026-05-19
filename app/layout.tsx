import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrialSpace | AI 디지털 트윈 창업 분석",
  description:
    "실제 상권 데이터 기반 창업 시뮬레이션. 예상 매출, 경쟁 강도, 소비자 반응을 AI로 미리 확인하세요.",
  openGraph: {
    title: "TrialSpace",
    description: "창업 전, AI로 먼저 실험하세요",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#030712] text-zinc-100">
        <div className="bg-grid pointer-events-none fixed inset-0 -z-10 opacity-40" />
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} TrialSpace · MVP Demo
        </footer>
      </body>
    </html>
  );
}
