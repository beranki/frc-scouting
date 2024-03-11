<script>
  let MAX_AUTO_AMP = 10;
  let MAX_AUTO_SPEAKER = 10;
  let MAX_TELE_AMP = 15;
  let MAX_TELE_SPEAKER = 15;
  let MAX_TIMES_AMPLIFIED = 5;

  $: ampAutoCount = 0;
  $: speakerAutoCount = 0;
  $: ampTeleCount = 0;
  $: speakerTeleCount = 0;
  $: timesAmp = 0;


  const ampAutoIncrement = () => {if (ampAutoCount < MAX_AUTO_AMP) ampAutoCount++; }
  const ampAutoDecrement = () => {if (ampAutoCount > 0) ampAutoCount--;}

  const speakerAutoIncrement = () => {if (speakerAutoCount < MAX_AUTO_SPEAKER) speakerAutoCount++;}
  const speakerAutoDecrement = () => {if (speakerAutoCount > 0) speakerAutoCount--;}

  const ampTeleIncrement = () => {if (ampTeleCount < MAX_TELE_AMP) ampTeleCount++;}
  const ampTeleDecrement = () => {if (ampTeleCount > 0) ampTeleCount--;}

  const speakerTeleIncrement = () => {if (speakerTeleCount < MAX_TELE_SPEAKER) speakerTeleCount++;}
  const speakerTeleDecrement = () => {if (speakerTeleCount > 0) speakerTeleCount--;}

  const timesAmpIncrement = () => {if (timesAmp < MAX_TIMES_AMPLIFIED) timesAmp++;}
  const timesAmpDecrement = () => {if (timesAmp > 0) timesAmp--;}

  /* does not work - probably easy fix but i am sick and sped */
  const handleSubmit = e => {
    const formData = new FormData(e.target);
    console.log(formData);

    for (let field of formData) {
      const [key, value] = field;
      console.log(key, value);
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col space-y-10">
    <div class="font-mono w-full text-center">
      <div class="text-6xl font-bold text-yellow-600 bg-neutral">CRESCENDO</div>
      <div class="text-2xl">2473 Scouting App</div> 
    </div>

    <div class="text-center">
      <div class="font-mono text-4xl border-b-2 border-red-700  mb-5">Pre-Match</div>
      <div class="font-poppins w-1/3 flex-row mx-auto">

        <label class="block m-5">
          <span class="text-gray-200">Scouter Initials</span>
          <input class="form-input mt-1 block w-full" id="scouter-initials" placeholder="">
        </label>

        <label class="block m-5">
          <span class="text-gray-200">Event</span>
          <input class="form-input mt-1 block w-full" id="event" placeholder="">
        </label>

        <label class="block m-5">
          <span class="text-gray-200">Match Level</span>
          <select class="form-select mt-1 block w-full" id="match-level">
            <option>Quals</option>
            <option>Semifinals</option>
            <option>Finals</option>
          </select>
        </label>

        <label class="block m-5">
          <span class="text-gray-200">Match #</span>
          <input class="form-input mt-1 block w-full" placeholder="" id="match-num">
        </label>
        
        <label class="block m-5">
          <span class="text-gray-200">Robot</span>
          <select class="form-select mt-1 block w-full" id="robot">
            <option>Red-1</option>
            <option>Red-2</option>
            <option>Red-3</option>
            <option>Blue-1</option>
            <option>Blue-2</option>
            <option>Blue-3</option>
          </select>
        </label>

        <label class="block m-5">
          <span class="text-gray-200">Team #</span>
          <input class="form-input mt-1 block w-full" id="team-num" placeholder="">
        </label>
        
      </div>
    </div>

    <div class="text-center">
      <div class="font-mono text-4xl border-b-2 border-red-700 mb-5">Auton</div>
      <div class="font-poppins w-1/3 flex-row mx-auto">


      <div class="block m-5 items-center">
        <label for="left-starting-pos" class="text-gray-200 mr-2">Left Starting Position</label> 
        <input id="left-starting-pos" type="checkbox" value="" class="form-input w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
          
      </div>

        <label class="block m-5">
          <span class="text-gray-200 mr-4">Amp Scores</span>
        
          <div class="py-2 px-3 inline-block bg-neutral rounded-lg" data-hs-input-number>
            <div class="flex items-center gap-x-1.5">
              <button type="button" on:click={ampAutoDecrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
              </button>
              <input id="auto-amp-scores" class="form-input p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white" type="text" value={ampAutoCount} data-hs-input-number-input>
              <button type="button" on:click={ampAutoIncrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>
          </div>
        </label>

        <label class="block m-5">
          <span class="text-gray-200 mr-4">Speaker Scores</span>

          <div class="py-2 px-3 inline-block bg-neutral rounded-lg" data-hs-input-number>
            <div class="flex items-center gap-x-1.5">
              <button type="button" on:click={speakerAutoDecrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
              </button>
              <input id="auto-speaker-scores" class="form-input p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white" type="text" value={speakerAutoCount} data-hs-input-number-input>
              <button type="button" on:click={speakerAutoIncrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>
          </div>
        </label>
        
      </div>
    </div>

    <div class="text-center">
      <div class="font-mono text-4xl border-b-2 border-red-700  mb-5">TeleOp</div>
      <div class="font-poppins w-1/3 flex-row mx-auto">

        <label class="block m-5">
          <span class="text-gray-200 mr-4">Amp Scores</span>
        
          <div class="py-2 px-3 inline-block bg-neutral rounded-lg" data-hs-input-number>
            <div class="flex items-center gap-x-1.5">
              <button type="button" on:click={ampTeleDecrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
              </button>
              <input id="tele-amp-scores" class="form-input p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white" type="text" value={ampTeleCount} data-hs-input-number-input>
              <button type="button" on:click={ampTeleIncrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>
          </div>
        </label>

        <label class="block m-5">
          <span class="text-gray-200 mr-4">Speaker Scores</span>

          <div class="py-2 px-3 inline-block bg-neutral rounded-lg" data-hs-input-number>
            <div class="flex items-center gap-x-1.5">
              <button type="button" on:click={speakerTeleDecrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
              </button>
              <input id="tele-speaker-scores" class="form-input p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white" type="text" value={speakerTeleCount} data-hs-input-number-input>
              <button type="button" on:click={speakerTeleIncrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>
          </div>
        </label>

        <label class="block m-5">
          <span class="text-gray-200 mr-4">Times Amplified</span>

          <div class="py-2 px-3 inline-block bg-neutral rounded-lg" data-hs-input-number>
            <div class="flex items-center gap-x-1.5">
              <button type="button" on:click={timesAmpDecrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-decrement>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>
              </button>
              <input id="times-ampl" class="form-input p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white" type="text" value={timesAmp} data-hs-input-number-input>
              <button type="button" on:click={timesAmpIncrement} class="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md bg-neutral text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-input-number-increment>
                <svg class="flex-shrink-0 size-3.5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>
          </div>
        </label>

        <label class="block m-5">
          <span class="text-gray-200">Pickup From: </span>
          <select id="pickup-from" class="form-select mt-1 block w-full">
            <option>Not attempted</option>
            <option>Source</option>
            <option>Floor</option>
            <option>Both</option>
          </select>
        </label>
        
      </div>
    </div>

    <div class="text-center">
      <div class="font-mono text-4xl border-b-2 border-red-700  mb-5">Endgame</div>
      <div class="font-poppins w-1/3 flex-row mx-auto">

        <label class="block m-5">
          <span class="text-gray-200">Final Status</span>
          <select id="final-status" class="form-select mt-1 block w-full">
            <option>Not attempted</option>
            <option>Parked</option>
            <option>Onstage</option>
            <option>Onstage (Spotlit)</option>
            <option>Harmony</option>
            <option>Attempted but failed</option>
          </select>
        </label>

        <div class="block m-5 items-center">
          <label for="note-in-trap" class="text-gray-200 mr-2">Note in Trap</label> 
          <input id="note-in-trap" type="checkbox" value="" class="form-input w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            
        </div>
        
      </div>
    </div>

    <div class="text-center">
      <div class="font-mono text-4xl border-b-2 border-red-700 mb-5">Miscellaneous</div>
      <div class="font-poppins w-1/3 flex-row mx-auto">

        <label class="block m-5">
          <span class="text-gray-200">Driver Skill</span>
          <select id="driver-skill" class="form-select mt-1 block w-full">
            <option>Not Observed</option>
            <option>Not Effective</option>
            <option>Average</option>
            <option>Effective</option>
          </select>
        </label>

        <label class="block m-5">
          <span class="text-gray-200">Defense Rating</span>
          <select id="defense-rating" class="form-select mt-1 block w-full">
            <option>Did Not Play Defense</option>
            <option>Below Average</option>
            <option>Average</option>
            <option>Good</option>
            <option>Excellent</option>
          </select>
        </label>

        <label class="block m-5">
          <span class="text-gray-200">Speed Rating</span>
          <select id="speed-rating" class="form-select mt-1 block w-full">
            <option>1 (Slow)</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5 (Fast)</option>
          </select>
        </label>

        <div class="block m-5 items-center">
          <label for="died" class="text-gray-200 mr-2">Immobilized</label> 
          <input id="died" type="checkbox" value="" class="form-input w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </div>

        <div class="block m-5 items-center">
          <label for="tippy" class="text-gray-200 mr-2">Tippy</label> 
          <input id="tippy" type="checkbox" value="" class="form-input w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </div>

        <div class="block m-5 items-center">
          <label for="dropped-notes" class="text-gray-200 mr-2">Dropped Notes</label> 
          <input id="dropped-notes" type="checkbox" value="" class="form-input w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </div>

        <div class="block m-5 items-center">
          <label for="alliance-fate" class="text-gray-200 mr-2">Make good alliance partner?</label> 
          <input id="alliance-fate" type="checkbox" value="" class="form-input w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        </div>
        
        <label class="block m-5">
          <span class="text-gray-200">Comments</span>
          <input id="comments" class="form-input mt-1 block w-full" placeholder="">
        </label>
      </div>

      <button type="submit" class="text-xl w-60 btn btn-success"> Button </button>

    </div>


  </div>

</form>
