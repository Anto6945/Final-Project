<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let svg;
  
    onMount(() => {
      const width = 960;
      const height = 600;
  
      svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);
  
      d3.json('https://d3js.org/us-10m.v1.json').then(us => {
        const path = d3.geoPath();
  
        svg.append('g')
          .selectAll('path')
          .data(topojson.feature(us, us.objects.states).features)
          .join('path')
          .attr('fill', 'lightgray')
          .attr('stroke', 'white')
          .attr('d', path);
      });
    });
  </script>
  
  <svg></svg>
  
  <style>
    svg {
      width: 100%;
      height: auto;
    }
  </style>
  