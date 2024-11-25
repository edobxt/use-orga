import { deleteRecommendation, updateRecommendation } from "@/actions/recommend-actions";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = await params;

	try {
		await deleteRecommendation(id);
		return NextResponse.json({ message: "Événement recommandé supprimé avec succès" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Erreur lors de la suppression de l'événement recommandé" },
			{ status: 500 }
		);
	}
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	const { id } = await params;
	const formData = await request.formData();

	const name = formData.get("name") as string;
	const lieu = formData.get("location") as string;
	const link = formData.get("booking_link") as string;
	const date = formData.get("date") as string;

	try {
		await updateRecommendation(id, name, lieu, link, date);
		return NextResponse.json({ message: "Événement recommandé mis à jour avec succès" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Erreur lors de la mise à jour de l'événement recommandé" },
			{ status: 500 }
		);
	}
}
