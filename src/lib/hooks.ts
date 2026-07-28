"use client";

import { useEffect, useState } from "react";
import { loadDB } from "./store";

export function useDB() {
  const [db, setDb] = useState(() => loadDB());

  useEffect(() => {
    const handler = () => setDb(loadDB());
    window.addEventListener("bliscy-db-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("bliscy-db-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return db;
}

export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pl-PL", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pl-PL", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });
}

export function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" });
}

