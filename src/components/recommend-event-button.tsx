"use client";
import * as React from "react";

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
import { useMediaQuery } from "@/hooks/use-media-query";
import { Loader, PlusCircle } from "lucide-react";
import { Event } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";

export function RecommendEventButton() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
						<PlusCircle className="w-5 h-5" />
						<span>Recommander</span>
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] text-black">
					<DialogHeader>
						<DialogTitle>Recommander des évènements</DialogTitle>
						<DialogDescription>
							Décrivez l&apos;évènement à recommander.
						</DialogDescription>
					</DialogHeader>

					<RecommendEventForm />
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
				<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
					<PlusCircle className="w-5 h-5" />
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left text-black">
					<DrawerTitle>Recommander des évènements</DrawerTitle>
					<DrawerDescription>
						Décrivez l&apos;évènement à recommander.
					</DrawerDescription>
				</DrawerHeader>

				<RecommendEventForm />

				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button
							variant="outline"
							className="text-black"
						>
							Annuler
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function RecommendEventForm({ className }: React.ComponentProps<"form">) {
	const [loading, setLoading] = React.useState(false);
	const [name, setName] = React.useState("");
	const [lieu, setLieu] = React.useState("");
	const [link, setLink] = React.useState("");
	const [date, setDate] = React.useState<Date | undefined>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append("name", name);
		formData.append("lieu", lieu);
		formData.append("booking_link", link);
		formData.append("date", date?.toISOString().split("T")[0] || "");

		try {
			const response = await fetch("/api/recommend", {
				method: "POST",
				body: formData,
			});
			const result = await response.json();
			if (response.ok) {
				window.location.reload();
			} else {
				console.error("Erreur :", result.message);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			{loading && (
				<div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
					<Loader className="w-10 h-10 animate-spin" />
				</div>
			)}

			<form
				onSubmit={handleSubmit}
				className={cn("grid items-start gap-4 text-black", className)}
			>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="name">Nom de l&apos;événement :</Label>
					<Input
						id="name"
						type="text"
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="lieu">Lieu :</Label>
					<Input
						id="lieu"
						type="text"
						onChange={(e) => setLieu(e.target.value)}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="booking_link">Lien de réservation :</Label>
					<Input
						id="name"
						type="text"
						onChange={(e) => setLink(e.target.value)}
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
					disabled={!date || !name || !lieu || !link}
				>
					Recommander
				</Button>
			</form>
		</div>
	);
}
