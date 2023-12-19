import { Nunito } from "next/font/google";
import "./globals.css";

import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import ClientComponent from "./components/providers/ClientComponent";
import ToastProvider from "./components/providers/ToastProvider";

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
        <ClientComponent>
          <ToastProvider />
          <RegisterModal />
          <Navbar />
        </ClientComponent>
        {children}
      </body>
    </html>
  );
}
