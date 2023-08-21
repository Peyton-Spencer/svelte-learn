<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let username = "";
  let loading = false;
  let isAvailable = false;

  let debounceTimer: NodeJS.Timeout;

  async function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);
    loading = true;

    debounceTimer = setTimeout(async () => {
      console.log("Checking if this is avail: ", username);
      if (username.length === 0) {
        console.log("no value given");
        loading = false;
        return;
      }
      const ref = doc(db, "usernames", username);
      const exists = await getDoc(ref).then((doc) => doc.exists());

      isAvailable = !exists;
      loading = false;
    }, 500);
  }
  async function confirm() {}
</script>

<AuthCheck>
  <h2>Select your username</h2>
  <form class="w-2/5" on:submit|preventDefault={confirm}>
    <input
      type="text"
      placeholder="Username"
      class="input w-full"
      bind:value={username}
      on:input={checkAvailability}
    />
    {#if !username}
      <p>Please pick a username</p>
    {:else if loading}
      <p>Loading...</p>
    {:else if isAvailable === true}
      <p class="text-green-500">Yes, {username} is available!</p>
    {:else if isAvailable === false}
      <p class="text-red-500">
        Sorry, {username} is already taken. Please choose another 😭
      </p>
    {/if}
    {#if username && isAvailable}
      <button class="btn btn-success">Confirm username @{username} </button>
    {/if}
  </form>
</AuthCheck>

<style>
  p {
    color: gray;
    font-style: italic;
    padding: 0.5rem;
  }
  input {
    margin: 0.5rem 0;
  }
</style>
