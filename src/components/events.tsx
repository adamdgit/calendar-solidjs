import { For, createMemo, createSignal } from "solid-js";
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

  const [months, setMonths] = createSignal<string[]>([]);
  const [years, setYears] = createSignal<string[]>([]);

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

  createMemo(() => {
    let tempMonths:string[] = [];
    props.eventItems().map(item => {
      tempMonths.push(new Date(item.date).toLocaleString('en-au', {month: 'long', year: 'numeric'}))
    });
    // remove duplicates using set and spread operator
    setMonths([...new Set(tempMonths)]);

    let tempYears:string[] = [];
    props.eventItems().map(item => {
      tempYears.push(new Date(item.date).toLocaleString('en-au', {year: 'numeric'}))
    });
    // remove duplicates using set and spread operator
    setYears([...new Set(tempYears)]);
  })

  return (
    <aside class={styles.left}>
      <div class={styles.eventsWrap}>
      {props.eventItems() && 
      years().map((year) => 
        <div class={styles.yearEventWrap}>
          <h3>{year}</h3>
          {months().sort((a, b) => Date.parse(a) - Date.parse(b)).map(month => 
          new Date(month).toLocaleString('en-au', {year: 'numeric'}) === year ?
          <div class={styles.monthEventWrap}>
            <h4>{month}</h4>
            <For each={props.eventItems().sort((a, b) => Date.parse(a.date) - Date.parse(b.date))}>
              {(event) => 
                new Date(event.date).toLocaleString('en-au', {month: 'long', year: 'numeric'}) === month ? 
                <EventItem 
                  event={event}
                  deleteEventByID={deleteEventByID}
                  updateEventByID={updateEventByID}
                /> : null}
            </For>
          </div> : null
          )}
        </div>)}
      </div>
    </aside>
  )
}
