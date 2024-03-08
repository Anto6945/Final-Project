<script>
  import { dataBargraph } from '../lib/dataBargraph';
  import * as d3 from 'd3';
  let worldData;
  let coordinates = [];
  const projection = d3.geoMercator()
      .scale(100)
      .translate([400, 275]);
  const path = d3.geoPath().projection(projection);

  for (let i = 0; i < dataBargraph.length; i++) {
      let coordinate = {
          long: +dataBargraph[i].CoordinatesE,
          lat: +dataBargraph[i].CoordinatesN,
          passengers: +dataBargraph[i].Passengers.replace(',', '')
      };
      coordinates.push(coordinate);
  }

  async function loadWorldData() {
      const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
      worldData = await response.json();
  }

  const radiusScale = d3.scaleLinear()
      .domain([0, d3.max(dataBargraph, d => +d.Passengers)])
      .range([2, 10]);
</script>

<main>
  <svg viewBox="0 0 800 550">
      {#await loadWorldData()}
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Loading...</text>
      {:then}
          {#if worldData}
              {#each worldData.features as feature}
                  <path d={path(feature)} fill="lightblue" stroke="white" stroke-width="0.5" />
              {/each}
              {#each coordinates as coordinate}
                  <circle
                      cx={projection([coordinate.long, coordinate.lat])[0]}
                      cy={projection([coordinate.long, coordinate.lat])[1]}
                      r={radiusScale(coordinate.passengers)}
                      fill="hotpink"
                  />
              {/each}
          {:else}
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Failed to load data</text>
          {/if}
      {/await}
  </svg>
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
