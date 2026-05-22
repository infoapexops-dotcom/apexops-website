import "./globals.css";

const SITE_URL = "https://apexops.ai";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ApexOps — AI Logistics Intelligence",
    template: "%s · ApexOps",
  },
  description:
    "AI-powered rider analytics, automation, forecasting, payroll, reporting and operational intelligence for delivery partners — all in one futuristic command center.",
  keywords: [
    "AI logistics", "delivery fleet analytics", "rider performance", "payroll automation",
    "logistics forecasting", "Keeta partner dashboard", "fleet operations software",
    "Telegram AI assistant", "logistics automation Qatar",
  ],
  authors: [{ name: "ApexOps" }],
  creator: "ApexOps",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "ApexOps — AI Logistics Intelligence",
    description:
      "Automate logistics operations with AI: rider analytics, payroll, forecasting, reporting and automation in one command center.",
    siteName: "ApexOps",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApexOps — AI Logistics Intelligence",
    description: "Automate logistics operations with AI. One command center for analytics, payroll, forecasting & automation.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#05070E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
