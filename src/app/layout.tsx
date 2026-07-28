import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Shell } from "@/components/layout/Shell";
import { site } from "@/lib/site";
import { BASE_PATH } from "@/lib/utils";
import "./globals.css";

// Brand guidelines specify Inter for headings and body; mono is reserved for
// terminal, code and metadata treatments.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

const basePath = BASE_PATH;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Cybersecurity & CTF Community | ${site.parent}, ${site.universityShort}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: `${site.name} Council` }],
  creator: `${site.name} Council`,
  publisher: site.parent,
  category: "education",
  manifest: `${basePath}/manifest.webmanifest`,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: `${basePath}/icon.svg`, type: "image/svg+xml" },
      { url: `${basePath}/brand/kryptonex-logo.jpg`, sizes: "1600x1600", type: "image/jpeg" },
    ],
    apple: `${basePath}/brand/kryptonex-logo.jpg`,
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Become the next generation cybersecurity professional`,
    description: site.description,
    url: site.url,
    locale: "en_IN",
    images: [
      {
        url: `${basePath}/brand/kryptonex-logo.jpg`,
        width: 1600,
        height: 1600,
        alt: `${site.name} — cybersecurity community at ${site.parent}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Cybersecurity & CTF Community`,
    description: site.tagline,
    images: [`${basePath}/brand/kryptonex-logo.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  alternateName: `${site.name} Cybersecurity Community`,
  description: site.description,
  url: site.url,
  email: site.email,
  logo: `${site.url}${basePath}/brand/kryptonex-logo.jpg`,
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: site.university,
    department: { "@type": "Organization", name: site.parent },
  },
  address: { "@type": "PostalAddress", addressLocality: "Pune", addressCountry: "IN" },
  sameAs: [site.links.linkedin, site.links.instagram, site.links.github],
  knowsAbout: [
    "Cybersecurity",
    "Capture the Flag",
    "Ethical hacking",
    "Digital forensics",
    "Web application security",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2.5 focus:text-sm focus:text-fg"
        >
          Skip to content
        </a>
        <Shell>{children}</Shell>
        <script
          type="application/ld+json"
          // Static, author-controlled JSON-LD — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}
