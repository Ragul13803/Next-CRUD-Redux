'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header/page";
import Footer from "./footer";
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

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          display: "flex",        // Enable Flexbox
          flexDirection: "column", // Stack children vertically
          minHeight: "100vh",      // Full viewport height
          backgroundImage:
            "url('https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjRpYmQxdWQzNzh0bTZmNmJzOWZzZGtobmZtb2xlNHFqanFyYzJvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JSCJORaPeVOj1ekgyi/giphy.gif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <Provider store={store}>
          <main style={{ flex: 1 }}>{children}</main> {/* Pushes footer to the bottom */}
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
