import { useD3 } from './useD3';
import React from 'react';
import * as d3 from 'd3';
import { useNavigate} from 'react-router-dom';
import { useTheme } from "@mui/system";
import {useState} from "react"
function BarChart({ data }) {
  const navigate = useNavigate();
    const theme = useTheme();
    const [value,setValue]= useState(null)

  const ref = useD3(
    (svg) => {
      const height = 500;
      const width = 1000;
      const margin = { top: 20, right: 30, bottom: 30, left: 20 };

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.title))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.attendace)])
        .rangeRound([height - margin.bottom, margin.top]);
//Risanje x os
      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - (margin.bottom)})`)
        .style("color", theme.palette.background.chart)
        .call(
          d3
            .axisBottom(x)

            .tickSizeOuter(0)
        )
        .call((g) =>
        g
          .append("text")
          .attr("x", width-margin.left)
          .attr("y", 3)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("Events")
      );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text("Attendance")
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "steelblue")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.title))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.attendace))
        .attr("height", (d) => y1(0) - y1(d.attendace))
        .on('mouseover', function(d,i){
          //console.log("estestesteste")
          d3.select(this).transition().duration(50)
          .attr("fill", "green")
          console.log(i)
       })
       .on('mouseout', function(d,i){
        //console.log("estestesteste")
        d3.select(this).transition().duration(50)
        .attr("fill", "steelblue")
     })
     .on('click', function(d,i){
       console.log("click")
      navigate(`/event/${i._id}`)
      
   })

    },
    [data.length,theme]
  );

  return (
    <svg

      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        margin: "1em",
      }}
    >
      
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;