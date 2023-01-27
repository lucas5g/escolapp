import useSWR from "swr";
import { api } from "./axios";

export function useFetch(url: string) {

  const { data, error } = useSWR(url, async () => {

    const { data } = await api.get(url )
      return data
  })
  return { data, error }
}