import { deleteRegion, updateRegion } from "@/actions/region-actions";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	const formData = await request.formData();
	const name = formData.get("name") as string;
	try {
		await updateRegion(id, name);
		return NextResponse.json({ message: "Region updated" });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error updating region" }, { status: 500 });
	}
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: number }> }) {
	const { id } = await params;
	try {
		await deleteRegion(id);
		return NextResponse.json({ message: "Region deleted" });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ message: "Error deleting region" }, { status: 500 });
	}
}
