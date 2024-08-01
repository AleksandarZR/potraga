import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Znanjem do slatkiša!",
    description: "Odgovori tačno i zaradi slatko!",
    keywords: "Sweet knowledge, Slatko znanje, Use your knowledge to earn sweets!, Znanjem do slatkiša!, Odgovori tačno i zaradi slatko!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
