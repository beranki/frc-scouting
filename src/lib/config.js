/* Defines the name of a field and the type, as well as any other configurations relevant
 * A 'divider' type will create a divider in that order. It will not affect the forum
 */
export const fields = [
  { 
    name: "Auto",
    type: "divider" 
  },
  {
    name: "Leave_Starting_Zone",
    type: "bool",
    toggle_tag: "success"
  },
  { 
    name: "Auto_Amp_Scores",
    type: "number",
    min: 0,
    max: 6,
  },
  { 
    name: "Auto_Speaker_Scores",
    type: "number",
    min: 0,
    max: 6,
  },
  { 
    name: "TeleOp",
    type: "divider" 
  },
  {
    name: "TeleOp_Amp_Scores",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    name: "TeleOp_Speaker_Scores",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    name: "Times_Amplified",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    name: "Pickup_From",
    type: "select",
    select_options: ["Source", "Floor", "Both", "Not Attempted"]
  },
  { 
    name: "Endgame",
    type: "divider" 
  },
  {
    name: "Final_Status",
    type: "select",
    select_options: ["Parked", "Onstage", "Onstage (spotlit)", "Harmony", "Attempted But Failed", "Not Attempted"]
  },
  {
    name: "Note_in_Trap",
    type: "bool",
    toggle_tag: "success"
  },
  { 
    name: "Miscellaneous",
    type: "divider" 
  },
  {
    name: "Driver_Skill",
    type: "rating",
    stops: 3
  },
  {
    name: "Defense_Rating",
    type: "rating",
    stops: 4
  },
  {
    name: "Speed_Rating",
    type: "rating",
    stops: 5
  },
  {
    name: "Died",
    type: "bool",
    toggle_tag: "error"
  },
  {
    name: "Tippy",
    type: "bool",
    toggle_tag: "error"
  },
  {
    name: "Dropped_Notes",
    type: "bool",
    toggle_tag: "error"
  },
  {
    name: "Potential_Alliance_Partner",
    type: "bool",
    toggle_tag: "success"
  },
  { type: "divider" },
  {
    name: "comments",
    type: "text",
    max: 200,
  }
]


/* Returns an object containing the field keys but with undefined value.
 */
export const emptyData = () => {
  const o = {};

  for (const { type, name } of fields) {
    if (type == 'number') 
      o[name] = 0;
    if (type == 'bool') 
      o[name] = false;
    if (type == 'text') 
      o[name] = '';
    if (type == 'rating')
      o[name] = 1;
    if (type == 'select')
      o[name] = '';
  }

  return o;
}

/* Makes sure the forum is filled correctly
 * - msg specifies the reason for the invalidation.
 * @return { ok: bool, msg: string | undefined }
 */
export const validate = (forum) => {
  if (!forum) 
    return { ok: false, msg: `forum undefined` };

  console.log("VALIDATING", forum.team);
  console.log("V", forum);
  console.log("VALIDATING", typeof forum.team === 'number')


  // Fixed fields (scout initials, team number, comments)
  if (typeof forum.team !== 'number') 
    return { ok: false, msg: `'team' is not a number, got ${forum.team}` };
  if (typeof forum.scout !== 'string') 
    return { ok: false, msg: `'scout' is not a text, got ${forum.scout}` };
  if (forum.scout.length !== 2)
    return { ok: false, msg: `'scout' is not 2 characters` };

  // Data fields
  for (const field of fields) {
    if (field.type === 'divider') continue;

    const v = forum.data[field.name];

    // If not defined or null
    if (v === null || v === undefined) 
      return { ok: false, msg: `field '${field.name}' undefined` };

    // Per-type validations
    if (field.type == 'bool') {
      if (typeof v != 'boolean') 
        return { ok: false, msg: `field '${field.name}' is not a boolean, got ${v}` };
    }

    if (field.type == 'rating') {
      if (typeof v != 'number') 
        return { ok: false, msg: `field '${field.name}' is not a rating (number), got ${v}` };

      // number bounds
      if (v < 1 || v > field.stops)
        return { ok: false, msg: `field '${field.name}' (rating) is out of bounds [1, ${field.stops}], got ${v}` };
    }

    if (field.type == 'number') {
      if (typeof v != 'number') 
        return { ok: false, msg: `field '${field.name}' is not a number, got ${v}` };

      // number bounds
      if ((field.max && v > field.max) || (field.min && v < field.min))
        return { ok: false, msg: `field '${field.name}' is out of bounds [${field.min}, ${field.max}], got ${v}` };
    }

    // If text
    if (field.type == 'text') {
      if (typeof v != 'string') 
        return { ok: false, msg: `field '${field.name}' is not a string, got: ${v}` };

      if (v.length > field.max) 
        return { ok: false, msg: `field '${field.name}' exceeds character limit of ${field.max}` };
    }

    if (field.type == 'select') {
      if (typeof v != 'string') 
        return { ok: false, msg: `field '${field.name}' is not a string, got: ${v}` };

      if (!field.select_options.includes(v)) 
        return { ok: false, msg: `field '${field.name}'s value is not an option, got: ${v}` };
    }
  }

  return {
    ok: true,
  };
}
