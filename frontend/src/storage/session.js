const setKeyStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getKeyStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const removeKeyStorage = (key) => {
  localStorage.removeItem(key);
};

const clearStorage = () => {
  localStorage.clear();
};
export { setKeyStorage, getKeyStorage, removeKeyStorage, clearStorage };
