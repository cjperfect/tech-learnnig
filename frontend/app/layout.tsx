import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Tech Learning - 技术资源学习平台",
  description: "包含技术文章、Prompt模板库、MCP和Agent Skill导航的综合技术资源平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="pt-20 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
