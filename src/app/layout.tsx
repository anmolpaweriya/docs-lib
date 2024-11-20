import type { Metadata } from "next";

// import { Inter } from "next/font/google";



// css
import "@/assets/globals.css";




// components
import NavBar from "@/components/NavBar/NavBar";






// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notes",
  description: "simples notes web app to quickly revice the concept",
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">


      <body className={" grid grid-rows-[60px_auto] h-svh "} >
        <NavBar />
        {children}

      </body>
    </html>
  );
}
