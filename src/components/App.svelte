<script>
  import Scroller from "@sveltejs/svelte-scroller";
  import BarGraph1 from '../components/BarGraph1.svelte';
  //import BarGraph2 from '../components/BarGraph2.svelte';
  import {onMount} from 'svelte';
  
  let count, index, offset, progress;
  let width, height;
  let data1 = [];
onMount(async () => {
  const res = fetch('data_cleaned.csv'); 
  const csv = res.text();
  data1 = d3.csvParse(csv, d3.autoType)});

</script>
<main>
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
  bind:clientWidth={width} bind:clientHeight={height}>
</div>
<div class="foreground" slot="foreground">
  <section>This is the first section.</section>
  <section>This is the second section.<BarGraph1/></section>
  <section>This is the third section.</section>
  <section>This is the fourth section.</section>
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
