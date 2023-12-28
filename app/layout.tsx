import { Nunito } from "next/font/google";
import "./globals.css";

import getCurrUser from "./actions/getCurrentUser";

import Navbar from "./components/navbar/Navbar";
import RentModal from "./components/modals/RentModal";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import ToastProvider from "./components/providers/ToastProvider";
import ClientComponent from "./components/providers/ClientComponent";

export const metadata = {
  title: "Home Stays",
  description: "Home Stays",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currUser = await getCurrUser();
  return (
    <html lang="en" className={font.className}>
      <body>
        <ClientComponent>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currUser={currUser} />
        </ClientComponent>
        <div className="pt-28 pb-20">{children}</div>
      </body>
    </html>
  );
}
