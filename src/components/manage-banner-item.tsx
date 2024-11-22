import { CloudinaryPhoto } from "@/lib/types";

const ManageBannerItem = ({ photo }: { photo: CloudinaryPhoto }) => {
	return (
		<div
			className="aspect-[3/1] w-full max-w-[1200px] bg-cover bg-center"
			style={{ backgroundImage: `url(${photo.url})` }}
		/>
	);
};

export default ManageBannerItem;
