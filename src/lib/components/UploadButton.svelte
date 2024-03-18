<script>
  import { validate } from '$lib/config.js';
  import { emptyForum } from '$lib/config.js';

  export let forum;

  const upload = async () => {

    // Validation
    const { ok, msg } = validate(forum);
    if (!ok) {
      alert("invalid forum: " + msg);
      return;
    }

    // Upload
    console.log('uploading', forum);

    const res = await fetch('/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(forum)
    });

    // If failed, return
    if (res.status != 200) {
      const text = await res.text();
      console.log('non-200 response: ', text);

      alert(text);
      return;
    }

    // On success, clear forum and scroll to top
    console.log('200 received');
    const scout = forum.scout;
    forum = emptyForum(forum);
    forum.scout = scout;
    document.body.scrollIntoView();
    alert("uploaded");
  }

</script>

<div class="w-full text-center">
  <button class="w-48 btn btn-neutral" on:click={upload}> Upload </button>
</div>
