<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let svg;
    let usaData; // Variable to store United States data
  
    async function loadUSData() {
      const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/us-states.geojson');
      usaData = await response.json();
    }
  
    onMount(async () => {
      await loadUSData(); // Load US data instead of world data
  
      const width = 500; // Set desired width
      const height = 390; // Set desired height
  
      const projection = d3.geoAlbersUsa() // Use Albers projection for USA
        .scale(700) // Adjust scale to fit USA map properly
        .translate([width / 2, height / 2]);
  
      const path = d3.geoPath().projection(projection);
  
      svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);
  
      svg.selectAll('path')
        .data(usaData.features)
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
  