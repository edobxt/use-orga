import Image from "next/image";

interface FlyerProps {
    src: string;
}

const Flyer = ({ src }: FlyerProps) => {
	return (
		<div className="aspect-square relative rounded-lg overflow-hidden">
			<Image
				src={src}
				alt="logo"
				fill
				className="object-cover"
			/>
		</div>
	);
};

export default Flyer;
