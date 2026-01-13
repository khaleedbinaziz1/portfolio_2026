import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Stack JS - Visual Learning Platform Case Study",
  description: "Master production-ready development with visual guides, interactive examples, and hands-on learning paths for fullstack web development. Open-source visual learning platform covering 40+ technologies across frontend, backend, databases, authentication, testing, and DevOps. Built with Next.js, React, TypeScript, and Tailwind CSS.",
  keywords: [
    "Open Stack JS",
    "Learning Platform",
    "Web Development Education",
    "Next.js",
    "TypeScript",
    "Open Source",
    "Web Development",
    "Case Study",
    "Portfolio",
    "Educational Technology",
  ],
  openGraph: {
    title: "Open Stack JS - Visual Learning Platform Case Study | Khaled Bin Aziz",
    description: "Master production-ready development with visual guides and interactive examples for fullstack web development.",
    type: "website",
    images: [
      {
        url: "/images/openstack.png",
        width: 1200,
        height: 630,
        alt: "Open Stack JS Visual Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Stack JS - Visual Learning Platform Case Study",
    description: "Visual learning platform with interactive guides for fullstack web development.",
    images: ["/images/openstack.png"],
  },
  alternates: {
    canonical: "/case-studies/open-stack-js",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
