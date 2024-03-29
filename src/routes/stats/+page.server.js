import { getCompiled } from "$lib/compile";

export async function load() {

  const teams = await getCompiled();

  return { teams };
}
