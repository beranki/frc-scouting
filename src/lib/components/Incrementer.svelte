<script>
  export let value = 0;
  export let min = 0;
  export let max = 1;

  const inc = _ => value = Math.min(value + 1, max);
  const dec = _ => value = Math.max(value - 1, min);
</script>

<div class="relative flex items-center w-full">
  <div on:click={dec} class="w-16 text-left pl-4"> − </div>

  <input tabindex="-1" class="flex-grow text-center" type="number" min={min} max={max} step="1" readonly="true" bind:value/>

  <div on:click={inc} class="w-16 text-right pr-4"> + </div>
</div>

