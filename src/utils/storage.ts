import { kv } from "@vercel/kv";
import { getUserId } from "./authentication";

export type Item = {
  id: string;
  date: string;
  text: string;
}

export const getItems = async (request: Request): Promise<Item[]> => {
  const userId = await getUserId(request);
  const items = await kv.get<Item[]>(`items:${userId}`);

  return items ?? [];
}

export const setItems = async (request: Request, items: Item[]): Promise<void> => {
  const userId = await getUserId(request);
  await kv.set(`items:${userId}`, items);
}

export const getItem = async (request: Request, id: string): Promise<Item | undefined> => {
  const items = await getItems(request);
  return items.find(item => item.id === id);
}
