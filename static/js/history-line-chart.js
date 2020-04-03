// set up SVG container
var margin = {top: 20, right: 10, bottom: 35, left: 30};

var width = 500 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;

var svg = d3.select("#line-chart")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
  
var chartGroup = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

// Establish promise for data
d3.json("http://127.0.0.1:5000/api/v1.0/history").then(function(cumulative) {
    
    // Grab values from database
    cumulative.forEach(function(data){
        data.yearEstablished = parseTime(data.yearEstablished);
        data.cumulativeCount = +data.cumulativeCount;
    });

    // Configure a time scale
    // d3.extent retures the an array
    var xTimeScale = d3.scaleTime()
        .domain(d3.extent(cumulative, data => data.yearEstablished))
        .range([0, width]);

    // Configure a linear scale with a range between the chartHeight and 0 
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(cumulative, data => data.cumulativeCount)]) 
        .range([height, 0]);

    // Create axes for passing arguments
    var bottomAxis = d3.axisBottom(xTimeScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Configure a line function which will plot the x and y coordinates using our scales
    var drawLine = d3.line()
        .x(data => xTimeScale(data.yearEstablished))
        .y(data => yLinearScale(data.cumulativeCount));

    // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
        .attr("d", drawLine(cumulative))
        .classed("line",true);

    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
}).catch(function(error) {
    console.log(error);
})  