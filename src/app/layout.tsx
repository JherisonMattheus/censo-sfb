import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { SyncOnReconnect } from "@/components/syncOnReconnect";
import HeaderWrapper from "@/components/headerWrapper";
import Footer from "@/components/footer";


const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: "Censo são francisco do brejão",
  description: "Coletor de dados de alunos sediados pelo municipio de São Franscisco do Brejão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">    
      <body className={`${rubik.className} min-h-screen flex flex-col antialiased`} >

        <SyncOnReconnect/>

        <HeaderWrapper/>

        {children}

        <Footer/>

      </body>
    </html>
  );
}
