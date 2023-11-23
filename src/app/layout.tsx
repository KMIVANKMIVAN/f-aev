// import { Providers } from "./GlobalRedux/provider";
import "./globals.css";
import Navbar from "../componets/navbar";
import Footer from "../componets/footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Provider } from "react-redux";

import store from "./GlobalRedux/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AEVivienda",
  description: "Firma Digital",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {/* <Provider store={store}> */}
          <Navbar />
          {children}
          <Footer />
        {/* </Provider> */}
      </body>
    </html>
  );
}
