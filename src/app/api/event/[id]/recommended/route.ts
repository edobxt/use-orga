import { setRecommendedEvent } from "@/actions/event-actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, { params }: { params: { id: number } }) {
	const { id } = params;
	const formData = await request.formData();

	const isRecommended = formData.get("recommended") === "true";

	try {
		await setRecommendedEvent(id, isRecommended ? 1 : 0);
		return NextResponse.json({ message: "Événement recommandé mis à jour avec succès" }, { status: 200 });
	} catch (error) {
		console.error("Erreur lors de la mise à jour de l'événement recommandé:", error);
		return NextResponse.json({ message: "Erreur lors de la mise à jour de l'événement recommandé" }, { status: 500 });
	}
}
