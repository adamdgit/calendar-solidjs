import styles from "./styles.module.css"

type popupProps = {
  setPopupIsVisible: (args: boolean) => void,
  popupIsVisible: () => boolean,
  selectedDate: () => string
}

export default function NewEventPopup(props : popupProps) {

  let description: HTMLTextAreaElement | undefined;

  async function createNewEvent(date: string, description: string) {
    await fetch(`/api/events`, {
      method: 'POST',
      body: JSON.stringify({
        date: date,
        desc: description,
      }),
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err))
  }

  return (
    <div class={styles.popup} style={props.popupIsVisible() ? {"pointer-events": "all"} : {}}>
      <button class={styles.closePopup} onClick={() => props.setPopupIsVisible(false)}>X</button>
      <p class={styles.heading}>Selected Date: {props.selectedDate()}</p>
      <textarea ref={description}></textarea>
      <button class={styles.submitBtn} onClick={() => createNewEvent(props.selectedDate(), description!.value)}>Create event</button>
    </div>
  )
}
