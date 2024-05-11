import type { Metadata } from "next";
import { Satisfy } from "next/font/google";
import { Footer } from "@/components/footer/Footer";

const inter = Satisfy({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobee App",
  description: "An app to rate the movies you've watched",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          {children}
          <Footer />
        </body>
    </html>
  );
}