import { Trash } from "lucide-react";

const ManageAlbum = ({params}: {params: {slug: string}}) => {
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">{params.slug}</h1>
				<div className="flex items-center gap-2">
				{/*<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
					<Edit className="w-5 h-5" />
					<span>Modifier</span>
				</button>*/}
				<button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
					<Trash className="w-5 h-5" />
					<span>Supprimer</span>
				</button>
				</div>
				
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{Array.from({ length: 8 }).map((_, index) => (
					<div
						key={index} 
						className="cursor-pointer group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-white/50 transition-all"
					>
						<div className="absolute inset-0 bg-[url('/soon-gs-event.png')] bg-cover bg-center" />
						{/* Fond noir avec faible opacité */}
						<div className="absolute inset-0 bg-black/20" />
						{/* Titre de l'album */}
						<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
							<p className="text-white/80 text-sm">DX20{index+1}</p>
						</div>
						{/* Overlay des boutons */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-10" />
					</div>
				))}
			</div>
		</div>
	);
};

export default ManageAlbum;
