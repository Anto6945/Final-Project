<script>

	
	import { onMount } from 'svelte';
    import { data_BarGraphUS } from '../lib/data_BarGraphUS';
	import * as topojson from 'topojson-client';
	import { geoPath, geoAlbersUsa } from 'd3-geo';
	import { draw } from 'svelte/transition';
	
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
	
	const path = geoPath().projection(null);
	
	let states = [];
	let mesh;
	let selected;

	let coordinates = [];
  for (let i = 0; i < data_BarGraphUS.length; i++) {
        let coordinate = {
            long: +data_BarGraphUS[i].CoordinatesE,
            lat: +data_BarGraphUS[i].CoordinatesN,
            passengers: +data_BarGraphUS[i].Passengers
        };
        console.log(coordinate);
        coordinates.push(coordinate);
    }
	const points = coordinates.map(p => projection([p.long, p.lat]))
	
	onMount(async () => {
		const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
			.then(d => d.json())
		console.log({ us })
		
		states = topojson.feature(us, us.objects.states).features;
		// console.log({ features })
		

		mesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b);
		
		$: console.log({ states, mesh })
	})
</script>

<svg viewBox="0 0 975 610">
	<!-- State shapes -->
	<g fill="white" stroke="black">
		{#each states as feature, i}
			<path d={path(feature)} on:click={() => selected = feature} class="state" in:draw={{ delay: i * 50, duration: 1000 }} />
		{/each}
				

	</g>
		
	<!-- Interior lines -->
<!-- 	<path d={path(mesh)} fill="none" stroke="black" /> -->
		
	{#if selected}
		<path d={path(selected)} fill="hsl(0 0% 50% / 20%)" stroke="black" stroke-width={2} />
	{/if}
		
	
	
	{#each points as [cx, cy]}
		<circle {cx} {cy} r={10} fill="black" />
		<circle {cx} {cy} r={8} fill="white" />
		<circle {cx} {cy} r={5} fill="black" />
	{/each}
</svg>

<div class="selectedName">{selected?.properties.name ?? ''}</div>
	
<style>
	.state:hover {
		fill: hsl(0 0% 50% / 20%);
	}
	
	.selectedName {
		text-align: center;
		margin-top: 8px;
		font-size: 1.5rem;
	}
</style>