import { getGalerieBySlug } from "@/actions/galerie-actions";
import GaleriePhotos from "./page";

export default function GaleriePhotosLayout() {
	return <GaleriePhotos />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {

	const { slug } = await params;

	const galerie = await getGalerieBySlug(slug);

	return {
		title: `${galerie.name} - ${process.env.ORGA_NAME}`,
	};
}
