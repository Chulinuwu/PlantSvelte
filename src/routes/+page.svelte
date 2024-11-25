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

<div class="flex gap-10 py-10 px-16 justify-center items-center text-black bg-forest max-xl:hidden">
  <div class="flex flex-col w-3/4 h-full gap-4 justify-center items-center text-center">
    <img src={bgtree2} alt="bg tree" class="relative w-[500px] h-[500px]" />
    <div class="text-4xl text-white font-semibold">Your Tree</div>
  </div>
  <div class="flex flex-col w-full h-full py-12 gap-4">
    <div class="flex h-3/5 gap-4 justify-center">
      <img class="w-4/6" style="display: block;-webkit-user-select: none;background-color: hsl(0, 0%, 25%);" src="http://localhost:5000/video_feed" alt="Video feed">
      <div class="flex flex-col w-2/6 p-4 bg-slate-100 rounded-lg">
        <div class="text-xl font-semibold text-center mb-4 border-b-2 border-gray-300">Your Tree Information</div>
        <div class="grid grid-cols-[2fr_3fr] gap-x-4 gap-y-2 text-md font-medium">
          <div class="text-left">Name:</div>
          <div class="text-left">Sunny Maple</div>
          <div class="text-left">Species:</div>
          <div class="text-left">Acer saccharum (Sugar Maple)</div>
          <div class="text-left">Age:</div>
          <div class="text-left">5 years</div>
          <div class="text-left">Location:</div>
          <div class="text-left">Backyard, Zone 7B</div>
          <div class="text-left">Health Status:</div>
          <div class="text-left">Healthy, vibrant green leaves</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 grid-rows-2 gap-4 flex-grow text-center text-black">
      <div class="flex flex-col items-center justify-center bg-[#edeea5] rounded-lg">
        <div class="text-xl font-medium">Temperature</div>
        <div class="text-4xl font-semibold">{pinValues.v1}%</div>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#edeea5] rounded-lg">
        <div class="text-xl font-medium">Humidity</div>
        <div class="text-4xl font-semibold">{pinValues.v1}%</div>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#edeea5] rounded-lg">
        <div class="text-xl font-medium">Light Intensity</div>
        <div class="text-4xl font-semibold">{pinValues.v1}%</div>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#edeea5] rounded-lg">
        <div class="text-xl font-medium">Soil Moist</div>
        <div class="text-4xl font-semibold">{pinValues.v1}%</div>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#edeea5] rounded-lg">
        <div class="text-xl font-medium">Water Level</div>
        <div class="text-4xl font-semibold">{pinValues.v1}%</div>
      </div>
      <button
        class={`flex flex-col items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-80 ${
          pinValues.v3 === 1 ? 'bg-green-500' : 'bg-red-500'
        }`}
        on:click={() => updateV3(pinValues.v3 === 1 ? 0 : 1)}
        aria-pressed={pinValues.v3 === 1 ? 'true' : 'false'}
      >
        <div class="text-xl font-medium text-white">Motor State</div>
        <div class="text-4xl font-semibold text-white">
          {pinValues.v3 === 1 ? 'ON' : 'OFF'}
        </div>
      </button>
    </div>
  </div>
</div>

<div class="flex flex-col gap-10 py-16 px-10 items-center text-black bg-forest bg-fixed min-h-screen overflow-y-auto xl:hidden">
  <div class="flex flex-col w-full gap-4 justify-center items-center text-center">
    <img src={bgtree2} alt="bg tree" class="w-64 h-64" />
    <div class="text-4xl text-white font-semibold">Your Tree</div>
  </div>
  <div class="flex max-md:w-full w-auto h-auto justify-center items-center bg-gray-500">
    <img class="w-[500px] max-md:w-full h-[300px] object-contain" 
         src="http://localhost:5000/video_feed" 
         alt="Video feed" />
  </div>
  <div class="flex flex-col w-96 h-auto p-4 bg-slate-100 rounded-lg">
    <div class="text-xl font-semibold text-center mb-4 border-b-2 border-gray-300">Your Tree Information</div>
    <div class="grid grid-cols-[2fr_3fr] gap-x-4 gap-y-2 text-md font-medium">
      <div class="text-left">Name:</div>
      <div class="text-left">Sunny Maple</div>
      <div class="text-left">Species:</div>
      <div class="text-left">Acer saccharum (Sugar Maple)</div>
      <div class="text-left">Age:</div>
      <div class="text-left">5 years</div>
      <div class="text-left">Location:</div>
      <div class="text-left">Backyard, Zone 7B</div>
      <div class="text-left">Health Status:</div>
      <div class="text-left">Healthy, vibrant green leaves</div>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col w-96 h-28 p-4 items-center justify-center bg-[#edeea5] rounded-lg">
      <div class="text-xl font-medium">Temperature</div>
      <div class="text-4xl font-semibold">{pinValues.v1}%</div>
    </div>
    <div class="flex flex-col w-96 h-28 p-4 items-center justify-center bg-[#edeea5] rounded-lg">
      <div class="text-xl font-medium">Humidity</div>
      <div class="text-4xl font-semibold">{pinValues.v1}%</div>
    </div>
    <div class="flex flex-col w-96 h-28 p-4 items-center justify-center bg-[#edeea5] rounded-lg">
      <div class="text-xl font-medium">Light Intensity</div>
      <div class="text-4xl font-semibold">{pinValues.v1}%</div>
    </div>
    <div class="flex flex-col w-96 h-28 p-4 items-center justify-center bg-[#edeea5] rounded-lg">
      <div class="text-xl font-medium">Soil Moist</div>
      <div class="text-4xl font-semibold">{pinValues.v1}%</div>
    </div>
    <div class="flex flex-col w-96 h-28 p-4 items-center justify-center bg-[#edeea5] rounded-lg">
      <div class="text-xl font-medium">Water Level</div>
      <div class="text-4xl font-semibold">{pinValues.v1}%</div>
    </div>
    <button
      class={`flex flex-col w-96 h-28 p-4 items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-80 ${
        pinValues.v3 === 1 ? 'bg-green-500' : 'bg-red-500'
      }`}
      on:click={() => updateV3(pinValues.v3 === 1 ? 0 : 1)}
      aria-pressed={pinValues.v3 === 1 ? 'true' : 'false'}
    >
      <div class="text-xl font-medium text-white">Motor State</div>
      <div class="text-4xl font-semibold text-white">
        {pinValues.v3 === 1 ? 'ON' : 'OFF'}
      </div>
    </button>
  </div>
</div>

<style type="text/css">
  .bg-forest {
    background: 
      linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('../asset/image/bg1.png');
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