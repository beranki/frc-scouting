<script>
  import DropdownWrap from "$lib/components/DropdownWrap.svelte";

  export let data;
  let { team, sections } = data;
</script>

<div class="font-mono w-full text-center">
  <div class="text-6xl py-4 font-bold text-blue-500 bg-neutral">{team}</div>
</div>

<div class="flex flex-col items-center w-max max-w-2xl m-4 gap-2">

  {#each Object.entries(sections) as [section, data]}
    <DropdownWrap bind:section bind:data/>
  {/each}

  <!--
    <button class="font-mono m-10 text-3xl btn btn-success w-1/4">Return to Picklist</button>
  -->
</div>
