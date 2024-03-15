<script>
    import { dataBargraph } from '../lib/dataBargraph';
    import * as d3 from 'd3';
    let worldData;
    let coordinates = [];
    const projection = d3.geoMercator()
        .scale(100)
        .translate([400, 275]);
    const path = d3.geoPath().projection(projection);
    let hovered = -1;
    let recorded_mouse_position = {x: 0, y: 0};
    for (let i = 0; i < dataBargraph.length; i++) {
        let coordinate = {
            long: +dataBargraph[i].CoordinatesE,
            lat: +dataBargraph[i].CoordinatesN,
            passengers: +dataBargraph[i].Passengers,
            city: dataBargraph[i].City
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
    <svg viewBox="0 0 800 550" style = "left:300px; scale:0.9">
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
                        on:mouseover={(event) => {hovered = {city: coordinate.city, passengers: coordinate.passengers};
                        recorded_mouse_position = {
						x: event.pageX,
						y: event.pageY
						}}}
					    on:mouseout={(event) => { hovered = -1; }}
                    />
                {/each}
                <circle 
	style = "z-index: 10;" 
	cx={projection([-117.197624,32.731770])[0]} 
	cy={projection([-117.197624,32.731770])[1]} 
	r="10" 
	fill="purple"
    on:mouseover={(event) => hovered = 1}
    />
            {:else}
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Failed to load data</text>
            {/if}
        {/await}
    </svg>
    <div class={hovered === -1 ? "tooltip-hidden" : (hovered === 1 ? "tooltip-sd" : "tooltip-visible")}
		style="left: {recorded_mouse_position.x + 40}px; top:
		{recorded_mouse_position.y + 40}px; z-index: 3;">
		{#if hovered !== -1}
            {#if hovered == 1}
                San Diego with 24,000,000 annual passengers
            {:else}
                {hovered.city} with {hovered.passengers} annual passengers
            {/if}
		{/if}
	</div>
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
    .tooltip-hidden {
		visibility: hidden;
		font-family: "Nunito", sans-serif;
		width: 200px;
		position: absolute;
	}


	.tooltip-visible {
		font: 14px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #ebcc88;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}

    .tooltip-sd {
		font: 14px sans-serif;
		font-family: "Nunito", sans-serif;
		visibility: visible;
		background-color: #CBC3E3;
		border-radius: 10px;
		width: 200px;
		color: black;
		position: absolute;
		padding: 10px;
	}
  </style>
  