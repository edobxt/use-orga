"use client";
import { Button } from "@/components/ui/button";
import { Recommendation } from "@/lib/types";
import { X } from "lucide-react";

const ManageRecommendedEvent = ({ recommendation }: { recommendation: Recommendation }) => {
	const handleUnRecommend = async () => {
		try {
			const response = await fetch(`/api/recommend/${recommendation.id}`, {
				method: "DELETE",
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
				<p className="font-bold">{recommendation.name}</p>
				<div className="flex flex-row gap-2">
					<p>{recommendation.date.toLocaleDateString("fr-FR", { dateStyle: "medium" })}</p>
					<p>•</p>
					<p>{recommendation.location}</p>
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
