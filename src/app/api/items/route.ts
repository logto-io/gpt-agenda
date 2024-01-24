import { items } from '@/storage';
import { nanoid } from 'nanoid';

export async function GET() {
  return Response.json(items);
}

export async function POST(request: Request) {
  const body = await request.json();
  const item = { ...body, id: nanoid() };
  items.push(item);
  return Response.json(item);
}
