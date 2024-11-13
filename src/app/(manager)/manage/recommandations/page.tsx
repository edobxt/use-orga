import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ManageRecommandationsPage = () => {
	return (
		<div className="flex flex-col gap-10 max-w-7xl mx-auto w-full px-4">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-bold">Gérer les recommandations</h1>
			</div>

			<div className="grid w-full md:w-8/12 items-center gap-1.5">
				<Label htmlFor="reco">Recommandations :</Label>
				<Textarea id="reco" rows={10} placeholder="Entrez vos recommandations" className="w-full" />
				<Button type="submit">Enregistrer</Button>
			</div>
		</div>
	);
};

export default ManageRecommandationsPage;
