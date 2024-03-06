<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { data_lineGraph } from '../lib/data_lineGraph'; // Importing the data from the file
    
    // Define margins and larger dimensions with increased left margin
    let margin = { top: 50, right: 70, bottom: 70, left: 80 };
    let width = 850 - margin.left - margin.right;
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
    
        // Add tooltips
        svg.selectAll('circle')
            .data(data_lineGraph)
            .enter()
            .append('circle')
            .attr('cx', d => x(parseInt(d.Year)) + margin.left)
            .attr('cy', d => y(parseInt(d.Total)) + margin.top)
            .attr('r', 3.5)
            .attr('fill', 'blue')
            .on('mouseover', (event, d) => {
                // Show tooltip with year and total
                tooltipRect.attr('x', x(parseInt(d.Year)) + margin.left + 5)
                    .attr('y', y(parseInt(d.Total)) + margin.top - 20)
                    .style('opacity', 0.8);
                tooltipText.text(`${d.Year} - ${d.Total} passengers`)
                    .attr('x', x(parseInt(d.Year)) + margin.left + 10)
                    .attr('y', y(parseInt(d.Total)) + margin.top - 5)
                    .style('opacity', 1);
            })
            .on('mouseout', () => {
                // Hide tooltip
                tooltipRect.style('opacity', 0);
                tooltipText.style('opacity', 0);
            });
        
        // Append a tooltip background rectangle
        const tooltipRect = svg.append('rect')
            .attr('width', 170)
            .attr('height', 20)
            .attr('fill', 'lightgray')
            .style('opacity', 0);
        
        // Append a tooltip text element
        const tooltipText = svg.append('text')
            .style('opacity', 0)
            .style('font-size', '12px')
            .style('fill', 'black');
    });
</script>

<style>
    svg {
        width: 100%; /* Make SVG responsive, expand to fill its container */
        height: auto; /* Maintain aspect ratio, scale height accordingly */
    }
</style>

<svg></svg>
