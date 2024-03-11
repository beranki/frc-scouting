/* Defines the name of a field and the type, as well as any other configurations relevant
 * A 'divider' type will create a divider in that order. It will not affect the forum
 */
export const fields = [
  { 
    name: "Auto",
    type: "divider" 
  },
  {
    name: "Leave Starting Zone",
    type: "bool",
    toggle_tag: "success"
  },
  { 
    name: "Amp Scores",
    type: "number",
    min: 0,
    max: 6,
  },
  { 
    name: "Speaker Scores",
    type: "number",
    min: 0,
    max: 6,
  },
  { 
    name: "TeleOp",
    type: "divider" 
  },
  {
    name: "Amp Scores",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    name: "Speaker Scores",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    name: "Times Amplified",
    type: "number",
    min: 0,
    max: 10,
  },
  {
    name: "Pickup From",
    type: "select",
    select_options: ["Source", "Floor", "Both", "Not Attempted"]
  },
  { 
    name: "Endgame",
    type: "divider" 
  },
  {
    name: "Final Status",
    type: "select",
    select_options: ["Parked", "Onstage", "Onstage (spotlit)", "Harmony", "Attempted But Failed", "Not Attempted"]
  },
  {
    name: "Note in Trap",
    type: "bool",
    toggle_tag: "success"
  },
  { 
    name: "Miscellaneous",
    type: "divider" 
  },
  {
    name: "Driver Skill",
    type: "rating",
    stops: 3
  },
  {
    name: "Defense Rating",
    type: "rating",
    stops: 4
  },
  {
    name: "Speed Rating",
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
    name: "Dropped Notes (>2)",
    type: "bool",
    toggle_tag: "error"
  },
  {
    name: "Potential Alliance Partner?",
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

  // Fixed fields (scout initials, team number, comments)
  if (typeof forum.team !== 'number') 
    return { ok: false, msg: `'team' is not a number, got ${forum.team}` };
  if (typeof forum.scout !== 'string') 
    return { ok: false, msg: `'scout' is not a text, got ${forum.scout}` };
  if (forum.scout.length !== 2)
    return { ok: false, msg: `'scout' is not 2 characters` };

  // Data fields
  for (const field of fields) {
    
    const v = forum.data[field.name];

    // If not defined or null
    if (!v) 
      return { ok: false, msg: `field '${field.name}' undefined` };

    // If wrong type
    if (field.type == 'bool') {
      if (typeof v != 'boolean') 
        return { ok: false, msg: `field '${field.name}' is not a boolean, got ${v}` };
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
  }

  return {
    ok: true,
  };
}
