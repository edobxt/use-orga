import ManageEventItem from "@/components/manage-event-item";
import { AddEventButton } from "@/components/add-event-button";
import { getEvents } from "@/actions/event-actions";

export const metadata = {
	title: `Événements - Gestion | ${process.env.ORGA_NAME}`,
};

const ManageEvenements = async () => {
	const events = await getEvents();
	
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les événements</h1>
				<AddEventButton />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{events.map((event) => (
					<ManageEventItem key={event.id} event={event} />
				))}
			</div>
		</div>
	);
};

export default ManageEvenements;
