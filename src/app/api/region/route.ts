import { createRegion } from "@/actions/region-actions";

export async function POST(request: Request) {
	const formData = await request.formData();
	const name = formData.get("name") as string;

	if (!name) {
		return new Response("Nom de la région manquant", { status: 400 });
	}

	try {
		await createRegion(name as string);
		return new Response("Région ajoutée avec succès", { status: 200 });
	} catch (error) {
        console.log(error);
		return new Response("Erreur lors de l'ajout de la région", { status: 500 });
	}
}
