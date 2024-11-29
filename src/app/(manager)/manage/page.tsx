import { getEventsSoon } from "@/actions/event-actions";
import { getGaleries } from "@/actions/galerie-actions";
import { getRegions } from "@/actions/region-actions";
import { BannerCarousel } from "@/components/banner-carousel";
import Flyer from "@/components/flyer";
import Link from "next/link";

export const metadata = {
	title: `Accueil - Gestion | ${process.env.ORGA_NAME}`,
};

const ManagePage = async () => {
	const events = await getEventsSoon();
	const regions = await getRegions();
	const galeries = await getGaleries(8);

	return (
		<div className="flex flex-col gap-10 items-center">
			<BannerCarousel />
			<div className="w-full flex flex-col gap-10">
				{regions.map((region) => (
					<div
						className="grid grid-cols-1 gap-4"
						key={region.id}
					>
						<h2 className="text-xl font-bold">Événements à venir en {region.name}</h2>

						<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2">
							{events
								.filter((event) => event.region === region.id)
								.map((event) => (
									<Flyer
										src={event.flyer_url || "/soon.png"}
										booking_link={event.booking_link || ""}
										key={event.id}
									/>
								))}
						</div>
					</div>
				))}

				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold">Albums récents</h2>
						<Link href="/manage/galeries" className="text-sm underline font-semibold">Voir plus</Link>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
						{galeries.map((galerie) => (
							<Link
								href={`/manage/galeries/${galerie.slug}`}
								key={galerie.galerie_id}
								className="group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all"
							>
								<div
									className="absolute inset-0 bg-cover bg-center"
									style={{ backgroundImage: `url(${galerie.cover_url || "/soon.png"})` }}
								/>
								{/* Fond noir avec faible opacité */}
								<div className="absolute inset-0 bg-black/20" />
								{/* Titre de l'album */}
								<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
									<h3 className="text-white text-sm font-medium">{galerie.name}</h3>
									<p className="text-white/80 text-sm">
										{/*{galerie.photos_count} photos • */}
										{galerie.date?.toLocaleDateString()}
									</p>
								</div>
								{/* Overlay des boutons */}
								<div className="absolute inset-0 bg-black/50 opacity-0 z-20"></div>
							</Link>
						))}
					</div>
				</div>

				<div>
					<h2 className="text-xl font-bold">Nos recommandations</h2>
					<p>
						Il n&apos;y a pas encore de recommandation pour le moment, mais n&apos;hésitez pas à nous
						contacter pour nous en proposer.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ManagePage;
