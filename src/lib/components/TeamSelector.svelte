<script>  
  import Field from "$lib/components/Field.svelte";
  
  export let teamID;
  export let teamName;
  export let data;

  const ALLIANCES = ["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"];
  const MAX_MATCH_NUM = 74;

  let { matches, teams } = data;
  
  let match_num = 1;
  let alliance = ALLIANCES[0];

  $: {
    // "frc2473"
    const teamKey = matches[match_num][alliance];
    // "goldstrikers"
    teamName = teams[teamKey];
    // "2473"
    teamID = Number(teamKey.substring(3));

    console.log(`${match_num} + ${alliance} => ${teamID}/${teamName}`);
  }
</script>

<!-- Temporary -->
<div>
  <Field configs={{ name: "Match Number", type: "number", min: 0, max: MAX_MATCH_NUM }} bind:value={match_num}/>
  <Field configs={{ name: "Alliance", type: "select", select_options: ALLIANCES}} bind:value={alliance}/>
  <div class="text-center">{teamID}: {teamName}</div>
</div>

