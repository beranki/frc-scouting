<script>

  export let stats;

  let b = [];
  if (stats.length > 0) {
    b = Object.keys(stats[0]);
  }
</script>

<div class="overflow-x-auto">
  <table class="table table-zebra text-center">
    <!-- head -->
    <thead>
      <tr class="text-lg">
        <th></th>
        {#each b as tag}
          <th class="text-red-700">{tag}</th>
        {/each} 
      </tr>
    </thead>
    <tbody class="text-xl">
      {#each Object.entries(stats) as [stat, v]}
      <tr>
        <th class="text-xl text-yellow-600">{stat}</th>

        {#each Object.values(v) as x}
          <!-- booleans -->
          {#if x === true}
            <th class="font-black">T</th>
          {:else if x === false}
            <th class="font-light">F</th>
          <!-- numbers -->
          {:else}
            <th>{x}</th>
          {/if}
        {/each}
      </tr>
      {/each}
    </tbody>
  </table>
</div>
