<script>
    import { afterUpdate } from 'svelte';
    import * as d3 from 'd3';
    import { data_lineGraph } from '../lib/data_lineGraph'; // Importing the data from the file
    
    let margin = { top: 20, right: 20, bottom: 30, left: 50 };
    let width = 600 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;
    
    function drawGraph() {
      const svg = d3.select('svg');
      
      let x = d3.scaleLinear().range([0, width]);
      let y = d3.scaleLinear().range([height, 0]);
    
      let line = d3.line()
        .x(d => x(d.Year))
        .y(d => y(d.Total));
    
      x.domain(d3.extent(data_lineGraph, d => parseInt(d.Year)));
      y.domain([0, d3.max(data_lineGraph, d => parseInt(d.Total))]);
    
      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(d3.axisLeft(y));
    
      svg.append('g')
        .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
        .call(d3.axisBottom(x));
    
      svg.append('path')
        .datum(data_lineGraph)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);
    
      svg.selectAll('circle')
        .data(data_lineGraph)
        .enter()
        .append('circle')
        .attr('cx', d => x(d.Year))
        .attr('cy', d => y(d.Total))
        .attr('r', 5)
        .attr('fill', 'blue')
        .on('click', d => alert(`Number: ${d.Total}`));
    }
  
    // Call the drawGraph function after the component is updated
    afterUpdate(drawGraph);
  </script>
  
  <style>
    svg {
      width: 600px;
      height: 400px;
    }
  </style>
  
  <svg></svg>
  