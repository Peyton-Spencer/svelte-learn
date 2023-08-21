<script lang="ts">
  import { user } from "$lib/firebase";
</script>

{#if $user}
  <h1 class="text text-4xl text-fuchsia-600">Welcome, {$user.displayName}</h1>
  <div class="divider divide-primary" />
  <slot />
{:else}
  <p class="text-error">
    You must be signed in to view this page.
    <a class="btn btn-primary" href="/login/auth">Sign in</a>
  </p>
{/if}
