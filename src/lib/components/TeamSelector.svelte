<script>  
  import Field from "$lib/components/Field.svelte";
  
  export let teamID;
  export let teamName;
  export let data;

  const ALLIANCES = ["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"];
  const MAX_MATCH_NUM = 80;
  const MATCHES = Array(MAX_MATCH_NUM).fill(0).map((_, i) => i+1);

  let { matches, teams } = data;
  
  let match_num = 1;
  let alliance = ALLIANCES[0];

  $: {
    if (match_num < 0 || match_num > MAX_MATCH_NUM) {
      match_num = 0;
    }

    // "frc2473"
    // -1 because "matches" is zero-indexed.
    const teamKey = matches[match_num-1][alliance];
    // "goldstrikers"
    teamName = teams[teamKey];
    // "2473"
    teamID = Number(teamKey.substring(3));

    console.log(`${match_num} + ${alliance} => ${teamID}/${teamName}`);
  }
</script>

<div>
  <Field configs={{ label: "Match Number", type: "select", select_options: MATCHES}} bind:value={match_num}/>
  <Field configs={{ label: "Alliance", type: "select", select_options: ALLIANCES}} bind:value={alliance}/>
  <div class="text-center">{teamID}: {teamName}</div>
</div>

