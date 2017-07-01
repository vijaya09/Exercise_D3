function pieChart(id, newdata){
  var svg = d3.select(id),
      width = +svg.attr("width"),
      height = +svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var pie = d3.pie()
      .sort(null)
      .value(function(d) {
        return d.length;
      });

  var path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40);

    var arc = g.selectAll(".arc")
      .data(pie(newdata))
      .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function(d) {
          return color(d.data.name);
         })
         .on("mouseover", function(d, i) {
          svg.append("text")
            .attr("dy", ".5em")
            .style("text-anchor", "right")
            .style("font-size", 20)
            .attr("class","label")
            .style("fill", function(d,i){return "black";})
            .text("chromosome-"+d.data.name+" count is "+d.data.length);
          })
        .on("mouseout", function(d) {
          svg.select(".label").remove();
        });

    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.5em")
        .text(function(d) {
          return d.data.name;
         });

}
