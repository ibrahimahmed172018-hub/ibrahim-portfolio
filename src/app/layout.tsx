import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ibrahim-ai.dev"),
  title: {
    default: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.fullTitle}`,
    template: `%s | ${PORTFOLIO_DATA.personal.name}`
  },
  description: PORTFOLIO_DATA.personal.bio,
  keywords: [
    "Ibrahim",
    "AI Software Engineer",
    "Backend Developer",
    "FastAPI",
    "Node.js",
    "Python AI",
    "Computer Vision",
    "Mansoura National University",
    "Egypt Software Engineer",
    "Next.js 15 Portfolio"
  ],
  authors: [{ name: PORTFOLIO_DATA.personal.name, url: PORTFOLIO_DATA.personal.github }],
  creator: PORTFOLIO_DATA.personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ibrahim-ai.dev",
    title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.fullTitle}`,
    description: PORTFOLIO_DATA.personal.bio,
    siteName: `${PORTFOLIO_DATA.personal.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${PORTFOLIO_DATA.personal.name} — Portfolio`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${PORTFOLIO_DATA.personal.name} — ${PORTFOLIO_DATA.personal.fullTitle}`,
    description: PORTFOLIO_DATA.personal.bio,
    creator: "@ibrahim_ai_eng",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PORTFOLIO_DATA.personal.name,
  jobTitle: PORTFOLIO_DATA.personal.role,
  worksFor: {
    "@type": "EducationalOrganization",
    name: PORTFOLIO_DATA.personal.university
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: PORTFOLIO_DATA.personal.university,
    department: PORTFOLIO_DATA.personal.faculty
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "Egypt",
    addressLocality: "Mansoura"
  },
  sameAs: [
    PORTFOLIO_DATA.personal.github,
    PORTFOLIO_DATA.personal.linkedin,
    PORTFOLIO_DATA.personal.twitter
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('dark');
            `
          }}
        />
      </head>
      <body className="antialiased selection:bg-blue-500 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
