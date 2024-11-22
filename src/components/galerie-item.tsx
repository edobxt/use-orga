import type { Galerie } from "@/lib/types";
import Link from "next/link";

const GalerieItem = ({ galerie }: { galerie: Galerie }) => {
	return (
		<Link
			href={`/galerie-photos/${galerie.slug}`}
			key={galerie.galerie_id}
			className="group relative aspect-[7/5] rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all"
		>
			<div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${galerie.cover_url || "/soon.png"})` }} />
			{/* Fond noir avec faible opacité */}
			<div className="absolute inset-0 bg-black/20" />
			{/* Titre de l'album */}
			<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
				<h3 className="text-white font-bold underline">{galerie.name}</h3>
				<p className="text-white font-bold">
					{/*{galerie.photos_count} photos • */}
					{galerie.date?.toLocaleDateString("fr-FR", { year: "numeric", month: "numeric", day: "numeric" }).replaceAll("/", ".")}
				</p>
			</div>
			{/* Overlay des boutons */}
			<div className="absolute inset-0 bg-black/50 opacity-0 z-20"></div>
		</Link>
	);
};

export default GalerieItem;
