import { handleErrors } from '@/utils/route';
import { getItems, setItems } from '@/utils/storage';
import { nanoid } from 'nanoid';

export const GET = handleErrors(async (request: Request) => {
  return Response.json(await getItems(request));
});

export const POST = handleErrors(async (request: Request) => {
  const items = await getItems(request);
  const body = await request.json();
  const item = { ...body, id: nanoid() };
  
  items.push(item);
  await setItems(request, items);

  return Response.json(item);
});
