import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pixentix Auto Pilot - E-commerce Website Builder Case Study",
  description: "E-commerce website builder using prebuilt Next.js components. Create functional stores in under 10 minutes with drag-and-drop selection, payment integration, and responsive templates. Built with Next.js, React, Node.js, MongoDB, Express, TypeScript, and Tailwind CSS.",
  keywords: [
    "Pixentix Auto Pilot",
    "Website Builder",
    "E-commerce Builder",
    "Next.js",
    "MongoDB",
    "TypeScript",
    "Web Development",
    "Case Study",
    "Portfolio",
    "SaaS",
  ],
  openGraph: {
    title: "Pixentix Auto Pilot - E-commerce Website Builder Case Study | Khaled Bin Aziz",
    description: "Create functional e-commerce stores in under 10 minutes with drag-and-drop selection, payment integration, and responsive templates.",
    type: "website",
    images: [
      {
        url: "/images/website_builder.png",
        width: 1200,
        height: 630,
        alt: "Pixentix Auto Pilot Website Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixentix Auto Pilot - E-commerce Website Builder Case Study",
    description: "E-commerce website builder with drag-and-drop components and payment integration.",
    images: ["/images/website_builder.png"],
  },
  alternates: {
    canonical: "/case-studies/pixentix-auto-pilot",
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
