"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { PlusCircle } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

const AddRegionButton = () => {
	const [regionName, setRegionName] = useState("");

	const handleAddRegion = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", regionName);
		try {
			const response = await fetch("/api/region", { method: "POST", body: formData });
			if (response.ok) {
				window.location.reload();
			} else {
				console.error("Erreur lors de l'ajout de la région:", response.statusText);
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout de la région:", error);
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button>
					<PlusCircle />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<form onSubmit={handleAddRegion} className="grid grid-cols-1 gap-2">
					<Label htmlFor="region-name">Nom de la région :</Label>
					<Input
						id="region-name"
						placeholder="Nom de la région"
						value={regionName}
						onChange={(e) => setRegionName(e.target.value)}
						required
					/>
					<Button type="submit">Ajouter</Button>
				</form>
			</PopoverContent>
		</Popover>
	);
};

export default AddRegionButton;
