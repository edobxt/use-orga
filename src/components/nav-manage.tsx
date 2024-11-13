"use client";

import Image from "next/image";
import NavLink from "@/components/nav-link";
import { usePathname } from "next/navigation";

const NavManage = () => {
	const pathname = usePathname();

	const navItems = [
		{ label: "ACCUEIL", href: "/manage" },
		{ label: "ALBUMS", href: "/manage/albums" },
		{ label: "BANNIERES", href: "/manage/bannieres" },
		{ label: "EVENEMENTS", href: "/manage/evenements" },
		{ label: "RECOMMANDATIONS", href: "/manage/recommandations" },
	];

	return (
		<div className="w-full flex flex-col gap-10 justify-center items-center py-14 bg-gradient-to-b from-[#040c72] to-[#000]">
			<div className="flex flex-row gap-10 justify-between items-center w-1/3">
				<Image
					src="/GS.png"
					alt="logo"
					width={100}
					height={100}
				/>
				<button className="bg-white text-black px-4 py-2 rounded-md">Se déconnecter</button>
			</div>
			<div className="text-white font-light flex flex-row gap-10">
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

export default NavManage;
