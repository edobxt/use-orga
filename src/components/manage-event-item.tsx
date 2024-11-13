"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Calendar } from "@/components/ui/calendar";

const ManageEventItem = () => {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<div className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all">
						<div className="absolute inset-0 bg-[url('/soon-gs-event.png')] bg-cover bg-center" />
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] text-black">
					<DialogHeader>
						<DialogTitle>Modifier un événement</DialogTitle>
						<DialogDescription>
							Modifiez un événement avec son nom, son flyer et le lien billetterie.
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-scroll max-h-[70vh]">
					<ProfileForm />

					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<div className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all">
					<div className="absolute inset-0 bg-[url('/soon-gs-event.png')] bg-cover bg-center" />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left text-black">
					<DrawerTitle>Modifier un événement</DrawerTitle>
					<DrawerDescription>
						Modifiez un événement avec son nom, son flyer et le lien billetterie.
					</DrawerDescription>
				</DrawerHeader>
				<div className="overflow-scroll max-h-[70vh]">
					<ProfileForm className="px-4" />
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline" className="text-black">Fermer</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

function ProfileForm({ className }: React.ComponentProps<"form">) {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<form className={cn("grid items-start gap-4 text-black", className)}>
			<div className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all">
				<div className="absolute inset-0 bg-[url('/soon-gs-event.png')] bg-cover bg-center" />
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="picture">Flyer :</Label>
				<Input
					id="picture"
					type="file"
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="name">Nom de l&apos;événement :</Label>
				<Input
					id="name"
					type="text"
					placeholder="Entrez le nom de l'événement"
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="link">Lien billetterie :</Label>
				<Input
					id="link"
					type="text"
					placeholder="Entrez le lien billetterie"
				/>
			</div>
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				className="rounded-md border mx-auto"
			/>
			<Button
				type="submit"
				className="font-bold"
			>
				Modifier l&apos;événement
			</Button>
		</form>
	);
}

export default ManageEventItem;
