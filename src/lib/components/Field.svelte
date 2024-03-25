<script>
  import Incrementer from '$lib/components/Incrementer.svelte';

  export let configs;
  export let value;
  export let select_options;

</script>

<div class="forum-control font-poppins m-5">
  {#if configs.type == "text"} 

    <span class="label-text">{configs.label}</span>
    <label class="input input-bordered flex items-center gap-2">
      <input type="text" maxlength={configs.max ?? 200} class="grow" placeholder={configs.label} bind:value/>
    </label>


  {:else if configs.type == "number"}

    <span class="label-text">{configs.label}</span>
    <label class="input input-bordered flex items-center gap-2">
      <Incrementer min={configs.min ?? 0} max={configs.max ?? 10} bind:value/>
    </label>


  {:else if configs.type == "bool"}
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">{configs.label}</span> 
      
      {#if configs.toggle_tag == "green"}
        <input type="checkbox" class="toggle toggle-success" bind:checked={value}/>
      {:else if configs.toggle_tag == "red"}
        <input type="checkbox" class="toggle toggle-error" bind:checked={value}/>
      {:else if configs.toggle_tag == "blue"}
        <input type="checkbox" class="toggle toggle-info" bind:checked={value}/>
      {:else}
        <input type="checkbox" class="toggle" bind:checked={value}/>
      {/if}
    </label>
  </div>
  {:else if configs.type == "select"}

  <span class="label-text">{configs.label}</span>
    <select class="select select-bordered w-full max-w-xs" bind:value>
      {#each configs.select_options as select_option}
        <option class="text-center">{select_option}</option>
      {/each}
    </select>
  

  {:else if configs.type == "rating"}
    
    <span class="label-text">{configs.label}</span>
    <input type="range" min="1" max="{configs.stops}" class="range range-warning mt-3" step="1" bind:value />
    <div class="w-full flex justify-between text-xs px-2">
      {#each Array(configs.stops) as _, i}
        <span>{i+1}</span>
      {/each}
    </div>

  {/if}
</div>
