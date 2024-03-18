import fs from 'node:fs/promises';
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
dotenv.config()

// Cannot import DB because db.js loads the env variable via a VITE feature
const client = new MongoClient(process.env.MONGODB_URI)
await client.connect()

const db = client.db('scouting-data') // select database
const coll = db.collection('data');


// Correlates the table name (what is to be displayed on the table) to the display name
// (what is displayed on the forum and stored as in the database).
// Also defines the order in which the data columns will be in.
const nameMap = [
  ['a-amp', 'Auto_Amp_Scores'],
  ['a-speaker', 'Auto_Speaker_Scores'],
  ['leave%', 'Leave_Starting_Zone'],

  ['amp', 'TeleOp_Amp_Scores'],
  ['speaker', 'TeleOp_Speaker_Scores'],

  ['park%', 'Parked'],
  ['onstage%', 'Onstage'],
  ['harmony%', 'Harmony'],
  ['trap%', 'Trap'],

  ['skill', 'Driver_Skill'],
  ['speed', 'Speed_Rating'],
  ['def', 'Defense_Rating'],

  ['died%', 'Died'],
  ['incap%', 'Incapacitated'],
  ['droppy%', 'Butter_Fingers'],
];

const emptyStats = () => {
  const o = {};
  for (const [name, _] of nameMap) o[name] = 0;

  return o;
}

// TODO: Map validation. Make sure every attribute is accounted for, etc.

// find teams
const teams = {};
for (const team of await coll.distinct('team')) 
  teams[team] = emptyStats();


console.log('Recorded Teams: ', Object.keys(teams));

// aggregate average
for (const [team, stats] of Object.entries(teams)) {

  const games = coll.find({ team: Number(team) });
  let gameCnt = 0;

  // Take sum
  for await (const game of games) {
    gameCnt ++;

    for (const [name, dbName] of nameMap) {
      if (game.data[dbName] == undefined) 
        console.error(`could not read property of ${dbName} from game.data somehow? Check nameMap.`);

      stats[name] += game.data[dbName];
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
for (const [name, _] of nameMap) 
  file += name + ',';
file += '\n';

// For each team, create row.
for (const [team, stats] of Object.entries(teams)) {
  file += team + ',';
  for (const [name, _] of nameMap) {
    file += stats[name] + ',';
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
