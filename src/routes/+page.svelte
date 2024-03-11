<script>
  import { emptyData, fields } from "$lib/config.js";

  import Field from "$lib/components/Field.svelte";
  import Title from "$lib/components/Title.svelte";
  import Divider from "$lib/components/Divider.svelte";
  import UploadButton from "$lib/components/UploadButton.svelte";
  import TeamSelector from "$lib/components/TeamSelector.svelte";


  const forum = {
    scout: "",
    team: "",
    data: emptyData()
  };

  console.log("fields", Object.entries(fields));
</script>

<Title />
<div>
  <Field configs={{ name: "scout initials", type: "text" }} bind:value={forum.scout}/>
  <TeamSelector bind:value={forum.team}/>

  <Divider />

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
