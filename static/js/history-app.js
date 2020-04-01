// set up SVG container

var margin = {top: 20, right: 160, bottom: 35, left: 30};

var width = 560 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svg = d3.select("#bar-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// dataset of number of Breweries per year from SQLite database
var numberBreweries = [
    {year: '1994', micro: 0, brewpub: 2, regional: 3, large: 0},
    {year: '1999', micro: 2, brewpub: 4, regional: 4, large: 1},
    {year: '2004', micro: 5, brewpub: 8, regional: 7, large: 3},
    {year: '2009', micro: 8, brewpub: 18, regional: 12, large: 4},
    {year: '2014', micro: 12, brewpub: 25, regional: 19, large: 4},
    {year: '2019', micro: 3, brewpub: 4, regional: 5, large: 4}
]

var parse = d3.time.format("%Y").parse; 

// Transpose the data into layers
var brewDataSet = d3.layout.stack()(["micro", "brewpub", "regional", "large"].map(function(brew) {
    return numberBreweries.map(function(d) {
      return {x: parse(d.year), y: +d[brew]};
    });
  }));

// Set x, y and colors
var x = d3.scale.ordinal()
  .domain(brewDataSet[0].map(function(d) { return d.x; }))
  .rangeRoundBands([10, width-10], 0.02);

var y = d3.scale.linear()
  .domain([0, d3.max(brewDataSet, function(d) {  return d3.max(d, function(d) { return d.y0 + d.y; });  })])
  .range([height, 0]);

var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];


// Define and draw axes
var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5)
  .tickSize(-width, 0, 0)
  .tickFormat( function(d) { return d } );

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")
  .tickFormat(d3.time.format("%Y"));

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis);

// Create groups for each series, rects for each segment 
var groups = svg.selectAll("g.cost")
  .data(brewDataSet)
  .enter().append("g")
  .attr("class", "cost")
  .style("fill", function(d, i) { return colors[i]; });

var rectgroup = groups.selectAll("rect")
  .data(function(d) { return d; })
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.x); })
  .attr("y", function(d) { return y(d.y0 + d.y); })
  .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); })
  .attr("width", x.rangeBand())
//   .on("mouseover", function() { tooltip.style("display", null); })
//   .on("mouseout", function() { tooltip.style("display", "none"); })
//   .on("mousemove", function(d) {
//     var xPosition = d3.mouse(this)[0] - 15;
//     var yPosition = d3.mouse(this)[1] - 25;
//     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
//     tooltip.select("text").text(d.y);
//   });


// Draw legend
var legend = svg.selectAll(".legend")
  .data(colors)
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(30," + i * 19 + ")"; });
 
legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", function(d, i) {return colors.slice().reverse()[i];});
 
legend.append("text")
  .attr("x", width + 5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function(d, i) { 
    switch (i) {
      case 0: return "Large Breweries";
      case 1: return "Regional Breweries";
      case 2: return "Brewpubs";
      case 3: return "Micro-Breweries";
    }
  });

// Prepare tooltip and mouseover event listener

var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([10, -5])
        .html(function(d) {
          return (`The Data!`);
        });

      // Step 2: Create the tooltip in chartGroup.
      groups.call(toolTip);

      // Step 3: Create "mouseover" event listener to display tooltip
      rectgroup.on("mouseover", function(d) {
        toolTip.show(d, this);
      })
      // Step 4: Create "mouseout" event listener to hide tooltip
        .on("mouseout", function(d) {
          toolTip.hide(d);
        });
    

// var tooltip = svg.append("g")
//   .attr("class", "tooltip")
//   .style("display", "none");
    
// tooltip.append("rect")
//   .attr("width", 10)
//   .attr("height", 7)
//   .attr("fill", "white")
//   .style("opacity", 0.5);

// tooltip.append("text")
//   .attr("x", 10)
//   .attr("dy", "1.2em")
//   .style("text-anchor", "middle")
//   .attr("font-size", "12px")
//   .attr("font-weight", "bold");

  