<script>
	import { json } from 'd3-fetch'
	import { fly } from 'svelte/transition'
	import { geoEquirectangular, geoPath, geoGraticule10 } from 'd3-geo'
	import { format } from 'd3-format'
	import * as topojson from 'topojson'
  import { onMount } from 'svelte';
	
	
  let promise = [];

  onMount(async () => {
    const response = await fetch('../lib/countries-110m.json');
    const world = await response.json();
    promise = topojson.feature(world, world.objects.countries).features;
});
  
  
  
  const formatCoordinates = format('.2f')
	 
	const sphere = { type: 'Sphere' }
	
	const dimensions = {
		width: 975
	}
	
	const projection = geoEquirectangular()
		.fitWidth(dimensions.width, sphere)
	
	const pathGenerator = geoPath(projection)
	
	const y1 = pathGenerator.bounds(sphere)[1][1]
	dimensions.height = y1;
	
	const graticule = geoGraticule10();
	
	let coordinates = []
	let point = {
		x: dimensions.width / 2,
		y: dimensions.height / 2
	}
	
	let svg;
	let notice;
	$: if(notice) {
		const timeout = setTimeout(() => {
			notice = null;
			clearTimeout(timeout)
		}, 1000)
	}
</script>

<svg 
		 bind:this="{svg}" 
		 viewBox="0 0 {dimensions.width} {dimensions.height}" >
	<g>
		<path fill="hsl(0, 0%, 97%)" d="{pathGenerator(sphere)}" />
		<path stroke="hsl(0, 0%, 87%)" stroke-width="0.5" fill="none" d="{pathGenerator(graticule)}" />
			<g in:fly={{delay: 500, duration: 1000}}>
				
				
				<g fill="hotpink">
					{#each coordinates as { long, lat }, i}
						<circle r="3" transform="translate({projection([long, lat])})" />
					{/each}
				</g>
				 
				<g>
					<circle fill="hotpink" r="4" cx="{point.x}" cy="{point.y}" />
					<g fill="none" stroke="hotpink" stroke-width="2" stroke-dasharray="2 5">
						<path d="M {point.x} 0 v {dimensions.height}" />
						<path d="M 0 {point.y} h {dimensions.width}" />
					</g>
				</g>
				
				<g>
					<rect 
								on:mousemove="{({pageX: x, pageY: y}) => {
															const { width, height } = svg.getBoundingClientRect()
															point = {
															x: x / width * dimensions.width,
															y: y / height * dimensions.height
															}
														}}"
								on:click="{() => {
													let {x, y} = point
													const [long, lat] = projection.invert([x, y])
													coordinates = [...coordinates, {
															x,
															y,
															long,
															lat
														}]
													}}"
								opacity="0" 
								width="{dimensions.width}" 
								height="{dimensions.height}" />
				</g>
			</g>


	</g>
</svg>
	
<p>
		Click on the map to select a longitude and latitude
</p>


	
<style>
	:global(body) {
		padding: 0;
	}
	
	svg {
		width: 100%;
		height: auto;
		display: block;
	}
	
	svg text {
		fill: hsl(0, 0%, 30%);
		font-weight: bold;
		font-size: '1rem';
	}
	
	#notice {
		position: fixed;
		right: 1rem;
		bottom: 1rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		color: hsl(0, 0%, 96%);
		background: hsl(0, 0%, 20%);
	}
</style>