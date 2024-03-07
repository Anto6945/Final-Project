<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { dataBargraph } from '../lib/dataBargraph';
  
    let svg;
    let worldData;
  
    const width = 800;
    const height = 550;
  
    const projection = d3.geoMercator()
      .scale(100)
      .translate([width / 2, height / 2]);
  
    const path = d3.geoPath().projection(projection);
  
    async function loadWorldData() {
      const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
      worldData = await response.json();
    }
  
  
    let coordinates = [];
  
    for (let i = 0; i< dataBargraph.length; i++) {
      let coordinate = {
        long : +dataBargraph[i].CoordinatesE,
        lat : +dataBargraph[i].CoordinatesN
      };
      console.log(coordinate);
      coordinates.push(coordinate);
    }
  
    onMount(async () => {
      await loadWorldData();
  
      svg = d3.select('svg')
        .attr('width', width)
        .attr('height', height);
  
      const g = svg.append('g');
  
      g.selectAll('path')
        .data(worldData.features)
        .enter().append('path')
        .attr('d', path)
        .style('fill', 'lightblue')
        .style('stroke', 'white')
        .style('stroke-width', 0.5);
  
      g.selectAll('circle')
        .data(coordinates)
        .enter().append('circle')
        .attr('r', 3)
        .attr('transform', d => {
          const [x, y] = projection([d.long, d.lat]);
          console.log(`(${x}, ${y})`);
          return `translate(${x}, ${y})`;
        })
        .style('fill', 'hotpink');
    });
  </script>
  
  <main>
    <svg></svg>
  </main>
  
  <style>
    svg {
      position: relative;
      width: 100%;
      height: auto;
      max-height: 80vh;
    }
  </style>
  
  