"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PlusCircle, Check } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";

type Status = {
  value: string
  label: string
}

export function AddAlbumButton() {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  const handleCreate = () => {
    // Logique de création d'album ici
    setSelectedStatus(null);
    setOpen(false);
  };

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={setOpen}
			>
				<DialogTrigger asChild>
					<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
						<PlusCircle className="w-5 h-5" />
						<span>Ajouter un album</span>
					</button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px] text-black">
					<DialogHeader>
						<DialogTitle>Ajouter un album</DialogTitle>
						<DialogDescription>
							Sélectionnez l&apos;évènement de votre album
						</DialogDescription>
					</DialogHeader>
          <StatusList setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />
          <div className="flex justify-end mt-4">
            <Button onClick={handleCreate}>Créer un album</Button>
          </div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
		>
			<DrawerTrigger asChild>
				<button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">
					<PlusCircle className="w-5 h-5" />
					<span>Ajouter un album</span>
				</button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left text-black">
					<DrawerTitle>Ajouter un album</DrawerTitle>
					<DrawerDescription>
						Sélectionnez l&apos;évènement de votre album
					</DrawerDescription>
				</DrawerHeader>
        <StatusList setSelectedStatus={setSelectedStatus} selectedStatus={selectedStatus} />
				<DrawerFooter className="pt-2">
          <Button onClick={handleCreate}>Créer album</Button>
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function StatusList({
  setSelectedStatus,
  selectedStatus,
}: {
  setSelectedStatus: (status: Status | null) => void
  selectedStatus: Status | null
}) {
  return (
    <Command>
      <CommandInput placeholder="Filtrer les évènements..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelectedStatus(
                  statuses.find((priority) => priority.value === value) || null
                )
              }}
              className="flex justify-between"
            >
              {status.label}
              {selectedStatus?.value === status.value && (
                <Check className="h-4 w-4" />
              )}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

const statuses: Status[] = [
  {
    value: "summer-party",
    label: "Soirée d'été",
  },
  {
    value: "halloween",
    label: "Halloween Night",
  },
  {
    value: "new-year",
    label: "Nouvel An",
  },
  {
    value: "beach-party",
    label: "Beach Party",
  },
  {
    value: "neon-night",
    label: "Neon Night",
  },
  {
    value: "retro",
    label: "Soirée Rétro",
  },
  {
    value: "masquerade",
    label: "Bal Masqué",
  },
  {
    value: "white-party",
    label: "White Party",
  },
  {
    value: "tropical",
    label: "Soirée Tropicale",
  },
  {
    value: "casino-royal",
    label: "Casino Royal",
  },
  {
    value: "disco",
    label: "Disco Fever",
  },
  {
    value: "karaoke",
    label: "Karaoké Night",
  },
  {
    value: "pool-party",
    label: "Pool Party",
  },
  {
    value: "silent-party",
    label: "Silent Party",
  },
  {
    value: "foam-party",
    label: "Foam Party",
  },
  {
    value: "carnival",
    label: "Carnaval",
  },
  {
    value: "black-light",
    label: "Black Light Party",
  },
  {
    value: "gatsby",
    label: "Gatsby Party",
  },
  {
    value: "space-party",
    label: "Space Party",
  },
  {
    value: "winter-wonderland",
    label: "Winter Wonderland",
  }
]