<!--
	@component
	Generates an SVG map using the `geoPath` function from [d3-geo](https://github.com/d3/d3-geo).
 -->
 <script>
	import { getContext, createEventDispatcher } from 'svelte';
	import { geoPath } from 'd3-geo';
    import * as d3 from 'd3';
    import { data_BarGraphUS } from '../lib/data_BarGraphUS';
  import { hovered, recorded_mouse_position } from './stores.js';

	const { data, width, height, zGet } = getContext('LayerCake');

	/** @type {Function} projection – A D3 projection function. Pass this in as an uncalled function, e.g. `projection={geoAlbersUsa}`. */
	export let projection;

	/** @type {Number} [fixedAspectRatio] – By default, the map fills to fit the $width and $height. If instead you want a fixed-aspect ratio, like for a server-side rendered map, set that here. */
	export let fixedAspectRatio = undefined;

	/** @type {String} [fill] – The shape's fill color. By default, the fill will be determined by the z-scale, unless this prop is set. */
	export let fill = undefined;

	/** @type {String} [stroke='#333'] – The shape's stroke color. */
	export let stroke = '#333';

	/** @type {Number} [strokeWidth=0.5] – The shape's stroke width. */
	export let strokeWidth = 0.5;

	/** @type {Array} [features] – A list of GeoJSON features. Use this if you want to draw a subset of the features in `$data` while keeping the zoom on the whole GeoJSON feature set. By default, it plots everything in `$data.features` if left unset. */
	export let features = undefined;

	/* --------------------------------------------
	 * Here's how you would do cross-component hovers
	 */
	const dispatch = createEventDispatcher();
    let coordinates = data_BarGraphUS.map(({ CoordinatesE, CoordinatesN, Passengers, City }) => ({
      long: +CoordinatesE,
      lat: +CoordinatesN,
      passengers: +Passengers,
      city: City
  }));


  const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(data_BarGraphUS, d => +d.Passengers)])
      .range([0, 1.5]);

	$: fitSizeRange = fixedAspectRatio ? [100, 100 / fixedAspectRatio] : [$width, $height];

	$: projectionFn = projection()
		.fitSize(fitSizeRange, $data);

	$: geoPathFn = geoPath(projectionFn);

	function handleMousemove(feature) {
		return function handleMousemoveFn(e) {
			// When the element gets raised, it flashes 0,0 for a second so skip that
			if (e.layerX !== 0 && e.layerY !== 0) {
				dispatch('mousemove', { e, props: feature.properties });
			}
		}
	}
</script>
<svg viewBox = "0 0 80 80" style = "z-index: 1;" >
<g
	class="map-group"
	on:mouseout={(e) => dispatch('mouseout')}
	on:blur={(e) => dispatch('mouseout')}
>
	{#each (features || $data.features) as feature}
		<path
			class="feature-path"
			fill="{"lightblue" || $zGet(feature.properties)}"
			stroke={stroke}
			stroke-width={strokeWidth}
			d="{geoPathFn(feature)}"
			on:mouseover={(e) => dispatch('mousemove', { e, props: feature.properties })}
			on:focus={(e) => dispatch('mousemove', { e, props: feature.properties })}
			on:mousemove={handleMousemove(feature)}
		></path>
	{/each}
    {#each coordinates as coordinate}
          <circle
		  	  style = "z-index: 100;"
              cx={projectionFn([coordinate.long, coordinate.lat])[0]}
              cy={projectionFn([coordinate.long, coordinate.lat])[1]}
              r={radiusScale(coordinate.passengers)}
              fill="hotpink"
              on:mouseover={(event) => {hovered.set({city: coordinate.city, passengers: coordinate.passengers});
                        recorded_mouse_position.set({
						x: event.pageX,
						y: event.pageY
						})}}
					    on:mouseout={(event) => { hovered.set(-1); }}

          />
    {/each}
</g>
</svg>
<style>
	/* .feature-path {
		stroke: #333;
		stroke-width: 0.5px;
	} */
	.feature-path:hover {
		stroke: #000;
		stroke-width: 2px;
	}
	.feature-path:focus {
		outline: none;
	}
  .tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}

	.tooltip-visible {
		font: 14px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #f0dba8;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}
</style>