import { APIEvent, json } from "solid-start/api";
import { deleteEventByID, getEventsByUserID, updateEventByID } from "~/db/events";
import { getUserSession } from "~/db/session";

// deletes an event by given id
export async function DELETE({ request, params }: APIEvent) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId) return new Response("Not logged in!", { status: 401 })

  await deleteEventByID(params.id)
    .catch(err => new Response(err))

  return json( true );
}

// Updates an event by given id, with given description
export async function PATCH({ request, params }: APIEvent) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId) return new Response("Not logged in!", { status: 401 });

  const bodyData = await request.json();
  const description = bodyData.desc;

  await updateEventByID(params.id, description)
    .catch(err => new Response(err))

  return json( true );
}