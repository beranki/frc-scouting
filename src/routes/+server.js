import { error } from '@sveltejs/kit';
import { validate } from '$lib/config.js';
import db from '$lib/db.js';

const coll = db.collection("data");


export async function POST({ request }) {
  
  const forum = await request.json();

  const { ok, msg } = validate(forum);

  if (!ok) {
    error(400, 'forum invalid: ' + msg);
  }

  const result = await coll.insertOne(forum);

  // Defaults to 200
  return new Response('passed!');
}
