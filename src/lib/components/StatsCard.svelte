<script>
  export let stats;
  export let brand;
  export let supers;
  export let type;
</script>
  
<div class="stat place-items-center">
  <div class="stat-title text-blue-100 text-2xl">{brand}</div>
  {#if type == "num"}
    <div class="stat-value text-blue-500 text-6xl">{stats.toFixed(1)}</div>
    <div class="stat-desc text-blue-100 text-l">Avg over matches played</div>
  {:else if type == "bool"}
    <div class="stat-value text-blue-500 text-6xl">{Math.round(stats * 100)}%</div>
    <div class="stat-desc text-blue-100 text-l">% over matches played</div>
  {/if}
</div>
