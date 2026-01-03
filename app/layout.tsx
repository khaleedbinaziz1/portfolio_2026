import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Khaled Bin Aziz | Full-Stack Developer",
  description: "Full-Stack Developer specializing in React, Next.js, and Node.js. Building exceptional digital experiences with modern web technologies.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "Node.js", "Web Developer", "Portfolio"],
  authors: [{ name: "Khaled Bin Aziz" }],
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Khaled Bin Aziz | Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Next.js, and Node.js",
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
      <body className={`${jetbrainsMono.variable} font-mono`}>
        {children}
      </body>
    </html>
  );
}
