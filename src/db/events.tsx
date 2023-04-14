import { db } from ".";

type newEvent = {
  id: string,
  date: Date,
  description: string,
}

// create new event
export async function createEvent({ id, date, description }: newEvent) {

  await db.event.create({
    data: { 
      date: date, 
      description: description,
      author: id 
    },
  }).catch(err => console.error(err))
}

// delete an event by given ID
export async function deleteEventByID(id: string) {

  await db.event.delete({
    where: { id: id }
  }).catch(err => console.error(err))
}

// get all events by users ID
export async function getEventsByUserID(id: string) {

  const events = await db.event.findMany({
    where: { author: id }
  }).catch(err => console.error(err))
  return events;
}

export async function updateEventByID(id: string, description: string) {

  const events = await db.event.update({
    where: { id: id },
    data: { description: description }
  }).catch(err => console.error(err))
  return events;
}
