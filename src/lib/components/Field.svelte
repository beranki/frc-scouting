<script>
  export let configs;
  export let value;

</script>

<div class="forum-control">
  {#if configs.type == "text"} 

    <label class="input input-bordered flex items-center gap-2">
      <input type="text" class="grow" placeholder={configs.name} bind:value/>
    </label>

  {:else if configs.type == "number"}

    <span class="label-text">{configs.name}</span>
    <label class="input input-bordered flex items-center gap-2">
      <input type="number" min={configs.min ?? 0} max={configs.max ?? 10} bind:value/>
    </label>

  {:else if configs.type == "bool"}

    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">{configs.name}</span> 
        <input type="checkbox" class="toggle" bind:checked={value}/>
      </label>
    </div>
  {/if}
</div>
