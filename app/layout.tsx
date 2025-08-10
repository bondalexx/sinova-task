import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import paw from "@/public/paw.png";
export const metadata: Metadata = {
  title: "Pet Breed Explorer",
  description: "Cats & Dogs breed explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <header className="border-b bg-white">
         <div className="mx-auto max-w-6xl px-4 py-4 font-semibold ">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-gray-900 hover:text-gray-700 transition home-button flex gap-[16px] items-center "
            >
              Pet Breed Explorer 
               <Image src={paw} alt="cat" width={20} height={20} className="paw-img h-[20px]" />
            </Link>
            
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-gray-500">
          Data from TheCatAPI & TheDogAPI
        </footer>
      </body>
    </html>
  );
}
