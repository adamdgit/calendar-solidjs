import { For, onMount } from "solid-js";
import styles from "./styles.module.css"

type calendarEventProps = {
  id: string;
  date: string;
  description: string;
  author: string
}

type eventProps = {
  eventItems: () => calendarEventProps[]
}

export default function Events(props: eventProps) {

  async function deleteEvent(id: string) {
    await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    }).catch(err => console.error(err))
  }

  onMount(() => {
    console.log(props.eventItems())
  })

  return (
    <aside class={styles.left}>
      {props.eventItems() && <For each={props.eventItems()}>
        {(event) =>  
        <li>
          {event.description}
          <button onClick={() => deleteEvent(event.id)}>delete</button>
        </li>}
      </For>}
    </aside>
  )
}
