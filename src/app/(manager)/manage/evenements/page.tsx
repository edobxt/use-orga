import ManageEventItem from "@/components/manage-event-item";
import { PlusCircle } from "lucide-react";

const ManageEvenements = () => {
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les événements</h1>
				<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
					<PlusCircle className="w-5 h-5" />
					<span>Ajouter un événement</span>
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{Array.from({ length: 8 }).map((_, index) => (
					<ManageEventItem key={index} />
				))}
			</div>
		</div>
	);
};

export default ManageEvenements;
