
/* Defines the name of a field and the type, as well as any other configurations relevant
 * A 'divider' type will create a divider in that order. It will not affect the forum
 */
export const fields = [
  {
    name: "working",
    type: "bool"
  },
  { 
    name: "auto",
    type: "divider" 
  },
  {
    name: "amps",
    type: "number",
    min: 0,
    max: 3,
  },
  { 
    name: "tele",
    type: "divider" 
  },
  {
    name: "speaker",
    type: "number",
    min: 0,
    max: 5,
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
