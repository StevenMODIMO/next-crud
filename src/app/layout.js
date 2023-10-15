import "./globals.css";
import { Inter, Montserrat } from "next/font/google";
import Navbar from "./components/Navbar";
import { NextAuthProvider } from "./components/AuthProvider";

const inter = Montserrat({ subsets: ['cyrillic']});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, modal }) {
  return (
    <NextAuthProvider>
      <html lang="en">
        <body className={`${inter.className}  bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200`}>
          <Navbar />
          {children}
          {modal}
        </body>
      </html>
    </NextAuthProvider>
  );
}
