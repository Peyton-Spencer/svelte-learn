<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { collection, doc, getDoc, writeBatch } from "firebase/firestore";

  let username = "";
  let currentUsername = "";
  let doIOwnUsername = false;
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
      const myDoc = await getDoc(ref);
      const exists = myDoc.exists();
      if (exists) {
        console.log("Username already taken");
        // alert(
        //   "Username already taken by: " +
        //     myDoc.get("uid") +
        //     "\n your username: " +
        //     $user!.uid
        // );
        if (myDoc.get("uid") === $user!.uid) {
          currentUsername = username;
          doIOwnUsername = true;
        } else {
          doIOwnUsername = false;
        }
      }
      isAvailable = !exists;
      loading = false;
    }, 500);
  }
  async function confirm() {
    if ($user == null) {
      console.log("No user");
      return;
    }
    console.log("Confirming username: ", username);
    const batch = writeBatch(db);
    batch.set(doc(db, "usernames", username), { uid: $user!.uid });
    batch.set(doc(db, "users", $user!.uid), {
      username,
      photoURL: $user?.photoURL,
      published: true,
      bio: "I am a friend of the trees",
      links: [{ title: "Test Link", url: "https://kung.foo", icon: null }],
    });
    await batch.commit();
    isAvailable = false;
    doIOwnUsername = true;
    currentUsername = username;
  }
</script>

<AuthCheck>
  <h2>Select your username</h2>
  <h3>Current User: {$user?.uid}</h3>
  <h3>Current Username: {currentUsername}</h3>
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
    {:else if isAvailable}
      <p class="text-green-500">
        {username} is available!
      </p>
      <p>
        <small> 🎄💯🔥 LESS GOOOO 🎄</small>
      </p>
    {:else if !doIOwnUsername}
      <p class="text-red-500">
        Sorry, {username} is already taken. Please choose another 😭
      </p>
      <p>
        {#if currentUsername}
          <small>
            You can still use @{currentUsername} if you like.
          </small>
        {/if}
      </p>
    {:else}
      <p class="text-green-500">You already own this username! 🎉</p>
    {/if}

    {#if username}
      {#if !doIOwnUsername && isAvailable}
        <button class="btn btn-success">Confirm username: @{username} </button>
      {:else if isAvailable}
        <button class="btn btn-success"
          >Update username to: @{username}
        </button>
      {/if}
    {/if}
  </form>
</AuthCheck>

<style>
  p {
    font-style: italic;
    padding: 0.5rem;
  }
  input {
    margin: 0.5rem 0;
  }
</style>
