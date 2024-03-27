import fs from 'node:fs/promises';
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import { emptyForum, orderedFields } from "./src/lib/config.js";
dotenv.config()

// Cannot import DB because db.js loads the env variable via a VITE feature
const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()

const db = client.db('scouting-data') // select database
const coll = db.collection('data');


const fields = orderedFields();
// remove comment, we're not compiling that.
fields.splice(fields.indexOf("comment"), 1);

// TODO: Map validation. Make sure every attribute is accounted for, etc.

// find teams
const teams = {};
for (const team of await coll.distinct('team')) 
  teams[team] = emptyForum().data;


console.log('Recorded Teams: ', Object.keys(teams));

// aggregate average
for (const [team, stats] of Object.entries(teams)) {

  const games = coll.find({ team: Number(team) });
  let gameCnt = 0;

  // Take sum
  for await (const game of games) {
    gameCnt ++;

    for (const name of fields) {

      // ignore comments
      if (name == 'comment') continue;
      if (game.data[name] == undefined) 
        console.error(`could not read property of ${name} from game.data somehow?`);

      stats[name] += game.data[name];
    }
  }

  if (gameCnt == 0) 
    console.error(`no games found for team ${team} somehow?`);

  // Take average
  for (const k in stats) 
    stats[k] /= gameCnt;

  console.log(`${team}:`, stats);
}

// export
let file = '';

// Top row
file += 'team,';
for (const name of fields) 
  file += name + ',';
file += '\n';

// For each team, create row.
for (const [team, stats] of Object.entries(teams)) {
  file += team + ',';
  for (const name of fields) {
    file += stats[name].toFixed(2) + ',';
  }
  file += '\n';
}


console.log('writing to file..');
try {
  await fs.writeFile('./export.csv', file);
  console.log('writing done');
} catch (err) {
  console.log('writing failed', err);
}

console.log('exiting..');
process.exit();
