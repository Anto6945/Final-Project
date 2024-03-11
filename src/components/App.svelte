 
 <style>

  @import '../../bootstrap/css/bootstrap.css';
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: rgba(0, 0, 0, 0); /* 20% opaque */
    outline: white 3px;
  }
 .btn-petit{
  font-size: 12px;
  padding: 7px 15px;
  border-radius: 5px;
}
.custom-button { background-color: rgb(202, 202, 202); }
 
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
  .btn-start{
    font-size: 30px;
    padding: 15px 30px;
    border-radius: 8px;
    display: flex;
    justify-content: center; /* Centre horizontalement */
    margin:auto;
    margin-top: 50px
  }
  
 </style>




<script>
  //<link href="bootstrap/css/bootstrap.css" rel="stylesheet">
  import Scroller from "@sveltejs/svelte-scroller";
  import BarGraph1 from './BarGraph1.svelte';
  import BarGraphUS from './BarGraphUS.svelte';
  import Linegraph from "./Linegraph.svelte";
  import PieChart from "./PieChart.svelte";
  import Introduction from "./Introduction.svelte";
  import Map from "./Map.svelte";
  import MapUS from "./MapUS.svelte";
  
  let count, index, offset, progress;
  let width, height;
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
      {:else}
      {#if airlines}
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section></section>
      <section><Map/></section>


    </div>
  </Scroller>
 </main>
 
 
 

 
 
 