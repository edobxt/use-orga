"use server";

import { executeQuery } from "@/database/db";
import { Region } from "@/lib/types";

export async function getRegions() {
	return await executeQuery<Region[]>({ query: "SELECT * FROM region" });
}

export async function createRegion(name: string) {
	return await executeQuery({ query: "INSERT INTO region (name) VALUES (?)", values: [name] });
}

export async function updateRegion(id: number, name: string) {
	return await executeQuery({ query: "UPDATE region SET name = ? WHERE id = ?", values: [name, id] });
}

export async function deleteRegion(id: number) {
	return await executeQuery({ query: "DELETE FROM region WHERE id = ?", values: [id] });
}
