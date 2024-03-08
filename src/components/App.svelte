<link href="bootstrap/css/bootstrap.css" rel="stylesheet">
<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import BarGraph1 from './BarGraph1.svelte';
  import BarGraphUS from './BarGraphUS.svelte';
  import Linegraph from "./Linegraph.svelte";
  import PieChart from "./PieChart.svelte";
  import Introduction from "./Introduction.svelte";
  import {onMount} from 'svelte';
  import * as d3 from 'd3';
  import Map from "./Map.svelte";
  //import svgMap from "./Map.js";
  
  let count, index, offset, progress;
  let width, height;
  let data1 = [];
   onMount(async () => {
    function getTop10Objects(arr, property) {
      // Sort the array of objects by the specified property in descending order
      const sortedArr = arr.slice().sort((a, b) => b[property] - a[property]);
 
 
      // Return the top 10 objects
      return sortedArr.slice(0, 10);
    }
    const res = await fetch('data_cleaned.csv');
    const csv = await res.text();
    data1 = d3.csvParse(csv, d3.autoType);
    console.log(data1);
    const top10Objects = getTop10Objects(data1, '1995');
    console.log(top10Objects);
  });
 </script>
 
 
 <main>
  <h1 class="custom-heading">Visualizing San Diego Airport (SAN) Air Traffic</h1>
  <Scroller
    top={0.0}
    bottom={1}
    threshold={0.5}
    bind:count
    bind:index
    bind:offset
    bind:progress
  >
 
 
    <div
      class="background" slot="background"
      bind:clientWidth={width} bind:clientHeight={height}
    ></div>
    <div class="foreground" slot="foreground">
      <section><Introduction/></section>
      <section><Linegraph/></section>
      <section><PieChart/></section>
      <section><BarGraphUS/></section>
      <section><BarGraph1/></section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section><div class="display"><Map/></div></section>

    </div>
  </Scroller>
 </main>
 
 
 
 
 <style>
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: rgba(0, 0, 0, 0); /* 20% opaque */
    outline: white 3px;
  }
 
 
  .foreground {
    width: 100%;
    margin: 0 auto;
    height: auto;
    position: relative;
    outline: white 3px;
  }
 
 
  section {
    height: 80vh;
    background-color: white; /* 20% opaque */
    /* color: white; */
    outline: white 3px;
    text-align: center;
    max-width: 2000px; /* adjust at will */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;}
    .custom-heading {
    font-family: Arial, sans-serif; /* Specify the desired font family */
    font-size: 34px; /* Adjust font size as needed */
    font-weight: bold; /* Optionally, adjust font weight */
    color: #333; /* Optionally, specify font color */
    text-align: center;
  }
 
 
 </style>
 
 
 
 