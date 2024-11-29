"use client";
import { useEffect, useState } from "react";
import { getEventsWithoutGaleries } from "@/actions/event-actions";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check, Loader } from "lucide-react";
import { Event } from "@/lib/types";
import { CommandLoading } from "cmdk";

export function EventsList({
	setSelectedEvent,
	selectedEvent,
}: {
	setSelectedEvent: (event: Event | null) => void;
	selectedEvent: Event | null;
}) {
	const [events, setEvents] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function loadEvents() {
			const eventsData = await getEventsWithoutGaleries();
			setEvents(eventsData);
			setLoading(false);
		}
		loadEvents();
	}, []);

	return (
		<Command>
			<CommandInput placeholder="Filtrer les évènements..." />
			<CommandList>
				{!loading && events.length === 0 && <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>}
				{loading && (
					<CommandLoading>
						<Loader className="h-4 w-4 animate-spin mx-auto my-4" />
					</CommandLoading>
				)}
				{!loading && events.length > 0 && (
					<CommandGroup>
						{events.map((event) => (
							<CommandItem
								key={event.id}
								value={event.id.toString()}
								onSelect={(value) => {
									const selectedEvent = events.find((event) => event.id === parseInt(value)) || null;
									if (selectedEvent) {
										setSelectedEvent(selectedEvent);
									} else {
										setSelectedEvent(null);
									}
								}}
								className="flex justify-between"
							>
								{event.name}
								{selectedEvent?.id === event.id && <Check className="h-4 w-4" />}
							</CommandItem>
						))}
					</CommandGroup>
				)}
			</CommandList>
		</Command>
	);
}
