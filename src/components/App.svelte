<!-- Your main Svelte file -->
<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import BarGraph1 from './BarGraph1.svelte';
  import BarGraph2 from './BarGraph2.svelte';
  import Writeup from './Writeup.svelte';
  import {onMount} from 'svelte';
  import Map from './Map.svelte';
  import * as d3 from 'd3';
  
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
  <h1>International Tourism over the Years (Arrivals Per Country)</h1>
  <p> Our project aims to show which countries have the most arrivals from abroad. We examine the most traveled and the least traveled countries and events that have occured that has changed the way people travel. 
  For example, COVID-19 was a major impact that significantly impacted international travel.  </p>
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
      <section>Map Interactive.<Map/></section>
      <p> The bar chart below shows the most popular countries for travel. As we can see after 2004, it seems that France tends to be the most popular country with the most number of arrivals!</p>
      <section>Bar Chart showing the top 10 most traveled countries!<BarGraph1/></section>
      <section>Bar Chart showing the top 10 least traveled countries!<BarGraph2/></section>
      <section> Writeup<Writeup/></section>
    </div>
  </Scroller>
</main>


<style>
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: rgba(0, 0, 0, 0.2); /* 20% opaque */
    outline: green solid 3px;
  }

  .foreground {
    width: 70%;
    margin: 0 auto;
    height: auto;
    position: relative;
    outline: red solid 3px;
  }

  section {
    height: 80vh;
    background-color: white; /* 20% opaque */
    /* color: white; */
    outline: magenta solid 3px;
    text-align: center;
    max-width: 2000px; /* adjust at will */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;
  }

</style>
