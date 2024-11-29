import { getGalerieBySlug } from "@/actions/galerie-actions";
import GaleriePhotos from "./page";

export default function GaleriePhotosLayout() {
	return <GaleriePhotos />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {

	const galerie = await getGalerieBySlug(params.slug);

	return {
		title: `${galerie.name} - ${process.env.ORGA_NAME}`,
	};
}
