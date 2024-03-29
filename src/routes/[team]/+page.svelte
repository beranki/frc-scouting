<script>
  import StatsGraph from '$lib/components/StatsGraph.svelte';

  export let data;
  const { team, table, comments } = data;
  const length = table.speaker.v.length;
</script>

<div class="font-mono w-full text-center">
  <div class="text-6xl py-4 font-bold text-yellow-500 bg-neutral">{team}</div>
</div>

{#if length === 0}

<p>No entries yet</p>

{:else}

<div class="flex flex-col items-center w-full m-4 gap-2">

  <div class="w-[100%] overflow-x-auto">
    <table class="table table-sm">
      <thead>
        <tr>
          <th></th>
          {#each Object.keys(table) as field}
            <th>{field}</th>
          {/each}
        </tr>
      </thead> 
      <tbody>
        <tr>
          <th>avg.</th>
          {#each Object.values(table) as { avg } }
            <th>{avg.toFixed(2)}</th>
          {/each}
        </tr>
        {#each { length } as _, i}
          <tr>
            <th>{i+1}</th> 
            {#each Object.values(table) as { v } }
              {#if v[i] === true}
                <th>#</th>
              {:else if v[i] === false}
                <th>-</th>
              {:else}
                <th>{v[i]}</th>
              {/if}
            {/each}
          </tr>
        {/each}
      </tbody> 
    </table>
  </div>

  <div class="flex flex-wrap w-full justify-center m-6 gap-4">
    <!-- Graphs -->
    <div class="flex flex-col items-center w-96">
      <StatsGraph supers="auto amps" brand="auto amps" stats={table['a-amp'].v} /> 
      <StatsGraph supers="auto speaker" brand="auto speaker" stats={table['a-speaker'].v} /> 
    </div>
    <div class="flex flex-col items-center w-96">
      <StatsGraph supers="amps" brand="amps" stats={table['amp'].v} /> 
      <StatsGraph supers="speaker" brand="speaker" stats={table['speaker'].v} /> 
    </div>

    <!-- Comments -->
    <table class="table table-xs text-center w-96">
      <thead>
        <th class="font-bold italic">Comments</th>
      </thead>

      <tbody>
        {#each comments as comment}
          <tr>
            <th class="text-lg">{comment === "" ? "None" : comment}</th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!--
    <button class="font-mono m-10 text-3xl btn btn-success w-1/4">Return to Picklist</button>
  -->
</div>
{/if}
