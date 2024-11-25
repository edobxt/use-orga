import { Recommendation } from "@/lib/types";
import Link from "next/link";

const RecommendedEvent = ({ recommendation, index }: { recommendation: Recommendation; index: number }) => {
	const backgrounds = [
		"linear-gradient(to right, #c4d8ff, #5567ff)", // Bleu pastel vers bleu foncé
		"linear-gradient(to right, #c4ffde, #55ffa6)", // Vert pastel vers vert vif
		"linear-gradient(to right, #ffeac4, #ffba55)", // Orange clair vers orange foncé
		"linear-gradient(to right, #d8c4ff, #6755ff)", // Violet pastel vers violet foncé
		"linear-gradient(to right, #ffc4d8, #ff5598)", // Rose pastel vers rose vif
		"linear-gradient(to right, #c4fff6, #55ffe0)", // Cyan pastel vers cyan vif
		"linear-gradient(to right, #ffd8c4, #ff6755)", // Corail clair vers rouge orangé
		"linear-gradient(to right, #f6ffc4, #e0ff55)", // Jaune pastel vers jaune vif
	];

	return (
		<Link
			href={recommendation.booking_link ?? ""}
			target="_blank"
			className="grid grid-cols-1 md:grid-cols-2 gap-2 p-6 rounded-lg"
			style={{ background: backgrounds[index % backgrounds.length] }}
		>
			<p className="text-black font-normal">{recommendation.name}</p>
			<div className="flex items-center justify-end gap-4">
				<p>{recommendation.date.toLocaleDateString().replaceAll("/", ".")}</p>
				<div className="h-3 w-px bg-white"></div> {/* Divider */}
				<p>{recommendation.location}</p>
			</div>
		</Link>
	);
};

export default RecommendedEvent;
