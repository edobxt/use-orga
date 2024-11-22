"use server";

import { executeQuery } from "@/database/db";
import { deleteCloudinaryResource } from "@/lib/cloudinary";
import { Event } from "@/lib/types";

export async function getEvents() {
	try {
		return await executeQuery<Event[]>({
			query: "SELECT P1.*, P2.name AS region_name FROM event P1 LEFT JOIN region P2 ON P1.region = P2.id ORDER BY date DESC",
		});
	} catch (error) {
		console.error("Erreur lors de la récupération des événements:", error);
		throw error;
	}
}

export async function getEventsWithoutGaleries() {
	try {
		return await executeQuery<Event[]>({
			query: "SELECT * FROM event WHERE id NOT IN (SELECT event_id FROM galerie)",
		});
	} catch (error) {
		console.error("Erreur lors de la récupération des événements sans galeries:", error);
		throw error;
	}
}

export async function getEvent(id: number) {
	try {
		const events = await executeQuery<Event[]>({
			query: "SELECT * FROM event WHERE id = ?",
			values: [id],
		});
		return events[0];
	} catch (error) {
		console.error("Erreur lors de la récupération de l'événement:", error);
		throw error;
	}
}

export async function getEventsSoon() {
	try {
		return await executeQuery<Event[]>({
			query: "SELECT * FROM event WHERE date > NOW() ORDER BY date ASC",
		});
	} catch (error) {
		console.error("Erreur lors de la récupération des événements à venir:", error);
		throw error;
	}
}

export async function createEvent(
	date: string,
	name: string,
	region: string,
	booking_link: string,
	flyer_url: string,
	public_id: string
) {
	try {
		const result = await executeQuery<{ insertId: number }>({
			query: "INSERT INTO event (date, name, region, booking_link, flyer_url, flyer_public_id) VALUES (?, ?, ?, ?, ?, ?)",
			values: [date, name, region, booking_link, flyer_url, public_id],
		});
		return result;
	} catch (error) {
		console.error("Erreur lors de la création de l'événement:", error);
		throw error;
	}
}

export async function updateEvent(
	id: string,
	date: string,
	name: string,
	region: string,
	booking_link: string,
	flyer_url?: string,
	public_id?: string
) {
	try {
		const query = `
			UPDATE event 
			SET date = COALESCE(?, date),
				name = COALESCE(?, name),
				region = COALESCE(?, region),
				booking_link = COALESCE(?, booking_link)
				${flyer_url ? ", flyer_url = COALESCE(?, flyer_url)" : ""}
				${public_id ? ", flyer_public_id = COALESCE(?, flyer_public_id)" : ""}
			WHERE id = ?
		`;

		const values = [date, name, region, booking_link];
		if (flyer_url) values.push(flyer_url);
		if (public_id) values.push(public_id);
		values.push(id);

		await executeQuery({
			query,
			values,
		});
	} catch (error) {
		console.error("Erreur lors de la mise à jour de l'événement:", error);
		throw error;
	}
}

export async function deleteEvent(id: string, public_id: string) {
	try {
		await executeQuery({
			query: "DELETE FROM event WHERE id = ?",
			values: [id],
		});
		await deleteCloudinaryResource(public_id);
	} catch (error) {
		console.error("Erreur lors de la suppression de l'événement:", error);
		throw error;
	}
}

export async function getRecommendedEvents() {
	try {
		return await executeQuery<Event[]>({
			query: "SELECT P1.*, P2.name AS region_name FROM event P1 LEFT JOIN region P2 ON P1.region = P2.id WHERE recommended = 1 ORDER BY date DESC",
		});
	} catch (error) {
		console.error("Erreur lors de la récupération des événements recommandés:", error);
		throw error;
	}
}

export async function getNonRecommendedEvents() {
	try {
		return await executeQuery<Event[]>({
			query: "SELECT * FROM event WHERE recommended = 0 ORDER BY date DESC",
		});
	} catch (error) {
		console.error("Erreur lors de la récupération des événements recommandés:", error);
		throw error;
	}
}

export async function setRecommendedEvent(id: number, recommended: number) {
	try {
		await executeQuery({
			query: "UPDATE event SET recommended = ? WHERE id = ?",
			values: [recommended, id],
		});
	} catch (error) {
		console.error("Erreur lors de la mise à jour de l'événement recommandé:", error);
		throw error;
	}
}
