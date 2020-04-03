// set up SVG container
var margin = {top: 20, right: 10, bottom: 35, left: 30};

var width = 500 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var svg = d3.select("#bar-chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

var chartGroup = svg
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// dataset of number of Breweries per year from SQLite database

d3.json("http://127.0.0.1:5000/api/v1.0/history").then(function(newData) {

  var yearEst = newData.map(year => year.yearEstablished)
  var yearCo = newData.map(count => count.yearCount)
  console.log(yearEst);
  console.log(yearCo);

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
  console.log(d3.max(yearCo))
  console.log(xscale.bandwidth())

  // space between bars
  var barSpacing = 1.1;

  // create axes
  var bottomAxis = d3.axisBottom(xscale);
  var leftAxis = d3.axisLeft(yscale).ticks(10);

  chartGroup.selectAll(".bar")
  .data(newData)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", year => xscale(year.yearEstablished) * barSpacing)
  .attr("y", count => yscale(count.yearCount))
  .attr("width", xscale.bandwidth())
  .attr("height", count => height - yscale(count.yearCount));

  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

}).catch(function(error){
  console.log(error)
});
