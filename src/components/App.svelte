<script>
  import * as d3 from 'd3';
  import {data_pie_chart} from '../lib/data_pie_chart';

  
  let dataAngle = [];
  let dataAngle2 = [];
  let arcGenerator = d3.arc()
    .innerRadius(10)
    .outerRadius(100)
    .padAngle(.02)
    .cornerRadius(4);
  let recorded_mouse_position = {x: 0, y: 0};

  let pieAngleGenerator = d3.pie().value( d => d[1] );
let arc_data = [];
let arc_data2 = [];
let arc_data3 = [];
const arc_color = d3.scaleLinear()
  .range(["#faffd1", "#db921d", "#b86a04", "#a65d29" ,"#6e3003"]);
let hovered = -1;
let count = 0;
let data = data_pie_chart[2022].map(d => ({
  value: parseFloat(d['Share'].replace(',', '.')), // Convert share to number
  category: d['Airline']
}));
console.log("data", data);
// Use pieAngleGenerator
let pie = d3.pie()
  .value(d => d.value);


// Output angle data
console.log(arc_data);
  $:{
    for (let i = 0; i < data_pie_chart[2022].length; i++) {
      console.log(data_pie_chart[2022][i]);
      const Angle = {
        "category": data_pie_chart[2022][i]['Airline'],
        "startAngle": count,
        "endAngle": count < 6.282185307179586 ? count + data_pie_chart[2022][i]['Share']*0.06283185307179586:6.283185307179586
      };
      count = Angle.endAngle;
      dataAngle[i] = Angle;
      const Angle2 = [
        data_pie_chart[2022][i]['Airline'],
        +data_pie_chart[2022][i]['Share']
    ];
      dataAngle2.push(Angle2); 
      };
      console.log("dataAngle" + dataAngle);
      console.log("dataAngle2" + dataAngle2);
      arc_data = dataAngle;
      arc_data2 = pieAngleGenerator(data);
      arc_data3 = pieAngleGenerator(dataAngle2);
      console.log("arc_data" , arc_data);
      console.log("arc_data2",arc_data2);
      console.log("arc_data3",arc_data3);
    }
</script>
<div class="visualization">
<svg width="500" height="500">
  <g transform="translate(250, 120)">
    {#each arc_data3 as data, index}
      <path
        d={arcGenerator({
          startAngle: data.startAngle,
          endAngle: data.endAngle
        })}
        fill={index === hovered ? "brown": arc_color(index)}
        on:mouseover={(event) => { hovered = index;console.log(index); 
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
    There {arc_data[hovered].data[1] === 1 ? "is" : "are"}
    {arc_data[hovered].data[1]}
    record{arc_data[hovered].data[1] === 1 ? "" : "s"}
    where you have "{arc_data[hovered].data[0]}" todo items.
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