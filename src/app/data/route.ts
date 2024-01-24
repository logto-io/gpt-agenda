import { getLogtoContext } from "@/utils/logto";
import { getItemsByUserId } from "@/utils/storage";

export async function GET() {
  const { isAuthenticated, claims } = await getLogtoContext();

  if (!isAuthenticated || !claims) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return Response.json(await getItemsByUserId(claims.sub));
}
