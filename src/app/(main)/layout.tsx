import Nav from "@/components/nav";
import Footer from "@/components/footer";
import localFont from "next/font/local";

const stolzl = localFont({
	src: "../../fonts/stolzl_regular.otf",
	variable: "--font-stolzl",
	weight: "100 900",
});

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<div className={`${stolzl.variable} min-h-screen flex flex-col`}>
			<Nav />
			<div className="flex-1 bg-black text-white p-2 max-w-screen-lg mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
} 