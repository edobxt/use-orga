"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navItems } from "./nav-manage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ManageMobileNavButton() {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleLogout = () => {
		document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
		router.push("/login");
	};

	const goTo = (href: string) => {
		router.push(href);
		setOpen(false);
	};

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Menu className="md:hidden" />
			</SheetTrigger>
			<SheetContent
				className="text-white w-full bg-black/50 flex flex-col justify-between items-center"
				side="left"
			>
				<SheetHeader>
					<SheetTitle className="text-white">Menu</SheetTitle>
				</SheetHeader>

				<div className="flex flex-col items-center font-bold gap-10">
					{navItems.map((item) => (
						<p key={item.href} onClick={() => goTo(item.href)} className="cursor-pointer">{item.label}</p>
					))}
				</div>

				<SheetFooter>
					<Button
						className="w-full bg-white text-black px-4 py-2 rounded-md"
						onClick={handleLogout}
					>
						Se déconnecter
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
