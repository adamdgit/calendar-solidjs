import { createSignal, onMount, For, createEffect } from "solid-js"
import { calcCalendarDays } from "~/utils/calcDays"
import styles from "./styles.module.css"
import DayOption from "./dayOption"

// create dynamic dates based on current year forward
const yearData:Number[] = []
yearData.push(Number(new Date().getFullYear()))
for (let i=1; i<20; i++) {
  yearData.push(Number(yearData[0]) +i)
}  

const monthData = [
  "January", "February", "March", "April", 
  "May", "June", "July", "August", "September",
  "October", "November", "December"
]

type calendarEventProps = {
  id: string;
  date: string;
  description: string;
  author: string
}

type calendarProps = {
  setPopupIsVisible: (args: boolean) => void,
  setSelectedDate: (args: string) => void,
  eventItems: () => calendarEventProps[]
}

export default function Calendar(props: calendarProps) {

  let yearSelect: HTMLSelectElement | undefined;
  let monthSelect: HTMLSelectElement | undefined;

  const [calendarData, setCalendarData] = createSignal<Date[]>([])

  onMount(() => {
    monthSelect!.value = String(new Date().getMonth());
    setCalendarData(calcCalendarDays(monthSelect!.value, yearSelect!.value));
  })

  return (
    <aside class={styles.right}>
      <div class={styles.datepickerContainer} id="datepicker-container">
        <div class={styles.datepickerCalendar}>
          <div class={styles.datepickerHeader}>

            <div class={styles.datepickerDates}>
              <span class={styles.pickYear}>Year: 
                <select ref={yearSelect} onChange={() => setCalendarData(calcCalendarDays(monthSelect!.value, yearSelect!.value))}>
                  <For each={yearData}>
                    {(year) => 
                      <option 
                        value={year.toString()}>
                        {year.toString()}
                      </option>}
                  </For>
                </select>
              </span>
              <span class={styles.pickMonth}>Month: 
                <select 
                  ref={monthSelect}
                  onChange={() => setCalendarData(calcCalendarDays(monthSelect!.value, yearSelect!.value))}>
                  <For each={monthData}>
                    {(month, i) => 
                      <option 
                        value={i()}>
                        {month}
                      </option>}
                  </For>
                </select>
              </span>
            </div>

            <div class={styles.datepickerDaysRow}>
              <div class="day">Mon</div>
              <div class="day">Tue</div>
              <div class="day">Wed</div>
              <div class="day">Thu</div>
              <div class="day">Fri</div>
              <div class="day">Sat</div>
              <div class="day">Sun</div>
            </div>
          </div>

          <div class={styles.datepickerBody}>
            <div class={styles.monthWrap}>
              <For each={calendarData()}>
                {(day) =>  
                <DayOption 
                  monthSelect={monthSelect}
                  setPopupIsVisible={props.setPopupIsVisible}
                  setSelectedDate={props.setSelectedDate}
                  day={day}
                  eventItems={props.eventItems}
                />}
              </For>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
