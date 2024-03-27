<script>
  import { Chart } from "chart.js/auto";
  import { onDestroy, onMount } from "svelte";

  export let stats;
  export let brand;
  export let supers;

  let chart;

  onMount(() => {
    Chart.defaults.color = '#aaa';
    Chart.defaults.backgroundColor = 'rgb(75, 157, 192)';

    chart = new Chart(
      document.getElementById(`${supers} ${brand}`),
      {
        type: 'line',
        data: {
          labels: [...Array(stats.length).keys()],
          datasets :[{
            label: `${brand}`,
            data: stats,
            fill: false,
            borderColor: 'rgb(75, 165, 255)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              ticks: {min: 0, max: Array(Math.max.apply(Math, stats)), stepSize: 1},
              gridLines: {display: false}
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 14,
                  family: "Poppins",
                },
                boxWidth: 0
              }
            }
          }
        }
      }
    );
  })

</script>


<div class="w-72 font-poppins">
<canvas id={`${supers} ${brand}`}></canvas>
</div>
