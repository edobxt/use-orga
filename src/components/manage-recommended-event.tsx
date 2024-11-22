"use client";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import { X } from "lucide-react";

const ManageRecommendedEvent = ({ event }: { event: Event }) => {
	const handleUnRecommend = async () => {
		try {
			const formData = new FormData();
			formData.append("recommended", "false");

			const response = await fetch(`/api/event/${event.id}/recommended`, {
				method: "PUT",
				body: formData,
			});
			if (response.ok) {
				window.location.reload();
			} else {
				console.error("Erreur lors de la désactivation de la recommandation:", response.statusText);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-row justify-between items-center">
			<div className="flex flex-col gap-2">
				<p className="font-bold">{event.name}</p>
				<div className="flex flex-row gap-2">
					<p>{event.date.toLocaleDateString("fr-FR", { dateStyle: "medium" })}</p>
					<p>•</p>
					<p>{event.region_name}</p>
				</div>
			</div>
			<Button
				variant="destructive"
				onClick={handleUnRecommend}
			>
				<X />
			</Button>
		</div>
	);
};

export default ManageRecommendedEvent;
