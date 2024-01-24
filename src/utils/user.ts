export async function getUserId(request: Request) {
  const token = request.headers.get('authorization');

  if (!token) {
    throw new Error('Unauthorized');
  }

  if (!token.startsWith('Bearer ')) {
    throw new Error('Not a bearer token');
  }

  console.log('Bearer token', token);
  const res = await fetch(new URL('oidc/me', process.env.LOGTO_ENDPOINT), {
    headers: {
      authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  const body = await res.json();
  console.log('User info', body);

  return String(body.sub);
}
