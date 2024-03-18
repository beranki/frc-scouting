<script>
  import { emptyData, fields } from "$lib/config.js";

  import Field from "$lib/components/Field.svelte";
  import Title from "$lib/components/Title.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import UploadButton from "$lib/components/UploadButton.svelte";
  import TeamSelector from "$lib/components/TeamSelector.svelte";


  const forum = {
    scout: "",
    team: 0,
    teamName: "",
    data: emptyData()
  };

  const MAX_TEAMS = 45;

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Title />
<div>
  <Divider text={"Pre-Game"}/>
  <Field configs={{ name: "Scout Initials", type: "text", max: 2 }} bind:value={forum.scout}/>
  <TeamSelector data={data} bind:teamID={forum.team} bind:teamName={forum.teamName}/>

  <div>
    {#each fields as field}
      {#if field.type == "divider"} 
        <Divider text={field.name}/>
      {:else}
        <Field configs={field} bind:value={forum.data[field.name]}/>
      {/if}
    {/each}

    <Divider />

    <UploadButton forum={forum} />
  </div>

</div>
