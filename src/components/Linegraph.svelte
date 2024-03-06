<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { data_lineGraph } from '../lib/data_lineGraph'; // Importing the data from the file
    
    // Define margins and larger dimensions with increased left margin
    let margin = { top: 50, right: 70, bottom: 70, left: 80 };
    let width = 800 - margin.left - margin.right;
    let height = 600 - margin.top - margin.bottom;
    
    onMount(() => {
        const svg = d3.select('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);
        
        let x = d3.scaleLinear().range([0, width]);
        let y = d3.scaleLinear().range([height, 0]);
    
        let line = d3.line()
            .x(d => x(parseInt(d.Year)) + margin.left) // Adjust x-coordinate by adding left margin
            .y(d => y(parseInt(d.Total)) + margin.top); // Adjust y-coordinate by adding top margin
    
        // Extracting the years and totals for x and y domain
        let years = data_lineGraph.map(d => parseInt(d.Year));
        let totals = data_lineGraph.map(d => parseInt(d.Total));
        
        x.domain(d3.extent(years));
        y.domain([0, d3.max(totals)]);
    
        svg.append('g')
            .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
            .call(d3.axisBottom(x).tickFormat(d3.format("d"))); // Format x-axis ticks without commas
    
        svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
            .call(d3.axisLeft(y));
    
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
            .attr('cx', d => x(parseInt(d.Year)) + margin.left)
            .attr('cy', d => y(parseInt(d.Total)) + margin.top)
            .attr('r', 5)
            .attr('fill', 'blue')
            .on('click', d => alert(`Number: ${d.Total}`));
    });
</script>

<style>
    svg {
        width: 100%; /* Make SVG responsive, expand to fill its container */
        height: auto; /* Maintain aspect ratio, scale height accordingly */
    }
</style>

<svg></svg>
