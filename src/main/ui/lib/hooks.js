import useSWR from 'swr';
import { getDepsForRequest } from './functions';

export function useUser() {
  const [token, fetcher] = getDepsForRequest();
  const { data, error, mutate } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, token] : null,
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
}

export function useFetch(uri) {
  const [token, fetcher] = getDepsForRequest();
  const { data, error, mutate } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}${uri}`, token] : null,
    fetcher
  );

  return {
    data,
    error,
    mutate,
  };
}
