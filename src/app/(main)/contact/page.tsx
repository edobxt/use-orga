"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader } from "lucide-react";

const ContactPage = () => {
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);

		try {
			setLoading(true);
			const response = await fetch("/api/contact", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				setSubmitted(true);
			} else {
				console.error("Erreur lors de l'envoi du formulaire");
			}
		} catch (error) {
			console.error("Erreur lors de l'envoi du formulaire:", error);
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-start h-screen">
				<Loader className="w-10 h-10 animate-spin" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-10 max-w-xl mx-auto w-full px-4">
			{submitted ? (
				<div>
					<h2 className="text-xl font-bold">Merci pour votre message !</h2>
					<p>Nous vous répondrons dans les plus brefs délais.</p>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="transition-opacity duration-500 opacity-100">
					<div className="flex flex-col justify-between items-center gap-4 mb-8">
						<h1 className="text-2xl font-bold">Contactez-nous</h1>
						<p className="text-sm md:text-base">Une question ? N&apos;hésitez pas à nous contacter maintenant !</p>
					</div>

					<div className="grid grid-cols-1 gap-4">
						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="name">Nom :</Label>
							<Input id="name" type="text" name="name" placeholder="Entrez votre nom" required />
						</div>
						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="email">Email :</Label>
							<Input id="email" type="email" name="email" placeholder="Entrez votre email" required />
						</div>
						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="subject">Sujet :</Label>
							<Input id="subject" type="text" name="subject" placeholder="Entrez le sujet de votre message" required />
						</div>
						<div className="grid w-full items-center gap-1.5">
							<Label htmlFor="message">Message :</Label>
							<Textarea id="message" name="message" rows={10} placeholder="Entrez votre message" required />
						</div>
						<button type="submit" className="w-full bg-white text-black rounded-md py-2 font-bold">
							Envoyer
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default ContactPage;
