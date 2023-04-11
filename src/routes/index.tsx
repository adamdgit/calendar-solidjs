import { useRouteData } from "solid-start";
import { useUser } from "../db/useUser";
import Header from "~/components/header";
import Calendar from "~/components/calendar";

export function routeData() {
  return useUser();
}

export default function Home() {
  const user = useRouteData<typeof routeData>();

  async function test() {
    await fetch("/api/events")
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <>
      <Header user={user} />
      <Calendar />
    </>
  );
}
