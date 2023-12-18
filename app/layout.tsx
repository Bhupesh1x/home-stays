import { Nunito } from "next/font/google";

import "./globals.css";

export const metadata = {
  title: "Home Stays",
  description: "Home Stays",
};

const font = Nunito({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body>{children}</body>
    </html>
  );
}
