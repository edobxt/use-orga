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
import { Event, Region } from "@/lib/types";
import { getRegions } from "@/actions/region-actions";
import { useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader } from "lucide-react";

const ManageEventItem = ({ event }: { event: Event }) => {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<div className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
						<div
							className="absolute inset-0 bg-cover bg-center"
							style={{ backgroundImage: `url(${event.flyer_url || "/soon.png"})` }}
						/>
						<div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-70" />
						<div className="absolute bottom-0 left-0 right-0 p-4 pt-16 bg-gradient-to-t from-black to-transparent text-white">
							<p className="font-bold">{event.name}</p>
							<div className="flex justify-between">
								<p className="text-sm">{event.date.toLocaleString("fr-FR", { dateStyle: "medium" })}</p>
								<p className="text-sm">{event.region_name}</p>
							</div>
						</div>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[450px] text-black">
					<DialogHeader>
						<DialogTitle>Modifier un événement</DialogTitle>
						<DialogDescription>
							Modifiez un événement avec son nom, son flyer et le lien billetterie.
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-scroll max-h-[70vh] w-full">
						<ProfileForm event={event} />
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
				<div className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{ backgroundImage: `url(${event.flyer_url || "/soon.png"})` }}
					/>
					<div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-70" />
					<div className="absolute bottom-0 left-0 right-0 p-4 pt-16 bg-gradient-to-t from-black to-transparent text-white">
						<p className="font-bold">{event.name}</p>
						<div className="flex justify-between">
							<p className="text-sm">{event.date.toLocaleString("fr-FR", { dateStyle: "medium" })}</p>
							<p className="text-sm">{event.region_name}</p>
						</div>
					</div>
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
					<ProfileForm
						className="px-4"
						event={event}
					/>
				</div>
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
};

function ProfileForm({ className, event }: React.ComponentProps<"form"> & { event: Event }) {
	const [date, setDate] = React.useState<Date | undefined>(event.date);
	const [regions, setRegions] = React.useState<Region[]>([]);
	const [file, setFile] = React.useState<File | null>(null);
	const [name, setName] = React.useState<string>("");
	const [link, setLink] = React.useState<string>("");
	const [region, setRegion] = React.useState<number | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [loadingRegions, setLoadingRegions] = React.useState<boolean>(false);

	useEffect(() => {
		setName(event.name || "");
		setRegion(event.region || null);
		setLink(event.booking_link || "");
	}, [event]);

	useEffect(() => {
		setLoadingRegions(true);
		getRegions()
			.then(setRegions)
			.finally(() => setLoadingRegions(false));
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append("flyer", file as Blob);
		formData.append("date", date?.toISOString().split("T")[0] || "");
		formData.append("name", name);
		formData.append("region", region?.toString() || "");
		formData.append("booking_link", link);

		try {
			const response = await fetch(`/api/event/${event.id}`, {
				method: "PUT",
				body: formData,
			});

			const result = await response.json();
			if (response.ok) {
				window.location.reload();
			} else {
				console.error("Erreur :", result.message);
			}
		} catch (error) {
			console.error("Erreur lors de la modification de l'événement:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		setLoading(true);

		const formData = new FormData();
		formData.append("public_id", event.public_id);

		try {
			await fetch(`/api/event/${event.id}`, { method: "DELETE", body: formData });
			window.location.reload();
		} catch (error) {
			console.error("Erreur lors de la suppression de l'événement:", error);
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
				<Button
					type="button"
					variant="destructive"
					onClick={handleDelete}
				>
					Supprimer l&apos;événement
				</Button>
				<div className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{ backgroundImage: `url(${event.flyer_url || "/soon.png"})` }}
					/>
				</div>
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
						value={region?.toString() || event.region?.toString()}
						onValueChange={(value) => setRegion(parseInt(value))}
					>
						<SelectTrigger>
							<SelectValue placeholder="Sélectionnez une région" />
						</SelectTrigger>
						<SelectContent>
							{loadingRegions ? (
								<Loader className="w-4 h-4 animate-spin" />
							) : (
								regions.map((r) => (
									<SelectItem
										key={r.id}
										value={r.id.toString()}
									>
										{r.name}
									</SelectItem>
								))
							)}
						</SelectContent>
					</Select>
				</div>
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					className="rounded-md border mx-auto"
					defaultMonth={date}
				/>
				<Button
					type="submit"
					className="font-bold"
				>
					Modifier l&apos;événement
				</Button>
			</form>
		</div>
	);
}

export default ManageEventItem;
