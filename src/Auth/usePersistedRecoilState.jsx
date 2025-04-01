import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

function usePersistedRecoilState(atom, key) {
  const [value, setValue] = useRecoilState(atom);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(storedValue);
    }
  }, [key, setValue]);

  useEffect(() => {
    if (value !== undefined && value !== '') {
      localStorage.setItem(key, value);
    }
  }, [key, value]);

  return [value, setValue];a
}

export default usePersistedRecoilState;
