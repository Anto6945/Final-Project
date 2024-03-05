<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { datatop } from '../lib/data';

  let svg;
  let worldData;

  async function loadWorldData() {
    const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
    worldData = await response.json();
  }

  onMount(async () => {
    await loadWorldData();

    const width = 500; // Set desired width
    const height = 390; // Set desired height

    const projection = d3.geoMercator()
      .scale(100) // Adjust scale to make the map smaller
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('path')
      .data(worldData.features)
      .enter().append('path')
      .attr('d', path)
      .style('fill', 'lightblue')
      .style('stroke', 'white')
      .style('stroke-width', 0.5);
  });
</script>

<main>
  <svg></svg>
</main>

<style>
  svg {
    width: 100%;
    height: auto; /* Allow SVG to scale with container width */
    max-height: 80vh; /* Limit maximum height */
  }
</style>
