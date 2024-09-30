import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.scss";
import Landing from "./landing/landing";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Meme.ly",
	description:
		"There is a meme for everything, and if not, you will create it.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Landing inter={outfit}>{children}</Landing>;
}
