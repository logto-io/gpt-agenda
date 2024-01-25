import { getLogtoContext } from '@/utils/logto';
import SignIn from './sign-in';
import Agenda from './agenda';
import { getItemsByUserId } from '@/utils/storage';
import SignOut from './sign-out';

export default async function Home() {
  const { isAuthenticated, claims } = await getLogtoContext();
  const initialData = isAuthenticated && claims ? await getItemsByUserId(claims.sub) : undefined;

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      {isAuthenticated && <Agenda initialData={initialData} />}
      {!isAuthenticated && (
        <>
          <h1 className="text-xl font-bold">GPT Agenda</h1>
          <p className="text-gray-400 text-sm mt-2 mb-4">
            This is a demo app that shows the agenda of the user. Check out the{' '}
            <a className="text-blue-600 hover:underline" href="https://blog.logto.io/gpt-action-oauth/" target="_blank" rel="noopener">
              blog post
            </a>{' '}
            for more information.
          </p>
        </>
      )}
      <div className="mt-2">{isAuthenticated ? <SignOut /> : <SignIn />}</div>
    </main>
  );
}
