import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage = () => {
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col justify-between items-center gap-4">
				<h1 className="text-2xl font-bold">Contactez-nous</h1>
				<p className="text-sm md:text-base">Une question ? N&apos;hésitez pas à nous contacter maintenant !</p>
			</div>

			<div className="grid grid-cols-1 gap-4">
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="name">Nom :</Label>
					<Input
						id="name"
						type="text"
						placeholder="Entrez votre nom"
					/>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="email">Email :</Label>
					<Input
						id="email"
						type="text"
						placeholder="Entrez votre email"
					/>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="subject">Sujet :</Label>
					<Input
						id="subject"
						type="text"
						placeholder="Entrez le sujet de votre message"
					/>
				</div>
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="message">Message :</Label>
					<Textarea
						id="message"
						rows={10}
						placeholder="Entrez votre message"
					/>
				</div>
                <button className="w-full bg-white text-black rounded-md py-2 font-bold">Envoyer</button>
			</div>
		</div>
	);
};

export default ContactPage;
