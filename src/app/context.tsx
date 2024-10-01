"use client";

import { Data } from "@/data";
import { createContext, useContext } from "react";

export const DataContext = createContext<Promise<Data> | null>(null);

export function DataProvider({
  children,
  dataPromise,
}: {
  children: React.ReactNode;
  dataPromise: Promise<any>;
}) {
  return (
    <DataContext.Provider value={dataPromise}>{children}</DataContext.Provider>
  );
}

export function useDataContext() {
  let context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
