<script>
	
  import { datatop } from '../lib/data';
  import BarChart from './BarChart.svelte';
  
</script>

<div class="app">
  <BarChart 
        datatop={datatop.sort(
      (a, b) => a['2020'] - b['2020'],
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