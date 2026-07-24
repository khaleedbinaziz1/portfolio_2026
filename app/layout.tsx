import type { Metadata, Viewport } from "next";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import RetroCursor from "@/components/RetroCursor";

const jetbrainsMono = {
  variable: "--font-mono",
};

const pixelifySans = {
  variable: "--font-pixel",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://khaledbinaziz.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  verification: {
    google: "googled276d36e0a80a7d5",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
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
    canonical: siteUrl,
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} ${pixelifySans.variable} font-pixel`}>
        <StructuredData />
        <RetroCursor />
        {children}
      </body>
    </html>
  );
}
