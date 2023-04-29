import { For, onMount } from "solid-js";
import styles from "./styles.module.css"

import EventItem from "./eventItem";

type calendarEventProps = {
  id: string,
  date: string,
  description: string,
  author: string,
}

type eventProps = {
  eventItems: () => calendarEventProps[],
  setEventItems: (args: calendarEventProps[]) => void,
}

export default function Events(props: eventProps) {

  async function deleteEventByID(id: string) {
    await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      // filter out deleted result if api call is successful
      if (data) props.setEventItems(props.eventItems().filter(events => {
        if (events.id === id) return false
        else return true
      }))
    })
    .catch(err => console.error(err))
  }

  async function updateEventByID(id: string, desc: string) {
    await fetch(`/api/events/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        desc: desc,
      }),
    })
    .then(res => res.json())
    .then(data => {
      // filter out deleted result if api call is successful
      if (data) props.setEventItems(props.eventItems().map(events => {
        if (events.id === id) events.description = desc
        return events
      }))
    })
    .catch(err => console.error(err))
  }

  onMount(() => {
    console.log(props.eventItems())
  })

  return (
    <aside class={styles.left}>
      {props.eventItems() && 
      <For each={props.eventItems()}>
        {(event) =>  
          <EventItem 
            event={event}
            deleteEventByID={deleteEventByID}
            updateEventByID={updateEventByID}
          />}
      </For>}
    </aside>
  )
}
