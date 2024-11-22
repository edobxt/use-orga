import { v2 as cloudinary } from "cloudinary";
import { CloudinaryRessource } from "./types";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createCloudinaryFolder(folderName: string) {
	try {
		await cloudinary.api.create_folder(folderName);
		return true;
	} catch (error) {
		console.error("Erreur lors de la création du dossier Cloudinary:", error);
		throw error;
	}
}

export async function getCloudinaryFolderContent(folderPath: string) {
	try {
		const result = await cloudinary.search
			.expression(`folder:${folderPath}/*`)
			.sort_by('created_at', 'desc')
			.max_results(500)
			.execute();

		//console.log(result);

		return result.resources.map((resource: CloudinaryRessource) => ({
			id: resource.public_id,
			url: resource.secure_url,
			width: resource.width,
			height: resource.height,
			created_at: resource.created_at,
			filename: resource.filename,
			public_id: resource.public_id,
		}));
	} catch (error) {
		console.error("Erreur lors de la récupération des fichiers Cloudinary:", error);
		throw error;
	}
}

export async function deleteCloudinaryResource(publicId: string) {
	try {
		await cloudinary.uploader.destroy(publicId);
		return true;
	} catch (error) {
		console.error("Erreur lors de la suppression du fichier Cloudinary:", error);
		throw error;
	}
}

export async function uploadCloudinaryResource(file: File, folder: string) {
	try {
		// Utilise Buffer pour lire le fichier et le convertir en base64
		const buffer = Buffer.from(await file.arrayBuffer());
		const fileData = `data:${file.type};base64,${buffer.toString("base64")}`;
		
		// Upload à Cloudinary
		const result = await cloudinary.uploader.upload(fileData, { folder: folder });
		return result;
	} catch (error) {
		console.error("Erreur lors de l'upload du fichier Cloudinary:", error);
		throw error;
	}
}