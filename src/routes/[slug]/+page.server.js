import { error } from '@sveltejs/kit';
import db from '$lib/db.js';
import { eventCode } from '$lib/config.js';
import { TBA_API_KEY } from "$env/static/private";

const coll = db.collection("data");

export async function load({ fetch, params }) {

  const team = Number(params.slug);
  const teams = await fetch(`https://www.thebluealliance.com/api/v3/event/${eventCode}/teams/simple`, {
    method: "GET",
    headers: {"X-TBA-Auth-Key": TBA_API_KEY},
  })
    .then(res => res.json());

  // If not in comp
  if (!teams
    .map(i => i.team_number)
    .includes(team)) {
    error(400, `team ${team} not in comp ${eventCode}`)
  }

  // Get all submitted "entries" of a team
  const entries = await coll
    .find({ team })
    .toArray();

  // UI sections
  let sections = {
    "Auto": [],
    "TeleOp": [],
    "Endgame": [],
    "Ratings": [],
    "Status": [],
    "Comments": []
  }

  // for each entry, put stats to their corresponding section array.
  for (const { data } of entries) {
    let status;

    if (data.Parked) {
      status = "Parked";
    } else if (data.Onstage) {
      status = "Onstage";
    } else if (data.Harmony) {
      status = "Harmony";
    } else if (data.Trap) {
      status = "Trap";
    } else {
      status = "DNA";
    }
  

    sections.Auto.push({
      "Leave": data.leave,
      "Auto-amps": data['a-amp'],
      "Auto-speakers": data['a-speaker'],
    });

    sections.TeleOp.push({
      "Amps": data.amp,
      "Speakers": data.speaker,
      "Ground": data.ground,
      "Source": data.source,
    });

    sections.Endgame.push({
      "Status": status
    });

    sections.Ratings.push({
      "Driver": data.driver,
      "Def": data.def,
      "Speed": data.speed,
    });

    sections.Status.push({
      "Died": data.died,
      "Incapacitated": data.incapacitated,
      "Drops Notes": data.butterfingers
    });

    sections.Comments.push({ comments: data.comments ? data.comments : 'n/a' });
  }

  return { team, sections };
}
