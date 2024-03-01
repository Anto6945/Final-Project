<script>
  import { onMount } from 'svelte'; 
  import * as d3 from 'd3';



  let width= 980;
  let height= 495;
  const margin = { top: 20, right: 20, bottom: 20, left: 125 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  let hovered=null;
  
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
  data1 = d3.csvParse(csv, d3.autoType)
  console.log(data1)
  const top10Objects = getTop10Objects(data1, '1995');
  console.log(top10Objects);
});
  function update(update_state) {
    selected_state = update_state;
  };
data_top = getTop10(data1)


  $: xDomain = data1A.map((d) => d[0]);
  $: yDomain = data1A.map((d) => +d[selected_state]);

  $: yScale = d3.scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
  $: xScale = d3.scaleLinear()
    .domain([0, Math.max.apply(null, yDomain)])
    .range([0, innerWidth]);

</script>

<div class='chart-container' bind:clientWidth={width} on:mouseout={()=>{hovered=null}}>
  <svg {width} {height}>
    <g transform={`translate(${margin.left},${margin.top})`}>
      {#each xScale.ticks() as tickValue}
        <g transform={`translate(${xScale(tickValue)},0)`}>
          <line y2={innerHeight} stroke="#E8EDEA" />
          <text text-anchor="middle" dy=".7em" y={innerHeight + 3}>
            {tickValue}
          </text>
        </g>
      {/each}
      
      {#each data1 as d}
        <text
          text-anchor="end"
          x="-3"
          dy=".3em"
          y={yScale(d[Country_Name]) + yScale.bandwidth() / 2}
        >
          {d.category}
        </text>
        <rect class='bars'
          role="presentation"
          x="0"
          y={hovered? hovered == d ? yScale(d.category)-7:yScale(d[Country_Name]):yScale(d.Country_Name)}
          width={xScale(d[2020])}
          height={hovered ? hovered == d ?yScale.bandwidth()+14:yScale.bandwidth():yScale.bandwidth()}
          opacity={hovered ? hovered == d ? "1" : ".3" : "1"}
          fill="#F9746F"
          on:mouseover={() => {hovered=d}}
        >{console.log(d)}</rect>
      {/each}
    </g>
  </svg>

  <p class='x-axis'>count</p>
  

</div>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap');
  
  .chart-container {
    position: relative;
    width: 1000px;
    height: 520px;
    z-index: 15;
    margin-left: auto;
    margin-top: auto;
    margin-right: auto;
  }

  .x-axis {
    position: relative;
    width: 1000px;
    margin-left: 35px;
    margin-top: auto;
    margin-right: auto;
    font-size: 20px;
  }
  
  
  rect {
    transition: all 450ms ease;
  }

  text {
    font-weight: 700;
  }
</style>