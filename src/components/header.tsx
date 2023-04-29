import { createServerAction$ } from "solid-start/server";
import { logout } from "~/db/session";
import styles from "./styles.module.css"

export default function Header({ user }:any) {

  const [, { Form }] = createServerAction$((f: FormData, { request }) =>
    logout(request)
  );

  console.log(user())

  return (
    <header class={styles.header}>
      <h1>Calendar organiser</h1>
      <Form>
        <p>Hello {user()?.username}</p>
        <button name="logout" type="submit" class={styles.signin}>
          Logout
        </button>
      </Form>
    </header>
  )
}