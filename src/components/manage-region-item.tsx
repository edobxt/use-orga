"use client";
import { Region } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const ManageRegionItem = ({ region }: { region: Region }) => {
	const [regionName, setRegionName] = useState(region.name);

	const handleUpdateRegion = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", regionName);
		try {
			const response = await fetch(`/api/region/${region.id}`, {
				method: "PUT",
				body: formData,
			});
			if (response.ok) {
				window.location.reload();
			} else {
				console.error("Erreur lors de la modification de la région:", response.statusText);
			}
		} catch (error) {
			console.error("Erreur lors de la modification de la région:", error);
		}
	};

	const handleDeleteRegion = async () => {
		try {
			const response = await fetch(`/api/region/${region.id}`, {
				method: "DELETE",
			});
			if (response.ok) {
				window.location.reload();
			} else {
				console.error("Erreur lors de la suppression de la région:", response.statusText);
			}
		} catch (error) {
			console.error("Erreur lors de la suppression de la région:", error);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<div className="bg-white text-black rounded-md p-2 cursor-pointer">
					<p>{region.name}</p>
				</div>
			</PopoverTrigger>
			<PopoverContent className="grid grid-cols-1 gap-2">
				<form onSubmit={handleUpdateRegion} className="grid grid-cols-1 gap-2">
					<Label htmlFor="region-name">Nom de la région :</Label>
					<Input
						id="region-name"
						placeholder="Nom de la région"
						value={regionName}
						onChange={(e) => setRegionName(e.target.value)}
						required
					/>
					<Button type="submit">Modifier</Button>
				</form>
				<Button
					variant="destructive"
					size="sm"
					onClick={handleDeleteRegion}
				>
					Supprimer
				</Button>
			</PopoverContent>
		</Popover>
	);
};

export default ManageRegionItem;
