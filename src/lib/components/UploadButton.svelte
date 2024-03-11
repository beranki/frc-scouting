<script>
  import { validate } from '$lib/config.js';

  export let forum;

  const upload = async () => {

    // Validation
    const { ok, msg } = validate();
    if (!ok) {
      alert("invalid forum: " + msg);
    }

    console.log('uploading', forum);

    const res = await fetch('/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forum)
    });

    if (res.status != 200) {
      console.log('non-200 response: ', res);
      alert(await res.text());
    } else {
      console.log('200 received');
    }
  }

</script>

<button class="btn btn-success" on:click={upload}> Upload </button>
