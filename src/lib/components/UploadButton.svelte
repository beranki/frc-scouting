<script>
  import { validate, makeQR, emptyForum } from '$lib/config.js';

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

  const showQR = async () => {

    // Validation
    const { ok, msg } = validate(forum);
    if (!ok) {
      alert("invalid forum: " + msg);
      return;
    }

    // make QR
    const qr = makeQR(forum);

    // QR element
    document.getElementById("qrcode").innerHTML = "";
    new QRCode("qrcode", {
      text: qr,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
    document.getElementById('modal').show()
  }
</script>

<div class="flex flex-col items-center">
  <div class="join">
    <button class="w-48 btn join-item font-poppins" on:click={upload}> upload </button>
    <button class="w-12 btn join-item font-poppins" on:click={showQR}> QR </button>
  </div>
</div>

<dialog id="modal" class="modal">
  <div class="modal-box w-64">
    <div id="qrcode"></div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
