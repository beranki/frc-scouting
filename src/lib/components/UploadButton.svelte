<script>
  export let forum;

  /* Makes sure the forum is filled correctly
   */
  const validate = () => {

    return true;
  }

  const upload = () => {
    // TODO
    console.log('uploading', forum);
    alert("will do soon, forum data in console");
  }

</script>

<button on:click={() => validate() && upload() }> Upload </button>
