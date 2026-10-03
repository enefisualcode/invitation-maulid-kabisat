import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Undangan Maulid Nabi Muhammad SAW | KABISAT",
  description: "Undangan Peringatan Maulid Nabi Muhammad SAW bersama KABISAT.",
  openGraph: {
    title: "Undangan Maulid Nabi Muhammad SAW | KABISAT",
    description: "Undangan Peringatan Maulid Nabi Muhammad SAW bersama KABISAT.",
    type: "website",
    images: [
      {
        url: "/event/thumbnail-linkpreview.jfif",
        alt: "Undangan Peringatan Maulid Nabi Muhammad SAW bersama KABISAT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/event/thumbnail-linkpreview.jfif"],
  },
  icons: { icon: "/brand/logo-kabisat.jpg" },
};

export const viewport: Viewport = { themeColor: "#112C48" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}
