import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/app/components/ThemeProvider"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stethy AI",
  description: "All-In-One AI Healthcare Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}
