<script>
	import * as d3 from "d3";
	
	export let datatop;
  //import {selectedYear} from "./BarGraph1.svelte";

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
    .domain([0, d3.max(datatop, d => d['2020']*0.8)])
    .range([0, innerWidth*0.8]);

  const yScale = d3
    .scaleBand()
    .domain(datatop.map(d => d.Country_Name))
    .range([innerHeight, 0])
    .padding(0.25);
</script>

<div class="wrapper" bind:clientWidth={width}>
  <svg {width} {height}>
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {#each datatop as country}
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
					width={xScale(country['2020'])}
          height={yScale.bandwidth()}
        />
        <text
          text-anchor="start"
          x={xScale(country['2020'])}
          dx="10"
          y={yScale(country.Country_Name) + yScale.bandwidth() / 2}
          dy=".35em"
        >
          {formatLabel(country['2020'])}
        </text>
      {/each}
    </g>
  </svg>
</div>

<style>
  .wrapper {
    position: relative;
    width: 100%;
    max-width: 700px;
  }

  rect {
    fill: #4427ca;
  }
</style>
