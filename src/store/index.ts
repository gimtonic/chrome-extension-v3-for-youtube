import localforage from "localforage";

export const setItem = async (key: string, value: any) => {
  try {
    await localforage.setItem(key, value);
  } catch (err) {
    console.log(err);
  }
};

export const getItem = async (key: string) => {
  try {
    return await localforage.getItem(key);
  } catch (err) {
    console.log(err);
  }
};
