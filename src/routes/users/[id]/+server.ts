import { error, json } from "@sveltejs/kit";
import type { RequestEvent, RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  return new Response();
};

const administrator = "peyton";
export const POST: RequestHandler = async (e: RequestEvent) => {
  let user = e.params.id;
  if (user != administrator) {
    throw error(401, `Unauthorized user ${user}`);
  }
  return json({ message: "Created" });
};

export const DELETE: RequestHandler = async () => {
  return json({ message: "Deleted" });
};
