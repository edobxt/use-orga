"use client";
import { ChevronLeftCircle, Loader, Upload } from "lucide-react";
import { getGalerieBySlug } from "@/actions/galerie-actions";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Galerie } from "@/lib/types";
import { CldUploadWidget } from "next-cloudinary";
import { getGaleriePhotos } from "@/actions/photo-actions";
import { CloudinaryPhoto } from "@/lib/types";
import ManageGaleriePhotoItem from "@/components/manage-galerie-photo-item";
import Link from "next/link";

const ManageGalerie = () => {
	const [galerie, setGalerie] = useState<Galerie | null>(null);
	const [photos, setPhotos] = useState<CloudinaryPhoto[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { slug } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			if (!slug || typeof slug !== "string") return;

			const [galerieData, photosData] = await Promise.all([getGalerieBySlug(slug), getGaleriePhotos(slug)]);

			if (!galerieData) {
				notFound();
			} else {
				setGalerie(galerieData);
				setPhotos(photosData);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [slug]);

	if (isLoading) return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4 items-center justify-center">
			<Loader className="animate-spin" />
		</div>
	);

	if (!galerie) return null;

	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex items-center gap-2">
				<Link href="/manage/galeries">
					<ChevronLeftCircle className="w-5 h-5" />
				</Link>
				<h1 className="text-2xl font-bold">{galerie.name}</h1>
			</div>
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div className="flex items-center gap-2">
					<CldUploadWidget
						uploadPreset="ml_default"
						options={{
							folder: `galeries/${galerie.slug}`,
						}}
					>
						{({ open }) => {
							return (
								<button
									className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
									onClick={() => open()}
								>
									<Upload className="w-5 h-5" />
									<span>Uploader des images</span>
								</button>
							);
						}}
					</CldUploadWidget>

					{/*<button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
						<Trash className="w-5 h-5" />
						<span>Supprimer</span>
					</button>*/}
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{photos.map((photo, index) => (
					<ManageGaleriePhotoItem
						key={index}
						photo={photo}
						galerie={galerie}
					/>
				))}
			</div>
		</div>
	);
};

export default ManageGalerie;
