// set up SVG container
var margin = {top: 25, right: 25, bottom: 25, left: 50};

var docWidth = document.documentElement.clientWidth;
var docHeight = document.documentElement.clientHeight;

var width = (docWidth / 2.1) - margin.left - margin.right;
var height = (docHeight / 2.1) - margin.top - margin.bottom;

var SVGwidth = (docWidth / 2.1) + margin.left + margin.right;
var SVGheight = (docHeight / 2.1) + margin.top + margin.bottom;

var svg = d3.select("#bar-chart")
.append('svg')
.attr('width',SVGwidth)
.attr('height',SVGheight)

var chartGroup = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// dataset of number of Breweries per year from SQLite database

d3.json("http://127.0.0.1:5000/api/v1.0/history").then(function(newData) {

  var yearEst = newData.map(year => year.yearEstablished)
  var yearCo = newData.map(count => count.yearCount)

  var xscale = d3.scaleBand()
    .domain(
      newData.map(year => year.yearEstablished)
    )
    .range([
      0, width
    ]);

  var yscale = d3.scaleLinear()
    .domain([
      0, d3.max(newData, count => count.yearCount)
    ])
    .range([
      height, 0
    ]);

  // create axes
  var bottomAxis = d3.axisBottom(xscale).tickValues([1990,1992,1994,1996,1998,2000,2002,2004,2006,2008,2010,2012,2014,2016,2018]);
  var leftAxis = d3.axisLeft(yscale).ticks(10);

  var barGroup = chartGroup.selectAll(".bar")
  .data(newData)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", year => xscale(year.yearEstablished))
  .attr("y", count => yscale(count.yearCount))
  .attr("width", xscale.bandwidth())
  .attr("height", count => height - yscale(count.yearCount))
  .attr('fill','steelblue')

  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis)

  
  // Create axes labels
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Number of Breweries Founded");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("class", "axisText")
    .text("Year");
  
  var toolTip = d3.tip()
  .attr("class", "tooltip")
  .offset([0, 0])
  .style("color","black")
  .style("text-align","center")
  .html(function(d) {
    return (`<strong>${d.yearEstablished}</strong><br>${d.yearCount}`);
  });

  chartGroup.call(toolTip);

  barGroup.on("mouseover", function(d) {
    toolTip.show(d, this);
  })
          .on("mouseout", function(d) {
    toolTip.hide(d);
  });

}).catch(function(error){
  console.log(error)
});