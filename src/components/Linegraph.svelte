<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { data_lineGraph } from '../lib/data_lineGraph'; // Importing the data from the file
    
    // Define margins and larger dimensions with increased left margin
    let margin = { top: 50, right: 70, bottom: 70, left: 135 };
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
            .attr('width', 200)
            .attr('height', 20)
            .attr('fill', 'lightgray')
            .style('opacity', 0);
        
        // Append a tooltip text element
        const tooltipText = svg.append('text')
            .style('opacity', 0)
            .style('font-size', '15px')
            .style('fill', 'black');
        
        svg.append('text')
            .attr('x', (width + margin.left + margin.right) / 2)
            .attr('y', margin.top / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '18px')
            .text('Annual Number of Passengers in SAN airport from 1949-2018');
        
        // Add x-axis label
        svg.append('text')
            .attr('x', (width + margin.left + margin.right) / 2)
            .attr('y', height + margin.top + margin.bottom / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .text('Year');
        
        // Add y-axis label
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -(height + margin.top + margin.bottom) / 2)
            .attr('y', margin.left / 2)
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .text('Number of Passengers');

            svg.append('text')

    // Append the text for the annotation
svg.append('text')
    .attr('x', x(2005) + margin.left) // Adjust x-coordinate based on the year
    .attr('y', y(11000000) + margin.top - 10) // Adjusted y-coordinate for text
    .attr('dy', '-1em') // Offset the text slightly above the point
    .attr('text-anchor', 'middle')
    .style('fill', 'black')
    .style('font-size', '12px') // Adjust font size
    .text('Air travel decreases - 9/11');

// Append the line for the arrow
svg.append('line')
    .attr('x1', x(2001) + margin.left)
    .attr('y1', y(12100000)) // Adjusted y-coordinate for the line
    .attr('x2', x(2001) + margin.left)
    .attr('y2', y(10000000) + margin.top - 55) // Length of the arrow line
    .style('stroke', 'black')
    .style('stroke-width', '1.75px');

    svg.append('text')
    .attr('x', x(2005) + margin.left) // Adjust x-coordinate based on the year
    .attr('y', y(19600000) + margin.top - 10) // Adjusted y-coordinate for text
    .attr('dy', '-1em') // Offset the text slightly above the point
    .attr('text-anchor', 'middle')
    .style('fill', 'black')
    .style('font-size', '12px') // Adjust font size
    .text('travel decreases - 2008 Recession');

// Append the line for the arrow
svg.append('line')
    .attr('x1', x(2009) + margin.left)
    .attr('y1', y(18000000)) // Adjusted y-coordinate for the line
    .attr('x2', x(2009) + margin.left)
    .attr('y2', y(16000000) + margin.top - 38) // Length of the arrow line
    .style('stroke', 'black')
    .style('stroke-width', '2px');

    svg.append('text')
    .attr('x', x(1984) + margin.left) // Adjust x-coordinate based on the year
    .attr('y', y(800000) + margin.top - 10) // Adjusted y-coordinate for text
    .attr('dy', '-1em') // Offset the text slightly above the point
    .attr('text-anchor', 'middle')
    .style('fill', 'black')
    .style('font-size', '12px') // Adjust font size
    .text('60s & 70s - air travel becomes more common');

    svg.append('line')
    .attr('x1', x(1973) + margin.left)
    .attr('y1', y(15)) // Adjusted y-coordinate for the line
    .attr('x2', x(1968) + margin.left)
    .attr('y2', y(1900000) + margin.top - 17) // Length of the arrow line
    .style('stroke', 'black')
    .style('stroke-width', '2px');

    svg.append('text')
    .attr('x', 1200) // Adjust x-coordinate based on your requirement
    .attr('y', 100) // Adjust y-coordinate based on your requirement
    .attr('text-anchor', 'end') // Align the text to the end of the specified coordinates
    .style('font-size', '55px')
    .style('font-family', 'Arial, sans-serif') // Change font family to something visually appealing
    .style('fill', 'lightblue')
    .style('font-weight', 'bold') // Change text color to light blue
    .text('1928');

    svg.append('text')
    .attr('x', 1248) // Adjust x-coordinate based on your requirement
    .attr('y', 130) // Adjust y-coordinate to position it below "1920"
    .attr('text-anchor', 'end') // Align the text to the end of the specified coordinates
    .style('font-size', '15px') // Adjust font size if needed
    .style('font-family', 'Verdana, sans-serif') // Change font family if needed
    .style('fill', 'black') // Change text color if needed
    .text('Construction of SAN airport!');

    svg.append('text')
    .attr('x', 1280) // Adjust x-coordinate based on your requirement
    .attr('y', 250) // Adjust y-coordinate based on your requirement
    .attr('text-anchor', 'end') // Align the text to the end of the specified coordinates
    .style('font-size', '55px') // Adjust font size if needed
    .style('font-family', 'Arial, sans-serif') // Change font family if needed
    .style('fill', 'cornflowerblue')
    .style('font-weight', 'bold') // Change text color if needed
    .text('+ 17322.3%');

    svg.append('text')
    .attr('x', 1315) // Adjust x-coordinate based on your requirement
    .attr('y', 277) // Adjust y-coordinate to position it below "1920"
    .attr('text-anchor', 'end') // Align the text to the end of the specified coordinates
    .style('font-size', '15px') // Adjust font size if needed
    .style('font-family', 'Verdana, sans-serif') // Change font family if needed
    .style('fill', 'black') // Change text color if needed
    .text('Percentage increase in passengers since 1949');

    svg.append('text')
    .attr('x', 1220) // Adjust x-coordinate based on your requirement
    .attr('y', 280) // Adjust y-coordinate based on your requirement
    .attr('text-anchor', 'end') // Align the text to the end of the specified coordinates
    .style('font-size', '55px') // Adjust font size if needed
    .style('font-family', 'Arial, sans-serif') // Change font family if needed
    style('fill', '#336699')
    .style('font-weight', 'bold') // Change text color if needed
    .text('#3');

    });
</script>

<style>
    svg {
        width: 100%; /* Make SVG responsive, expand to fill its container */
        height: auto; /* Maintain aspect ratio, scale height accordingly */
    }
</style>

<svg></svg>
