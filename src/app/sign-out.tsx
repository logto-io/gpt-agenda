'use client';

import { useRouter } from 'next/navigation';
import { signOut } from '../utils/logto';

const SignOut = () => {
  const router = useRouter();

  const handleClick = async () => {
    const redirectUrl = await signOut();

    router.push(redirectUrl);
  };

  return (
    <button
      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-semibold py-1 px-3 rounded"
      onClick={handleClick}
    >
      Sign out
    </button>
  );
};

export default SignOut;
