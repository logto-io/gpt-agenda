import { AuthenticationError } from "./user";

export function handleErrors(fn: Function) {
  return async function (request: Request) {
    try {
      return await fn(request);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        return Response.json({ error: error.message }, { status: 401 });
      }

      throw error;
    }
  };
}
