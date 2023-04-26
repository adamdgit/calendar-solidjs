import { For, createSignal, onMount } from "solid-js";
import styles from "./styles.module.css"
import Tooltip from "./tooltip";

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

  const [editEnabled, setEditEnabled] = createSignal(false)
  const [desc, setDesc] = createSignal("adsa")

  async function deleteEventByID(id: string) {
    await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    }).catch(err => console.error(err))
  }

  function updateEventByID(id: string, desc: string) {

  }

  onMount(() => {
    console.log(props.eventItems())
  })

  return (
    <aside class={styles.left}>
      {props.eventItems() && 
      <For each={props.eventItems()}>
        {(event) =>  
          <li class={styles.eventItem}>
            <div class={styles.eventItemText} data-id={event.id}>
              <span style={{"font-size": '1.2rem', "border-bottom": '1px solid white'}}>{new Date(event.date).toLocaleDateString('en-au', {day: '2-digit', month: 'long', year: 'numeric'})}</span>
              <div style={{"display": 'flex', "gap": '1rem', "align-items": 'center'}}>
                <button onClick={() => setEditEnabled(!editEnabled)} class={styles.editbtn}>
                  <Tooltip message={"Edit description"} name={"edit"} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z"/></svg>
                </button>
                { editEnabled() ? 
                <textarea onChange={(e) => setDesc(e.target.value)} value={""}></textarea> 
                : event.description }
                { editEnabled() ? 
                <button onClick={() => updateEventByID(event.id, desc())} class={styles.saveChanges}>
                  Save
                </button>
                : null }
              </div>
            </div>
            <button class={styles.removeBtn} onClick={() => deleteEventByID(event.id)}>
              <Tooltip message={"Delete event"} name={"remove"} />
              <svg 
                xmlns="http://www.w3.org/2000/svg"  
                viewBox="0 0 448 512">
                  <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
              </svg>
            </button>
          </li>}
      </For>}
    </aside>
  )
}
