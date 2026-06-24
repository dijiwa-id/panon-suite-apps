import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useTheme } from '../context/ThemeContext';

interface HeatmapData {
  workstation: string;
  hour: string;
  value: number; // 0 to 100 representing load
}

const generateHeatmapData = (): HeatmapData[] => {
  const workstations = ['WS-01', 'WS-02', 'WS-03', 'WS-04', 'WS-05', 'WS-06', 'WS-07', 'WS-08'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  const data: HeatmapData[] = [];
  
  workstations.forEach(ws => {
    hours.forEach(hr => {
      // Create some pattern: higher load during 9-17
      const hourNum = parseInt(hr);
      let baseLoad = (hourNum >= 9 && hourNum <= 17) ? 60 : 20;
      
      // Add random variance
      let value = baseLoad + (Math.random() * 40 - 20);
      value = Math.max(0, Math.min(100, value));
      
      data.push({
        workstation: ws,
        hour: hr,
        value: Math.round(value)
      });
    });
  });
  
  return data;
};

export const SystemLoadHeatmap = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const data = generateHeatmapData();
    
    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    // Get container dimensions
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = 300;

    // Margins
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Labels of row and columns
    const workstations = Array.from(new Set(data.map(d => d.workstation)));
    const hours = Array.from(new Set(data.map(d => d.hour)));

    // Build X scales and axis:
    const x = d3.scaleBand()
      .range([0, width])
      .domain(hours)
      .padding(0.05);
      
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0).tickFormat(d => {
          const hr = parseInt(d);
          return hr % 3 === 0 ? d : '';
      }))
      .select(".domain").remove();
      
    svg.selectAll("text")
       .attr("class", "text-[10px] font-mono font-medium fill-gray-500 dark:fill-gray-400");

    // Build Y scales and axis:
    const y = d3.scaleBand()
      .range([height, 0])
      .domain(workstations)
      .padding(0.05);
      
    svg.append("g")
      .call(d3.axisLeft(y).tickSize(0))
      .select(".domain").remove();
      
    svg.selectAll("text")
       .attr("class", "text-[10px] font-bold fill-gray-600 dark:fill-gray-400");

    // Build color scale
    const myColor = d3.scaleSequential()
      .interpolator(d3.interpolateBlues)
      .domain([0, 100]);
      
    const darkColor = d3.scaleSequential()
       .interpolator(d3.interpolatePuBu)
       .domain([0, 100]);

    const activeColorScale = isDark ? darkColor : myColor;

    // Create a tooltip
    const tooltip = d3.select(containerRef.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "absolute z-50 bg-white dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#333] px-3 py-2 rounded shadow-lg pointer-events-none")
      .style("transition", "opacity 0.2s");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(this: SVGRectElement) {
      tooltip.style("opacity", 1);
      d3.select(this)
        .style("stroke", isDark ? "white" : "black")
        .style("stroke-width", 1)
        .style("opacity", 1);
    }
    const mousemove = function(event: any, d: any) {
      tooltip
        .html(`
           <div class="text-[10px] text-gray-500 dark:text-gray-400 font-bold mb-1 tracking-wider uppercase">${d.workstation}</div>
           <div class="flex items-center justify-between gap-4">
              <span class="text-xs text-gray-600 dark:text-gray-300">Time: <span class="font-mono font-medium">${d.hour}</span></span>
              <span class="text-xs font-bold text-gray-900 dark:text-white">Load: ${d.value}%</span>
           </div>
        `)
        .style("left", (event.layerX + 15) + "px")
        .style("top", (event.layerY - 15) + "px");
    }
    const mouseleave = function(this: SVGRectElement) {
      tooltip.style("opacity", 0);
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8);
    }

    // Add the squares
    svg.selectAll()
      .data(data, function(d: any) { return d.workstation + ':' + d.hour; })
      .enter()
      .append("rect")
      .attr("x", function(d) { return x(d.hour) || 0; })
      .attr("y", function(d) { return y(d.workstation) || 0; })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", function(d) { return activeColorScale(d.value); })
      .style("opacity", 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

      // Handle window resize
      const handleResize = () => {
          // simple re-render
      };
      
      return () => {
          tooltip.remove();
      }
  }, [isDark]);

  return (
    <div className="w-full relative" ref={containerRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
};
