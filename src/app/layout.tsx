import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
export const metadata: Metadata = {
  title: "Yoga-Products",
  description: "Shop yoga products here",
};
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <main className="mx-auto min-w-[300px] max-w-7xl bg-base-200 p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
