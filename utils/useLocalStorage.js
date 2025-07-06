import { useEffect, useState } from 'react';

function useLocalStorage(key, initialValue) {

    
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });


  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log("error LS");
    }
  }, [storedValue]);

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.log("error LS");
    }
  };

  const updateObjectInArray = (id, newObject) => {
    try {
      const index = storedValue.findIndex((obj) => obj.id === id);

      if (index === -1) {
        setValue([...storedValue, newObject]);
      } else {
        const newArray = [...storedValue];
        newArray[index] = newObject;
        setValue(newArray);
      }
    } catch (error) {
      console.log("error LS");
    }
  };

  return [storedValue, setValue, updateObjectInArray];
}

export default useLocalStorage;