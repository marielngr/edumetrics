import { ladeDaten } from "@/data";

import MonitoringTable from "@/components/MonitoringTable/MonitoringTable";
import { DataProvider } from "../context";

export default function MonitoringPage() {
  const dataPromise = ladeDaten();

  return (
    <DataProvider dataPromise={dataPromise}>
      <MonitoringTable />
    </DataProvider>
  );
}
