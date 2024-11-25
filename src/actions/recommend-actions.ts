"use server";

import { executeQuery } from "@/database/db";
import { Recommendation } from "@/lib/types";

export async function createRecommend(name: string, lieu: string, link: string, date: string) {
	try {
		await executeQuery({
			query: "INSERT INTO recommendation (name, location, booking_link, date) VALUES (?, ?, ?, ?)",
			values: [name, lieu, link, date],
		});
	} catch (error) {
		console.error("Erreur lors de la création de l'événement recommandé:", error);
		throw error;
	}
}

export async function getRecommendations() {
	try {
		return await executeQuery<Recommendation[]>({
			query: "SELECT * FROM recommendation",
		});
	} catch (error) {
		console.error("Erreur lors de la récupération des événements recommandés:", error);
		throw error;
	}
}

export async function deleteRecommendation(id: string) {
	try {
		await executeQuery({
			query: "DELETE FROM recommendation WHERE id = ?",
			values: [id],
		});
	} catch (error) {
		console.error("Erreur lors de la suppression de l'événement recommandé:", error);
		throw error;
	}
}

export async function updateRecommendation(id: string, name: string, lieu: string, link: string, date: string) {
	try {
		await executeQuery({
			query: "UPDATE recommendation SET name = COALESCE(?, name), location = COALESCE(?, location), booking_link = COALESCE(?, booking_link), date = COALESCE(?, date) WHERE id = ?",
			values: [name, lieu, link, date, id],
		});
	} catch (error) {
		console.error("Erreur lors de la mise à jour de l'événement recommandé:", error);
		throw error;
	}
}
