import { APIEvent, json } from "solid-start/api";
import { createEvent } from "~/db/events";

// handles HTTP GET requests to /api/events
export async function GET({ params }: APIEvent) {
  const data = await createEvent({
    id: 'e3eead2e-18d2-4fd5-8b85-555b1d1ea632', 
    date: new Date(), 
    description: 'test desc'
  }).catch(err => console.error(err))
  return json({ data });
}

export function POST() {
  // post data
}