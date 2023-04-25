import { useRouteData } from "solid-start";
import { useUser } from "../db/useUser";
import Header from "~/components/header";
import Calendar from "~/components/calendar";
import { createSignal, onMount } from "solid-js";
import Events from "~/components/events";
import styles from "../components/styles.module.css"

export function routeData() {
  return useUser();
}

type calendarEventProps = {
  id: string;
  date: string;
  description: string;
  author: string
}

export default function Home() {
  const user = useRouteData<typeof routeData>();

  const [selectedDate, setSelectedDate] = createSignal("");
  const [popupIsVisible, setPopupIsVisible] = createSignal(false);
  const [eventItems, setEventItems] = createSignal<calendarEventProps[]>([])
  const [updateMsg, setUpdateMsg] = createSignal("")
  const [needsUpdate, setNeedsUpdate] = createSignal(false)

  async function getUsersEvents() {
    await fetch("/api/events", {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => setEventItems(data))
  }

  onMount(() => {
    getUsersEvents()
  })

  return (
    <>
      <Header user={user} />

      <main class={styles.app}>
        <Events eventItems={eventItems}/>
            
        <Calendar 
          setPopupIsVisible={setPopupIsVisible}
          setSelectedDate={setSelectedDate}
          eventItems={eventItems()}
        />
      </main>
    </>
  );
}
