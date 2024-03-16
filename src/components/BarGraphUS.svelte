<script>
  import { data_BarGraphUS } from '../lib/data_BarGraphUS';
 import * as d3 from "d3";
 const formatLabel = d3.format(',.0f');
 const data = data_BarGraphUS.slice().reverse();


 const margin = {
   top: 30,
   right: 100,
   bottom: 0,
   left: 250,
 };


 let width = 500;
 let height = 400;
 let recorded_mouse_position = {x: 0, y: 0};
 let hovered = -1;


 $: innerWidth = width - margin.left - margin.right;
 let innerHeight = height - margin.top - margin.bottom;


 $: xScale = d3
   .scaleLinear()
   .domain([0, d3.max(data, d => +d["Passengers"]*0.8)])
   .range([0, innerWidth*0.8]);


 $: yScale = d3
   .scaleBand()
   .domain(data.map(d => d.City))
   .range([innerHeight, 0])
   .padding(0.25);
</script>


<div class="app">
 <div class="wrapper" bind:clientWidth={width}>
   <svg {width} {height}>
     <text x="250" y="16" text-anchor="middle" font-size="20px" font-weight="bold"> Most Popular Domestic Destinations from SAN</text>
     <g transform={`translate(${margin.left}, ${margin.top})`}>
       {#each data as country}
         <text
           text-anchor="end"
           x={hovered == country["Passengers"] ? -15 :-10}
           y={yScale(country.City) + yScale.bandwidth() / 2}
           opacity={hovered ? hovered == country["Passengers"] ? "1" : ".3" : "1"}
           dy=".35em"
         >
           {country.City}
         </text>
         <rect
           x={0}
           y={hovered == country["Passengers"] ? yScale(country.City)-1: yScale(country.City)}
           width={xScale(+country["Passengers"])}
           height={hovered == country["Passengers"] ? yScale.bandwidth()+2 : yScale.bandwidth()}
           on:mouseover={(event) => { hovered = country["Passengers"];
             recorded_mouse_position = {
               x: event.pageX,
               y: event.pageY
               }}}
           on:mouseout={() => hovered = -1}
         />
         {#if hovered !== -1 && hovered == country["Passengers"]}
         <text
         text-anchor="start"
         x={xScale(+country["Passengers"])}
         dx="10"
         y={yScale(country.City) + yScale.bandwidth() / 2}
         dy=".35em"
       >
         {formatLabel(+country["Passengers"])}
       </text>
         {/if}
       {/each}
     </g>
   </svg>
 </div>
  <div class="info-box">
     <p> As we can see, Southwest has been dominating consistently in terms of being the most flown airline in the airspace.
         Among all the years in the visualization, we see that it has the largest share among all airlines.
     </p>
     <p>We notice something interesting that <strong>majority of the flights passing through the San Diego airport are domestic
         flights.</strong> Delta, United, Southwest, etc. that seem to be the leading flights are all U.S nationally owned airlines. Even if you
         change the year, the "other" portion indicating various international airlines only seem to make up a really small
         portion (less than 25 percent) of the pie chart. </p>
     <p> What does this tell us about SAN airport? Many people use it for connecting flights and to travel domestically within the U.S.
         While people a good amount of passengers do international travel, domestic travel seems to dominate by a large margin. </p>
 </div>
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
   align-items: left;
   height: 100%;
   width: 100%;
       margin: 0 15px;
 }
 .wrapper {
   position: relative;
   width: 100%;
   max-width: 700px;
 }
 .info-box {
   background-color: #f8f8f8;
   border: 1px solid #ddd;
   border-radius: 5px;
   padding: 20px;
   margin-right: 20px; /* Add margin to separate from the visualization */
   font-family: "Lato", sans-serif;
   font-size: 14px;
   line-height: 1.6;
   width: 30%;
   position: absolute; /* Position the box absolutely */
   bottom: 250px;
   right: 160px;
 }


 rect {
   fill: #af23d5;
 }
</style>

