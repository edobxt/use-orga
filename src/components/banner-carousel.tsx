"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useState } from "react";
import { getCarouselItems } from "@/actions/carousel-actions";
import { CloudinaryPhoto } from "@/lib/types";
import { Loader } from "lucide-react";

export function BannerCarousel() {
	const plugin = useRef(Autoplay({ delay: 8000, stopOnInteraction: true }));

	const [carouselItems, setCarouselItems] = useState<CloudinaryPhoto[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const carouselItems = await getCarouselItems();
			setCarouselItems(carouselItems);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	if (isLoading) {
		return (
			<div className="w-full h-[200px] flex justify-center items-center">
				<Loader className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	return (
		<Carousel
			plugins={[plugin.current]}
			className="w-full max-w-[1200px]"
			opts={{
				loop: true,
				align: "start",
			}}
		>
			<CarouselContent>
				{carouselItems.map((item) => (
					<CarouselItem key={item.id}>
						<div
							className="aspect-[3/1] relative bg-cover bg-center cursor-grab"
							style={{ backgroundImage: `url(${item.url})` }}
						/>
					</CarouselItem>
				))}
                
			</CarouselContent>
			{carouselItems.length > 1 && (
				<>
					<CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4" />
					<CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4" />
				</>
			)}
		</Carousel>
	);
}
