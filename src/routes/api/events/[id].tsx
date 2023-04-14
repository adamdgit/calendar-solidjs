import { APIEvent, json } from "solid-start/api";
import { deleteEventByID, updateEventByID } from "~/db/events";
import { getUserSession } from "~/db/session";

export async function DELETE({ request, params }: APIEvent) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId) return new Response("Not logged in!", { status: 401 })

  await deleteEventByID(params.id)
    .catch(err => new Response(err))

  return json( request );
}

export async function PATCH({ request, params }: APIEvent) {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId) return new Response("Not logged in!", { status: 401 })

  console.log(params.id)
  await updateEventByID(params.id, 'test')
    .catch(err => new Response(err))

  return json( "event deleted" );
}