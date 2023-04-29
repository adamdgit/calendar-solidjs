import styles from "./styles.module.css"

type tooltipProps = {
  message: string,
  name: string
}

export default function Tooltip(props: any) {

  if (props.name === "remove") return (
    <div class={styles.removeTooltip}>{props.message}</div>
  )

  if (props.name === "edit") return (
    <div class={styles.editTooltip}>{props.message}</div>
  )

}
  
