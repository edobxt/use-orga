import { getGalerieBySlug } from "@/actions/galerie-actions";
import ManageGalerie from "./page";

export default function ManageGalerieLayout() {
	return <ManageGalerie />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const galerie = await getGalerieBySlug(params.slug);
	return {
		title: `${galerie.name} - Gestion | ${process.env.ORGA_NAME}`,
	};
}
