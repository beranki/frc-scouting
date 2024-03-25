<script>
  import DropdownWrap from "$lib/components/DropdownWrap.svelte";

  /** @type {import('./$types').PageData} */
  export let data;

  let {team_data} = data;

  let team;

  let data_colls = {
    "Auto": [],
    "TeleOp": [],
    "Endgame": [],
    "Ratings": [],
    "Status": [],
    "Comments": []
  }

  for (const [k1, v1] of Object.entries(team_data)) {
    //console.log(k1, v1);
    for (const [k2, v2] of Object.entries(v1)) {
      //console.log(k2, v2);
      if (k2 == "Team") {
        team = v2;
      } else {
        data_colls[k2].push(v2);
      }
    }
  }

</script>


<div class = "flex flex-col w-full h-full justify-center items-center">
  
  <div class="font-mono w-full text-center">
    <div class="text-6xl py-4 font-bold text-blue-500 bg-neutral">{team}</div>
  </div>

  {#each Object.entries(data_colls) as [section, section_data]}
    <DropdownWrap bind:section bind:section_data/>
  {/each}

  <button class="font-mono m-10 text-3xl btn btn-success w-1/4">Return to Picklist</button>
</div>