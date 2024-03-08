<script>
    import { data_BarGraphUS } from '../lib/data_BarGraphUS';
    import { feature } from 'topojson-client';
    import { geoPath, geoAlbersUsa } from 'd3-geo';
    import { csv } from 'd3-fetch';
  
    let us;
    let coordinates = [];
    for (let i = 0; i < data_BarGraphUS.length; i++) {
        let coordinate = {
            long: +data_BarGraphUS[i].CoordinatesE,
            lat: +data_BarGraphUS[i].CoordinatesN,
            passengers: +data_BarGraphUS[i].Passengers
        };
        console.log(coordinate);
        coordinates.push(coordinate);
    }
    const projection = geoAlbersUsa()
        .scale(1000)
        .translate([400, 275]);
  
    const path = geoPath(projection);
  
    csv('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then((data) => {
        us = feature(data, data.objects.countries);
    });
  
    for (let i = 0; i < data_BarGraphUS.length; i++) {
        let coordinate = {
            long: +data_BarGraphUS[i].CoordinatesE,
            lat: +data_BarGraphUS[i].CoordinatesN,
            passengers: +data_BarGraphUS[i].Passengers
        };
        console.log(coordinate);
        coordinates.push(coordinate);
    }
  
    const radiusScale = d3.scaleLinear()
        .domain([0, d3.max(data_BarGraphUS, d => +d.Passengers)])
        .range([2, 10]);
  </script>
  
  <main>
    <svg viewBox="0 0 800 550">
        {#if us}
            {#each us.features as feature}
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
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Loading...</text>
        {/if}
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
  