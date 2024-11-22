import Link from "next/link";

interface FlyerProps {
    src: string;
    booking_link?: string;
}

const Flyer = ({ src, booking_link }: FlyerProps) => {
	return booking_link ? (
		<Link href={booking_link} target="_blank" className="aspect-square relative rounded-lg overflow-hidden">
			<img src={src} alt="logo" className="object-cover" />
		</Link>
	) : (
		<div className="aspect-square relative rounded-lg overflow-hidden">
			<img src={src} alt="logo" className="object-cover" />
		</div>
	);
};

export default Flyer;
