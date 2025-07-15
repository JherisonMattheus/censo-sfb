import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";


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

        <Header/>

        {children}



      </body>
    </html>
  );
}
