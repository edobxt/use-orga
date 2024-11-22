"use client";

import Image from "next/image";
import NavLink from "@/components/nav-link";
import { usePathname, useRouter } from "next/navigation";
import { ManageMobileNavButton } from "./manage-mobile-nav-button";

export const navItems = [
	{ label: "ACCUEIL", href: "/manage" },
	{ label: "BANNIERES", href: "/manage/bannieres" },
	{ label: "EVENEMENTS", href: "/manage/evenements" },
	{ label: "GALERIES", href: "/manage/galeries" },
	{ label: "AUTRES", href: "/manage/autres" },
];

const NavManage = () => {
	const router = useRouter();
	const pathname = usePathname();

	const handleLogout = () => {
		document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		router.push("/login");
	};

	return (
		<div className="w-full flex flex-col gap-10 justify-center items-center py-14 bg-gradient-to-b from-[#040c72] to-[#000]">
			<div className="flex flex-row gap-10 justify-between items-center w-full px-10 md:w-8/12 xl:w-1/3">
				<ManageMobileNavButton />
				<Image
					src="/logo.png"
					alt="logo"
					width={100}
					height={100}
					priority
				/>
				<div className="md:hidden"></div>
				<button
					className="hidden md:block bg-white text-black px-4 py-2 rounded-md"
					onClick={handleLogout}
				>
					Se déconnecter
				</button>
			</div>
			<div className="text-white font-light hidden md:flex md:flex-row">
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
