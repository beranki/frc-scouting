<script>
	import { page } from '$app/stores';
</script>

<div class="p-10">
  <h1>{$page.error.code}</h1>
  <p>{$page.error.message}</p>

  <div class="p-10">
    <b>Pages:</b> <br>
    <b>'/'</b>: the forum page <br>
    <b>'/stats'</b>: aggregated stats for every team <br>
    <b>'/[team number]'</b>: a specific team's per-game stats & comments <br>
  </div>
</div>
