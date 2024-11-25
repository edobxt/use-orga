import { createRecommend } from "@/actions/recommend-actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	const formData = await request.formData();
	const name = formData.get("name") as string;
	const lieu = formData.get("lieu") as string;
	const link = formData.get("booking_link") as string;
	const date = formData.get("date") as string;

	try {
		await createRecommend(name, lieu, link, date);
		return NextResponse.json({ message: "Événement recommandé créé avec succès" }, { status: 200 });
	} catch (error) {
		console.error("Erreur lors de la création de l'événement recommandé:", error);
		return NextResponse.json({ message: "Erreur lors de la création de l'événement recommandé" }, { status: 500 });
	}
}