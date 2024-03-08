<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { dataBargraph } from '../lib/dataBargraph';
  
    let svgMap;
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
        // Show the svgMap element once the map is loaded
        svgMap.style('display', 'block');
    }
  
    let coordinates = [];
  
    for (let i = 0; i < dataBargraph.length; i++) {
        let coordinate = {
            long: +dataBargraph[i].CoordinatesE,
            lat: +dataBargraph[i].CoordinatesN,
            passengers: +dataBargraph[i].Passengers.replace(',', '') // Convert string to number
        };
        coordinates.push(coordinate);
    }
  
    const radiusScale = d3.scaleLinear()
        .domain([0, d3.max(dataBargraph, d => +d.Passengers)]) // Domain is from 0 to maximum number of passengers
        .range([2, 10]); // Range of circle radius
  
    onMount(async () => {
        svgMap = d3.select('svg')
            .attr('width', width)
            .attr('height', height)
            .style('display', 'none')
            .style('scale','.5')
            .style('transform','translate(0, 0)');
            //.style('z-index','1');
  
        await loadWorldData();
        
        const g = svgMap.append('g');
  
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
            .attr('r', d => radiusScale(d.passengers)) // Use the radius scale
            .attr('transform', d => {
                const [x, y] = projection([d.long, d.lat]);
                console.log(`(${x}, ${y})`);
                return `translate(${x}, ${y})`;
            })
            .style('fill', 'hotpink');
    });
  </script>
  
  <main>
    <svg id="svgMap"></svg>
  </main>
  
  <style>
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: auto;
      max-height: 80vh;
      z-index: 1;
    }
  </style>
  