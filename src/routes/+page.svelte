<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { getVirtualPinData, setVirtualPinData } from '$lib/blynk';
	import bgtree2 from '../asset/image/bgtree2.png';

	let pinValues = {
		v1: 0,
		v2: 0,
		v3: 0,
		v4: 0,
		v5: 0,
		v6: 0
	};

	let interval: number;

	async function fetchData() {
		try {
			pinValues.v1 = await getVirtualPinData('v1');
			pinValues.v2 = await getVirtualPinData('v2');
			pinValues.v3 = await getVirtualPinData('v3');
			pinValues.v4 = await getVirtualPinData('v4');
			pinValues.v5 = await getVirtualPinData('v5');
			pinValues.v6 = await getVirtualPinData('v6');
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
		fetchData();
		interval = setInterval(fetchData, 2000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});

	const members = [
		{
			name: 'Jirameth',
			surname: 'Wannasiwaporn',
			studentId: '6633033021',
			role: 'Embeded System Developer'
		},
		{ name: 'Amphikapha', surname: 'Thathong', studentId: '6633287021', role: 'UXUI Designer' },
		{
			name: 'Thipbadee',
			surname: 'Ngamsukkasemsri',
			studentId: '66330109021',
			role: 'System Architecture'
		}
	];
</script>

<div class="bg-forest flex items-center justify-center gap-10 px-16 py-10 text-black max-xl:hidden">
	<div class="flex h-full w-3/4 flex-col items-center justify-center gap-4 text-center">
		<img src={bgtree2} alt="bg tree" class="relative h-[500px] w-[500px]" />
		<div class="text-4xl font-semibold text-white">Samrong Squad</div>
	</div>
	<div class="flex h-full w-full flex-col gap-4 py-12">
		<div class="flex h-3/5 justify-center gap-4">
			<img
				class="w-4/6"
				style="display: block;-webkit-user-select: none;background-color: hsl(0, 0%, 25%);"
				src="http://localhost:5000/video_feed"
				alt="Video feed"
			/>
			<div class="flex w-2/6 flex-col rounded-lg bg-slate-100 p-4">
				<div class="mb-4 border-b-2 border-gray-300 text-center text-xl font-semibold">
					Samrong Squard
				</div>
				<div class="grid grid-cols-[2fr_3fr] gap-x-4 gap-y-2 text-sm font-medium">
					{#each members as member}
						<div class="text-left">Name:</div>
						<div class="text-left">{member.name} {member.surname}</div>
						<div class="text-left">Student ID:</div>
						<div class="text-left">{member.studentId}</div>
						<div class="text-left">Role:</div>
						<div class="text-left">{member.role}</div>
					{/each}
				</div>
			</div>
		</div>
		<div class="grid flex-grow grid-cols-3 grid-rows-2 gap-4 text-center text-black">
			<div class="flex flex-col items-center justify-center rounded-lg bg-[#edeea5]">
				<div class="text-xl font-medium">Temperature</div>
				<div class="text-4xl font-semibold">{pinValues.v2}%</div>
			</div>
			<div class="flex flex-col items-center justify-center rounded-lg bg-[#edeea5]">
				<div class="text-xl font-medium">Humidity</div>
				<div class="text-4xl font-semibold">{pinValues.v1}%</div>
			</div>
			<div class="flex flex-col items-center justify-center rounded-lg bg-[#edeea5]">
				<div class="text-xl font-medium">Light</div>
				<div class="text-4xl font-semibold">
					{#if pinValues.v5 === 1}
						Detected
					{:else}
						Not Detected
					{/if}
				</div>
			</div>
			<div class="flex flex-col items-center justify-center rounded-lg bg-[#edeea5]">
				<div class="text-xl font-medium">Soil Moist</div>
				<div class="text-4xl font-semibold">{pinValues.v4}%</div>
			</div>
			<div class="flex flex-col items-center justify-center rounded-lg bg-[#edeea5]">
				<div class="text-xl font-medium">Water Level</div>
				<div class="text-4xl font-semibold">{pinValues.v6}%</div>
			</div>
			<button
				class={`flex cursor-pointer flex-col items-center justify-center rounded-lg hover:bg-opacity-80 ${
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

<div
	class="bg-forest flex min-h-screen flex-col items-center gap-10 overflow-y-auto bg-fixed px-10 py-16 text-black xl:hidden"
>
	<div class="flex w-full flex-col items-center justify-center gap-4 text-center">
		<img src={bgtree2} alt="bg tree" class="h-64 w-64" />
		<div class="text-4xl font-semibold text-white">Samrong Squad</div>
	</div>
	<div class="flex h-auto w-auto items-center justify-center max-md:w-full">
		<img
			class="h-[300px] w-[500px] object-contain max-md:w-full"
			src="http://localhost:5000/video_feed"
			alt="Video feed"
		/>
	</div>
	<div class="mt-4 flex h-auto w-96 flex-col rounded-lg bg-slate-100 p-4">
		<div class="mb-4 border-b-2 border-gray-300 text-center text-xl font-semibold">
			Samrong Squad Members
		</div>
		<div class="text-md grid grid-cols-[2fr_3fr] gap-x-4 gap-y-2 font-medium">
			{#each members as member}
				<div class="text-left">Name:</div>
				<div class="text-left">{member.name} {member.surname}</div>
				<div class="text-left">Student ID:</div>
				<div class="text-left">{member.studentId}</div>
				<div class="text-left">Role:</div>
				<div class="text-left">{member.role}</div>
			{/each}
		</div>
	</div>
	<div class="flex flex-col gap-4">
		<div class="flex h-28 w-96 flex-col items-center justify-center rounded-lg bg-[#edeea5] p-4">
			<div class="text-xl font-medium">Temperature</div>
			<div class="text-4xl font-semibold">{pinValues.v2}%</div>
		</div>
		<div class="flex h-28 w-96 flex-col items-center justify-center rounded-lg bg-[#edeea5] p-4">
			<div class="text-xl font-medium">Humidity</div>
			<div class="text-4xl font-semibold">{pinValues.v1}%</div>
		</div>
		<div class="flex h-28 w-96 flex-col items-center justify-center rounded-lg bg-[#edeea5] p-4">
			<div class="text-xl font-medium">Light</div>
			<div class="text-4xl font-semibold">
				{#if pinValues.v5 === 1}
					Detected
				{:else}
					Not Detected
				{/if}
			</div>
		</div>
		<div class="flex h-28 w-96 flex-col items-center justify-center rounded-lg bg-[#edeea5] p-4">
			<div class="text-xl font-medium">Soil Moist</div>
			<div class="text-4xl font-semibold">{pinValues.v4}%</div>
		</div>
		<div class="flex h-28 w-96 flex-col items-center justify-center rounded-lg bg-[#edeea5] p-4">
			<div class="text-xl font-medium">Water Level</div>
			<div class="text-4xl font-semibold">{pinValues.v6}%</div>
		</div>
		<button
			class={`flex h-28 w-96 cursor-pointer flex-col items-center justify-center rounded-lg p-4 hover:bg-opacity-80 ${
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
		background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
			url('../asset/image/bg1.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 100vh;
		width: 100%;
	}
</style>
