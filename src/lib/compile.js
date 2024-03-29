import db from '$lib/db.js';
import { orderedFields, emptyForum } from '$lib/config.js';

const cache = db.collection("cache");
const coll = db.collection("data");

const recompile = async () => {

  // remove comment, we're not compiling that.
  const fields = orderedFields();
  fields.splice(fields.indexOf("comment"), 1);

  // find teams
  const teams = {};
  for (const team of await coll.distinct('team')) 
    teams[team] = emptyForum().data;

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
          error(500, `could not read property of ${name} from game.data somehow?`);

        stats[name] += game.data[name];
      }
    }

    if (gameCnt == 0) 
      error(500, `no games found for team ${team} somehow?`);

    // Take average
    for (const k in stats) 
      stats[k] /= gameCnt;
  }

  // Ten minutes
  teams.expiry = Date.now() + 1000 * 60 * 10;

  return teams;
}

export const getCompiled = async () => {
  let teams = await cache.findOne();

  if (teams !== null && teams.expiry < Date.now()) { 
    console.log(`cache expiry ${teams.expiry} expired, recompiling`);

    teams = await recompile();

    const res = await cache.replaceOne({}, teams);
    if (res.modifiedCount !== 1) {
      console.error('could not override cache: ', res);
    }
  }

  else if (teams === null) {
    console.log('cache empty, recompiling');

    teams = await recompile();

    const res = await cache.insertOne(teams);
    if (res.modifiedCount !== 1) {
      console.error('could not insert cache: ', res);
    }
  }

  else {
    console.log('cache is good');
  }

  delete teams.expiry;
  delete teams._id;

  return teams;
}
