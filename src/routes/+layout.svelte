<script>
  import "../app.css";
</script>

<div class="min-h-screen flex flex-col">
  <slot />
</div>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css?family=Fira+Code"
    rel="stylesheet"
  />
</svelte:head>

<style>
  :global(h1, h2, p) {
    font-family: Fira Code, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }
</style>
