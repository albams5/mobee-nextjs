import type { Metadata } from "next";
import { Satisfy } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";

const inter = Satisfy({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobee App",
  description: "An app to rate the movies you've watched",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.className} lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
