"use client";
import ManageBannerItem from "@/components/manage-banner-item";
import { CldUploadButton } from "next-cloudinary";
import { Loader, PlusCircle, Trash2 } from "lucide-react";
import { getCarouselItems } from "@/actions/carousel-actions";
import { useEffect } from "react";
import { useState } from "react";
import { CloudinaryPhoto } from "@/lib/types";
import { Button } from "@/components/ui/button";

const ManageBannieres = () => {
	const [carouselItems, setCarouselItems] = useState<CloudinaryPhoto[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const carouselItems = await getCarouselItems();
			setCarouselItems(carouselItems);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	const handleDeleteBanner = async (cloudinary_id: string) => {
		fetch(`/api/carousel`, {
			method: "DELETE",
			body: JSON.stringify({ cloudinary_id }),
		});
		window.location.reload();
	};

	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les bannières</h1>
				{/* <AddBannerButton /> */}
				<CldUploadButton
					uploadPreset="ml_default"
					options={{
						folder: "carousel",
					}}
					onClose={() => {
						window.location.reload();
					}}
					className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
				>
					<PlusCircle className="w-5 h-5" />
					<span>Ajouter une bannière</span>
				</CldUploadButton>
			</div>
			<div className="grid grid-cols-1 gap-4">
				{isLoading ? (
					<div className="w-full h-[200px] flex justify-center items-center">
						<Loader className="w-10 h-10 animate-spin" />
					</div>
				) : (
					carouselItems.map((item, index) => (
						<div
							key={item.id}
							className="flex flex-col gap-2"
						>
							<div className="flex items-center gap-2 font-bold">
								{`#${index + 1} - `}
								<Button
									variant="destructive"
									onClick={() => handleDeleteBanner(item.public_id)}
								>
									<Trash2 />
								</Button>
							</div>
							<ManageBannerItem photo={item} />
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default ManageBannieres;
