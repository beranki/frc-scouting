<script>
  export let configs;
  export let value;
  export let select_options;

</script>

<div class="forum-control font-poppins m-5">
  {#if configs.type == "text"} 

    <label class="input input-bordered flex items-center gap-2">
      <input type="text" class="grow" placeholder={configs.name} bind:value/>
    </label>


  {:else if configs.type == "number"}

    <span class="label-text">{configs.name}</span>
    <label class="input input-bordered flex items-center gap-2">
      <input class="w-full" type="number" min={configs.min ?? 0} max={configs.max ?? 10} bind:value/>
    </label>


  {:else if configs.type == "bool"}

    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">{configs.name}</span> 
        <input type="checkbox" class="toggle toggle-{configs.toggle_tag}" bind:checked={value}/>
      </label>
    </div>

  {:else if configs.type == "select"}

  <span class="label-text">{configs.name}</span>
    <select class="select select-bordered w-full max-w-xs">
      <option disabled selected>Select {configs.name}</option>
      {#each configs.select_options as select_option}
        <option>{select_option}</option>
      {/each}
    </select>

  {:else if configs.type == "rating"}
    
    <span class="label-text">{configs.name}</span>
    <input type="range" min="0" max="{configs.stops-1}" value="0" class="range range-warning mt-3" step="1" />
    <div class="w-full flex justify-between text-xs px-2">
      {#each Array(configs.stops) as _, i}
        <span>{i+1}</span>
      {/each}
    </div>

  {/if}
</div>
