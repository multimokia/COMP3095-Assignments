import { getCookie } from 'cookies-next';

export function getDepsForRequest() {
  const token = getCookie('jwt');
  const fetcher = async (url, token) =>
    await fetch(url, { headers: { Authorization: `Bearer ${token}` } }).then(
      (res) => res.json()
    );
  return [token, fetcher];
}

export function genRandStr() {
  return Math.random().toString(36).substring(2, 6);
}
