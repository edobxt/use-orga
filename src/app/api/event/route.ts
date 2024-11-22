import { createEvent } from "@/actions/event-actions";
import { uploadCloudinaryResource } from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
		return NextResponse.json(
			{ message: "Le format de la requête est incorrect. Attendu : multipart/form-data" },
			{ status: 400 }
		);
	}

	const formData = await request.formData();

	const flyer = formData.get("flyer");
	const date = formData.get("date") as string;
	const name = formData.get("name") as string;
	const region = formData.get("region") as string;
	const booking_link = formData.get("booking_link") as string;
	let flyer_url = "";
	let public_id = "";

	if (flyer && flyer instanceof File) {
		try {
			const uploadResult = await uploadCloudinaryResource(flyer, "events");
			flyer_url = uploadResult.secure_url;
			public_id = uploadResult.public_id;
		} catch (error) {
			console.log(error);
			return NextResponse.json({ message: "Erreur lors de l'upload du fichier" }, { status: 500 });
		}
	} else {
		return NextResponse.json({ message: "Aucun fichier détecté dans le champ flyer" });
	}

	try {
		await createEvent(date, name, region, booking_link, flyer_url, public_id);
		return NextResponse.json({ message: "Événement créé avec succès" }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Erreur lors de la création de l'événement" }, { status: 500 });
	}
}

