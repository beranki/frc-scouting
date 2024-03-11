<script>
  import Field from "$lib/components/Field.svelte";

  export let value;

  let match;
  let alliance;
  const alliances = ["red1","red2", "red3", "blue1", "blue2", "blue3"]; 

  // Contest-specific
  const MAX_MATCH_NUM = 74;

  // When match changes, recalculate match number (TBA)
  $: {
    // TODO:
    value = match + alliance;
  }
</script>

<div>
  <Field configs={{ name: "match#", type: "number", min: 0, max: MAX_MATCH_NUM }} bind:value={match}/>

  <div>
    {#each alliances as label}
      <input type="radio" bind:group={alliance} id={label} value={label}/>
      <label for={label}>{label}</label>
    {/each}
  </div>
</div>
