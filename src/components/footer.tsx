import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	const navItems = [
		{ label: "ACCUEIL", href: "/" },
		{ label: "GALERIE", href: "/galerie-photos" },
		{ label: "CONTACT", href: "/contact" },
	];

	return (
		<div className="bg-black text-white flex flex-col justify-between items-center w-full md:w-8/12 mx-auto pt-32 pb-10 gap-6">
			<div className="flex w-8/12 justify-around gap-10 font-bold">
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
					>
						{item.label}
					</Link>
				))}
			</div>

			<Link href="/">
				<Image
					src="/logo.png"
					alt="logo"
					width={100}
					height={100}
					priority
				/>
			</Link>
		</div>
	);
};

export default Footer;
