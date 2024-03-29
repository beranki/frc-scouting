import { getCompiled } from "$lib/compile";

export async function load() {

  const o = await getCompiled();
  const teams = [];
  for (const [ team, stats ] of Object.entries(o))
    teams.push({ team, stats });

  return { teams };
}
