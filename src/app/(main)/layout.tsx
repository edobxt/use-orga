import Nav from "@/components/nav";
import Footer from "@/components/footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
	return (
		<div className={`min-h-screen flex flex-col`}>
			<Nav />
			<div className="flex-1 bg-black text-white p-2 w-full max-w-screen-lg mx-auto">
        {children}
      </div>
      <Footer />
    </div>
  );
} 