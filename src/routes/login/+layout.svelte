<script lang="ts">
  import { page } from "$app/stores";
  import AnimatedRoute from "$lib/components/AnimatedRoute.svelte";

  type LoginStep = {
    route: string;
    step_name: string;
  };
  const login_steps: LoginStep[] = [
    {
      route: "auth",
      step_name: "Login",
    },
    {
      route: "username",
      step_name: "Pick your Name",
    },
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
        class="step text-center px-2 py-2 mx-2 rounded-sm shadow-sm"
        class:step-primary={login_step.route === $page.route.id?.split("/")[2]}
      >
        {login_step.step_name}
      </a>
    {/each}
  </ul>
</nav>

<AnimatedRoute>
  <main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
    <div class="card-body items-center text-center">
      <slot />
    </div>
  </main>
</AnimatedRoute>

