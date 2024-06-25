import { ladeDaten } from "@/data";

export default async function Monitoring() {
  const data = await ladeDaten();

  return <div>Monitoring</div>;
}
