import ManageBannerItem from "@/components/manage-banner-item";
import { PlusCircle } from "lucide-react";

const ManageBannieres = () => {
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les bannières</h1>
				<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
					<PlusCircle className="w-5 h-5" />
					<span>Ajouter une bannière</span>
				</button>
			</div>
			<div className="grid grid-cols-1 gap-4">
				<ManageBannerItem />
			</div>
		</div>
	);
};

export default ManageBannieres;
