// app/sign-in.tsx
'use client';

import { useRouter } from 'next/navigation';
import { signIn } from '../utils/logto';

const SignIn = () => {
  const router = useRouter();

  const handleClick = async () => {
    const redirectUrl = await signIn();

    router.push(redirectUrl);
  };

  return <button onClick={handleClick}>Sign in</button>;
};

export default SignIn;
