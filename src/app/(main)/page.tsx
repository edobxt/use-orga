import { getEventsSoon, getRecommendedEvents } from "@/actions/event-actions";
import { getGaleries } from "@/actions/galerie-actions";
import { getRecommendations } from "@/actions/recommend-actions";
import { getRegions } from "@/actions/region-actions";
import { BannerCarousel } from "@/components/banner-carousel";
import Flyer from "@/components/flyer";
import GalerieItem from "@/components/galerie-item";
import RecommendedEvent from "@/components/recommended-event";
import Link from "next/link";

export const metadata = {
	title: `Accueil - ${process.env.ORGA_NAME}`,
};

export default async function Home() {
	const events = await getEventsSoon();
	const regions = await getRegions();
	const galeries = await getGaleries(4);
	const recommendations = await getRecommendations();

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

						<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
							{events
								.filter((event) => event.region === region.id)
								.map((event) => (
									<Flyer
										src={event.flyer_url || "/soon.png"}
										booking_link={event.booking_link || ""}
										key={event.id}
									/>
								))}
							{events.filter((event) => event.region === region.id).length === 1 && (
								<Flyer src="/soon.png" />
							)}
							{events.filter((event) => event.region === region.id).length === 0 && (
								<>
									<Flyer src="/soon.png" />
									<Flyer src="/soon.png" />
								</>
							)}
						</div>
					</div>
				))}

				<div className="flex flex-col gap-4">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold">Albums récents</h2>
						<Link
							href="/galerie-photos"
							className="text-sm underline font-semibold"
						>
							Voir plus
						</Link>
					</div>
					<div
						className="grid grid-cols-2 md:grid-cols-3 gap-2"
						key={`galeries-${galeries.length}`}
					>
						{galeries.map((galerie) => (
							<GalerieItem
								galerie={galerie}
								key={galerie.galerie_id}
							/>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-4">
					<h2 className="text-xl font-bold">Nos recommandations</h2>
					{recommendations.length > 0 ? (
						<div className="flex flex-col gap-2">
							{recommendations.map((recommendation, index) => (
								<RecommendedEvent
									recommendation={recommendation}
									index={index}
									key={recommendation.id}
								/>
							))}
						</div>
					) : (
						<p>
							Il n&apos;y a pas encore de recommandation pour le moment, mais n&apos;hésitez pas à nous
							contacter pour nous en proposer.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
