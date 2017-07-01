function barChart(id, newdata){
  var svg = d3.select(id),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var color = d3.scaleOrdinal(["#6b486b", "#d0743c", "#98abc5"]);
  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
  y = d3.scaleLinear().rangeRound([height, 0]);

  var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(newdata.map(function(d) {
    return d.name;
  }));
  y.domain([0, 150]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(10))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Count");

  g.selectAll(".bar")
    .data(newdata)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(t) { return x(t.name); })
      .attr("y", function(t) { return y(t.length); })
      .attr("fill", function(t) { return color(t.name); })
      .attr("width", x.bandwidth())
      .attr("height", function(t) { return height- y(t.length); });

}
