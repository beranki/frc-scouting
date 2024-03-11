
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
  {
    name: "Comments",
    type: "text"
  },
]


/* Returns an object containing the field keys but with undefined value.
 */
export const emptyData = () => {
  const o = {};

  for (const { type, name } of fields) 
    if (type != 'divider')
      o[name] = undefined;

  return o;
}
