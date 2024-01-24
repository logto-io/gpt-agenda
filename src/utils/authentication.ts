export async function getUserId(request: Request) {
  const token = request.headers.get('authorization');

  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!token.startsWith('Bearer ')) {
    return Response.json({ error: 'Not a bearer token' }, { status: 401 });
  }

  console.log('Bearer token', token);
  const res = await fetch(new URL('oidc/me', process.env.LOGTO_ENDPOINT), {
    headers: {
      authorization: token,
    },
  });

  if (!res.ok) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await res.json();
  console.log('User info', body);

  return String(body.sub);
}
