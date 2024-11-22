import { deleteCarouselItem } from "@/actions/carousel-actions";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const { cloudinary_id } = await request.json();
	try {
		await deleteCarouselItem(cloudinary_id);
		return NextResponse.json({ success: true, message: "Bannière supprimée" });
	} catch (error) {
        console.log(error);
		return NextResponse.json({ success: false, message: "Erreur lors de la suppression de la bannière" }, { status: 500 });
	}
}
