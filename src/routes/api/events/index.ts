import { APIEvent, json } from "solid-start/api";
import { createEvent, getEventsByUserID } from "~/db/events";
import { getUserSession } from "~/db/session";

// handles HTTP GET requests to /api/events
export async function GET({ request, params }: APIEvent) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId) return new Response("Not logged in!", { status: 401 })

  const data = await getEventsByUserID(userId)
    .catch(err => console.error(err))
  return json(data);
}

export async function POST({ request, params }: APIEvent) {
  const session = await getUserSession(request);
  const userId = session.get("userId");

  if (!userId) return new Response("Not logged in!", { status: 401 })

  const bodyData = await request.json()
  const date = new Date(bodyData.date); // can't pass date object to server, so convert here
  const description = bodyData.desc;

  await createEvent({
    id: userId, 
    date: date, 
    description: description
  }).catch(err => new Response(err))

  return json("event created");
}