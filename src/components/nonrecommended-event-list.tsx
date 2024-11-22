"use client";
import { useEffect, useState } from "react";
import { getNonRecommendedEvents } from "@/actions/event-actions";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Check } from "lucide-react";
import { Event } from "@/lib/types";

export function NonRecommendedEventsList({
  setSelectedEvents,
  selectedEvents,
}: {
  setSelectedEvents: (events: Event[] | null) => void;
  selectedEvents: Event[] | null;
}) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function loadEvents() {
      const eventsData = await getNonRecommendedEvents();
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
                  setSelectedEvents(selectedEvents ? [...selectedEvents, selectedEvent] : [selectedEvent]);
                } else {
                  setSelectedEvents(null);
                }
              }}
              className="flex justify-between"
            >
              {event.name}
              {selectedEvents?.find((selectedEvent) => selectedEvent.id === event.id) && <Check className="h-4 w-4" />}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}