// libraries/logto.js
'use server';

import { cookies } from 'next/headers';
import LogtoClient from '@logto/next/server-actions';
import { config } from './config';

const logtoClient = new LogtoClient(config);

const cookieName = `logto:${config.appId}`;

const setCookies = (value?: string) => {
  if (value === undefined) {
    return;
  }

  cookies().set(cookieName, value, {
    maxAge: 14 * 3600 * 24,
    secure: config.cookieSecure,
  });
};

const getCookie = () => {
  return cookies().get(cookieName)?.value ?? '';
};

export const signIn = async () => {
  const { url, newCookie } = await logtoClient.handleSignIn(
    getCookie(),
    new URL('/callback', config.baseUrl).href
  );

  setCookies(newCookie);

  return url;
};

export const handleSignIn = async (searchParams: Record<string, string>) => {
  const url = new URL('/callback', config.baseUrl);
  url.search = new URLSearchParams(searchParams).toString();

  const newCookie = await logtoClient.handleSignInCallback(
    getCookie(),
    url.href
  );

  setCookies(newCookie);
};

export const getLogtoContext = async () => {
  return await logtoClient.getLogtoContext(getCookie(), { getAccessToken: true });
};

export const signOut = async () => {
  const url = await logtoClient.handleSignOut(getCookie());

  setCookies('');

  return url;
};
