import fs from 'node:fs/promises';
import { validate } from './src/lib/config.js';

console.log("reading from './svr.csv' and uploading...");
console.log("make sure to have development server running so the upload path is available");

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
      "Leave_Starting_Zone": row[3] == 1,
      "Auto_Amp_Scores": row[4],
      "Auto_Speaker_Scores": row[5],
      "TeleOp_Amp_Scores": row[6],
      "TeleOp_Speaker_Scores": row[7],
      "Ground_Pickup": row[8] == 'f' || row[8] == 'b',
      "Source_Pickup": row[8] == 's' || row[8] == 'b',
      "Parked": row[10] == 'p',
      "Onstage": row[10] == 'o',
      "Harmony": row[10] == 'h',
      "Trap": row[11] == 1,
      "Driver_Skill": 1, // ?? can't tell what their coding is
      "Defense_Rating": (row[13] == 'e' ? 4 : row[13] == 'g' ? 3 : row[13] == 'a' ? 2 : 1),
      "Speed_Rating": row[14],
      "Died": row[15] == 1,
      "Incapacitated": false,
      "Butter_Fingers": row[17] == 1,
      "comments": "",
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
