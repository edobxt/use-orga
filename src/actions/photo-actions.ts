'use server'

import { deleteCloudinaryResource, getCloudinaryFolderContent } from '@/lib/cloudinary';

export async function getGaleriePhotos(galerieSlug: string) {
	try {
		const photos = await getCloudinaryFolderContent(`galeries/${galerieSlug}`);
		return photos;
	} catch (error) {
		console.error("Erreur lors de la récupération des photos:", error);
		throw error;
	}
}

export async function deletePhoto(photoId: string) {
	try {
		await deleteCloudinaryResource(photoId);
	} catch (error) {
		console.error("Erreur lors de la suppression de la photo:", error);
		throw error;
	}
}