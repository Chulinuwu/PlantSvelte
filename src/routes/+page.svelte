<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { getVirtualPinData, setVirtualPinData } from '$lib/blynk';
  
    let pinValues = {
      v1: 0,
      v2: 0,
      v3: 0,
      v4: 0
    };
  
    let interval: number;
  
    async function fetchData() {
      try {
        pinValues.v1 = await getVirtualPinData('v1');
        pinValues.v2 = await getVirtualPinData('v2');
        pinValues.v3 = await getVirtualPinData('v3');
        pinValues.v4 = await getVirtualPinData('v4');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    async function updateV3(value: number) {
      try {
        await setVirtualPinData('v3', value);
        pinValues.v3 = value;
      } catch (error) {
        console.error('Error setting data:', error);
      }
    }
  
    onMount(() => {
      fetchData(); // Initial fetch
      interval = setInterval(fetchData, 5000); // Fetch every 5 seconds
    });
  
    onDestroy(() => {
      clearInterval(interval); // Clear interval on component destroy
    });
  </script>
  
  <main>
    <h1>Blynk with SvelteKit</h1>
    <p>Pin Value (v1): {pinValues.v1}</p>
    <p>Pin Value (v2): {pinValues.v2}</p>
    <p>Pin Value (v3): {pinValues.v3}</p>
    <p>Pin Value (v4): {pinValues.v4}</p>
    <button on:click={() => updateV3(pinValues.v3 === 1 ? 0 : 1)}>Toggle v3</button>
  </main>