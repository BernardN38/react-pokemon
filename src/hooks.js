import { useState, useEffect } from "react";
import axios from "axios";

function useFlip(initialFlipState = true) {
  const [isFlipUp, setFlipped] = useState(initialFlipState);

  const flipCard = () => {
    setFlipped(isUp => !isUp);
  };

  return [isFlipUp, flipCard];
}

function useAxios(key, baseUrl) {
  const [responses, setResponses] = useLocalStorage(key);

  const addResponseData = async (formatter = data => data, path = "") => {
    const response = await axios.get(`${baseUrl}${path}`);
    setResponses(data => [...data, formatter(response.data)]);
  };

  const clearResponses = () => setResponses([]);

  return [responses, addResponseData, clearResponses];
}

function useLocalStorage(key, init = []) {
  if (localStorage.getItem(key)) {
    init = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(init);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage };

