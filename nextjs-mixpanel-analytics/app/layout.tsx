import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MixpanelProvider } from "@/providers/MixpanelProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to Our App",
  description: "Experience the power of modern web development with smooth scrolling and interactive features",
  keywords: "web development, smooth scrolling, interactive, modern web app",
  authors: [{ name: "Your Company" }],
  openGraph: {
    title: "Welcome to Our App",
    description: "Experience the power of modern web development with smooth scrolling and interactive features",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MixpanelProvider>
          {children}
        </MixpanelProvider>
      </body>
    </html>
  );
}