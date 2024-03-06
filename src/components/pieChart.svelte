<script>
	import * as d3 from 'd3';
	import {data_pie_chart} from '../lib/data_pie_chart';
  
	
  
	let arcGenerator = d3.arc()
	  .innerRadius(10)
	  .outerRadius(100)
	  .padAngle(.02)
	  .cornerRadius(4);
	let recorded_mouse_position = {x: 0, y: 0};
  
	let pieAngleGenerator = d3.pie().value( d => d[1] );
  let arc_data = [];
  
  const arc_color = d3.scaleLinear()
	.range(["#faffd1", "#db921d", "#b86a04", "#a65d29" ,"#6e3003"]);
  let hovered = -1;
  let dataAngle = [];
  
	$:{
	  for (let i = 0; i < data_pie_chart[2022].length; i++) {
		const Angle = [
		  data_pie_chart[2022][i]['Airline'],
		  +data_pie_chart[2022][i]['Share']
	  ];
		dataAngle.push(Angle); 
		};
		arc_data = pieAngleGenerator(dataAngle);
	  }
  </script>
  <div class="visualization">
  <svg width="500" height="500">
	<g transform="translate(250, 120)">
	  {#each arc_data as data, index}
		<path
		  d={arcGenerator({
			startAngle: data.startAngle,
			endAngle: data.endAngle
		  })}
		  fill={index === hovered ? "brown": arc_color(index)}
		  on:mouseover={(event) => { hovered = index; 
		  recorded_mouse_position = {
			x: event.pageX,
			y: event.pageY
			}}}
			
		  on:mouseout={(event) => { hovered = -1; }}
		/>
		<text
		  x={arcGenerator.centroid(data)[0]}   
		  y={arcGenerator.centroid(data)[1]}                      
		  text-anchor="middle"                
		  alignment-baseline="middle"
		  font-size = "10px"         
		>
		  {data.data[0]}        
		</text>
	  {/each}		
	</g>
  </svg>
  <div class={hovered === -1 ? "tooltip-hidden": "tooltip-visible"}
	style="left: {recorded_mouse_position.x + 40}px; top:
	{recorded_mouse_position.y + 40}px">
	{#if hovered !== -1}
	  {arc_data[hovered].data[1]}% of the total 
	  flights are flights of {arc_data[hovered].data[0] == "Other Airlines" ? "other airlines" : "the airline " + arc_data[hovered].data[0]}.
	{/if}
  </div>
  </div>
  
  <style>
  .visualization {
	font: 25px sans-serif;
	margin: auto;
	margin-top: 1px;
	text-align: middle;
  }
  
  /* dynamic classes for the tooltip */
  .tooltip-hidden {
	visibility: hidden;
	font-family: "Nunito", sans-serif;
	width: 200px;
	position: absolute;
  }
  
  .tooltip-visible {
	font: 25px sans-serif;
	font-family: "Nunito", sans-serif;
	visibility: visible;
	background-color: #f0dba8;
	border-radius: 10px;
	width: 200px;
	color: black;
	position: absolute;
	padding: 10px;
  }
  </style>