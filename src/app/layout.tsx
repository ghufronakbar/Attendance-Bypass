import type { Metadata } from "next";
import "./globals.css";
import { Archivo } from "next/font/google";
import NavigationMenu from "@/components/NavigationMenu";
import { ToastProvider } from "@/components/Toast";
import Link from "next/link";

const archivo = Archivo({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "Hacktendance",
  description: "Libur Kuliah",
  keywords: [
    "hacktendance",
    "libur",
    "kuliah",
    "presensi",
    "hack presensi",
    "hacktendance presensi",
    "hacktendance libur",
    "libur kuliah",
    "presensi kuliah",
    "presensi libur",
  ],
  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Hacktendance",
    description: "Libur Kuliah",
    url: "https://hacktendance.vercel.app/",
    siteName: "Hacktendance",
    images: [
      {
        url: "https://hacktendance.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hacktendance",
    description: "Libur Kuliah",
    creator: "@ghufronakbar_",
    images: [
      {
        url: "https://hacktendance.vercel.app/og.png",
        width: 1920,
        height: 1080,
      },
    ],
  },

  metadataBase: new URL("https://hacktendance.vercel.app/"),

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "google.com",
    yandex: "yandex.com",
    yahoo: "yahoo.com",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  "use client";
  return (
    <html lang="en">
      <body className={`${archivo.className} antialiased`}>
        <ToastProvider>
          <div className="flex h-screen">
            <NavigationMenu />
            <div className="w-full xl:min-h-[100vh] lg:min-h-[110vh] md:min-h-[120vh] sm:min-h-[160vh] min-h-[160vh] py-32 xl:px-16 lg:px-12 md:px-8 sm:px-8 px-4  text-black flex flex-col">
              {children}
              <span
                className={`${archivo.className} antialiased text-center w-full text-sm text-black my-20`}
              >
                Made with ❤️ by{" "}
                <Link
                  href={`https://saweria.co/lanstheprodigy`}
                  target="_blank"
                  className="underline"
                >
                  @lanstheprodigy
                </Link>
              </span>
            </div>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
