import { AddGalerieButton } from "@/components/add-galerie-button";
import Link from "next/link";
import { getGaleries } from "@/actions/galerie-actions";
import { Galerie } from "@/lib/types";

export const metadata = {
	title: `Galeries - Gestion | ${process.env.ORGA_NAME}`,
};

const ManageGaleries = async () => {
	const galeries: Galerie[] = await getGaleries();

	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les galeries</h1>
				<AddGalerieButton />
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{galeries.map((galerie) => (
					<Link
						href={`/manage/galeries/${galerie.slug}`}
						key={galerie.galerie_id}
						className="group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all"
					>
						<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${galerie.cover_url || "/soon.png"})` }} />
						{/* Fond noir avec faible opacité */}
						<div className="absolute inset-0 bg-black/20" />
						{/* Titre de l'album */}
						<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
							<h3 className="text-white font-medium">{galerie.name}</h3>
							<p className="text-white/80 text-sm">{/*{galerie.photos_count} photos • */}{galerie.date?.toLocaleDateString()}</p>
						</div>
						{/* Overlay des boutons */}
						<div className="absolute inset-0 bg-black/50 opacity-0 z-20"></div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default ManageGaleries;
