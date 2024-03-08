<script>
  import * as d3 from 'd3';
  import { data_lineGraph } from '../lib/data_lineGraph'; // Importing the data from the file
  import { draw, scale } from 'svelte/transition';
  
  let show = false; // Variable to show/hide the line graph
  // Define margins and larger dimensions with increased left margin
  let margin = { top: 50, right: 70, bottom: 70, left: 135 };
  let width = 850 - margin.left - margin.right;
  let height = 600 - margin.top - margin.bottom;

  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);
  let hovered = -1;
  let recorded_mouse_position = {x: 0, y: 0};
  let line = d3.line()
      .x(d => x(parseInt(d.Year)) ) // Adjust x-coordinate by adding left margin
      .y(d => y(parseInt(d.Total)) ) // Adjust y-coordinate by adding top margin
      .curve(d3.curveBasis);

  // Extracting the years and totals for x and y domain
  let years = data_lineGraph.map(d => parseInt(d.Year));
  let totals = data_lineGraph.map(d => parseInt(d.Total));
  
  x.domain(d3.extent(years));
  y.domain([0, d3.max(totals)]);

  // Function to show tooltip on mouseover
  function showTooltip(event, d) {
      // Show tooltip with year and Total
        hovered = d.Year; 
				recorded_mouse_position = {
						x: event.pageX,
						y: event.pageY
						};
        console.log(hovered);
  }

  // Function to hide tooltip on mouseout
  function hideTooltip() {
      // Hide tooltip
      hovered = -1; 
  }
</script>
<label for="show" style="display: inline;">Show Line:</label>
<input id="show" type="checkbox" bind:checked={show} />
<svg viewBox="0 0 1000 800">
  <g transform="translate({margin.left},{margin.top})">
      <!-- Append the x-axis to the chart -->
      <g transform="translate(0,600)">
          <g>
              {#each x.ticks() as tick}
                  <g transform="translate({x(tick)},0)">
                      <line y2="6" stroke="currentColor"></line>
                      <text y="9" dy="0.71em" text-anchor="middle" fill="currentColor">{tick}</text>
                  </g>
              {/each}
          </g>
          <text x="425" y="40" text-anchor="middle" font-size="14px">Year</text>
      </g>

      <!-- Append the y-axis to the chart -->
      <g transform="translate(0,120)">
          <g>
              {#each y.ticks() as tick}
                  <g transform="translate(0,{y(tick)})">
                      <line x2="-6" stroke="currentColor"></line>
                      <text x="-9" dy="0.32em" text-anchor="end" fill="currentColor">{tick}</text>
                  </g>
              {/each}
          </g>
          <text x="100" y="-35" transform="rotate(-90)" text-anchor="middle" font-size="14px">Number of Passengers</text>
      </g>
      {#if (show)}
          <path transition:draw={{duration: 2000}} fill="none" stroke="steelblue" stroke-width="2" d="{line(data_lineGraph)}"></path>

      {#each data_lineGraph as d}
          <circle cx="{x(parseInt(d.Year)) }" cy="{y(parseInt(d.Total))}" r="3.5" fill="blue"
                  on:mouseover="{(e) => showTooltip(e, d)}" on:mouseout="{() => hideTooltip()}"></circle>
      {/each}    
      {/if}


  </g>
</svg>
<div class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}
style="left: {recorded_mouse_position.x + 40}px; top:
{recorded_mouse_position.y + 40}px">

{#if hovered !==  -1}
{#each data_lineGraph as d}
{#if d.Year == hovered}
  <p>{d.Year} - {d.Total} passengers</p>
{/if}
{/each}
{/if}
</div>

<style>
  svg {
      width: 100%; /* Make SVG responsive, expand to fill its container */
      height: auto; /* Maintain aspect ratio, scale height accordingly */
  }
  .tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}

	.tooltip-visible {
		font: 25px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #f0dba8;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}
</style>
