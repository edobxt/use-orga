"use client";

import Image from "next/image";
import NavLink from "@/components/nav-link";
import { usePathname } from "next/navigation";

const Nav = () => {
	const pathname = usePathname();

    const navItems = [
        { label: "ACCUEIL", href: "/" },
        { label: "GALERIE", href: "/galerie" },
        { label: "CONTACT", href: "/contact" },
    ];

	return (
        <div className="w-full flex flex-col gap-10 justify-center items-center py-14 bg-gradient-to-b from-[#040c72] to-[#000]">
            <Image src="/GS.png" alt="logo" width={100} height={100} />
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

export default Nav;
