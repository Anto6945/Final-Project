<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let svg;
  let worldData;

  async function loadWorldData() {
    const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
    worldData = await response.json();
  }

  onMount(async () => {
    await loadWorldData();

    const width = 960;
    const height = 600;

    const projection = d3.geoMercator()
      .scale(150)
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
    height: 100%;
  }
</style>
