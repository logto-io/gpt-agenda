import { redirect } from 'next/navigation';
import { handleSignIn } from '../../utils/logto';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  await handleSignIn(searchParams);

  redirect('/');
}
