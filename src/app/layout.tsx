import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.scss";
import Landing from "./landing/landing";

import "@formatjs/intl-datetimeformat/polyfill";
import "@formatjs/intl-datetimeformat/locale-data/en"; // locale-data for en
import "@formatjs/intl-datetimeformat/locale-data/es"; // locale-data for es
import "@formatjs/intl-datetimeformat/add-all-tz"; // Add ALL tz data

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
