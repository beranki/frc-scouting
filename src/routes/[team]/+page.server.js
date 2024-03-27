import { error } from '@sveltejs/kit';
import db from '$lib/db.js';
import { eventCode } from '$lib/config.js';
import { TBA_API_KEY } from "$env/static/private";
import {orderedFields} from '../../lib/config';

const coll = db.collection("data");

export async function load({ fetch, params }) {

  const team = Number(params.team);
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

  // Get fields
  const fields = orderedFields();
  fields.splice(fields.indexOf("comment"), 1);

  // For each field, get all data points and averages
  const table = {};
  for (const field of fields) {
    const v = entries.map(i => i.data[field]);
    const avg = v.reduce((a, i) => a + i, 0) / entries.length;

    table[field] = { v, avg };
  }

  // get comments
  const comments = entries.map(i => i.data.comment);

  return { team, table, comments };
}
