import fs from 'node:fs/promises';
import { validate } from './src/lib/config.js';

console.log("reading from './svr.csv' and uploading...");
console.log("NOTE: make sure to have development server running so the upload path is available");
console.log("NOTE: This script does not empty the DB. Make sure the db is cleared before populating.");

const text = await fs.readFile('./svr.csv', { encoding: 'utf8' });
const lines = text.trim().split('\n');

let counter = 0;

for (const line of lines) {
  const row = line.trim().split(',').map(x => isNaN(Number(x)) ? x : Number(x));

  const forum = {
    scout: row[0],
    team: row[2],
    teamName: "",

    data: {
      "leave": row[3] == 1,
      "a-amp": row[4],
      "a-speaker": row[5],
      "amp": row[6],
      "speaker": row[7],
      "ground": row[8] == 'f' || row[8] == 'b',
      "source": row[8] == 's' || row[8] == 'b',
      "under": false,
      "park": row[10] == 'p',
      "onstage": row[10] == 'o',
      "harmony": row[10] == 'h',
      "trap": row[11] == 1,
      "driver": 1, // ?? can't tell what their coding is
      "def": (row[13] == 'e' ? 4 : row[13] == 'g' ? 3 : row[13] == 'a' ? 2 : 1),
      "speed": row[14],
      "died": row[15] == 1,
      "incapacitated": false,
      "butterfingers": row[17] == 1,
      "comment": "",
    }
  };

  const { ok, msg } = validate(forum);
  if (!ok) {
    console.log(line);
    console.log(row);
    console.log(forum);
    console.error(msg);
    break;
  }

  const res = await fetch('http://localhost:5173/', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(forum)
  });

  if (res.status !== 200) {
    const msg = await res.text();
    console.error(`upload failed: ${res.status}`);
    console.error("msg: ", msg);
    
    break;
  }

  console.log(`uploaded for ${forum.team}`);
  counter ++;
}

console.log(`uploaded ${counter} forums`);
