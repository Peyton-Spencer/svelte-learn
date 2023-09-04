<script lang="ts">
  import AuthCheck from "$lib/components/AuthCheck.svelte";
  import { db, user } from "$lib/firebase";
  import { doc, getDoc, writeBatch } from "firebase/firestore";

  let username = "";
  let currentUsername = "";
  let doIOwnUsername = false;
  let loading = false;
  let isAvailable = false;

  const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  $: isValid =
    username?.length > 2 && username.length < 16 && re.test(username);
  $: isTouched = username.length > 0;
  $: isTaken = isValid && !isAvailable && !loading;

  let debounceTimer: NodeJS.Timeout;

  async function checkAvailability() {
    isAvailable = false;
    clearTimeout(debounceTimer);
    loading = true;
    if (!isValid) {
      loading = false;
      return;
    }

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
    try {
      // NEED A WHERE USER UID === $user.uid QUERY I NEED RELATIONS
      const userDoc = await getDoc(doc(db, "users", $user!.uid));
      const currentUsernameDoc = await getDoc(
        doc(db, "usernames", currentUsername)
      );

      // if (
      //   userDoc.exists() &&
      //   // currentUsernameDoc.exists() &&
      //   // currentUsernameDoc.id === username
      // ) {
      //   console.log("User already owns this username");
      //   alert("You already own this username.");
      //   return;
      // }
      const batch = writeBatch(db);
      if (userDoc.exists()) {
        console.log("User already has a user doc");
        batch.delete(currentUsernameDoc.ref);
        batch.set(doc(db, "usernames", username), { uid: $user!.uid });
      } else {
        console.log("User is new. Creating doc");
        batch.set(doc(db, "usernames", username), { uid: $user!.uid });
        batch.set(doc(db, "users", $user!.uid), {
          username,
          photoURL: $user?.photoURL,
          published: true,
          bio: "I am a friend of the trees",
          links: [{ title: "Test Link", url: "https://kung.foo", icon: null }],
        });
      }
      await batch.commit();
      isAvailable = false;
      doIOwnUsername = true;
      currentUsername = username;
    } catch (err: any) {
      console.error(err.message);
    }
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
      bind:value={username}
      on:input={checkAvailability}
      class="input w-full"
      class:input-error={!isValid && isTouched}
      class:input-warning={isValid && isTouched && isTaken && !doIOwnUsername}
      class:input-success={isValid &&
        isTouched &&
        (isAvailable || doIOwnUsername)}
    />
    <div class="my-4 min-h-16 px-4 w-full">
      {#if !username}
        <p>Please pick a username</p>
      {:else if loading}
        <p class="text-secondary">Checking availability of @{username}...</p>
      {:else if !isValid && isTouched}
        <ol class="list-disc text-error text-sm text-left">
          <li>Yo, be 3-16 chars long please.</li>
          <li>
            and could u please use <ol class="list-disc pl-8">
              <li>[a-z]</li>
              <li>[0-9]</li>
              <li>period . and underscore _</li>
            </ol>
          </li>
          <li>tysm 💚🎄</li>
        </ol>
      {:else if isAvailable}
        <p class="text-green-500">
          {username} is available!
        </p>
        <p>
          <small> 🎄💯🔥 LESS GOOOO 🎄</small>
        </p>
      {:else if !doIOwnUsername}
        <p class="text-warning text-sm">
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
        <p class="text-success">You already own this username! 🎉</p>
      {/if}

      {#if username && isValid}
        {#if !doIOwnUsername && isAvailable}
          <button class="btn btn-success"
            >Confirm username: @{username}
          </button>
        {:else if isAvailable}
          <button class="btn btn-success"
            >Update username to: @{username}
          </button>
        {/if}
      {/if}
    </div>
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
