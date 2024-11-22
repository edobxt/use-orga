"use client";

import Image from "next/image";
import NavLink from "@/components/nav-link";
import { usePathname } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();

	const navItems = [
		{ label: "ACCUEIL", href: "/" },
		{ label: "GALERIE", href: "/galerie-photos" },
		{ label: "CONTACT", href: "/contact" },
	];

	return (
		<div className="w-full flex flex-col gap-10 justify-center items-center py-14 bg-gradient-to-b from-[#060c6e] to-[#000]">
			<Image
				src="/logo.png"
				alt="logo"
				width={100}
				height={100}
				priority
			/>
			<div className="flex flex-row">
				{navItems.map((item) => (
					<NavLink
						key={item.href}
						href={item.href}
						active={pathname === item.href}
					>
						{item.label}
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default Nav;
