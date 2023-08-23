<script lang="ts">
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";
</script>

{#key $page.url}
  <div in:fly={{ y: "20%", duration: 300 }}>
    <slot />
  </div>
{/key}
