<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  let svg;
  let worldData = [];
  let arrivalData = [];

  // Function to load arrival data from CSV
  async function loadArrivalData() {
    const res = await fetch('https://raw.githubusercontent.com/Anto6945/Final-Project/main/static/data_cleaned3.csv');
    const csv = await res.text();
    arrivalData = d3.csvParse(csv, d3.autoType);
  }

  // Function to fetch and convert GeoJSON data
  async function fetchGeoJson(url) {
    const response = await fetch(url);
    return await response.json();
  }

  // Function to convert GeoJSON data to array
  async function convertGeoJsonToArray(url) {
    const geoJson = await fetchGeoJson(url);
    return geoJson.features.map(feature => ({
      name: feature.properties.name,
      id: feature.id
    }));
  }

  // Function to update the map with the arrival data for the year 2021
  async function updateMap() {
    const arrivalDataForYear = arrivalData.filter(d => d.Year === 2021);

    // Set up SVG container
    svg = d3.select('svg');

    // Define projection
    const projection = d3.geoMercator()
      .scale(200)
      .center([0, 20])
      .translate([width / 2, height / 2]);

    // Define path generator
    const path = d3.geoPath().projection(projection);

    // Map and color scale setup
    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(arrivalDataForYear, d => d.Arrivals)]);

    // Draw the map
    svg.selectAll("path")
      .data(worldData)
      .enter().append("path")
      .attr("d", path)
      .attr("fill", d => {
        const countryArrivalData = arrivalDataForYear.find(arrival => arrival.Country_Code === d.id);
        return countryArrivalData ? colorScale(countryArrivalData.Arrivals) : "gray";
      })
      .on("mouseover", mouseOver)
      .on("mouseleave", mouseLeave)
      .on("click", clicked);
  }

  // Function to handle mouse over event
  function mouseOver(d) {
    d3.select(this)
      .transition()
      .duration(100)
      .style("opacity", 0.7);
  }

  // Function to handle mouse leave event
  function mouseLeave(d) {
    d3.select(this)
      .transition()
      .duration(100)
      .style("opacity", 1);
  }

  // Function to handle click event
  function clicked(event, d) {
    const arrivalDataForCountry = arrivalData.find(arrival => arrival.Country_Code === d.id);
    const countryName = arrivalDataForCountry ? arrivalDataForCountry.Country : "Unknown";
    const arrivals = arrivalDataForCountry ? arrivalDataForCountry.Arrivals : "Data not available";
    alert(`Arrivals in ${countryName}: ${arrivals}`);
  }

  // Lifecycle hook to run on mount
  onMount(async () => {
    // Load arrival data
    await loadArrivalData();

    // Convert GeoJSON data to array
    worldData = await convertGeoJsonToArray('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');

    // Update the map with arrival data for the year 2021
    updateMap();
  });
</script>

<main>
  <svg width="960" height="600"></svg>
</main>

<style>
  /* Your CSS styles go here */
</style>
