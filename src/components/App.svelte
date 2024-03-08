<script>
  import { data_BarGraphUS } from '../lib/data_BarGraphUS';
  import { feature } from 'topojson-client';
  import { geoPath, geoAlbersUsa } from 'd3-geo';

  const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
  const path = geoPath().projection(projection);

  let states = [];
  let mesh;
  let selected;

  let coordinates = data_BarGraphUS.map(({ CoordinatesE, CoordinatesN, Passengers }) => ({
      long: +CoordinatesE,
      lat: +CoordinatesN,
      passengers: +Passengers
  }));

  const points = coordinates.map(p => projection([p.long, p.lat]));

  const loadMapData = async () => {
      const us = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/counties-albers-10m.json')
          .then(d => d.json());

      states = feature(us, us.objects.states).features;
      mesh = feature(us, us.objects.states).features;
  }

  loadMapData();
</script>

<svg viewBox="0 0 975 610">
  <!-- State shapes -->
  <g fill="white" stroke="black">
      {#await states}
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Loading...</text>
      {:then}
          {#each states as feature, i}
              <path d={path(feature)} on:click={() => selected = feature} class="state" />
          {/each}
      {/await}
  </g>

  {#if selected}
      <path d={path(selected)} fill="hsl(0 0% 50% / 20%)" stroke="black" stroke-width={2} />
  {/if}
</svg>

<div class="selectedName">{selected?.properties.name ?? ''}</div>

<style>
  .state:hover {
      fill: hsl(0 0% 50% / 20%);
  }

  .selectedName {
      text-align: center;
      margin-top: 8px;
      font-size: 1.5rem;
  }
</style>
