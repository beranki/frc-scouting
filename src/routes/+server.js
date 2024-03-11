import { error } from '@sveltejs/kit';
import { validate } from '$lib/config.js';
import { MongoClient, MongoErrorLabel } from 'mongodb';
import { MONGODB_URI } from "$env/static/private";


export function POST({ request }) {
  
  const forum = request.json();

  /*const { ok, msg } = validate(forum);

  console.log(forum);

  if (!ok) {
    error(400, 'forum invalid: ' + msg);
  } */

  MongoClient.connect(MONGODB_URI, function(err, client) {
    if (err) throw err;

    console.log('Connected');

    var db = client.db("scouting-data");

    db.collection("scouting-data").insertOne(obj, function(err, res) {
      if (err) throw err;
      console.log("1 message inserted");
      client.close();
    });

  });

  // Defaults to 200
  return new Response('passed!');
}

