import { error } from '@sveltejs/kit';
import { validate } from '$lib/config.js';
import { MongoClient } from 'mongodb';
import { MONGODB_URI } from "$env/static/private";

export async function POST({ request }) {
  
  const forum = await request.json();

  const { ok, msg } = validate(forum);

  console.log(forum);

  if (!ok) {
    error(400, 'forum invalid: ' + msg);
  }

  MongoClient.connect(MONGODB_URI, async function(err, client) {
    if (err) throw err;

    console.log('Connected');

    var db = client.db("scouting-data");
    var coll = db.collection("scouting-data");

    const result = await coll.insertOne(forum);
    console.log("REASULT", result);
  });

  // Defaults to 200
  return new Response('passed!');
}

