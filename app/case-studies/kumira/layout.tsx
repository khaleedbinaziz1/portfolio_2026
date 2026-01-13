import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kumira - Boat Ticketing Platform Case Study",
  description: "Full-stack boat ticket booking platform revolutionizing travel in Bangladesh. Features real-time availability, role-based dashboards, payment integration with Aamar Pay API, and seamless booking experience. Built with Next.js, Node.js, Express, and MongoDB.",
  keywords: [
    "Kumira",
    "Boat Ticketing",
    "Next.js",
    "MongoDB",
    "Express",
    "Aamar Pay",
    "Web Development",
    "Case Study",
    "Portfolio",
    "Bangladesh",
  ],
  openGraph: {
    title: "Kumira - Boat Ticketing Platform Case Study | Khaled Bin Aziz",
    description: "Revolutionizing boat travel in Bangladesh with digital ticketing, real-time schedules, and seamless payment integration.",
    type: "website",
    images: [
      {
        url: "/images/kumira.png",
        width: 1200,
        height: 630,
        alt: "Kumira Boat Ticketing Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kumira - Boat Ticketing Platform Case Study",
    description: "Digital boat ticketing platform with real-time availability and payment integration.",
    images: ["/images/kumira.png"],
  },
  alternates: {
    canonical: "/case-studies/kumira",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
