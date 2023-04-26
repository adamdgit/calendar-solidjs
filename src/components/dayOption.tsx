import { createSignal, onMount } from "solid-js";
import styles from "./styles.module.css"

type calendarEventProps = {
  id: string;
  date: string;
  description: string;
  author: string
}

type dayOptionProps = {
  day: Date,
  monthSelect: any,
  setPopupIsVisible: (args: boolean) => void,
  setSelectedDate: (args: string) => void,
  eventItems: () => calendarEventProps[]
}

export default function DayOption(props: dayOptionProps) {

  // number of events for this day 
  const [numEvents, setNumEvents] = createSignal<number>()

  function handlePopup(e: any) {
    props.setPopupIsVisible(true);
    props.setSelectedDate(e.target.value)
  }

  onMount(() => {
    let count = 0
    props.eventItems().map(item => {
      if (new Date(item.date).toLocaleString('en-au') === new Date(props.day).toLocaleString('en-au')) {
        count += 1
      }
    })
    setNumEvents(0)
  })

  return (
    <div style={{position: 'relative'}}>
      <div 
        class={styles.eventNumber} 
        style={numEvents() === 0 ? {} : {display: 'flex'}}>
        {numEvents() === 0 ? null : numEvents()}
      </div>
      <button
        onClick={(e) => handlePopup(e)}
        class={
          props.day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) === new Date().toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' }) ? `${styles.date} ${styles.today}`
        : props.day.getMonth() === Number(props.monthSelect.value) ? styles.date
        : `${styles.date} ${styles.notCurrentMonth}`
        } 
        value={props.day.toLocaleString('en-us', { day: '2-digit', month: '2-digit', year: 'numeric' })}>
        {props.day.toLocaleString('en-us', { day: 'numeric' })}
      </button>
    </div>
  )
}
