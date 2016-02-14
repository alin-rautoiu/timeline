var w = 1200;
var h = 1000;

var dataset = {
        nodes: [
                { name: "spirit", depth: 1 }, //0
                { name: "krigstein", depth: 2}, //1
                { name: "fury", depth: 3}, //2
                { name: "master", depth: 4}, //3
                { name: "daredevil", depth: 5}, //4
                { name: "nhawk", depth: 6}, //5
                { name: "hawkeye", depth: 7}, //6
                { name: "invisible", depth: 8} //7
                
                
        ],
        edges: [
                { source: 0, target: 2, name: 'spirit_fury'},
                { source: 0, target: 4, name: 'spirit_daredevil'},
                { source: 0, target: 6, name: 'spirit_hawkeye'},
                { source: 1, target: 4, name: 'krigstein_daredevil'},
                { source: 2, target: 3, name: 'fury_master'},                                                
                { source: 2, target: 4, name: 'fury_daredevil'},
                { source: 2, target: 6, name: 'fury_hawkeye'},
                { source: 3, target: 6, name: 'master_daredevil'},
                { source: 4, target: 6, name: 'daredevil_hawkeye'},                                                
                { source: 5, target: 6, name: 'nhawk_hawkeye'},
                { source: 6, target: 7, name: 'hawkeye_invisile'}
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
        .attr('data-toggle', "popover")
        .attr('data-content', "popover")
        .attr('title', function(d){
            return d.name;
        })
        .attr('data-trigger', "hover")
        .style("stroke", "#ccc")
        .style("stroke-width", 5)
        .style("fill", "none");

var gnodes = svg.selectAll("g.gnode")
        .data(dataset.nodes)
        .enter()
        .append("g")
        .classed('gnode', true);
        
var nodes = gnodes
        .append("circle")
        .attr("r", function(d){
            var size = 1;
            dataset.edges.forEach(function(obj){
                if(obj.name.split("_")[0] === d.name){
                    size++;
                }
            });
            return size * 10;
        })
        .attr("id", function(d, i) {
            return d.name;
        })
        .style("fill", function(d, i) {
                return colors(i);
        })
        .call(force.drag);

svg.selectAll("path").each(
    function(d,i){
        $(this).popover({title:"title", content:"content", container:"body"});
        // and/or $(this).tooltip({title:"tooltip - title", container:"body"});
    });            
            
        
var label = gnodes.append("text")
            .text(function(d) {return d.name});             
        
//Every time the simulation "ticks", this will be called
    force.on("tick", function(e) {
    var ky = 1.2 * e.alpha;
    var left_right = 1;
        edges[0].forEach(function(d, i) {
            if(i == 0) {
                d.__data__.source.y = 120;
                d.__data__.source.x = w / 2;
            }
                d.__data__.source.y += (d.__data__.source.depth * 120 - d.__data__.source.y) * ky;
                
                var size = 1;
                dataset.edges.forEach(function(obj){
                    if(obj.name.split("_")[1] === d.__data__.source.name){
                        size++;
                    }
                });
                
                if(size >= 4) left_right *= -1;
                
                d.__data__.source.x += (w /2 + (size * left_right * 100) - d.__data__.source.x) * ky;
                           
        });

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
    
                                                         