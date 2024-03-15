 <style>

  @import '../../bootstrap/css/bootstrap.css';
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: rgba(0, 0, 0, 0); /* 20% opaque */
    outline: white 3px;
  }

  .background-image {
  width: 100%;
  height: 100vh;
  position: absolute;
  background-image: url('../../sky-background-video-conferencing_23-2148630092.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;

}

  space{
	height: 20vh;
    background-color: white; /* 20% opaque */
    /* color: white; */
    outline: white 3px;
    text-align: center;
    max-width: 2000px; /* adjust at will */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;
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
    text-align: center;
    max-width: 2000px; /* adjust at will */
    color: black;
    padding: 1em;
    margin: 0 0 2em 0;}
    .custom-heading {
    font-family: Arial, sans-serif; /* Specify the desired font family */
    font-size: 34px; /* Adjust font size as needed */
    font-weight: bold; /* Optionally, adjust font weight */
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
  let airlines = false;
  let ftimeAirline = false;
  let domestic = false;
  let inter = false;
  let barmap = true;
  let barmapUS = true;
  let start = false;
  let sectlinegraph;
  function scrollToSectionlinegraph() {
        if (sectlinegraph) {
            sectlinegraph.scrollIntoView({ behavior: 'smooth' });
            startTransition();
        }
    }


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
      class="background-image" slot="background"
      bind:clientWidth={width} bind:clientHeight={height}
    ></div>
    
    <div class="foreground" slot="foreground">
    <h1 class="custom-heading">Visualizing San Diego Airport (SAN) Air Traffic</h1>
      <section><Introduction/><button class = "btn bg custom-button btn-start" on:click={() => {start = !start;scrollToSectionlinegraph()}}>{!start ? "Let's get started !":"Reset"} </button></section>
      {#if start}

      <section bind:this={sectlinegraph}><Linegraph/></section>
      <button class = "btn bg custom-button btn-petit" on:click={() => {airlines = !airlines; ftimeAirline = true}}>Airlines</button>
      {#if ftimeAirline}
      {#if airlines}
      <section><PieChart/></section>
      {/if}
      <button class = "btn bg custom-button btn-petit" on:click={() => domestic = !domestic}>Domestic Flight</button>
      {#if domestic}
      <button class = "btn bg custom-button btn-petit" on:click={() => barmapUS = !barmapUS}>{barmapUS ? "Map":"Barchart"}</button>
      {#if barmapUS}
      <section><BarGraphUS/></section>
      {:else}
      <section><MapUS/></section>
      {/if}
      {/if}
      <button class = "btn bg custom-button btn-petit" on:click={() => inter = !inter}>International Flight</button>
      {#if inter}
      <button class = "btn bg custom-button btn-petit" on:click={() => barmap = !barmap}>{barmap ? "Map":"Barchart"}</button>
      {#if barmap}
      <section><BarGraph1/></section>
      {:else}
      {#if airlines}
      <section></section>
	    <section></section>
      {#if domestic}
      <section></section>
      {/if}
      {/if}
      {#if domestic}
      <section></section>
      {/if}
      <section></section>
      <section></section>
      <section><Map/></section>
      {/if}
      {/if}
      {/if}
      <section style = "height:20vh;margin-top:1000px"> Made by Aadhya Naveen and Antoine Carré</section>
      {/if}
	  

    </div>
  </Scroller>
 </main>
 
 
 

 
 
 
 