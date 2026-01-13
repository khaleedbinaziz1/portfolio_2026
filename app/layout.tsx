import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://khaledbinaziz.dev'),
  title: {
    default: "Khaled Bin Aziz | Full-Stack Developer & Software Engineer",
    template: "%s | Khaled Bin Aziz"
  },
  description: "Full-Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications serving 5,000+ users. Expert in TypeScript, system design, and cloud deployment. Currently pursuing MSc in Computer Science.",
  keywords: [
    "Full-Stack Developer",
    "Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Web Developer",
    "Portfolio",
    "Bangladesh",
    "Chittagong",
    "Frontend Developer",
    "Backend Developer",
    "MongoDB",
    "Express.js",
    "E-commerce Developer",
    "Web Applications"
  ],
  authors: [{ name: "Khaled Bin Aziz", url: "https://github.com/khaleedbinaziz1" }],
  creator: "Khaled Bin Aziz",
  publisher: "Khaled Bin Aziz",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Khaled Bin Aziz Portfolio",
    title: "Khaled Bin Aziz | Full-Stack Developer & Software Engineer",
    description: "Full-Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications serving 5,000+ users. Expert in TypeScript, system design, and cloud deployment.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Khaled Bin Aziz - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khaled Bin Aziz | Full-Stack Developer",
    description: "Full-Stack Developer specializing in React, Next.js, and Node.js. Building scalable web applications.",
    images: ["/og-image.png"],
    creator: "@khaledbinaziz",
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
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
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
