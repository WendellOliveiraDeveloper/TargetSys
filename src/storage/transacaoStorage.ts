import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transacao } from "@/interface/Transacao";

const STORAGE_KEY = "@adicionar:transacoes";

async function get(): Promise<Transacao[]> {
  try {
    const storage = await AsyncStorage.getItem(STORAGE_KEY);

    if (!storage) return [];

    return JSON.parse(storage);
  } catch (error) {
    throw new Error("TRANSACAO_GET: " + error);
  }
}

const getLogsByTargetId = async (targetId: number): Promise<Transacao[]> => {
  try {
    const items = await get();

    return items.filter((transacao) => transacao.idTarget === targetId);
  } catch (error) {
    throw new Error("TRANSACAO_GET_LOGS_BY_TARGET: " + error);
  }
};

const save = async (Transacao: Transacao[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(Transacao));
  } catch (error) {
    throw new Error("Transacao_SAVE: " + error);
  }
};

const add = async (newTransacao: Transacao): Promise<Transacao[]> => {
  const items = await get();
  const updatedItems = [...items, newTransacao];
  await save(updatedItems);

  return updatedItems;
};

const update = async (updateTransacao: Transacao): Promise<Transacao[]> => {
  if (!updateTransacao.id)
    throw new Error("Transacao_ERROR: ID não fornecido!");

  const items = await get();

  const updatedItems = items.map((Transacao) =>
    Transacao.id === updateTransacao.id ? updateTransacao : Transacao,
  );

  await save(updatedItems);

  return updatedItems;
};

const remove = async (item: Transacao): Promise<Transacao[]> => {
  if (!item.id) throw new Error("Transacao_ERROR!");

  const items = await get();

  const updatedItems = items.filter((Transacao) => Transacao.id !== item.id);

  await save(updatedItems);

  return updatedItems;
};

export const TransacaoStorage = {
  get,
  getLogsByTargetId,
  save,
  add,
  update,
  remove,
};
