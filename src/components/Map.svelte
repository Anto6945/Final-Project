<script>
  import * as d3 from "d3";
  import { onMount } from "svelte";

  onMount(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3
      .select("#map")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100vh")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", "22px")
      .text("Hover over each country for number of arrivals");

    const g = svg.append("g");

    const projection = d3
      .geoNaturalEarth1()
      .translate([width / 2, height / 2])
      .scale(width / 2 / Math.PI);

    const pathGenerator = d3.geoPath().projection(projection);

    d3.json("custom.geo.json").then((geojsonData) => {
      g.selectAll("path")
        .data(geojsonData.features)
        .enter()
        .append("path")
        .attr("d", pathGenerator)
        .attr("fill", "lightblue") // Change color as needed
        .attr("stroke", "white"); // Add stroke for country borders
    });
    d3.csv("data_cleaned3.csv").then((csvData) => {
      // Use the CSV data to update the map
      console.log(csvData); 
    });
  });
</script>

<main>
  <h1 class="title">Number of Arrivals in Country Per Year.</h1>
  <div id="para">
    <p>
    This map shows the number of arrivals per country per year. We are trying to find out which country is the most traveled to relative to others.  <br /><br />
    </p>
  </div>
</main>

<div id="map"></div>

<style>
  /* Define your CSS styles here */
</style>
