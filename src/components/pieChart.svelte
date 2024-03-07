<script>
    import * as d3 from 'd3';
    import { data_pie_chart } from '../lib/data_pie_chart';
	let selectedYear = 2022;
    let arcGenerator = d3.arc()
        .innerRadius(10)
        .outerRadius(200)
        .padAngle(.02)
        .cornerRadius(4);

    let recorded_mouse_position = { x: 0, y: 0 };
    let hovered = -1;
    let arc_data = [];

    // Define the color scale with different colors for each section
    const arc_color = d3.scaleOrdinal()
        .domain(data_pie_chart[selectedYear].map(d => d.Airline))
        .range(d3.schemeCategory10); // You can use any color scheme you prefer

    $: {
        arc_data = d3.pie()
            .value(d => d.Share)
            (data_pie_chart[selectedYear]);
    }
</script>
<div class="overlay">
	<label for="slider">Years {selectedYear}</label>
	<input
		id="slider"
		type="range"
		min="2018"
		max="2022"
		bind:value={selectedYear}
	/>
</div>
<div class="visualization">
    <svg width="500" height="500">
        <!-- Title for the graph -->
        <text x="250" y="30" text-anchor="middle" font-size="20px" font-weight="bold">Airline distribution for San Diego Airport (2018-2022)</text>
        <g transform="translate(250, 250)">
            {#each arc_data as data, index}
                <path
                    d={arcGenerator({
                        startAngle: data.startAngle,
                        endAngle: data.endAngle
                    })}
                    fill={index === hovered ? "brown" : arc_color(data.data.Airline)}
                    on:mouseover={(event) => { hovered = index; recorded_mouse_position = { x: event.pageX, y: event.pageY }}}
                    on:mouseout={() => hovered = -1}
                />
                <text
                    x={arcGenerator.centroid(data)[0]}
                    y={arcGenerator.centroid(data)[1]}
                    text-anchor="middle"
                    alignment-baseline="middle"
                    font-size="13.5px"
					style="font-family: Georgia;"
                >
                    {data.data.Airline.replace(' Airlines', '')} <!-- Remove 'Airlines' from the text -->
                </text>
            {/each}
        </g>
    </svg>

    <div class={hovered === -1 ? "tooltip-hidden" : "tooltip-visible"}
        style="left: {recorded_mouse_position.x + 40}px; top: {recorded_mouse_position.y + 40}px">
        {#if hovered !== -1}
            {arc_data[hovered].data.Share}% of the total flights are {arc_data[hovered].data.Airline == "Other Airlines" ? "other" : arc_data[hovered].data.Airline}.
        {/if}
    </div>
</div>

<style>
	.overlay {
        text-align: left;
    }
    .visualization {
        font: 20px sans-serif;
        margin: auto;
        margin-top: 1px;
        text-align: left;
    }

    /* dynamic classes for the tooltip */
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