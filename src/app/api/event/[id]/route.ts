import { deleteEvent, updateEvent } from "@/actions/event-actions";
import { uploadCloudinaryResource } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
	if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
		return NextResponse.json(
			{ message: "Le format de la requête est incorrect. Attendu : multipart/form-data" },
			{ status: 400 }
		);
	}

	const { id } = await params;

	const formData = await request.formData();

	const flyer = formData.get("flyer");
	const date = formData.get("date") as string;
	const name = formData.get("name") as string;
	const region = formData.get("region") as string;
	const booking_link = formData.get("booking_link") as string;

	if (flyer && flyer instanceof File) {
		try {
			const uploadResult = await uploadCloudinaryResource(flyer, "events");

			const flyer_url = uploadResult.secure_url;
			const public_id = uploadResult.public_id;

			await updateEvent(id, date, name, region, booking_link, flyer_url, public_id);

			return NextResponse.json({ message: "Événement modifié avec succès" }, { status: 200 });
		} catch (error) {
			console.log(error);
			return NextResponse.json({ message: "Erreur lors de l'upload du fichier" }, { status: 500 });
		}
	}

	try {
		await updateEvent(id, date, name, region, booking_link);
		return NextResponse.json({ message: "Événement modifié avec succès" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Erreur lors de la création de l'événement" }, { status: 500 });
	}
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	const formData = await request.formData();
	const public_id = formData.get("public_id") as string;

	const { id } = await params;

	try {
		await deleteEvent(id, public_id);
		return NextResponse.json({ message: "Événement supprimé avec succès" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Erreur lors de la suppression de l'événement" }, { status: 500 });
	}
}
