import { TBA_API_KEY } from "$env/static/private";
import { eventCode } from "$lib/config.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch, params }) {
    const matches = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventCode}/matches/simple`,{
        method: "GET",
        headers: {"X-TBA-Auth-Key": TBA_API_KEY},
    }).then((res) => {return res.json()});
    
    const teams = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventCode}/teams/simple`,{
        method: "GET",
        headers: {"X-TBA-Auth-Key": TBA_API_KEY},
    }).then((res) => {return res.json()});

    

    return { matches, teams };
}