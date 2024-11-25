export interface Event {
	id: number;
	date: Date;
	name: string;
	region: number | null;
	booking_link: string | null;
	flyer_url: string | null;
	public_id: string;
	region_name: string;
	recommended: number;
}

export interface Galerie {
	galerie_id: number;
	slug: string | null;
	cover_url: string | null;
	event_id: number;
	name?: string;
	date?: Date;
	photos_count?: number;
}

export interface Photo {
	id: number;
	file_name: string;
	file_url: string;
	galerie_id: number;
}

export interface Carousel {
	id: number;
	file_url: string;
}

export interface Region {
	id: number;
	name: string;
}

export interface CloudinaryPhoto {
	public_id: string;
	id: string;
	url: string;
	width: number;
	height: number;
	created_at: string;
	filename: string;
}

export interface CloudinaryRessource {
	id: string;
	secure_url: string;
	width: number;
	height: number;
	created_at: string;
	filename: string;
	public_id: string;
}

export interface Recommendation {
	id: number;
	name: string;
	location: string;
	booking_link: string;
	date: Date;
}
