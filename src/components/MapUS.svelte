<script>
	import { LayerCake, ScaledSvg, Html } from 'layercake';
	import { feature } from 'topojson-client';
	import { geoAlbersUsa } from 'd3-geo';
	import { scaleQuantize } from 'd3-scale';

    import { hovered, recorded_mouse_position } from './stores.js';

	import MapTool from './MapTool.svelte';

	import usStates from '../lib/us-states-topojson.js';


  
	const mapJoinKey = 'name';
	const dataLookup = new Map();


	const geojson = feature(usStates, usStates.objects.collection);
	const aspectRatio = 2.63;
	const projection = geoAlbersUsa;

	// Create a flat array of objects that LayerCake can use to measure
	// extents for the color scale
	const flatData = geojson.features.map(d => d.properties);
	const colors = ['#ffdecc', '#ffc09c', '#ffa06b', '#ff7a33'];
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
		The height is being set inline with `padding-bottom` using the aspect ratio trick below.
	*/
	.chart-container {
		position: relative;
		width: 100%;
	}
    .tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}

	.space{
		margin-top: 200px;
	}

	.tooltip-visible {
		font: 14px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #ebcc88;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}

	.tooltip-sd {
		font: 14px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #CBC3E3;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}
	
</style>
<div class={$hovered === -1 ? "tooltip-hidden" : ($hovered === 1 ? "tooltip-sd" : "tooltip-visible")}
		style="left: {$recorded_mouse_position.x + 40}px; top:
		{$recorded_mouse_position.y + 40}px; z-index: 3;">
		{#if ($hovered !== -1)}
			{#if ($hovered === 1)}
				San Diego with 24,000,000 annual passengers
			{:else}
			{$hovered.city} with {$hovered.passengers} annual passengers
			{/if}
		{/if}
</div>
<div class="space"></div>
<div class="chart-container" style="padding-bottom:{100 / aspectRatio}%; scale:1.5; left:-400px;z-index:2">
	<LayerCake
		ssr={true}
		position='absolute'
		data={geojson}
		z={d => dataLookup.get(d[mapJoinKey])}
		zScale={scaleQuantize()}
		zRange={colors}
		{flatData}
	>
		<ScaledSvg
			fixedAspectRatio={aspectRatio}
		>
			<MapTool
				fixedAspectRatio={aspectRatio}
				{projection}
			/>
		</ScaledSvg>
	</LayerCake>
</div>
