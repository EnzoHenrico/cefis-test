import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BootstrapClient from "./components/BootstrapClient";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import Navbar from "./components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cusos.com",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
