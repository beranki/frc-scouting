<script>
  import { orderedFields } from '$lib/config.js';

  export let data;
  let { teams } = data;
  const fields = orderedFields();
  fields.splice(fields.indexOf('comment'), 1);

  const sort = (field) => {
    console.log(`sorting by ${field}`);
    teams.sort((a, b) => {
      if (a.stats[field] < b.stats[field]) {
        return 1;
      }
      if (a.stats[field] > b.stats[field]) {
        return -1;
      }
      return 0;
    });
    console.log(teams.map(i => i.team));
    teams = teams;
  }
</script>

<div class="font-mono w-full text-center">
  <div class="text-6xl py-4 font-bold text-yellow-500 bg-neutral">Stats</div>
</div>

<div class="flex flex-col items-center w-full m-4 gap-2">
  <div class="w-[100%] overflow-x-auto">
    <table class="table table-sm">
      <thead>
        <tr>
          <th></th>
          {#each fields as field}
            <th on:click={_ => sort(field)}>{field}</th>
          {/each}
        </tr>
      </thead> 
      <tbody>
        {#each teams as { team, stats }}
          <tr>
            <th>{team}</th> 
            {#each fields as field}
              <th>{stats[field].toFixed(2)}</th>
            {/each}
          </tr>
        {/each}
      </tbody> 
    </table>
  </div>
</div>
