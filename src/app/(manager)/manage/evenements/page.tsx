import ManageEventItem from "@/components/manage-event-item";
import { AddEventButton } from "@/components/add-event-button";

const ManageEvenements = () => {
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les événements</h1>
				<AddEventButton />
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
