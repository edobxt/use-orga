"use client";
import Masonry from "react-masonry-css";
import "photoswipe/dist/photoswipe.css";
import { useEffect, useRef, useState } from "react";
import { Galerie } from "@/lib/types";
import { CloudinaryPhoto } from "@/lib/types";
import { getGalerieBySlug } from "@/actions/galerie-actions";
import { getGaleriePhotos } from "@/actions/photo-actions";
import { notFound, useParams } from "next/navigation";

const GaleriePhotos = () => {
	const lightboxRef = useRef<any>(null);
	const [galerie, setGalerie] = useState<Galerie | null>(null);
	const [photos, setPhotos] = useState<CloudinaryPhoto[]>([]);
	const { slug } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			if (!slug || typeof slug !== "string") return;

			const [galerieData, photosData] = await Promise.all([getGalerieBySlug(slug), getGaleriePhotos(slug)]);

			if (!galerieData) {
				notFound();
			} else {
				setGalerie(galerieData);
				setPhotos(photosData);
			}
		};
		fetchData();
	}, [slug]);

	const openLightbox = async (index: number) => {
		const PhotoSwipe = (await import('photoswipe')).default;
		
		const options = {
			dataSource: photos.map(photo => ({
				src: photo.url,
				width: photo.width,
				height: photo.height,
			})),
			index: index,
			bgOpacity: 0.9,
			spacing: 0.1,
			closeOnVerticalDrag: true,
			wheelToZoom: true,
		};

		lightboxRef.current = new PhotoSwipe(options);
		lightboxRef.current.init();
	};

	const breakpointColumns = {
		default: 4,
		1280: 3,
		1024: 3,
		768: 2,
		640: 1
	};

	if (!galerie) return null;

	return (
		<div className="container mx-auto">
			<h1 className="text-3xl font-bold mb-4">{galerie.name}</h1>

			{/* Styles PhotoSwipe */}
			<style jsx global>{`
				.my-masonry-grid {
					display: flex;
					width: auto;
					 gap: 1rem;
				}
				.my-masonry-grid_column {
					background-clip: padding-box;
				}
				
				.pswp {
					--pswp-bg: #000;
					--pswp-placeholder-bg: #222;
				}
				
				.pswp__img {
					object-fit: contain;
				}
			`}</style>

			<Masonry
				breakpointCols={breakpointColumns}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{photos.map((photo, index) => (
					<div 
						key={photo.id || index}
						className="relative mb-4 overflow-hidden rounded-lg group cursor-pointer"
						onClick={() => openLightbox(index)}
					>
						<img
							src={photo.url}
							alt={`Photo ${index + 1}`}
							loading={index < 8 ? "eager" : "lazy"}
							className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
					</div>
				))}
			</Masonry>

			<div className="pswp" tabIndex={-1} role="dialog" aria-hidden="true">
				<div className="pswp__bg"></div>
				<div className="pswp__scroll-wrap">
					<div className="pswp__container">
						<div className="pswp__item"></div>
						<div className="pswp__item"></div>
						<div className="pswp__item"></div>
					</div>
					<div className="pswp__ui pswp__ui--hidden">
						<div className="pswp__top-bar">
							<div className="pswp__counter"></div>
							<button className="pswp__button pswp__button--close" title="Fermer (Esc)"></button>
							<button className="pswp__button pswp__button--fs" title="Plein écran"></button>
							<button className="pswp__button pswp__button--zoom" title="Zoom"></button>
							<div className="pswp__preloader">
								<div className="pswp__preloader__icn">
									<div className="pswp__preloader__cut">
										<div className="pswp__preloader__donut"></div>
									</div>
								</div>
							</div>
						</div>
						<button className="pswp__button pswp__button--arrow--left" title="Précédent"></button>
						<button className="pswp__button pswp__button--arrow--right" title="Suivant"></button>
						<div className="pswp__caption">
							<div className="pswp__caption__center"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GaleriePhotos;
