<script>
    import { onMount } from 'svelte';
    import { getVirtualPinData } from '$lib/blynk';
  
    let pinValues = {
      v1: 0,
      v2: 0,
      v3: 0,
      v4: 0
    };
  
    onMount(async () => {
      try {
        pinValues.v1 = await getVirtualPinData('v1');
        pinValues.v2 = await getVirtualPinData('v2');
        pinValues.v3 = await getVirtualPinData('v3');
        pinValues.v4 = await getVirtualPinData('v4');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  </script>
  
  <main>
    <h1>Blynk with SvelteKit</h1>
    <p>Pin Value (v1): {pinValues.v1}</p>
    <p>Pin Value (v2): {pinValues.v2}</p>
    <p>Pin Value (v3): {pinValues.v3}</p>
    <p>Pin Value (v4): {pinValues.v4}</p>
  </main>