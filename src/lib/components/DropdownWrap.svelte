<script>
  import StatsTable from "$lib/components/StatsTable.svelte";
  import StatsGraph from "$lib/components/StatsGraph.svelte";
  import StatsCard from "$lib/components/StatsCard.svelte";

  export let data;
  export let section;

  let ndata = {};
  let bdata = {};


  for (const entry of data) {
    for (const stat in entry) {

      if (typeof entry[stat] == 'number') {
        // if empty, create list
        if (!(stat in ndata))
          ndata[stat] = [];
        ndata[stat].push(entry[stat]);
      }

      if (typeof entry[stat] == 'boolean') {
        if (!(stat in bdata))
          bdata[stat] = [];
        bdata[stat].push(entry[stat]);
      }
    }
  }

  let navgs = {}
  let bavgs = {}
  
  for (const stat in ndata) {
    navgs[stat] = ndata[stat].reduce((acc, c) => acc + c, 0) / ndata[stat].length
  }

  for (const stat in bdata) {
    bavgs[stat] = bdata[stat].filter(Boolean).length / bdata[stat].length;
  }
</script>

<div tabindex="0" class="collapse collapse-arrow bg-base-200 m-1 font-mono">
  <div class="collapse-title text-4xl font-medium">{section}</div>
  <div class="font-poppins collapse-content"> 
    <div class="flex flex-col items-center">
      <StatsTable stats={data} />

      <!-- Graphs -->
      {#if Object.keys(ndata).length > 0 && section !== 'Ratings'}
        <div class="flex flex-row">
          {#each Object.keys(ndata) as k}
            <StatsGraph supers={section} brand={k} stats={ndata[k]} /> 
          {/each}
        </div>
      {/if}

      {#if Object.keys(ndata).length > 0}
        <div class="stats shadow m-2">
          <div class="flex flex-row">
            {#each Object.keys(navgs) as k}
              <StatsCard supers={section} type="num" brand={k} stats={navgs[k]} /> 
            {/each}
          </div>
        </div>
      {/if}

      {#if Object.keys(bdata).length > 0}
        <div class="stats shadow m-2">
          <div class="flex flex-row">
            {#each Object.keys(bavgs) as k}
              <StatsCard supers={section} type="bool" brand={k} stats={bavgs[k]} /> 
            {/each}
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>
  
