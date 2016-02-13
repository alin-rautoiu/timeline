var w = 1200;
var h = 800;

var dataset = {
        nodes: [
                { name: "spirit", depth: 1 }, //0
                { name: "krigstein", depth: 2}, //1
                { name: "fury", depth: 3}, //2
                { name: "master", depth: 4}, //3
                { name: "daredevil", depth: 5}, //4
                { name: "nhawk", depth: 6}, //5
                { name: "hawkeye", depth: 7} //6
                
                
        ],
        edges: [
                { source: 0, target: 1, name: ''},
                { source: 0, target: 6, name: ''},
                { source: 1, target: 2, name: ''},
                { source: 2, target: 3, name: ''},
                { source: 3, target: 4, name: ''},
                { source: 4, target: 5, name: ''},
                { source: 5, target: 6, name: ''}
        ]
};
                     
var force = d3.layout.force()
                     .nodes(dataset.nodes)
                     .links(dataset.edges)
                     .size([w, h])
                     //.linkDistance([50])    
                     .linkStrength(0.1)
                     .gravity(.2)    
                     .charge([-100])            
                     .start();

var colors = d3.scale.category10();


var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
                     
var edges = svg.selectAll("path")
        .data(dataset.edges)
        .enter()
        .append("path")
        .attr("id", function(d, i) {
            return d.name;
        })
        .style("stroke", "#ccc")
        .style("stroke-width", 1)
        .style("fill", "none");

var gnodes = svg.selectAll("g.gnode")
        .data(dataset.nodes)
        .enter()
        .append("g")
        .classed('gnode', true);
        
var nodes = gnodes
        .append("circle")
        .attr("r", 10)
        .attr("id", function(d, i) {
            return d.name;
        })
        .style("fill", function(d, i) {
                return colors(i);
        })
        .call(force.drag);
        
var label = gnodes.append("text")
            .text(function(d) {return d.name});             
        
//Every time the simulation "ticks", this will be called
    force.on("tick", function(e) {
    var ky = 1.2 * e.alpha;
        edges[0].forEach(function(d, i) {
            if(i == 0) {
                d.__data__.source.y = 120;
                d.__data__.source.x = w / 2;
            }
                d.__data__.target.y += (d.__data__.target.depth * 100 - d.__data__.target.y) * ky;           
        });

        // edges
        //     .attr("x1", function(d) { return d.source.x; })
        //     .attr("y1", function(d) { return d.source.y; })
        //     .attr("x2", function(d) { return d.target.x; })
        //     .attr("y2", function(d) { return d.target.y; });

        edges.attr('d', function(d){
          var dx = d.target.x - d.source.x;
          var dy = d.target.y - d.source.y;
          var dr = Math.sqrt(dx * dx + dy * dy);
          
          return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
        });

       gnodes.attr("transform", function(d) { 
            return 'translate(' + [d.x, d.y] + ')'; 
        });   
                
    });
    
                                                         