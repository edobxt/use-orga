"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CloudinaryPhoto, Galerie } from "@/lib/types";
import { ImagePlus, Trash } from "lucide-react";
import { setGalerieCover } from "@/actions/galerie-actions";
import { deletePhoto } from "@/actions/photo-actions";

const ManageGaleriePhotoItem = ({ photo, galerie }: { photo: CloudinaryPhoto; galerie: Galerie }) => {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<div className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all">
						<div
							className="absolute inset-0 bg-cover bg-center"
							style={{ backgroundImage: `url(${photo.url || "/soon.png"})` }}
						/>
						{/* Fond noir avec faible opacité */}
						<div className="absolute inset-0 bg-black/20" />
						{/* Titre de l'album */}
						<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
							<p className="text-white/80 text-sm font-bold">{photo.filename}</p>
						</div>
						{/* Overlay des boutons */}
						<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-10" />
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[450px] text-black">
					<DialogHeader>
						<DialogTitle>Gérer la photo</DialogTitle>
						<DialogDescription>Définir comme couverture ou supprimer la photo.</DialogDescription>
					</DialogHeader>
					<div className="overflow-scroll max-h-[70vh] w-full">
						<PhotoForm
							photo={photo}
							galerie={galerie}
							setOpen={setOpen}
						/>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<div className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{ backgroundImage: `url(${photo.url || "/soon.png"})` }}
					/>
					{/* Fond noir avec faible opacité */}
					<div className="absolute inset-0 bg-black/20" />
					{/* Titre de l'album 
						<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
							<p className="text-white/80 text-sm">DX20{index + 1}</p>
						</div>*/}
					{/* Overlay des boutons */}
					<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-10" />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left text-black">
					<DrawerTitle>Gérer la photo</DrawerTitle>
					<DrawerDescription>Définir comme couverture ou supprimer la photo.</DrawerDescription>
				</DrawerHeader>
				<div className="overflow-scroll max-h-[70vh]">
					<PhotoForm
						className="px-4"
						photo={photo}
						galerie={galerie}
						setOpen={setOpen}
					/>
				</div>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button
							variant="outline"
							className="text-black"
						>
							Fermer
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

function PhotoForm({
	className,
	photo,
	galerie,
	setOpen,
}: React.ComponentProps<"form"> & { photo: CloudinaryPhoto; galerie: Galerie; setOpen: (open: boolean) => void }) {
	return (
		<div className={cn("grid items-start gap-4 text-black", className)}>
			<div className="group relative aspect-square rounded-lg overflow-hidden">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url(${photo.url || "/soon.png"})` }}
				/>
			</div>

			<Button
				onClick={() => {
					setGalerieCover(JSON.stringify({ galerie_id: galerie.galerie_id, photo_url: photo.url }));
					setOpen(false);
				}}
				className="font-bold bg-blue-100 border-2 border-blue-500 text-blue-500 hover:bg-blue-200 transition-colors"
			>
				<ImagePlus className="w-5 h-5" />
				Définir comme couverture
			</Button>

			<Button
				onClick={() => {
					deletePhoto(photo.public_id);
					setOpen(false);
					window.location.reload();
				}}
				className="font-bold bg-red-500 text-white hover:bg-red-600 transition-colors"
			>
				<Trash className="w-5 h-5" />
				Supprimer la photo
			</Button>
		</div>
	);
}

export default ManageGaleriePhotoItem;
