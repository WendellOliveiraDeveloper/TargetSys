import AsyncStorage from "@react-native-async-storage/async-storage";
import { Target } from "@/interface/Target";

const STORAGE_KEY = "@adicionar:transacoes";

async function get(): Promise<Target[]> {
  try {
    const storage = await AsyncStorage.getItem(STORAGE_KEY);

    if (!storage) return [];

    return JSON.parse(storage);
  } catch (error) {
    throw new Error("TARGET_GET: " + error);
  }
}

const save = async (target: Target[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(target));
  } catch (error) {
    throw new Error("TARGET_SAVE: " + error);
  }
};

const add = async (newTarget: Target): Promise<Target[]> => {
  const items = await get();
  const updatedItems = [...items, newTarget];
  await save(updatedItems);

  return updatedItems;
};

const update = async (updateTarget: Target): Promise<Target[]> => {
  if (!updateTarget.id) throw new Error("TARGET_ERROR: ID não fornecido!");

  const items = await get();

  const updatedItems = items.map((target) =>
    target.id === updateTarget.id ? updateTarget : target,
  );

  await save(updatedItems);

  return updatedItems;
};

const remove = async (item: Target): Promise<Target[]> => {
  if (!item.id) throw new Error("TARGET_ERROR!");

  const items = await get();

  const updatedItems = items.filter((target) => target.id !== item.id);

  await save(updatedItems);

  return updatedItems;
};

async function removeAll(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export const targetStorage = {
  get,
  save,
  add,
  update,
  remove,
  removeAll,
};
