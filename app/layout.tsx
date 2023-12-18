import { Nunito } from "next/font/google";
import "./globals.css";

import Modal from "./components/modals/Modal";
import Navbar from "./components/navbar/Navbar";

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
      <body>
        <Modal isOpen actionLabel="Submit" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
