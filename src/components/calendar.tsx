import { createSignal, onMount } from "solid-js"
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
  authorEmail: string;
}

type calendarProps = {
  setPopupIsVisible: (args: boolean) => void,
  setSelectedDate: (args: string) => void,
  eventItems: calendarEventProps[]
}

export default function Calendar({ setPopupIsVisible, setSelectedDate, eventItems }: calendarProps) {

  let yearSelect: HTMLSelectElement | undefined;
  let monthSelect: HTMLSelectElement | undefined;
  const [calendarData, setCalendarData] = createSignal<Date[]>([])

  onMount(() => {
    // set current month 
    setCalendarData(calcCalendarDays(monthSelect!.innerText, yearSelect!.innerText));
  })

  return (
    <div class={styles.datepickerContainer} id="datepicker-container">
      <div class={styles.datepickerCalendar}>
        <div class={styles.datepickerHeader}>

          <div class={styles.datepickerDates}>
            <span class={styles.pickYear}>Year: 
              <select ref={yearSelect} onChange={() => setCalendarData(calcCalendarDays(monthSelect!.innerText, yearSelect!.innerText))}>
                {
                  yearData.map(year => (
                    <option 
                      value={year.toString()}>
                      {year.toString()}
                    </option>
                  ))
                }
              </select>
            </span>
            <span class={styles.pickMonth}>Month: 
              <select 
                ref={monthSelect}
                value={new Date().getMonth()}
                onChange={() => setCalendarData(calcCalendarDays(monthSelect!.innerText, yearSelect!.innerText))}>
                {
                  monthData.map((month, i) => (
                    <option
                      value={i}>
                      {month}
                    </option>
                  ))
                }
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
          <div class={styles.monthWrap} data-month={monthSelect?.innerText} data-year={yearSelect?.innerText} >
          {
            calendarData.map((day, i) => (
              <DayOption 
                monthSelect={monthSelect}
                setPopupIsVisible={setPopupIsVisible}
                setSelectedDate={setSelectedDate}
                day={day}
                eventItems={eventItems}
              />
            ))
          }
          </div>
        </div>
      </div>
    </div>
  )
}
