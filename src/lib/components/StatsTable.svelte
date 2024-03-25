<script>

    export let stats;

    let b = [];
    if (stats.length > 0) {
        b = Object.keys(stats[0]);
    }

    //console.log(Object.entries(stats));

</script>

<div class="overflow-x-auto">
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr class="text-xl hover">
            <th></th>
            {#each b as tag}
                <th class="text-red-700">{tag}</th>
            {/each} 
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        {#each Object.entries(stats) as [idx, content]}
        <tr>
          <th class="text-xl text-yellow-600">{idx}</th>
            {#each Object.values(content) as sub}
                <th class="text-l">{sub}</th>
            {/each}
        </tr>
        {/each}
      </tbody>
    </table>
  </div>