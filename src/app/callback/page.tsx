// pages/callback/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { handleSignIn } from '../../utils/logto';
import { useEffect } from 'react';
import React from 'react';

type Props = {
  searchParams: Record<string, string>;
};

export default function Callback({ searchParams }: Props) {
  const router = useRouter();
  const redirectinRef = React.useRef(false);

  useEffect(() => {
    if (redirectinRef.current) {
      return;
    }
    redirectinRef.current = true;
    handleSignIn(searchParams).then(() => {
      router.push('/');
    });
  }, [router, searchParams]);

  return <div>Signing in...</div>;
}
