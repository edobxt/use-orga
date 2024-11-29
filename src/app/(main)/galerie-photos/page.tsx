import { getGaleries } from "@/actions/galerie-actions";
import GalerieItem from "@/components/galerie-item";

export const metadata = {
	title: `Galerie Photos - ${process.env.ORGA_NAME}`,
};

export default async function GaleriePage() {
	const galeries = await getGaleries();

	return (
		<div className="w-full flex flex-col gap-4">
			<h1 className="text-2xl font-bold">Galerie Photos</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
				{galeries.map((galerie) => (
					<GalerieItem
						galerie={galerie}
						key={galerie.slug}
					/>
				))}
			</div>
		</div>
	);
}
