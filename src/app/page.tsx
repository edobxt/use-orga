import { BannerCarousel } from "@/components/banner-carousel";
import Flyer from "@/components/flyer";

export default function Home() {
	return (
		<div className="flex flex-col gap-10 items-center">
      <BannerCarousel />
			<div className="w-full flex flex-col gap-10">
				<div className="grid grid-cols-1 gap-4">
					<h2 className="text-xl font-bold">Événements à venir en France</h2>
					<div className="grid grid-cols-2 gap-4">
						<Flyer src="/La-Noche-de-Navidad.png" />
						<Flyer src="/soon-gs-event.png" />
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4">
					<h2 className="text-xl font-bold">Événements à venir en Guadeloupe</h2>
					<div className="grid grid-cols-2 gap-2">
						<Flyer src="/soon-gs-event.png" />
						<Flyer src="/soon-gs-event.png" />
					</div>
				</div>

				<div>
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold">Albums récents</h2>
						<p className="text-sm underline">Voir plus</p>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
						<div className="aspect-video xl:aspect-square bg-[url('/soon-gs-event.png')] bg-cover bg-center"></div>
						<div className="aspect-video xl:aspect-square bg-[url('/soon-gs-event.png')] bg-cover bg-center"></div>
						<div className="aspect-video xl:aspect-square bg-[url('/soon-gs-event.png')] bg-cover bg-center"></div>
						<div className="aspect-video xl:aspect-square bg-[url('/soon-gs-event.png')] bg-cover bg-center"></div>
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
}
