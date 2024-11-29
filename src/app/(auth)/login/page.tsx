"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { authenticate } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ManageLoginPage = () => {
	const router = useRouter();
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState(false);

	async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLoading(true);
		setError("");

		const formData = new FormData(event.currentTarget);
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		const result = await authenticate(email, password);

		if (result.success) {
			document.cookie = `auth=true; path=/`;
			router.push("/manage");
		} else {
			setError(result.error || "Une erreur est survenue");
		}
		setLoading(false);
	}

	return (
		<form onSubmit={onSubmit} className="flex flex-col items-center justify-center gap-5">
			<h1 className="text-xl font-bold">Se connecter</h1>
			<Image src="/logo.png" alt="logo" width={70} height={70} />

			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="email">Email :</Label>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					required
				/>
			</div>
			<div className="grid w-full max-w-sm items-center gap-1.5">
				<Label htmlFor="password">Mot de passe :</Label>
				<Input
					type="password"
					id="password"
					name="password"
					placeholder="Mot de passe"
					required
				/>
			</div>
			{error && <p className="text-red-500 text-sm">{error}</p>}
			<Button type="submit" className="w-full bg-white text-black font-bold hover:bg-white/80" disabled={loading}>
				{loading ? "Connexion..." : "Se connecter"}
			</Button>


			<Link href={"/"} className="mt-20 text-sm underline">Retour au public</Link>
		</form>
	);
};

export default ManageLoginPage;
