import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Autopilot POS - Retail ERP & Business Management Platform Case Study",
  description:
    "Autopilot POS is a complete retail ERP and POS management platform for managing inventory, products, orders, customers, analytics, payments, and business operations. Built with Next.js, React, Node.js, MongoDB, Express, TypeScript, and Tailwind CSS.",

  keywords: [
    "Autopilot POS",
    "Retail ERP",
    "POS System",
    "Business Management Platform",
    "Inventory Management System",
    "Order Management",
    "Sales Dashboard",
    "Analytics Dashboard",
    "Next.js",
    "React",
    "MongoDB",
    "TypeScript",
    "Web Development",
    "Case Study",
    "Portfolio",
    "SaaS",
  ],

  openGraph: {
    title:
      "Autopilot POS - Retail ERP & Business Management Platform Case Study | Khaled Bin Aziz",

    description:
      "A complete ERP and POS solution for managing products, inventory, sales, customers, orders, financial analytics, and business operations.",

    type: "website",

    images: [
      {
        url: "/images/pixentix_dashboard.png",
        width: 1200,
        height: 630,
        alt: "Autopilot POS ERP Dashboard",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Autopilot POS - Retail ERP & Business Management Platform Case Study",

    description:
      "Complete retail ERP system with POS, inventory management, analytics dashboard, order tracking, and business insights.",

    images: [
      "/images/pixentix_dashboard.png",
    ],
  },

  alternates: {
    canonical: "/case-studies/autopilot-pos",
  },
};


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}