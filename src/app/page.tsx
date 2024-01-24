import { getLogtoContext } from '@/utils/logto';
import SignIn from './sign-in';
import Agenda from './agenda';
import { getItemsByUserId } from '@/utils/storage';

export default async function Home() {
  const { isAuthenticated, claims } = await getLogtoContext();
  const initialData = isAuthenticated && claims ? await getItemsByUserId(claims.sub) : undefined;

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div>{!isAuthenticated && <SignIn />}</div>
      {isAuthenticated && <Agenda initialData={initialData} />}
    </main>
  );
}
