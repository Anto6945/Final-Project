<script>
	
  import { datatop } from '../lib/data';
  import BarChart from './BarChart.svelte';
  export var selectedYear = 2020;
  let dataUsed;
  console.log(selectedYear);
  function updateYear(value){
    dataUsed = datatop[value];
  }
  updateYear(selectedYear);
</script>

<div class="overlay">
  <label for="slider">Years <span id="displayValue"></span></label>
  <input
      id="slider"
      type="range"
      min="1995"
      max="2020"
      bind:value={selectedYear}
      on:input={() => updateYear(selectedYear)}
  />
</div>

<div class="app">
  <BarChart 
        datatop={dataUsed.sort(
      (a, b) => a[selectedYear] - b[selectedYear],
    )}
    />
</div>

<style>
    @import url("https://fonts.googleapis.com/css?family=Merriweather:700&display=swap");
    @import url("https://fonts.googleapis.com/css?family=Lato:400&display=swap");
    
    :global(body) {
      color: #282828;
        background: #ffffff;
        font-family: "Lato", sans-serif;
        font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    }

  .app {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
        margin: 0 15px;
  }
</style>