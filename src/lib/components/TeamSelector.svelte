<script>  
  import Field from "$lib/components/Field.svelte";
  
  export let value;
  export let data;

  let {matches, teams} = data;
  
  let match_num = 1;
  let alliances = ["Red 1", "Red 2", "Red 3", 
                  "Blue 1", "Blue 2", "Blue 3"];

  let alliance = 'Red 1';

  // Contest-specific
  const MAX_MATCH_NUM = 74;

  let team_nick = '';
  let team_num = '';
  
  // When match changes, recalculate match number (TBA)
  $: {
    // TODO:
    //value = match + alliance;
    let match = matches.filter(o => o.match_number == match_num)[0];

    let team_key;

    console.log(match.alliances.red.team_keys);
    console.log(match.alliances.blue.team_keys);

    if (alliances.indexOf(alliance) < alliances.length/2) {
      team_key = match.alliances.red.team_keys[+alliance.slice(-1) - 1];
    } else {
      team_key = match.alliances.blue.team_keys[+alliance.slice(-1) - 1];
    }

    console.log(match);
    console.log(team_key);

    let team = teams.filter(o => o.key == team_key)[0];

    team_nick = team.nickname;
    team_num = team.team_number;

    console.log(team_nick);
    value = team_num;
    console.log(team_num);
  }
</script>

<!-- Temporary -->
<Field configs={{ name: "Team #", type: "number", max: 1000000}} bind:value/>
<Field configs={{ name: "Match Number", type: "number", min: 0, max: MAX_MATCH_NUM }} bind:value={match_num}/>
<Field configs={{ name: "Alliance", type: "select", select_options: alliances}} bind:value={alliance}/>
<div>
  <span class="font-poppins underline label-text flex justify-center"><em>{team_nick} - {team_num}</em></span>
</div>

