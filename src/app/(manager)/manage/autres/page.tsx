import { getRegions } from "@/actions/region-actions";
import ManageRegionItem from "@/components/manage-region-item";
import AddRegionButton from "@/components/add-region-button";
import { RecommendEventButton } from "@/components/recommend-event-button";
import { getRecommendedEvents } from "@/actions/event-actions";
import ManageRecommendedEvent from "@/components/manage-recommended-event";

const ManageAutresPage = async () => {
	const regions = await getRegions();
	const recommendedEvents = await getRecommendedEvents();

	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les autres paramètres</h1>
			</div>

			<div className="grid w-full items-center gap-8">
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">Recommandations :</h3>
					<RecommendEventButton />
				</div>
				<div className="flex flex-col gap-2">
					{recommendedEvents.map((event) => (
						<ManageRecommendedEvent
							key={event.id}
							event={event}
						/>
					))}
				</div>
			</div>

			<div className="grid w-full items-center gap-1.5 mt-20">
				<h3 className="text-lg font-semibold">Régions</h3>
				<div className="flex flex-row items-center gap-2">
					{regions.map((region) => (
						<ManageRegionItem
							key={region.id}
							region={region}
						/>
					))}
					<AddRegionButton />
				</div>
			</div>
		</div>
	);
};

export default ManageAutresPage;