"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export function BannerCarousel() {
	const plugin = useRef(Autoplay({ delay: 8000, stopOnInteraction: true }));

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
				{Array.from({ length: 5 }).map((_, index) => (
					<CarouselItem key={index}>
						<div className="aspect-[3/1] relative bg-[url('/LanocheComingSoon.png')] bg-cover bg-center cursor-grab">
                            
						</div>
					</CarouselItem>
				))}
                
			</CarouselContent>
			<CarouselNext className="absolute top-1/2 -translate-y-1/2 right-4" />
			<CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-4" />
		</Carousel>
	);
}
