import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

const stolzl = localFont({
	src: [
	  {
		path: "./fonts/stolzl_thin.otf",
		weight: "100",
	  },
	  {
		path: "./fonts/stolzl_light.otf",
		weight: "300",
	  },
	  {
		path: "./fonts/stolzl_regular.otf",
		weight: "400",
	  },
	  {
		path: "./fonts/stolzl_medium.otf",
		weight: "500",
	  },
	  {
		path: "./fonts/stolzl_bold.otf",
		weight: "700",
	  },
	],
	variable: "--font-stolzl",
  });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${stolzl.variable} antialiased bg-black min-h-screen text-white`}>
			<Script src="https://upload-widget.cloudinary.com/global/all.js" strategy="beforeInteractive" />
				{children}
			</body>
		</html>
	);
}
