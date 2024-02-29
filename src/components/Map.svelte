<script>
import mapboxgl from "mapbox-gl";
  import { onMount } from "svelte";
  export let index;
  export let geoJsonToFit;

  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWFkaHlhbmF2IiwiYSI6ImNsc25tYzc2azA2NW8yaXBiem1wOWliZ2IifQ.fCJmOXCexNo2X5Qp0d8iBg";

  let container;
  let map;
</script>
<svelte:head>
  <link
    rel="stylesheet"
    href="https://api.mapbox.com/mapbox-gl-js/v2.14.0/mapbox-gl.css"
  />
</svelte:head>
<div class="map" class:visible={isVisible} bind:this={container} />