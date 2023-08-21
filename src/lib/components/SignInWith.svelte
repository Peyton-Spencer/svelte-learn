<script lang="ts">
  import { auth, user } from "$lib/firebase";
  import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

  async function signIn() {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider);
    console.log(user);
  }
</script>

{#if $user}
  <h1 class="text text-4xl text-fuchsia-600">Welcome, {$user.displayName}</h1>
  <div class="divider divide-primary" />
  <p class="text text-green-500 my-4">You are now signed in!</p>
  <button class="btn btn-warning" on:click={() => signOut(auth)}
    >Sign out</button
  >
{:else}
  <h2 class="text-2xl">Login</h2>
  <button class="btn btn-primary" type="submit" on:click={signIn}
    >Sign in with Google</button
  >
{/if}
