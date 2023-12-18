import type { Metadata } from "next";
import { Providers } from "@/lib/providers";
import AuthRouter from "./authRouter";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BillLax Invoice Generator",
  description: "Create custom invoices in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthRouter>
          <Providers>{children}</Providers>
        </AuthRouter>
      </body>
    </html>
  );
}
