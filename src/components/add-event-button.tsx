"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
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
import { Loader, PlusCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect } from "react";
import { getRegions } from "@/actions/region-actions";
import { Region } from "@/lib/types";

export function AddEventButton() {
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
						<span>Ajouter un événement</span>
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] text-black">
					<DialogHeader>
						<DialogTitle>Ajouter un événement</DialogTitle>
						<DialogDescription>
							Ajoutez un événement avec son nom, son flyer et le lien billetterie.
						</DialogDescription>
					</DialogHeader>
					<ProfileForm />
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
					<span>Ajouter un événement</span>
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left text-black">
					<DrawerTitle>Ajouter un événement</DrawerTitle>
					<DrawerDescription>
						Ajoutez un événement avec son nom, son flyer et le lien billetterie.
					</DrawerDescription>
				</DrawerHeader>
				<ProfileForm className="px-4" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button
							variant="outline"
							className="text-black"
						>
							Fermer
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
	const [date, setDate] = React.useState<Date | undefined>();
	const [file, setFile] = React.useState<File | null>(null);
	const [name, setName] = React.useState<string>("");
	const [link, setLink] = React.useState<string>("");
	const [regions, setRegions] = React.useState<Region[]>([]);
	const [region, setRegion] = React.useState<string>("");
	const [loading, setLoading] = React.useState<boolean>(false);

	useEffect(() => {
		getRegions().then(setRegions);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append("flyer", file as Blob);
		formData.append("date", date?.toISOString().split("T")[0] || "");
		formData.append("name", name);
		formData.append("region", region);
		formData.append("booking_link", link);

		try {
			const response = await fetch("/api/event", {
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
			console.error("Erreur lors de l'upload ou de la création de l'événement:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="relative">
			{loading && (
				<div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
					<Loader className="w-10 h-10 animate-spin" />
				</div>
			)}
			<form
				onSubmit={handleSubmit}
				className={cn("grid items-start gap-4 text-black", className)}
				encType="multipart/form-data"
			>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="picture">Flyer :</Label>
					<Input
						id="picture"
						type="file"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="name">Nom de l&apos;événement :</Label>
					<Input
						id="name"
						type="text"
						placeholder="Entrez le nom de l'événement"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="link">Lien billetterie :</Label>
					<Input
						id="link"
						type="text"
						placeholder="Entrez le lien billetterie"
						value={link}
						onChange={(e) => setLink(e.target.value)}
					/>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label htmlFor="region">Région :</Label>
					<Select
						value={region}
						onValueChange={setRegion}
					>
						<SelectTrigger>
							<SelectValue placeholder="Sélectionnez une région" />
						</SelectTrigger>
						<SelectContent>
							{regions.map((region) => (
								<SelectItem
									key={region.id}
									value={region.id.toString()}
								>
									{region.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
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
					disabled={!date || !name || !link || !region || !file}
				>
					Ajouter l&apos;événement
				</Button>
			</form>
		</div>
	);
}
