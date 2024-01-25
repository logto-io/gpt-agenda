import { handleErrors } from '@/utils/route';
import { getItem, getItems, setItems } from '@/utils/storage';

export const GET = handleErrors(async (request: Request, { params }: { params: { id: string } }) => {
  const item = getItem(request, params.id);
  if (!item) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(item);
});

export const PATCH = handleErrors(async (request: Request, { params }: { params: { id: string } }) => {
  const items = await getItems(request);
  const index = items.findIndex((item) => item.id === params.id);

  if (index < 0) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json();
  items[index] = { ...items[index], ...body };

  await setItems(request, items);

  return Response.json(items[index]);
});

export const DELETE = handleErrors(async (request: Request, { params }: { params: { id: string } }) => {
  const items = await getItems(request);
  const index = items.findIndex((item) => item.id === params.id);

  if (index < 0) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  items.splice(index, 1);
  await setItems(request, items);

  return Response.json({ success: true });
});
