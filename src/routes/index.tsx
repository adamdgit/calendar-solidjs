import { useRouteData } from "solid-start";
import { useUser } from "../db/useUser";
import Header from "~/components/header";
import Calendar from "~/components/calendar";
import { For, createSignal, onMount } from "solid-js";

export function routeData() {
  return useUser();
}

type calendarEventProps = {
  id: string;
  date: string;
  description: string;
}

export default function Home() {
  const user = useRouteData<typeof routeData>();

  const [selectedDate, setSelectedDate] = createSignal("");
  const [popupIsVisible, setPopupIsVisible] = createSignal(false);
  const [eventItems, setEventItems] = createSignal<calendarEventProps[]>()
  const [updateMsg, setUpdateMsg] = createSignal("")
  const [needsUpdate, setNeedsUpdate] = createSignal(false)

  async function getEventsTest() {
    await fetch("/api/events", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setEventItems(data))
      .catch(err => console.error(err))
  }

  async function deleteEvent(id: string) {
    await fetch(`/api/events/${id}`, {
      method: 'DELETE',
    }).catch(err => console.error(err))
  }

  onMount(() => {
    getEventsTest()
  })

  return (
    <>
      <Header user={user} />
      <For each={eventItems()}>
        {(event) =>  
        <li>
          {event.description}
          <button onClick={() => deleteEvent(event.id)}>delete</button>
        </li>}
      </For>
      {/* <Calendar 
        setPopupIsVisible={setPopupIsVisible}
        setSelectedDate={setSelectedDate}
        eventItems={eventItems}
      /> */}
    </>
  );
}
