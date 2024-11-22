"use server";

import { executeQuery } from "@/database/db";
import { deleteCloudinaryResource, getCloudinaryFolderContent } from "@/lib/cloudinary";

export async function createCarouselItem(url: string) {
	try {
		await executeQuery({
			query: "INSERT INTO carousel (file_url) VALUES (?)",
			values: [url],
		});
	} catch (error) {
		console.error("Erreur lors de la création de la bannière:", error);
		throw error;
	}
}

export async function getCarouselItems() {
	try {
		const carouselItems = await getCloudinaryFolderContent("carousel");
		return carouselItems;
	} catch (error) {
		console.error("Erreur lors de la récupération des bannières:", error);
		throw error;
	}
}

export async function deleteCarouselItem(cloudinary_id: string) {
	await deleteCloudinaryResource(cloudinary_id);
}
