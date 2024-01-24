import { getItems, setItems } from '@/utils/storage';
import { nanoid } from 'nanoid';

export async function GET(request: Request) {
  return Response.json(await getItems(request));
}

export async function POST(request: Request) {
  const items = await getItems(request);
  const body = await request.json();
  const item = { ...body, id: nanoid() };
  
  items.push(item);
  await setItems(request, items);

  return Response.json(item);
}
