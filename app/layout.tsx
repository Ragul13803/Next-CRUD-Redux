'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header/page";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`} 
        style={{
          backgroundImage: "url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjRpYmQxdWQzNzh0bTZmNmJzOWZzZGtobmZtb2xlNHFqanFyYzJvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JSCJORaPeVOj1ekgyi/giphy.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
        }}
        >
        <Header />
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
