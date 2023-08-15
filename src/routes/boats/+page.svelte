<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
</script>

<h1>{data.boatName}</h1>

<form method="POST" action="?/rename" use:enhance>
  <input type="text" name="boatName" placeholder="Boat Name" />
  <button type="submit">Submit</button>
  <button class="btn btn-outline" formaction="?/capitalize"><strong>SHOUT</strong> your boat</button>
  <button class="btn btn-neutral" formaction="?/lowercase"><em>whisper</em> your boat</button>
</form>
