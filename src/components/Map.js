import { onMount } from 'svelte';
import * as d3 from 'd3';
import { dataBargraph } from '../lib/dataBargraph';

export let svgMap;
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
        lat: +dataBargraph[i].CoordinatesN
    };
    console.log(coordinate);
    coordinates.push(coordinate);
}

onMount(async () => {
    svgMap = d3.select('svgMap')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'none'); // Hide the svgMap element initially
    
    svgMap.style('left', `0px`).style('top', `00px`);
    svgMap.style('scale','1');
    svgMap.style('z-index', '1');


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
        .attr('r', 3)
        .attr('transform', d => {
            const [x, y] = projection([d.long, d.lat]);
            console.log(`(${x}, ${y})`);
            return `translate(${x}, ${y})`;
        })
        .style('fill', 'hotpink');
    
});