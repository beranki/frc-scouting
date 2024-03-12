<script>
  import Field from "$lib/components/Field.svelte";

  export let value;

  let match = 1;
  let alliance;
  const alliances = ["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]; 

  // Contest-specific
  const MAX_MATCH_NUM = 74;

  // When match changes, recalculate match number (TBA)
  $: {
    // TODO:
    //value = match + alliance;
  }
</script>

<div>
  <Field configs={{ name: "Match Number", type: "number", min: 0, max: MAX_MATCH_NUM }} bind:value={match}/>
  <Field configs={{ name: "Robot", type: "select", select_options: alliances }} bind:value={alliance}/>
</div>
