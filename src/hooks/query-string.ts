"use client";
import { useCallback } from "react";

export function useQueryString(initSearchParams?: URLSearchParams) {
  return useCallback(
    (name: string, value: string | null) => {
      const searchParams = new URLSearchParams(initSearchParams?.toString());
      if (value === null) {
        searchParams.delete(name);
      } else {
        searchParams.set(name, value);
      }
      return searchParams.toString();
    },
    [initSearchParams],
  );
}
