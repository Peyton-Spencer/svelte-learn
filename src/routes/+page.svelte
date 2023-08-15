<script>
  import { goto } from "$app/navigation";
</script>

<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<h1 class="text-3xl font-bold underline">Welcome to SvelteKit</h1>

<button
  class="btn btn-primary"
  on:click={() => {
    goto(`/users/peyton`);
  }}>Hello Peyton</button
>
<button
  class="btn btn-secondary"
  on:click={() => {
    goto(`/boats`);
  }}>Boats for Sale</button
>

<button
  class="btn btm-nav-sm"
  on:click={() => {
    goto(`/login`);
  }}>Login</button
>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.slate.800);
  }
</style>
