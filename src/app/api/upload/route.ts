import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configuration de Cloudinary (si nécessaire)
cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadCloudinaryResource(file: File) {
	try {
		// Utilise Buffer pour lire le fichier et le convertir en base64
		const buffer = Buffer.from(await file.arrayBuffer());
		const fileData = `data:${file.type};base64,${buffer.toString("base64")}`;

		// Upload à Cloudinary
		const result = await cloudinary.uploader.upload(fileData, { folder: "events" });
		return result;
	} catch (error) {
		console.error("Erreur lors de l'upload du fichier Cloudinary:", error);
		throw error;
	}
}

export async function POST(request: NextRequest) {
	if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
		return NextResponse.json({ message: "Le format de la requête est incorrect. Attendu : multipart/form-data" }, { status: 400 });
	}

	const formData = await request.formData();
	const flyer = formData.get("flyer");

	if (flyer && flyer instanceof File) {
		try {
			const uploadResult = await uploadCloudinaryResource(flyer);
			return NextResponse.json({ message: "Upload réussi", url: uploadResult.secure_url });
		} catch (error) {
            console.log(error);
			return NextResponse.json({ message: "Erreur lors de l'upload du fichier" }, { status: 500 });
		}
	} else {
		return NextResponse.json({ message: "Aucun fichier détecté dans le champ flyer" });
	}
}

