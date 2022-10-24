import { useEffect, useState, useRef } from 'react';

export function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return { value, onChange };
}

export async function useUserName() {
  let userName = '';

  let getUserName = new Promise((resolve, reject) => {
    let userN = localStorage.getItem('username');
    resolve(userN);
  });

  if (typeof window !== 'undefined') {
    userName = await getUserName;
  }

  return { userName };
}

export function useFirstRender() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}
