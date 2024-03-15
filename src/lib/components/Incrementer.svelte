<script>
  export let value = 0;
  export let min = 0;
  export let max = 1;

  const inc = () => value = Math.min(value + 1, max);
  const dec = () => value = Math.max(value - 1, min);
</script>

<div class="relative flex items-center w-full">
  <button on:click={dec} class="">
    <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16"/>
    </svg>
  </button>

  <input class="flex-grow text-center" type="number" min={min} max={max} step="1" readonly="true" bind:value/>

  <button on:click={inc} class="">
    <svg class="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
    </svg>
  </button>
</div>

