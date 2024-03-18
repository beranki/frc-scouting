<script>
  import { validate } from '$lib/config.js';

  export let forum;

  const upload = async () => {

    // Validation
    console.log("pre-val", forum);

    const { ok, msg } = validate(forum);
    if (!ok) {
      alert("invalid forum: " + msg);
      return;
    }

    console.log('uploading', forum.team);

    const res = await fetch('/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forum)
    });

    if (res.status != 200) {
      const text = await res.text();
      console.log('non-200 response: ', text);

      alert(text);
    } else {
      console.log('200 received');
    }
  }

</script>

<div class="w-full text-center">
  <button class="w-48 btn btn-neutral" on:click={upload}> Upload </button>
</div>
