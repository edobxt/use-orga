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
import { PlusCircle } from "lucide-react";
import { EventsList } from "./events-list";
import { Event } from "@/lib/types";
import { generateSlug } from "@/lib/utils";
import { createGalerie } from "@/actions/galerie-actions";

export function AddGalerieButton() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);

	const handleCreate = async () => {
		if (selectedEvent) {
			const slug = generateSlug(selectedEvent.name);
			const newGalerie = {
				slug,
				event_id: selectedEvent.id,
			};
			await createGalerie(JSON.stringify(newGalerie));
			window.location.href = `/manage/galeries/${slug}`;
		}
		setSelectedEvent(null);
		setOpen(false);
	};

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
						<PlusCircle className="w-5 h-5" />
						<span>Ajouter une galerie</span>
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] text-black">
					<DialogHeader>
						<DialogTitle>Ajouter une galerie</DialogTitle>
						<DialogDescription>Sélectionnez l&apos;évènement de votre galerie</DialogDescription>
					</DialogHeader>
					<EventsList
						setSelectedEvent={setSelectedEvent}
						selectedEvent={selectedEvent}
					/>
					<div className="flex justify-end mt-4">
						<Button
							onClick={() => {
								handleCreate();
							}}
							disabled={!selectedEvent}
						>
							Créer une galerie
						</Button>
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
				<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
					<PlusCircle className="w-5 h-5" />
					<span>Ajouter une galerie</span>
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left text-black">
					<DrawerTitle>Ajouter une galerie</DrawerTitle>
					<DrawerDescription>Sélectionnez l&apos;évènement de votre galerie</DrawerDescription>
				</DrawerHeader>
				<EventsList
					setSelectedEvent={setSelectedEvent}
					selectedEvent={selectedEvent}
				/>
				<DrawerFooter className="pt-2">
					<Button
						onClick={() => {
							handleCreate();
						}}
						disabled={!selectedEvent}
					>
						Créer une galerie
					</Button>
					<DrawerClose asChild>
						<Button variant="outline">Annuler</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
