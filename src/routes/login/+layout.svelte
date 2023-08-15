<script lang="ts">
  import { page } from "$app/stores";
  import { split } from "postcss/lib/list";

  type LoginStep = {
    route: string;
    step_name: string;
  };
  const login_steps: LoginStep[] = [
    { route: "auth", step_name: "Login" },
    { route: "username", step_name: "Pick your Name" },
    {
      route: "photo",
      step_name: "Pick Photo",
    },
  ];
</script>

<h1 class="text-4xl text-center">Welcome to Future Trees</h1>
<nav class="flex justify-center my-6">
  <ul class="steps">
    {#each login_steps as login_step (login_step.route)}
      <a
        href="/login/{login_step.route}"
        class="step block text-center transition-all px-2 py-2 mx-2 rounded-sm shadow-sm duration-200"
        class:step-primary={login_step.route === $page.route.id?.split("/")[2]}
      >
        {login_step.step_name}
      </a>
    {/each}
  </ul>
</nav>

<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
  <div class="card-body items-center text-center">
    <slot />
  </div>
</main>

<style>
  h1 {
    font-family: Fira Code, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
  }
</style>
