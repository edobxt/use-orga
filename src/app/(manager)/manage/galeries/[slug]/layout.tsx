import { getGalerieBySlug } from "@/actions/galerie-actions";
import ManageGalerie from "./page";

export default function ManageGalerieLayout() {
	return <ManageGalerie />;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const galerie = await getGalerieBySlug(slug);
	return {
		title: `${galerie.name} - Gestion | ${process.env.ORGA_NAME}`,
	};
}
