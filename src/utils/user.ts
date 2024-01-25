export class AuthenticationError extends Error {
  constructor(message = 'Unauthorized') {
    super(message);
  }
}

export async function getUserId(request: Request) {
  const token = request.headers.get('authorization');

  if (!token) {
    throw new AuthenticationError();
  }

  if (!token.startsWith('Bearer ')) {
    throw new AuthenticationError('Not a bearer token');
  }

  console.log('Bearer token', token);
  const res = await fetch(new URL('oidc/me', process.env.LOGTO_ENDPOINT), {
    headers: {
      authorization: token,
    },
  });

  if (!res.ok) {
    throw new AuthenticationError();
  }

  const body = await res.json();
  console.log('User info', body);

  return String(body.sub);
}
