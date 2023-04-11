import { db } from ".";

type newEvent = {
  id: string,
  date: Date,
  description: string,
}

export async function createEvent({ id, date, description }: newEvent) {
  console.log("create event called")
  await db.event.create({
    data: { 
      date: date, 
      description: description,
      author: id 
    },
  }).then(res => console.log(res)).catch(err => console.error(err))
  
}
