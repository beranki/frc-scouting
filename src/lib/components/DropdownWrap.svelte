<script>
    import StatsTable from "$lib/components/StatsTable.svelte";
    import StatsGraph from "$lib/components/StatsGraph.svelte";
    import StatsCard from "$lib/components/StatsCard.svelte";

    export let section_data;
    export let section;

    let graphed_section_data = {};
    let bool_section_data = {};

    let num_avgs = {}
    let bool_avgs = {}
    
    for (const i in section_data) {
        let s = Object.entries(section_data[i]);
        for (const j in s) {
            if (typeof s[j][1] == 'number') {
                if (s[j][0] in graphed_section_data) {
                    graphed_section_data[s[j][0]].push(s[j][1]);
                } else {
                    graphed_section_data[s[j][0]] = [s[j][1]];
                }
            }

            else if (typeof s[j][1] == 'boolean') {
                if (s[j][0] in bool_section_data) {
                    bool_section_data[s[j][0]].push(s[j][1]);
                } else {
                    bool_section_data[s[j][0]] = [s[j][1]];
                }
            }
        }

    }

    for (const i in graphed_section_data) {
        let s = graphed_section_data[i];
        num_avgs[i] = graphed_section_data[i].reduce((acc, c) => acc + c, 0) / graphed_section_data[i].length;
    }

    for (const i in bool_section_data) {
        let s = bool_section_data[i];
        bool_avgs[i] = bool_section_data[i].filter(Boolean).length / bool_section_data[i].length;
    }

    console.log("BOOL", Object.entries(bool_avgs));
</script>

<div class="font-mono collapse collapse-plus bg-base-200 m-1">
    <input type="radio" name="my-accordion-3" checked="checked" /> 
    <div class="collapse-title text-4xl font-medium">
      {section}
    </div>
    <div class="font-poppins collapse-content"> 
        <StatsTable stats={section_data} />
        {#if Object.keys(graphed_section_data).length > 0}
            <div class="flex flex-row">
                {#each Object.keys(graphed_section_data) as k}
                    <StatsGraph supers={section} brand={k} stats={graphed_section_data[k]} /> 
                {/each}
            </div>

            <div class="flex items-center justify-center mt-10">
                <div class="stats shadow m-2">
                    <div class="flex flex-row">
                        {#each Object.keys(bool_avgs) as k}
                            <StatsCard supers={section} type="bool" brand={k} stats={bool_avgs[k]} /> 
                        {/each}
                    </div>
                </div>

                <div class="stats shadow m-2">
                    <div class="flex flex-row">
                        {#each Object.keys(num_avgs) as k}
                            <StatsCard supers={section} type="num" brand={k} stats={num_avgs[k]} /> 
                        {/each}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>
  