var w = 1200;
var h = 800;

var dataset = {
        nodes: [
                { name: "spirit" }, //0
                { name: "hawkeye" }, //1
                { name: "krigstein"}, //2
                { name: "fury"}, //3
                { name: "master"}, //4
                { name: "daredevil"}, //5
                { name: "nhawk"} //6
        ],
        edges: [
                { source: 0, target: 1, name: 'spirit_hawkeye' },
                { source: 0, target: 3, name: 'spirit_fury' },
                { source: 3, target: 4, name: 'fury_master' },
                { source: 1, target: 5, name: 'spirit_hawkeye' },
                { source: 2, target: 5, name: 'spirit_hawkeye' },
                { source: 3, target: 5, name: 'spirit_hawkeye' },
                { source: 4, target: 5, name: 'spirit_hawkeye' }
        ]
};
                     
var force = d3.layout.force()
                     .nodes(dataset.nodes)
                     .links(dataset.edges)
                     .size([w, h])
                     .linkDistance([300])    
                     .linkStrength(0.1)
                     .gravity(.2)    
                     .charge([-100])            
                     .start();

var colors = d3.scale.category10();


var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
                     
var edges = svg.selectAll("line")
        .data(dataset.edges)
        .enter()
        .append("line")
        .attr("id", function(d, i) {
            return d.name;
        })
        .style("stroke", "#ccc")
        .style("stroke-width", 1);

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
    force.on("tick", function() {

        edges.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });
    
       gnodes.attr("transform", function(d) { 
            return 'translate(' + [d.x, d.y] + ')'; 
        });   
                
    });
    
                                                         