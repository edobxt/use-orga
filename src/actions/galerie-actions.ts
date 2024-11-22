"use server";

import { executeQuery } from "@/database/db";
import { Galerie } from "@/lib/types";
import { createCloudinaryFolder } from "@/lib/cloudinary";

export async function getGaleries(limit?: number) {
	const query =
		`SELECT galerie.id, galerie.slug, galerie.cover_url, ` +
		`event.name, event.date, COUNT(photo.id) AS photos_count FROM galerie ` +
		`LEFT JOIN event ON galerie.event_id = event.id LEFT JOIN photo ON galerie.id = photo.galerie_id ` +
		`GROUP BY galerie.id ${limit ? `LIMIT ${limit}` : ""}`;

	try {
		return await executeQuery<Galerie[]>({ query });
	} catch (error) {
		console.error("Erreur lors de la récupération des galeries:", error);
		throw error;
	}
}

export async function getGalerieBySlug(slug: string) {
	try {
		const galeries = await executeQuery<Galerie[]>({
			query: "SELECT galerie.id AS galerie_id, galerie.slug, galerie.cover_url, event.name, event.date FROM galerie LEFT JOIN event ON galerie.event_id = event.id WHERE slug = ?",
			values: [slug],
		});
		return galeries[0];
	} catch (error) {
		console.error("Erreur lors de la récupération de la galerie:", error);
		throw error;
	}
}

export async function createGalerie(event: string) {
	const galerie = JSON.parse(event);
	try {
		// Créer le dossier dans Cloudinary
		await createCloudinaryFolder(`galeries/${galerie.slug}`);

		// Créer la galerie en base de données
		await executeQuery<{ insertId: number }>({
			query: "INSERT INTO galerie (slug, event_id, cloudinary_folder) VALUES (?, ?, ?)",
			values: [galerie.slug, galerie.event_id, `galeries/${galerie.slug}`],
		});
	} catch (error) {
		console.error("Erreur lors de la création de la galerie:", error);
		throw error;
	}
}

export async function updateGalerie(id: number, galerie: Partial<Galerie>) {
	try {
		await executeQuery({
			query: `
        UPDATE galerie 
        SET slug = COALESCE(?, slug),
            cover_url = COALESCE(?, cover_url),
            event_id = COALESCE(?, event_id)
        WHERE id = ?
      `,
			values: [galerie.slug, galerie.cover_url, galerie.event_id, id],
		});
	} catch (error) {
		console.error("Erreur lors de la mise à jour de la galerie:", error);
		throw error;
	}
}

export async function deleteGalerie(id: number) {
	try {
		await executeQuery({
			query: "DELETE FROM galerie WHERE id = ?",
			values: [id],
		});
	} catch (error) {
		console.error("Erreur lors de la suppression de la galerie:", error);
		throw error;
	}
}

export async function setGalerieCover(dataString: string) {
	const data = JSON.parse(dataString);
	console.log(data);

	try {
		await executeQuery({
			query: "UPDATE galerie SET cover_url = ? WHERE id = ?",
			values: [data.photo_url, data.galerie_id],
		});
	} catch (error) {
		console.error("Erreur lors de la mise à jour de la couverture de la galerie:", error);
		throw error;
	}
}
