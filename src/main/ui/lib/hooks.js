import { useEffect, useState, useRef } from 'react';
import { getCookie } from 'cookies-next';
import useSWR from 'swr';

const token = getCookie('jwt');
const fetcher = async (url, token) =>
  await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
    (res) => res.json()
  );

export function useUser() {
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
