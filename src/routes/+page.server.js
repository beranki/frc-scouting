import { TBA_API_KEY } from "$env/static/private";
import { eventCode } from "$lib/config.js";

export async function load({ fetch }) {
  const matches = 
    (await fetch(`https://www.thebluealliance.com/api/v3/event/${eventCode}/matches/simple`, {
      method: "GET",
      headers: {"X-TBA-Auth-Key": TBA_API_KEY},
    })
    .then(res => res.json()))
    .sort((a, b) => { return a.match_number - b.match_number })
    .map(match  => {
      return {
        'Red 1': match.alliances.red.team_keys[0],
        'Red 2': match.alliances.red.team_keys[1],
        'Red 3': match.alliances.red.team_keys[2],
        'Blue 1': match.alliances.blue.team_keys[0],
        'Blue 2': match.alliances.blue.team_keys[1],
        'Blue 3': match.alliances.blue.team_keys[2],
      }
    });
  

  const res = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventCode}/teams/simple`, {
    method: "GET",
    headers: {"X-TBA-Auth-Key": TBA_API_KEY},
  })
    .then(res => res.json());

  const teams = {};
  for (const team of res) {
    teams[team.key] = team.nickname;
  }

  console.log( matches );
  console.log( teams );

  return { matches, teams };
}
