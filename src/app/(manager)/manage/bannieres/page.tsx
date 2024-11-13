import ManageBannerItem from "@/components/manage-banner-item";
import { AddBannerButton } from "@/components/add-banner-button";

const ManageBannieres = () => {
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les bannières</h1>
				<AddBannerButton />
			</div>
			<div className="grid grid-cols-1 gap-4">
				<ManageBannerItem />
			</div>
		</div>
	);
};

export default ManageBannieres;
