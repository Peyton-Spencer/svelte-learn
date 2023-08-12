import type { PageServerLoad, Actions } from "./$types";

export const load = (async ({ cookies }) => {
  const boatName = cookies.get("boatName");
  return {
    boatName,
  };
}) satisfies PageServerLoad;

export const actions = {
  rename: async ({ request, cookies }) => {
    const formData = await request.formData();
    const boatName = formData.get("boatName");
    if (!boatName) return;
    cookies.set("boatName", boatName as string);
  },
  capitalize: async ({ cookies }) => {
    const boatName = cookies.get("boatName");
    if (!boatName) return;
    cookies.set("boatName", boatName.toUpperCase());
  },
  lowercase: async ({ cookies }) => {
    const boatName = cookies.get("boatName");
    if (!boatName) return;
    cookies.set("boatName", boatName.toLowerCase());
  },
} satisfies Actions;
