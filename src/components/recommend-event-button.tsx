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
import { Event } from "@/lib/types";
import { NonRecommendedEventsList } from "./nonrecommended-event-list";

export function RecommendEventButton() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedEvents, setSelectedEvents] = React.useState<Event[] | null>(null);

	const handleCreate = async () => {
		if (selectedEvents) {
            selectedEvents.forEach(async (event) => {
                const formData = new FormData();
                formData.append("recommended", "true");

                fetch(`/api/event/${event.id}/recommended`, {
                    method: "POST",
                    body: formData,
                });
            });
		}
		setSelectedEvents(null);
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
						<span>Recommander</span>
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] text-black">
					<DialogHeader>
						<DialogTitle>Recommander des évènements</DialogTitle>
						<DialogDescription>Sélectionnez l&apos;évènement à recommander</DialogDescription>
					</DialogHeader>
					<NonRecommendedEventsList
						setSelectedEvents={setSelectedEvents}
						selectedEvents={selectedEvents}
					/>
					<div className="flex justify-end mt-4">
						<Button
							onClick={() => {
								handleCreate();
							}}
							disabled={!selectedEvents}
						>
							Recommander
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
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left text-black">
					<DrawerTitle>Recommander des évènements</DrawerTitle>
					<DrawerDescription>Sélectionnez l&apos;évènement à recommander</DrawerDescription>
				</DrawerHeader>
				<NonRecommendedEventsList
					setSelectedEvents={setSelectedEvents}
                    selectedEvents={selectedEvents}
				/>
				<DrawerFooter className="pt-2">
					<Button
						onClick={() => {
							handleCreate();
						}}
						disabled={!selectedEvents}
					>
						Recommander
					</Button>
					<DrawerClose asChild>
						<Button variant="outline" className="text-black">Annuler</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
