<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let svg;
  let worldData;
  let csvData;

  async function loadWorldData() {
    const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
    worldData = await response.json();
  }

  async function loadCSVData() {
    const res = await fetch('data_cleaned.csv'); 
    const csv = await res.text();
    csvData = d3.csvParse(csv, d3.autoType);
    console.log(csvData);
  }

  onMount(async () => {
    await loadWorldData();
    await loadCSVData();

    const width = 500; // Set desired width
    const height = 390; // Set desired height

    const projection = d3.geoMercator()
      .fitSize([width, height], worldData);

    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(csvData, d => d.value)]) // Adjust domain based on your data
      .range(["lightblue", "darkblue"]); // Adjust range colors as needed

    svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('path')
      .data(worldData.features)
      .enter().append('path')
      .attr('d', d3.geoPath().projection(projection))
      .style('fill', d => {
        const countryData = csvData.find(item => item.country === d.properties.name);
        return countryData ? colorScale(countryData.value) : 'lightgrey';
      })
      .style('stroke', 'white')
      .style('stroke-width', 0.5);

    // Legend
    const legend = svg.append("g")
      .attr("transform", "translate(20," + (height + 20) + ")"); // Adjust position of the legend

    const legendScale = d3.scaleLinear()
      .domain([0, d3.max(csvData, d => d.value)])
      .range([10, 50]); // Adjust the size of legend rectangles

    const legendAxis = d3.axisBottom(legendScale) // Use axisBottom for bottom placement

    legend.append("g")
      .attr("class", "legend-axis")
      .attr("transform", "translate(0,20)") // Adjust the position of the axis
      .call(legendAxis);

    legend.selectAll("rect")
      .data(legendScale.ticks(5))
      .enter().append("rect")
      .attr("x", d => legendScale(d))
      .attr("y", 0)
      .attr("width", 10) // Adjust the width of legend rectangles
      .attr("height", 20) // Adjust the height of legend rectangles
      .style("fill", d => colorScale(d));

    legend.append("text")
      .attr("x", -10)
      .attr("y", -5)
      .attr("font-size", "12px")
      .text("Legend");
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
