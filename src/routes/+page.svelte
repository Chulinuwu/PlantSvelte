<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { getVirtualPinData, setVirtualPinData } from '$lib/blynk';
    import bgtree2 from '../asset/image/bgtree2.png';
    import bgforest from '../asset/image/bgforest.png';
  
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
      interval = setInterval(fetchData, 2000); // Fetch every 5 seconds
    });
  
    onDestroy(() => {
      clearInterval(interval); // Clear interval on component destroy
    });
  </script>

<div class="relative h-screen flex py-10 justify-center items-end  text-black bg-forest" >
  <div class="relative">
    <img src={bgtree2} alt="bg tree" class="relative w-[500px] h-[500px]" />
    <div class="absolute transform bottom-0 left-[-500px] flex flex-col gap-2 bg-green-300 w-64 h-64 text-center items-center justify-center rounded-full p-2">
      <div class="font-medium text-3xl">Humidity</div>
      <div class="font-semibold text-7xl">{pinValues.v1}</div>
    </div>
    <div class="absolute transform bottom-72 -left-96 flex flex-col gap-2 bg-red-300 w-64 h-64 text-center items-center justify-center rounded-full p-2">
      <div class="font-medium text-3xl">Temperature</div>
      <div class="font-semibold text-7xl">{pinValues.v2}</div>
    </div>
    <div class="absolute transform bottom-[500px] -left-36 flex flex-col gap-2 bg-blue-300 w-64 h-64 text-center items-center justify-center rounded-full p-2">
      <div class="font-medium text-3xl">Motor State</div>
      <div class="font-semibold text-7xl">{pinValues.v1}</div>
    </div>
    <div class="absolute transform bottom-0 right-[-500px] flex flex-col gap-2 bg-yellow-300 w-64 h-64 text-center items-center justify-center rounded-full p-2">
      <div class="font-medium text-3xl">Light Intensity</div>
      <div class="font-semibold text-7xl">{pinValues.v1}</div>
    </div>
    <div class="absolute transform bottom-72 -right-96 flex flex-col gap-2 bg-purple-300 w-64 h-64 text-center items-center justify-center rounded-full p-2">
      <div class="font-medium text-3xl">Soil Moist</div>
      <div class="font-semibold text-7xl">{pinValues.v1}</div>
    </div>
    <div class="absolute transform bottom-[500px] -right-36 flex flex-col gap-2 bg-pink-300 w-64 h-64 text-center items-center justify-center rounded-full p-2">
      <div class="font-medium text-3xl">Water Level</div>
      <div class="font-semibold text-7xl">{pinValues.v1}</div>
    </div>
  </div>
</div>

<style type="text/css">
  .bg-forest {
    background: 
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('../asset/image/bgforest.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    width: 100%;
  }
</style>


<!-- <img style="display: block;-webkit-user-select: none;margin: auto;background-color: hsl(0, 0%, 25%);" src="http://192.168.1.39:5000/video_feed" width="430" height="322" alt="Video feed">
  <main>
    <h1>Blynk with SvelteKit</h1>
    <p>Pin Value (v1): {pinValues.v1}</p>
    <p>Pin Value (v2): {pinValues.v2}</p>
    <p>Pin Value (v3): {pinValues.v3}</p>
    <p>Pin Value (v4): {pinValues.v4}</p>
    <button on:click={() => updateV3(pinValues.v3 === 1 ? 0 : 1)}>Toggle v3</button>
</main> -->