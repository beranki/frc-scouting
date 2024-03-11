<script>
  export let configs;
  export let value;

</script>

<div>
  <div>{configs.name}</div>
  {#if configs.type == "text"} 

    <input type="text" bind:value/>

  {:else if configs.type == "number"}

    <input type="number" min={configs.min ?? 0} max={configs.max ?? 10} bind:value/>

  {:else if configs.type == "bool"}

    <input type="checkbox" bind:checked={value}/>

  {/if}
</div>
