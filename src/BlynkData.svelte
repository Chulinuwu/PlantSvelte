<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let data = null;
    let error = null;
  
    const BLYNK_AUTH_TOKEN = process.env.VITE_BLYNK_AUTH_TOKEN;
  
    onMount(async () => {
      try {
        const response = await axios.get(`https://blynk.cloud/external/api/get?token=${BLYNK_AUTH_TOKEN}&v0`);
        data = response.data;
      } catch (err) {
        error = err;
      }
    });
  </script>
  
  {#if error}
    <p>Error: {error.message}</p>
  {:else if data}
    <p>Data: {data}</p>
  {:else}
    <p>Loading...</p>
  {/if}