import { items } from '@/storage';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const item = items.find((item) => item.id === params.id);
  if (!item) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  return Response.json(item);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const index = items.findIndex((item) => item.id === params.id);
  if (index < 0) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  const body = await request.json();
  items[index] = { ...items[index], ...body };
  return Response.json(items[index]);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = items.findIndex((item) => item.id === params.id);
  if (index < 0) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }
  items.splice(index, 1);
  return Response.json({ success: true });
}
