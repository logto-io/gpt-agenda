'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '../utils/logto';

const SignOut = () => {
  const router = useRouter();

  const handleClick = async () => {
    const redirectUrl = await signOut();

    router.push(redirectUrl);
  };

  return <button onClick={handleClick}>Sign out</button>;
};

export default SignOut;
