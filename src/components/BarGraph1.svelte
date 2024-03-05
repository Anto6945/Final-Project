<script>
	
  import { select_multiple_value } from 'svelte/internal';
  import { dataBargraph } from '../lib/dataBargraph';

  export let selectedYear = 2020;
  import * as d3 from "d3";
  let dataUsed = dataBargraph;
	
	const formatLabel = d3.format(',.0f');

	const margin = {
    top: 30,
    right: 100,
    bottom: 0,
    left: 110,
  };

	let width = 400;
  let height = 320;
  let recorded_mouse_position = {x: 0, y: 0};
  let hovered = -1;

  $: innerWidth = width - margin.left - margin.right;
  let innerHeight = height - margin.top - margin.bottom;

	$: xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataUsed, d => d[String(Passengers)]*0.8)])
    .range([0, innerWidth*0.8]);

  $: yScale = d3
    .scaleBand()
    .domain(dataUsed.map(d => d.City))
    .range([innerHeight, 0])
    .padding(0.25);
</script>

<div class="overlay">
  <label for="slider">Years {Passengers}</label>
  <input
      id="slider"
      type="range"
      min="1995"
      max="2020"
      bind:value={selectedYear}
  />
</div>

<div class="app">
    <div class="wrapper" bind:clientWidth={width}>
      <svg {width} {height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {#each dataUsed as country}
            <text
              text-anchor="end"
              x={hovered === country[String(Passengers)] ? -15 :-10}
              y={yScale(country.City) + yScale.bandwidth() / 2}
              opacity={hovered ? hovered === country[String(Passengers)] ? "1" : ".3" : "1"}
              dy=".35em"
            >
              {country.City}
            </text>
            <rect
              x={0}
              y={hovered === country[String(Passengers)] ? yScale(country.City)-1: yScale(country.City)}
              width={xScale(country[String(Passengers)])}
              height={hovered === country[String(Passengers)] ? yScale.bandwidth()+2 : yScale.bandwidth()}
              on:mouseover={(event) => { hovered = country[String(Passengers)];
                recorded_mouse_position = {
                  x: event.pageX,
                  y: event.pageY
                  }}}
              on:mouseout={() => hovered = -1}
            />
            {#if hovered !== -1 && hovered === country[String(Passengers)]}
            <text
            text-anchor="start"
            x={xScale(country[String(Passengers)])}
            dx="10"
            y={yScale(country.City) + yScale.bandwidth() / 2}
            dy=".35em"
          >
            {formatLabel(hovered)}
          </text>
            {/if}
          {/each}
        </g>
      </svg>
    </div>
</div>
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
    fill: #af23d5;
  }
</style>