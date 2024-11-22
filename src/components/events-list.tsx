"use client";
import { useEffect, useState } from "react";
import { getEventsWithoutGaleries } from "@/actions/event-actions";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Event } from "@/lib/types";

export function EventsList({
  setSelectedEvent,
  selectedEvent,
}: {
  setSelectedEvent: (event: Event | null) => void;
  selectedEvent: Event | null;
}) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
      const eventsData = await getEventsWithoutGaleries();
      setEvents(eventsData);
    }
    loadEvents();
  }, []);

  return (
    <Command>
      <CommandInput placeholder="Filtrer les évènements..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
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
      </CommandList>
    </Command>
  );
}