import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Better-e-mart - E-commerce Platform Case Study",
  description: "A comprehensive e-commerce platform serving Chittagong, Bangladesh. Full-featured solution with product management, user accounts, vendor dashboards, and complete order processing. Built with Next.js, Redux, Node.js, MongoDB, and Firebase Auth.",
  keywords: [
    "Better-e-mart",
    "E-commerce Platform",
    "Next.js",
    "MongoDB",
    "Redux",
    "Firebase",
    "Web Development",
    "Case Study",
    "Portfolio",
  ],
  openGraph: {
    title: "Better-e-mart - E-commerce Platform Case Study | Khaled Bin Aziz",
    description: "A comprehensive e-commerce platform with vendor dashboards, product management, and order processing. Serving 100+ vendors and 5000+ products.",
    type: "website",
    images: [
      {
        url: "/images/better.png",
        width: 1200,
        height: 630,
        alt: "Better-e-mart E-commerce Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Better-e-mart - E-commerce Platform Case Study",
    description: "A comprehensive e-commerce platform with vendor dashboards and order processing.",
    images: ["/images/better.png"],
  },
  alternates: {
    canonical: "/case-studies/better-e-mart",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
