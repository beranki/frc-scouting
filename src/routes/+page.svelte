<script>
  import { emptyData, fields } from "$lib/config.js";

  import Field from "$lib/components/Field.svelte";
  import Title from "$lib/components/Title.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import UploadButton from "$lib/components/UploadButton.svelte";
  import TeamSelector from "$lib/components/TeamSelector.svelte";


  const forum = {
    scout: "",
    event: "",
    team: 0,
    data: emptyData()
  };

  const MAX_TEAMS = 45;

  console.log("fields", Object.entries(fields));
</script>

<Title />
<div>
  <Divider text={"Pre-Game"}/>
  <Field configs={{ name: "scout initials", type: "text", max: 2 }} bind:value={forum.scout}/>
  <TeamSelector bind:value={forum.team}/>

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
