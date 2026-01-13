import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TakaSphere - Financial Literacy Platform Case Study",
  description: "Financial literacy platform with gamified learning, interactive dashboards, progress tracking, and secure authentication. Making financial education engaging and accessible. Built with Next.js, React, Tailwind CSS, and Clerk authentication.",
  keywords: [
    "TakaSphere",
    "Financial Literacy",
    "Gamification",
    "Next.js",
    "Clerk",
    "Web Development",
    "Case Study",
    "Portfolio",
    "Education Technology",
  ],
  openGraph: {
    title: "TakaSphere - Financial Literacy Platform Case Study | Khaled Bin Aziz",
    description: "Financial literacy platform with gamified learning, interactive dashboards, and progress tracking. Making financial education engaging.",
    type: "website",
    images: [
      {
        url: "/images/takasphere.png",
        width: 1200,
        height: 630,
        alt: "TakaSphere Financial Literacy Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TakaSphere - Financial Literacy Platform Case Study",
    description: "Gamified financial literacy platform with interactive dashboards and progress tracking.",
    images: ["/images/takasphere.png"],
  },
  alternates: {
    canonical: "/case-studies/takasphere",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
