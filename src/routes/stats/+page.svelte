<script>
  import { orderedFields } from '$lib/config.js';

  export let data;
  const { teams } = data;
  const fields = orderedFields();
  fields.splice(fields.indexOf('comment'), 1);
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
            <th>{field}</th>
          {/each}
        </tr>
      </thead> 
      <tbody>
        {#each Object.entries(teams) as [team, stats]}
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
