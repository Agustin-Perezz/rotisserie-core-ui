<script lang="ts">
  import { signInWithFacebook, signInWithGoogle } from '$lib/services/auth';

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };

  const handleSignInWithFacebook = async () => {
    await signInWithFacebook();
  };
</script>

<h1>log in</h1>
<button on:click={handleSignInWithGoogle} class="btn btn-primary">
  Sign in with Google
</button>
<button on:click={handleSignInWithFacebook} class="btn btn-primary">
  Sign in with Facebook
</button>
