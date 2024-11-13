import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

const ManageLoginPage = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-5">
			<h1 className="text-4xl font-bold">Se connecter</h1>

			<Image src="/GS.png" alt="logo" width={70} height={70} />


			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="email">Email</Label>
				<Input
					type="email"
					id="email"
					placeholder="Email"
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="password">Mot de passe</Label>
				<Input
					type="password"
					id="password"
					placeholder="Mot de passe"
				/>
			</div>
			<Button>Se connecter</Button>
		</div>
	);
};

export default ManageLoginPage;
