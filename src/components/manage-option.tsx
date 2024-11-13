import Link from "next/link";

interface ManageOptionProps {
	title: string;
	href: string;
}

const ManageOption = ({ title, href }: ManageOptionProps) => {
	return (
		<Link href={"/manage" + href} className="border rounded-xl h-20 flex justify-center items-center font-bold bg-white text-black">
			{title}
		</Link>
	);
};

export default ManageOption;
