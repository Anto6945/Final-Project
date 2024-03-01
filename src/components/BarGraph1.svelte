<script>
	
  import { datatop } from '../lib/data';

  export let selectedYear = 2020;
  import * as d3 from "d3";
  let dataUsed;
  function updateYear(value){
    console.log(selectedYear);
    dataUsed = datatop[String(value)];
    console.log(dataUsed);
    dataUsed=dataUsed.sort(
      (a, b) => a[selectedYear] - b[selectedYear],
    )
  };
  updateYear(selectedYear);
	
	const formatLabel = d3.format(',.0f');

	const margin = {
    top: 30,
    right: 100,
    bottom: 0,
    left: 110,
  };

	let width = 400;
  let height = 320;

  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

	$: xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataUsed, d => d[String(selectedYear)]*0.8)])
    .range([0, innerWidth*0.8]);

  $: yScale = d3
    .scaleBand()
    .domain(dataUsed.map(d => d.Country_Name))
    .range([innerHeight, 0])
    .padding(0.25);
</script>

<div class="overlay">
  <label for="slider">Years {selectedYear}</label>
  <input
      id="slider"
      type="range"
      min="1995"
      max="2020"
      bind:value={selectedYear}
      on:input={() => updateYear(selectedYear)}
  />
</div>

<div class="app">
    <div class="wrapper" bind:clientWidth={width}>
      <svg {width} {height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {#each dataUsed as country}
            <text
              text-anchor="end"
              x={-10}
              y={yScale(country.Country_Name) + yScale.bandwidth() / 2}
              dy=".35em"
            >
              {country.Country_Name}
            </text>
            <rect
              x={0}
              y={yScale(country.Country_Name)}
              width={xScale(country[String(selectedYear)])}
              height={yScale.bandwidth()}
            />
            <text
              text-anchor="start"
              x={xScale(country[String(selectedYear)])}
              dx="10"
              y={yScale(country.Country_Name) + yScale.bandwidth() / 2}
              dy=".35em"
            >
              {formatLabel(country[String(selectedYear)])}
            </text>
          {/each}
        </g>
      </svg>
    </div>
</div>
<main>
  <p> The bar chart below shows the most popular countries for travel. As we can see from 2004 onwards, France tends to be the most popular country with the most number of arrivals!</p>
</main>

<style>
    @import url("https://fonts.googleapis.com/css?family=Merriweather:700&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Lato:400&display=swap");
    
    :global(body) {
      color: #282828;
        background: #ffffff;
        font-family: "Lato", sans-serif;
        font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    }

  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
        margin: 0 15px;
  }
  .wrapper {
    position: relative;
    width: 100%;
    max-width: 700px;
  }

  rect {
    fill: #4427ca;
  }
</style>